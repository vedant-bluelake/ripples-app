import API_CONFIG, { ENDPOINTS } from './api';

/**
 * HTTP Request Options
 */
export interface RequestOptions extends RequestInit {
  timeout?: number;
  params?: Record<string, string | number | boolean>;
}

/**
 * API Response Interface
 */
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  statusCode?: number;
}

/**
 * HTTP Client for making API requests
 */
class HttpClient {
  private baseUrl: string;
  private timeout: number;

  constructor(baseUrl: string = API_CONFIG.BASE_URL, timeout: number = API_CONFIG.TIMEOUT) {
    this.baseUrl = baseUrl;
    this.timeout = timeout;
  }

  private log(...args: any[]) {
    console.log('[HTTP]', ...args);
  }

  /**
   * Build full URL with query parameters
   */
  private buildUrl(endpoint: string, params?: Record<string, any>): string {
    const url = endpoint.startsWith('http') ? endpoint : `${this.baseUrl}${endpoint}`;
    
    if (params) {
      const queryString = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          queryString.append(key, String(value));
        }
      });
      const query = queryString.toString();
      return query ? `${url}?${query}` : url;
    }
    
    return url;
  }

  /**
   * Fetch with timeout
   */
  private async fetchWithTimeout(
    url: string,
    options: RequestInit & { timeout?: number }
  ): Promise<Response> {
    const timeout = options.timeout || this.timeout;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });
      return response;
    } finally {
      clearTimeout(timeoutId);
    }
  }

  /**
   * Make GET request
   */
  async get<T = any>(
    endpoint: string,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    try {
      const url = this.buildUrl(endpoint, options?.params);
      const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        timeout: options?.timeout,
      } as RequestInit & { timeout?: number };

      this.log('Request GET:', url, requestOptions);
      const response = await this.fetchWithTimeout(url, requestOptions);
      this.log('Response GET:', url, 'status=', response.status);

      return this.handleResponse<T>(response);
    } catch (error) {
      this.log('Error GET:', endpoint, error);
      return this.handleError<T>(error);
    }
  }

  /**
   * Make POST request
   */
  async post<T = any>(
    endpoint: string,
    data?: any,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    try {
      const url = this.buildUrl(endpoint);
      const requestBody = data ? JSON.stringify(data) : undefined;
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        body: requestBody,
        timeout: options?.timeout,
      } as RequestInit & { timeout?: number };

      this.log('Request POST:', url, 'body=', data, requestOptions);
      const response = await this.fetchWithTimeout(url, requestOptions);
      this.log('Response POST:', url, 'status=', response.status);

      return this.handleResponse<T>(response);
    } catch (error) {
      this.log('Error POST:', endpoint, error);
      return this.handleError<T>(error);
    }
  }

  /**
   * Make PUT request
   */
  async put<T = any>(
    endpoint: string,
    data?: any,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    try {
      const url = this.buildUrl(endpoint);
      const requestBody = data ? JSON.stringify(data) : undefined;
      const requestOptions = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        body: requestBody,
        timeout: options?.timeout,
      } as RequestInit & { timeout?: number };

      this.log('Request PUT:', url, 'body=', data, requestOptions);
      const response = await this.fetchWithTimeout(url, requestOptions);
      this.log('Response PUT:', url, 'status=', response.status);

      return this.handleResponse<T>(response);
    } catch (error) {
      this.log('Error PUT:', endpoint, error);
      return this.handleError<T>(error);
    }
  }

  /**
   * Make DELETE request
   */
  async delete<T = any>(
    endpoint: string,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    try {
      const url = this.buildUrl(endpoint);
      const requestOptions = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        timeout: options?.timeout,
      } as RequestInit & { timeout?: number };

      this.log('Request DELETE:', url, requestOptions);
      const response = await this.fetchWithTimeout(url, requestOptions);
      this.log('Response DELETE:', url, 'status=', response.status);

      return this.handleResponse<T>(response);
    } catch (error) {
      this.log('Error DELETE:', endpoint, error);
      return this.handleError<T>(error);
    }
  }

  /**
   * Handle successful response
   */
  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    const contentType = response.headers.get('content-type');
    const isJson = contentType?.includes('application/json');

    try {
      const data = isJson ? await response.json() : await response.text();
      this.log('Parsed response:', response.url, 'status=', response.status, 'data=', data);

      if (!response.ok) {
        return {
          success: false,
          error: data?.error || data?.message || 'An error occurred',
          statusCode: response.status,
        };
      }

      return {
        success: true,
        data,
        statusCode: response.status,
      };
    } catch (error) {
      this.log('Response parse error:', response.url, error);
      return {
        success: false,
        error: 'Failed to parse response',
        statusCode: response.status,
      };
    }
  }

  /**
   * Handle error
   */
  private handleError<T>(error: any): ApiResponse<T> {
    this.log('HTTP error:', error);
    if (error?.name === 'AbortError') {
      return {
        success: false,
        error: 'Request timeout',
      };
    }

    return {
      success: false,
      error: error?.message || 'Network error',
    };
  }
}

/**
 * Singleton HTTP client instance
 */
export const httpClient = new HttpClient();

export default httpClient;
