import { httpClient, ENDPOINTS, type ApiResponse } from '@/config';

/**
 * Basket Service
 * Handles all basket/portfolio-related API calls
 */

export interface Basket {
  id: string;
  name: string;
  description?: string;
  status: 'active' | 'inactive' | 'archived';
  assets: Asset[];
  totalValue: number;
  performance: number;
  createdAt: string;
  updatedAt: string;
}

export interface Asset {
  id: string;
  name: string;
  symbol: string;
  quantity: number;
  price: number;
  percentage: number;
}

export interface CreateBasketRequest {
  name: string;
  description?: string;
  assets?: Asset[];
}

export interface UpdateBasketRequest {
  name?: string;
  description?: string;
}

class BasketService {
  async getBaskets(): Promise<ApiResponse<Basket[]>> {
    return httpClient.get(ENDPOINTS.baskets.list);
  }

  async getBasketById(id: string): Promise<ApiResponse<Basket>> {
    return httpClient.get(ENDPOINTS.baskets.detail(id));
  }

  async createBasket(data: CreateBasketRequest): Promise<ApiResponse<Basket>> {
    return httpClient.post(ENDPOINTS.baskets.create, data);
  }

  async updateBasket(id: string, data: UpdateBasketRequest): Promise<ApiResponse<Basket>> {
    return httpClient.put(ENDPOINTS.baskets.update(id), data);
  }

  async deleteBasket(id: string): Promise<ApiResponse<void>> {
    return httpClient.delete(ENDPOINTS.baskets.delete(id));
  }

  async addAsset(basketId: string, asset: Asset): Promise<ApiResponse<Basket>> {
    return httpClient.post(ENDPOINTS.baskets.addAsset(basketId), asset);
  }
}

export const basketService = new BasketService();
export default basketService;
