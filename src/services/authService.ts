import { httpClient, ENDPOINTS, type ApiResponse } from '@/config';

/**
 * Authentication Service
 * Handles all authentication-related API calls
 */

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface AuthResponse {
  token: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    accountType?: 'investor' | 'cp';
  };
}

export interface CheckUserResponse {
  exists: boolean;
  accountType?: 'investor' | 'cp';
}

export interface VerifyPasswordResponse {
  userId: number;
  email: string;
  role: 'USER' | 'RIPPLER';
  defaultSubuserId?: number;
}

export interface OtpResponse {
  success: boolean;
}

class AuthService {
  /**
   * Check if user exists by email
   */
  async checkUserExists(email: string, role: string = 'USER'): Promise<ApiResponse<CheckUserResponse>> {
    return httpClient.post(ENDPOINTS.auth.checkUser, {
      email,
      role,
    });
  }

  /**
   * Send OTP to email for new registration
   */
  async sendOtp(email: string): Promise<ApiResponse<OtpResponse>> {
    return httpClient.post(ENDPOINTS.auth.resendOtp, {
      email,
    });
  }

  /**
   * Verify OTP code
   */
  async verifyOtp(email: string, otp: string, role?: string): Promise<ApiResponse<OtpResponse>> {
    return httpClient.post(ENDPOINTS.auth.verifyOtp, {
      email,
      otp,
      role,
    });
  }

  /**
   * Save password after OTP verification (for new users)
   */
  async savePassword(email: string, password: string): Promise<ApiResponse<AuthResponse>> {
    return httpClient.post(ENDPOINTS.auth.savePassword, {
      email,
      password,
    });
  }

  /**
   * Verify password for existing users
   */
  async verifyPassword(email: string, password: string, role?: string): Promise<ApiResponse<VerifyPasswordResponse>> {
    return httpClient.post(ENDPOINTS.auth.verifyPassword, {
      email,
      password,
      role,
    });
  }

  /**
   * Login with credentials
   */
  async login(credentials: LoginRequest): Promise<ApiResponse<AuthResponse>> {
    return httpClient.post(ENDPOINTS.auth.login, credentials);
  }

  /**
   * Register new user
   */
  async signup(data: SignupRequest): Promise<ApiResponse<AuthResponse>> {
    return httpClient.post(ENDPOINTS.auth.signup, data);
  }

  /**
   * Send password reset email
   */
  async sendPasswordResetEmail(email: string): Promise<ApiResponse<OtpResponse>> {
    return httpClient.post(ENDPOINTS.auth.passwordResetMail, {
      email,
    });
  }

  /**
   * Logout user
   */
  async logout(): Promise<ApiResponse<void>> {
    return httpClient.post(ENDPOINTS.auth.logout);
  }

  /**
   * Refresh authentication token
   */
  async refresh(): Promise<ApiResponse<AuthResponse>> {
    return httpClient.post(ENDPOINTS.auth.refresh);
  }

  /**
   * Verify token is still valid
   */
  async verify(): Promise<ApiResponse<{ valid: boolean }>> {
    return httpClient.post(ENDPOINTS.auth.verify);
  }
}

export const authService = new AuthService();
export default authService;
