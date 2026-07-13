import Constants from 'expo-constants';

/**
 * API Configuration
 * Centralized configuration for all backend API endpoints
 */

const runtimeEnv = (globalThis as typeof globalThis & {
  process?: {
    env?: Record<string, string | undefined>;
  };
}).process?.env;

const getEnvVar = (key: string, defaultValue: string = ''): string => {
  const value = Constants.expoConfig?.extra?.[key] || runtimeEnv?.[key];
  return value || defaultValue;
};

export const API_CONFIG = {
  // Shared base URL for staging backend
  BASE_URL: getEnvVar('EXPO_PUBLIC_API_BASE_URL', 'https://www.api.bluelakeinvesting.com/api'),
  AUTH_PATH: getEnvVar('EXPO_PUBLIC_AUTH_PATH', '/b-auth'),
  USER_PATH: getEnvVar('EXPO_PUBLIC_USER_PATH', '/users'),
  BASKET_PATH: getEnvVar('EXPO_PUBLIC_BASKET_PATH', '/baskets'),
  ORDERS_PATH: getEnvVar('EXPO_PUBLIC_ORDERS_PATH', '/orders'),
  FUND_PATH: getEnvVar('EXPO_PUBLIC_FUND_PATH', '/funds'),
  MANDATE_PATH: getEnvVar('EXPO_PUBLIC_MANDATE_PATH', '/mandates'),
  NOTIFICATIONS_PATH: getEnvVar('EXPO_PUBLIC_NOTIFICATIONS_PATH', '/notifications'),

  // Timeout
  TIMEOUT: parseInt(getEnvVar('EXPO_PUBLIC_API_TIMEOUT', '30000'), 10),

  // Environment
  ENVIRONMENT: getEnvVar('EXPO_PUBLIC_ENVIRONMENT', 'development'),
  isDevelopment: getEnvVar('EXPO_PUBLIC_ENVIRONMENT', 'development') === 'development',
  isProduction: getEnvVar('EXPO_PUBLIC_ENVIRONMENT', 'development') === 'production',
};

/**
 * API Endpoints - Organized by feature
 */
export const ENDPOINTS = {
  // Authentication
  auth: {
    login: `${API_CONFIG.BASE_URL}${API_CONFIG.AUTH_PATH}/login`,
    signup: `${API_CONFIG.BASE_URL}${API_CONFIG.AUTH_PATH}/signup`,
    checkUser: `${API_CONFIG.BASE_URL}${API_CONFIG.AUTH_PATH}/check-user`,
    resendOtp: `${API_CONFIG.BASE_URL}${API_CONFIG.AUTH_PATH}/resend-otp`,
    verifyOtp: `${API_CONFIG.BASE_URL}${API_CONFIG.AUTH_PATH}/verify-otp`,
    savePassword: `${API_CONFIG.BASE_URL}${API_CONFIG.AUTH_PATH}/save-password`,
    verifyPassword: `${API_CONFIG.BASE_URL}${API_CONFIG.AUTH_PATH}/verify-password`,
    passwordResetMail: `${API_CONFIG.BASE_URL}${API_CONFIG.AUTH_PATH}/password-reset-mail`,
    logout: `${API_CONFIG.BASE_URL}${API_CONFIG.AUTH_PATH}/logout`,
    refresh: `${API_CONFIG.BASE_URL}${API_CONFIG.AUTH_PATH}/refresh`,
    verify: `${API_CONFIG.BASE_URL}${API_CONFIG.AUTH_PATH}/verify`,
  },

  // Users
  users: {
    me: `${API_CONFIG.BASE_URL}${API_CONFIG.USER_PATH}/me`,
    profile: `${API_CONFIG.BASE_URL}${API_CONFIG.USER_PATH}/profile`,
    update: `${API_CONFIG.BASE_URL}${API_CONFIG.USER_PATH}/profile/update`,
    switchAccount: `${API_CONFIG.BASE_URL}${API_CONFIG.USER_PATH}/switch-account`,
  },

  // Baskets/Portfolios
  baskets: {
    list: `${API_CONFIG.BASE_URL}${API_CONFIG.BASKET_PATH}`,
    create: `${API_CONFIG.BASE_URL}${API_CONFIG.BASKET_PATH}/create`,
    detail: (id: string) => `${API_CONFIG.BASE_URL}${API_CONFIG.BASKET_PATH}/${id}`,
    update: (id: string) => `${API_CONFIG.BASE_URL}${API_CONFIG.BASKET_PATH}/${id}/update`,
    delete: (id: string) => `${API_CONFIG.BASE_URL}${API_CONFIG.BASKET_PATH}/${id}/delete`,
    addAsset: (id: string) => `${API_CONFIG.BASE_URL}${API_CONFIG.BASKET_PATH}/${id}/add-asset`,
  },

  // Orders
  orders: {
    list: `${API_CONFIG.BASE_URL}${API_CONFIG.ORDERS_PATH}`,
    create: `${API_CONFIG.BASE_URL}${API_CONFIG.ORDERS_PATH}/create`,
    detail: (id: string) => `${API_CONFIG.BASE_URL}${API_CONFIG.ORDERS_PATH}/${id}`,
    cancel: (id: string) => `${API_CONFIG.BASE_URL}${API_CONFIG.ORDERS_PATH}/${id}/cancel`,
    history: `${API_CONFIG.BASE_URL}${API_CONFIG.ORDERS_PATH}/history`,
  },

  // Funds
  funds: {
    list: `${API_CONFIG.BASE_URL}${API_CONFIG.FUND_PATH}`,
    detail: (id: string) => `${API_CONFIG.BASE_URL}${API_CONFIG.FUND_PATH}/${id}`,
    search: `${API_CONFIG.BASE_URL}${API_CONFIG.FUND_PATH}/search`,
    filter: `${API_CONFIG.BASE_URL}${API_CONFIG.FUND_PATH}/filter`,
  },

  // Mandates
  mandates: {
    list: `${API_CONFIG.BASE_URL}${API_CONFIG.MANDATE_PATH}`,
    create: `${API_CONFIG.BASE_URL}${API_CONFIG.MANDATE_PATH}/create`,
    detail: (id: string) => `${API_CONFIG.BASE_URL}${API_CONFIG.MANDATE_PATH}/${id}`,
    update: (id: string) => `${API_CONFIG.BASE_URL}${API_CONFIG.MANDATE_PATH}/${id}/update`,
    cancel: (id: string) => `${API_CONFIG.BASE_URL}${API_CONFIG.MANDATE_PATH}/${id}/cancel`,
    status: (id: string) => `${API_CONFIG.BASE_URL}${API_CONFIG.MANDATE_PATH}/${id}/status`,
  },

  // Notifications
  notifications: {
    list: `${API_CONFIG.BASE_URL}${API_CONFIG.NOTIFICATIONS_PATH}`,
    markAsRead: (id: string) => `${API_CONFIG.BASE_URL}${API_CONFIG.NOTIFICATIONS_PATH}/${id}/read`,
    markAllAsRead: `${API_CONFIG.BASE_URL}${API_CONFIG.NOTIFICATIONS_PATH}/read-all`,
  },
};

export default API_CONFIG;
