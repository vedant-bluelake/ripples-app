import { useState, useCallback } from 'react';
import { authService, type CheckUserResponse, type VerifyPasswordResponse, type AuthResponse } from '@/services/authService';

export type AuthStep = 'email' | 'otp' | 'password' | 'register' | 'forgot-password-otp' | 'reset-password';

export interface UseAuthFlowReturn {
  step: AuthStep;
  email: string;
  password: string;
  confirmPassword: string;
  otp: string;
  loading: boolean;
  error: string;
  isExistingUser: boolean;
  otpResendTime: number;
  passwordRequirements: {
    length: boolean;
    uppercase: boolean;
    number: boolean;
    specialChar: boolean;
  };
  accountType?: 'investor' | 'cp';

  // Actions
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setConfirmPassword: (password: string) => void;
  setOtp: (otp: string) => void;
  setError: (error: string) => void;
  checkEmail: (role?: string) => Promise<void>;
  verifyOtp: (skipRegister?: boolean, role?: string) => Promise<boolean>;
  resendOtp: () => Promise<void>;
  submitPassword: (role?: string) => Promise<VerifyPasswordResponse | undefined>;
  registerUser: () => Promise<AuthResponse | undefined>;
  resetPassword: () => Promise<void>;
  goBackStep: () => void;
  reset: () => void;
}

const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const validatePassword = (password: string): {
  length: boolean;
  uppercase: boolean;
  number: boolean;
  specialChar: boolean;
} => ({
  length: password.length >= 8,
  uppercase: /[A-Z]/.test(password),
  number: /[0-9]/.test(password),
  specialChar: /[^A-Za-z0-9]/.test(password),
});

const isPasswordValid = (password: string): boolean => {
  const requirements = validatePassword(password);
  return Object.values(requirements).every(Boolean);
};

export const useAuthFlow = (): UseAuthFlowReturn => {
  const [step, setStep] = useState<AuthStep>('email');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isExistingUser, setIsExistingUser] = useState(false);
  const [otpResendTime, setOtpResendTime] = useState(0);
  const [accountType, setAccountType] = useState<'investor' | 'cp'>();
  const [passwordRequirements, setPasswordRequirements] = useState({
    length: false,
    uppercase: false,
    number: false,
    specialChar: false,
  });

  // Handle OTP resend countdown
  const startOtpTimer = useCallback(() => {
    setOtpResendTime(30);
    const interval = setInterval(() => {
      setOtpResendTime((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  const parseCheckUserResponse = (responseData: any) => {
    if (typeof responseData === 'boolean') {
      return { exists: responseData, accountType: undefined };
    }

    if (responseData == null) {
      return { exists: false, accountType: undefined };
    }

    if (typeof responseData.exists === 'boolean') {
      return { exists: responseData.exists, accountType: responseData.accountType };
    }

    if (typeof responseData.data === 'boolean') {
      return { exists: responseData.data, accountType: undefined };
    }

    if (responseData.data && typeof responseData.data.exists === 'boolean') {
      return { exists: responseData.data.exists, accountType: responseData.data.accountType };
    }

    return { exists: false, accountType: responseData.accountType };
  };

  const getAccountTypeFromRole = (role?: string): 'investor' | 'cp' | undefined => {
    if (role === 'RIPPLER') return 'cp';
    if (role === 'USER') return 'investor';
    return undefined;
  };

  const handleCheckEmail = useCallback(async (role?: string) => {
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await authService.checkUserExists(email, role);

      if (!response.success) {
        setError(response.error || 'Failed to check email');
        return;
      }

      const data = parseCheckUserResponse(response.data);
      const fallbackAccountType = getAccountTypeFromRole(role);

      if (data.exists) {
        // Existing user - go to password step
        setIsExistingUser(true);
        setAccountType(data.accountType ?? fallbackAccountType);
        setStep('password');
      } else {
        // New user - send OTP
        setIsExistingUser(false);
        setAccountType(data.accountType ?? fallbackAccountType);
        const otpResponse = await authService.sendOtp(email);

        if (!otpResponse.success) {
          setError(otpResponse.error || 'Failed to send OTP');
          return;
        }

        setStep('otp');
        startOtpTimer();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [email, startOtpTimer]);

  const handleVerifyOtp = useCallback(async (skipRegister = false, role?: string) => {
    if (otp.length !== 6) {
      setError('OTP must be 6 digits');
      return false;
    }

    setLoading(true);
    setError('');

    try {
      const response = await authService.verifyOtp(email, otp, role);

      if (!response.success) {
        setError(response.error || 'Invalid OTP');
        return false;
      }

      if (!skipRegister) {
        setStep('register');
      }
      setOtp('');
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to verify OTP');
      return false;
    } finally {
      setLoading(false);
    }
  }, [email, otp]);

  const handleResendOtp = useCallback(async () => {
    if (otpResendTime > 0) return;

    setLoading(true);
    setError('');

    try {
      const response = await authService.sendOtp(email);

      if (!response.success) {
        setError(response.error || 'Failed to resend OTP');
        return;
      }

      startOtpTimer();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to resend OTP');
    } finally {
      setLoading(false);
    }
  }, [email, otpResendTime, startOtpTimer]);

  const handleSubmitPassword = useCallback(async (role?: string) => {
    if (!password) {
      setError('Please enter your password');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await authService.verifyPassword(email, password, role);

      if (!response.success) {
        setError(response.error || 'Invalid email or password');
        return;
      }

      const data = response.data as VerifyPasswordResponse;
      const actualRole = data.role ?? role;
      if (actualRole === 'RIPPLER') {
        setAccountType('cp');
      } else {
        setAccountType('investor');
      }
      setPassword('');

      // Successfully verified - caller will handle redirect
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  }, [email, password]);

  const handleRegisterUser = useCallback(async () => {
    if (!isPasswordValid(password)) {
      setError("Password doesn't meet requirements");
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await authService.savePassword(email, password);

      if (!response.success) {
        setError(response.error || 'Registration failed');
        return;
      }

      // Successfully registered
      setPassword('');
      setConfirmPassword('');
      return response.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setLoading(false);
    }
  }, [email, password, confirmPassword]);

  const handleResetPassword = useCallback(async () => {
    if (!isPasswordValid(password)) {
      setError("Password doesn't meet requirements");
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await authService.savePassword(email, password);

      if (!response.success) {
        setError(response.error || 'Password reset failed');
        return;
      }

      // Successfully reset
      setStep('password');
      setPassword('');
      setConfirmPassword('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Password reset failed');
    } finally {
      setLoading(false);
    }
  }, [email, password, confirmPassword]);

  const handleSetPassword = (newPassword: string) => {
    setPassword(newPassword);
    setPasswordRequirements(validatePassword(newPassword));
  };

  const handleGoBackStep = () => {
    if (step === 'password') {
      setStep('email');
      setPassword('');
      setError('');
    } else if (step === 'otp') {
      setStep('email');
      setError('');
    } else if (step === 'register') {
      setStep('otp');
      setPassword('');
      setConfirmPassword('');
      setError('');
    } else if (step === 'forgot-password-otp') {
      setStep('password');
      setError('');
    } else if (step === 'reset-password') {
      setStep('forgot-password-otp');
      setPassword('');
      setConfirmPassword('');
      setError('');
    }
  };

  const handleReset = () => {
    setStep('email');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setOtp('');
    setError('');
    setIsExistingUser(false);
    setOtpResendTime(0);
    setAccountType(undefined);
    setPasswordRequirements({
      length: false,
      uppercase: false,
      number: false,
      specialChar: false,
    });
  };

  return {
    step,
    email,
    password,
    confirmPassword,
    otp,
    loading,
    error,
    isExistingUser,
    otpResendTime,
    passwordRequirements,
    accountType,
    setEmail,
    setPassword: handleSetPassword,
    setConfirmPassword,
    setOtp,
    setError,
    checkEmail: handleCheckEmail,
    verifyOtp: handleVerifyOtp,
    resendOtp: handleResendOtp,
    submitPassword: handleSubmitPassword,
    registerUser: handleRegisterUser,
    resetPassword: handleResetPassword,
    goBackStep: handleGoBackStep,
    reset: handleReset,
  };
};
