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
  };
}

class AuthService {
  async login(credentials: LoginRequest): Promise<ApiResponse<AuthResponse>> {
    return httpClient.post(ENDPOINTS.auth.login, credentials);
  }

  async signup(data: SignupRequest): Promise<ApiResponse<AuthResponse>> {
    return httpClient.post(ENDPOINTS.auth.signup, data);
  }

  async logout(): Promise<ApiResponse<void>> {
    return httpClient.post(ENDPOINTS.auth.logout);
  }

  async refresh(): Promise<ApiResponse<AuthResponse>> {
    return httpClient.post(ENDPOINTS.auth.refresh);
  }

  async verify(): Promise<ApiResponse<{ valid: boolean }>> {
    return httpClient.post(ENDPOINTS.auth.verify);
  }
}

export const authService = new AuthService();
export default authService;
