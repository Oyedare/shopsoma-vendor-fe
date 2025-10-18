// API utilities with automatic token refresh

import {
  getAccessToken,
  getRefreshToken,
  setTokens,
  clearTokens,
} from "./auth";

const API_BASE_URL = "http://shopsoma.local/wp-json/custom/v1";

// Create a custom fetch function that handles token refresh
export const apiRequest = async (
  url: string,
  options: RequestInit = {}
): Promise<Response> => {
  const token = getAccessToken();

  const defaultHeaders = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  const config: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  let response = await fetch(url, config);

  // If the response is Unauthorized or token expired (WP returns 403 with jwt_auth_invalid_token), try to refresh the token
  const shouldAttemptRefresh = async () => {
    if (response.status === 401) return true;
    if (response.status === 403) {
      try {
        const clone = response.clone();
        const json = await clone.json();
        if (
          json?.code === "jwt_auth_invalid_token" ||
          /expired token/i.test(json?.message || "")
        ) {
          return true;
        }
      } catch (_) {
        // ignore parse errors
      }
    }
    return false;
  };

  if (await shouldAttemptRefresh()) {
    try {
      const refreshToken = getRefreshToken();
      if (refreshToken) {
        const refreshResponse = await fetch(`${API_BASE_URL}/token/refresh`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            refresh_token: refreshToken,
          }),
        });

        if (refreshResponse.ok) {
          const refreshData = await refreshResponse.json();

          // Update tokens
          setTokens(refreshData.token, refreshToken);

          // Retry the original request with the new token
          const newConfig: RequestInit = {
            ...config,
            headers: {
              ...config.headers,
              Authorization: `Bearer ${refreshData.token}`,
            },
          };

          response = await fetch(url, newConfig);
        } else {
          // Refresh failed, clear tokens and redirect to login
          clearTokens();
          if (typeof window !== "undefined") {
            window.location.href = "/auth/login";
          }
        }
      } else {
        // No refresh token, redirect to login
        clearTokens();
        if (typeof window !== "undefined") {
          window.location.href = "/auth/login";
        }
      }
    } catch (error) {
      // Refresh failed, clear tokens and redirect to login
      clearTokens();
      if (typeof window !== "undefined") {
        window.location.href = "/auth/login";
      }
    }
  }

  return response;
};

// Helper function for making authenticated API calls
export const authenticatedRequest = async (
  endpoint: string,
  options: RequestInit = {}
) => {
  const url = endpoint.startsWith("http")
    ? endpoint
    : `${API_BASE_URL}${endpoint}`;
  return apiRequest(url, options);
};

// Add Product API
export interface AddProductRequest {
  product_name: string;
  product_category: string;
  price: number;
  sale_price?: number;
  product_description?: string;
  product_images: string[];
  stock_quantity: number;
  product_care?: string;
  materials?: string[];
  sizing?: string;
  sustainable?: boolean;
  is_made_to_order?: boolean;
  production_time_days?: number;
  has_variants?: boolean;
  variants?: Array<{
    variation_name: string;
    variation_type: string;
    has_different_price: boolean;
    price?: number;
    sale_price?: number;
    color: string;
    available_sizes: string[];
    size_stock: Record<string, number>;
    images: string[];
  }>;
}

export interface AddProductResponse {
  success: boolean;
  product_id?: number;
  custom_product_id?: string;
  brand_name?: string;
  auto_generated_tags?: string[];
  stored_images?: number;
  message?: string;
  status?: string;
  variants?: {
    total_variants: number;
    total_stock: number;
    variation_names: string[];
    variation_types: string[];
    colors: string[];
    sizes: string[];
  };
}

export const addProduct = async (
  productData: AddProductRequest
): Promise<AddProductResponse> => {
  const response = await apiRequest(
    "http://shopsoma.local/wp-json/custom/v1/vendor/add-product",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};
