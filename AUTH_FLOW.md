# Authentication Flow Implementation

This document outlines the authentication and signup flow that has been implemented in the Ripples React Native app.

## Overview

The authentication system follows a multi-step flow similar to the web frontend, adapted for React Native. It supports both **Investors** and **Certified Partners (CP)** with appropriate redirects based on user type.

## Flow Diagram

```
┌─────────────┐
│   LOGIN     │
│  Email Step │
└──────┬──────┘
       │
       ├─ Email exists? ──YES──→ PASSWORD Step → Sign In → Dashboard
       │
       └─ Email new? ─────NO──→ OTP Step → Verify → REGISTER Step → Onboarding
```

## Architecture

### 1. **Auth Service** (`src/services/authService.ts`)
Handles all API calls to the backend authentication endpoints:

- `checkUserExists(email)` - Checks if email exists and returns account type
- `sendOtp(email)` - Sends OTP to email for new users
- `verifyOtp(email, otp)` - Verifies OTP code
- `savePassword(email, password)` - Saves password after OTP verification
- `verifyPassword(email, password)` - Verifies password for existing users
- `sendPasswordResetEmail(email)` - Initiates password reset

### 2. **Auth Flow Hook** (`src/hooks/useAuthFlow.ts`)
Custom React hook that manages authentication state and logic:

```typescript
const auth = useAuthFlow();

// State
auth.step // Current step: 'email' | 'otp' | 'password' | 'register'
auth.email // User email
auth.otp // 6-digit OTP
auth.password // Password
auth.loading // Loading state
auth.error // Error messages
auth.accountType // 'investor' | 'cp'

// Actions
await auth.checkEmail() // Check if email exists
await auth.verifyOtp() // Verify OTP code
await auth.resendOtp() // Resend OTP
await auth.submitPassword() // Verify password
await auth.registerUser() // Register new user
auth.goBackStep() // Go to previous step
auth.reset() // Reset all state
```

### 3. **Login Screen** (`app/auth/login.tsx`)

**Features:**
- Email verification with API
- Password entry for existing users
- Automatic navigation based on account type
- Error handling and loading states

**Flow:**
1. User enters email → `checkUserExists()` → API call
2. If exists: Go to password step
3. If new: Redirect to signup screen with email
4. On password verification: Redirect to dashboard (investor) or partner dashboard (cp)

### 4. **Signup Screen** (`app/auth/signup.tsx`)

**Features:**
- OTP verification (6-digit code)
- OTP resend with 30-second countdown
- Password creation with validation requirements:
  - Minimum 8 characters
  - At least one uppercase letter
  - At least one number
  - At least one special character
- Real-time password requirements feedback

**Flow:**
1. User receives OTP → Enters 6-digit code → `verifyOtp()`
2. On verification: Show password creation form
3. User sets password → `registerUser()` (API saves password)
4. On success: Redirect to onboarding
   - Investors → `/onboarding/investor`
   - Partners → `/onboarding/cp`

## API Endpoints

All endpoints are accessed through the configured base URL: `https://www.api.bluelakeinvesting.com/api`

### Authentication Endpoints

| Endpoint | Method | Request | Response |
|----------|--------|---------|----------|
| `/auth/check-user` | POST | `{ email }` | `{ exists: boolean, accountType?: 'investor' \| 'cp' }` |
| `/auth/resend-otp` | POST | `{ email }` | `{ success: boolean }` |
| `/auth/verify-otp` | POST | `{ email, otp }` | `{ success: boolean }` |
| `/auth/save-password` | POST | `{ email, password }` | `{ token, refreshToken, user }` |
| `/auth/verify-password` | POST | `{ email, password }` | `{ userId, email, accountType, defaultSubuserId? }` |
| `/auth/login` | POST | `{ email, password }` | `{ token, refreshToken, user }` |
| `/auth/logout` | POST | - | `{ success: boolean }` |
| `/auth/password-reset-mail` | POST | `{ email }` | `{ success: boolean }` |

## Usage Example

```typescript
import { useAuthFlow } from '@/hooks/useAuthFlow';

export default function MyAuthScreen() {
  const auth = useAuthFlow();

  const handleCheckEmail = async () => {
    await auth.checkEmail();
    // User is now on next step based on whether email exists
  };

  const handleVerifyOtp = async () => {
    await auth.verifyOtp();
    // If successful, step changes to 'register'
  };

  const handleRegister = async () => {
    const result = await auth.registerUser();
    if (result) {
      // User registered successfully
      const onboardingRoute = auth.accountType === 'investor' 
        ? '/onboarding/investor' 
        : '/onboarding/cp';
      router.replace(onboardingRoute);
    }
  };

  return (
    <View>
      {auth.error && <Text>{auth.error}</Text>}
      {auth.loading && <ActivityIndicator />}
      {/* Render based on auth.step */}
    </View>
  );
}
```

## State Management

### Auth Flow Steps

1. **EMAIL** - User enters email address
   - API: `checkUserExists()`
   - Transition to PASSWORD or OTP based on response

2. **PASSWORD** - Existing user enters password
   - API: `verifyPassword()`
   - On success: Redirect to dashboard
   - On error: Show error message

3. **OTP** - New user verifies OTP
   - API: `verifyOtp()`
   - Features: Resend countdown, input validation
   - Transition to REGISTER on success

4. **REGISTER** - New user creates password
   - API: `savePassword()`
   - Features: Password validation, requirements display
   - On success: Redirect to onboarding based on account type

## Error Handling

All API calls return a standardized response:

```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  statusCode?: number;
}
```

The auth hook automatically:
- Catches API errors and sets them in state
- Shows user-friendly error messages
- Maintains loading state during requests
- Validates input before API calls

## Password Validation

Password requirements are tracked in real-time:

```typescript
interface PasswordRequirements {
  length: boolean;      // >= 8 characters
  uppercase: boolean;   // At least one A-Z
  number: boolean;      // At least one 0-9
  specialChar: boolean; // At least one special character
}
```

Users see visual feedback as they type:
- ✓ Green when requirement met
- ○ Gray when requirement not met

## Navigation & Redirects

### After Successful Login (Existing User)
```
LOGIN → PASSWORD → API Verification ↓
  ├─ If investor: Redirect to /(investor)/home
  └─ If cp: Redirect to /(cp)/dashboard
```

### After Successful Registration (New User)
```
LOGIN → EMAIL → OTP → REGISTER → API Registration ↓
  ├─ If investor: Redirect to /onboarding/investor
  └─ If cp: Redirect to /onboarding/cp
```

## Environment Configuration

The API endpoints are configured in `.env`:

```env
EXPO_PUBLIC_API_BASE_URL=https://www.api.bluelakeinvesting.com/api
EXPO_PUBLIC_AUTH_PATH=/auth
EXPO_PUBLIC_ENVIRONMENT=staging
```

See `API_INTEGRATION.md` for more configuration details.

## Key Features Implemented

✓ **Email Verification** - Check if user exists via API
✓ **OTP Flow** - Generate and verify 6-digit codes
✓ **Password Requirements** - Real-time validation with visual feedback
✓ **Error Handling** - Comprehensive error messages and recovery
✓ **Account Type Detection** - Automatic routing for investors vs partners
✓ **Loading States** - UI feedback during API calls
✓ **OTP Resend** - 30-second countdown before resend available
✓ **Session Management** - Token-based authentication ready

## Next Steps

1. **Token Storage** - Implement secure token storage using AsyncStorage
2. **Authentication Context** - Create context to persist user across navigation
3. **Protected Routes** - Add route guards to prevent unauthorized access
4. **Token Refresh** - Implement automatic token refresh logic
5. **Logout Cleanup** - Clear tokens and user data on logout
6. **Forgot Password** - Implement password reset flow

## Troubleshooting

### "Cannot connect to API"
- Verify `.env` file has correct base URL
- Check network connectivity
- Ensure backend is running

### "Invalid OTP"
- OTP may have expired (valid for limited time)
- User should click resend to get new code

### "Password doesn't meet requirements"
- Check all 4 requirements are met
- Ensure no spaces in password

### "Email already exists"
- User account already registered
- Use login flow instead of signup
- Use "Forgot Password" if needed
