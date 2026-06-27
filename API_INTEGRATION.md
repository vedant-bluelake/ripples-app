# API Integration Guide

This guide explains how to integrate the backend API with the Ripples React Native application.

## Setup

### 1. Environment Variables

Create a `.env` file in the root directory (copy from `.env.example`):

```bash
cp .env.example .env
```

Update the `.env` file with your backend URLs:

```env
EXPO_PUBLIC_API_BASE_URL=https://your-api.com/api
EXPO_PUBLIC_AUTH_API_URL=https://your-api.com/auth
EXPO_PUBLIC_USER_API_URL=https://your-api.com/api/users
EXPO_PUBLIC_BASKET_API_URL=https://your-api.com/api/baskets
EXPO_PUBLIC_ORDERS_API_URL=https://your-api.com/api/orders
EXPO_PUBLIC_FUND_API_URL=https://your-api.com/api/funds
EXPO_PUBLIC_MANDATE_API_URL=https://your-api.com/api/mandates
EXPO_PUBLIC_NOTIFICATIONS_API_URL=https://your-api.com/api/notifications
EXPO_PUBLIC_API_TIMEOUT=30000
EXPO_PUBLIC_ENVIRONMENT=development
```

**Important**: The `.env` file is in `.gitignore` and should never be committed to version control. Use `.env.example` as a template for other developers.

## Configuration Files

### `src/config/api.ts`
Contains centralized API configuration and endpoint definitions.

**Exports:**
- `API_CONFIG` - Base URLs and configuration
- `ENDPOINTS` - Organized endpoint definitions

**Example:**
```typescript
import { API_CONFIG, ENDPOINTS } from '@/config';

console.log(API_CONFIG.BASE_URL); // http://localhost:3000/api
console.log(ENDPOINTS.auth.login); // http://localhost:3001/auth/login
```

### `src/config/http.ts`
HTTP client wrapper with built-in error handling, timeouts, and request logging.

**Features:**
- Automatic timeout handling
- Query parameter support
- Consistent error handling
- Response type safety

**Example:**
```typescript
import { httpClient } from '@/config';

const response = await httpClient.get('/users', {
  params: { page: 1, limit: 10 }
});

if (response.success) {
  console.log(response.data);
} else {
  console.error(response.error);
}
```

## Services

Service classes provide typed methods for API interactions.

### Authentication Service (`src/services/authService.ts`)

```typescript
import { authService } from '@/services';

// Login
const loginResponse = await authService.login({
  email: 'user@example.com',
  password: 'password123'
});

// Signup
const signupResponse = await authService.signup({
  email: 'newuser@example.com',
  password: 'password123',
  firstName: 'John',
  lastName: 'Doe'
});

// Logout
await authService.logout();
```

### Basket Service (`src/services/basketService.ts`)

```typescript
import { basketService } from '@/services';

// Get all baskets
const basketsResponse = await basketService.getBaskets();

// Get single basket
const basketResponse = await basketService.getBasketById('basket-id');

// Create basket
const createResponse = await basketService.createBasket({
  name: 'My Portfolio',
  description: 'My investment portfolio'
});

// Update basket
const updateResponse = await basketService.updateBasket('basket-id', {
  name: 'Updated Portfolio'
});

// Delete basket
await basketService.deleteBasket('basket-id');
```

### User Service (`src/services/userService.ts`)

```typescript
import { userService } from '@/services';

// Get current user
const userResponse = await userService.getCurrentUser();

// Get user profile
const profileResponse = await userService.getUserProfile();

// Update profile
const updateResponse = await userService.updateProfile({
  firstName: 'Jane',
  lastName: 'Doe',
  phone: '+1234567890'
});

// Switch account type
const switchResponse = await userService.switchAccount({
  accountType: 'cp'
});
```

## Using APIs in Screens

Here's an example of using the API in a screen component:

```typescript
import { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { basketService } from '@/services';
import type { Basket } from '@/services';

export default function BasketsScreen() {
  const [baskets, setBaskets] = useState<Basket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBaskets();
  }, []);

  const fetchBaskets = async () => {
    setLoading(true);
    const response = await basketService.getBaskets();
    
    if (response.success && response.data) {
      setBaskets(response.data);
      setError(null);
    } else {
      setError(response.error || 'Failed to fetch baskets');
    }
    
    setLoading(false);
  };

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error}</Text>;

  return (
    <View>
      <FlatList
        data={baskets}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}</Text>
            <Text>Value: ${item.totalValue}</Text>
          </View>
        )}
      />
    </View>
  );
}
```

## Adding New Endpoints

To add a new API endpoint:

1. **Update `src/config/api.ts`:**
   ```typescript
   export const ENDPOINTS = {
     // ... existing endpoints
     rewards: {
       list: `${API_CONFIG.REWARDS_URL}`,
       claim: `${API_CONFIG.REWARDS_URL}/claim`,
     },
   };
   ```

2. **Add environment variable to `.env` and `.env.example`:**
   ```env
   EXPO_PUBLIC_REWARDS_API_URL=http://localhost:3000/api/rewards
   ```

3. **Create service file `src/services/rewardsService.ts`:**
   ```typescript
   import { httpClient, ENDPOINTS, type ApiResponse } from '@/config';

   class RewardsService {
     async getRewards() {
       return httpClient.get(ENDPOINTS.rewards.list);
     }
   }

   export const rewardsService = new RewardsService();
   ```

4. **Export from `src/services/index.ts`:**
   ```typescript
   export * from './rewardsService';
   ```

## Error Handling

All API responses follow the `ApiResponse<T>` interface:

```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  statusCode?: number;
}
```

**Always check the `success` flag:**

```typescript
const response = await userService.getCurrentUser();

if (response.success) {
  // Handle success
  const user = response.data;
} else {
  // Handle error
  const errorMessage = response.error;
  const statusCode = response.statusCode;
}
```

## Common Issues

### Backend not accessible
- Ensure the `.env` URLs are correct
- Check that the backend server is running
- Verify network connectivity

### CORS issues
- Configure CORS on your backend
- Allow `http://localhost:*` for development

### Authentication failures
- Check token handling in the HTTP client
- Verify credentials are correct
- Check token expiration and refresh logic

## Development Workflow

1. **For local development:**
   ```env
   EXPO_PUBLIC_API_BASE_URL=http://localhost:3000/api
   EXPO_PUBLIC_ENVIRONMENT=development
   ```

2. **For staging:**
   ```env
   EXPO_PUBLIC_API_BASE_URL=https://staging-api.example.com/api
   EXPO_PUBLIC_ENVIRONMENT=staging
   ```

3. **For production:**
   ```env
   EXPO_PUBLIC_API_BASE_URL=https://api.example.com/api
   EXPO_PUBLIC_ENVIRONMENT=production
   ```

## Next Steps

1. Configure actual backend URLs in `.env`
2. Update service types to match your backend responses
3. Implement token storage and refresh logic
4. Add request interceptors for headers/authentication
5. Add error logging and monitoring
