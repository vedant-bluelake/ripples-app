import { httpClient, ENDPOINTS, type ApiResponse } from '@/config';

/**
 * User Service
 * Handles user profile and account-related API calls
 */

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  accountType: 'investor' | 'cp';
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  zipCode?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateProfileRequest {
  firstName?: string;
  lastName?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  zipCode?: string;
}

export interface SwitchAccountRequest {
  accountType: 'investor' | 'cp';
}

class UserService {
  async getCurrentUser(): Promise<ApiResponse<User>> {
    return httpClient.get(ENDPOINTS.users.me);
  }

  async getUserProfile(): Promise<ApiResponse<User>> {
    return httpClient.get(ENDPOINTS.users.profile);
  }

  async updateProfile(data: UpdateProfileRequest): Promise<ApiResponse<User>> {
    return httpClient.put(ENDPOINTS.users.update, data);
  }

  async switchAccount(data: SwitchAccountRequest): Promise<ApiResponse<User>> {
    return httpClient.post(ENDPOINTS.users.switchAccount, data);
  }
}

export const userService = new UserService();
export default userService;
