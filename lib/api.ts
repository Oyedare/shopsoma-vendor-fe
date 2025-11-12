// API utilities with automatic token refresh

import {
  getAccessToken,
  getRefreshToken,
  setTokens,
  clearTokens,
} from "./auth";

const API_BASE_URL = "https://api.shopsoma.com/wp-json/custom/v1";

// Create a custom fetch function that handles token refresh
export const apiRequest = async (
  url: string,
  options: RequestInit = {}
): Promise<Response> => {
  // Setup a timeout to avoid hung requests (e.g., stalled CORS/Network)
  const controller = new AbortController();
  const timeoutMs = 45000; // 45 seconds
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  const token = getAccessToken();

  // Start with provided headers; we'll add Authorization and conditionally Content-Type
  const providedHeaders = (options.headers || {}) as Record<string, string>;
  const headers: Record<string, string> = {
    ...providedHeaders,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  // If the body is NOT FormData and caller didn't explicitly set Content-Type, default to JSON.
  // For FormData, NEVER set Content-Type manually (browser sets with boundary).
  const isFormData =
    typeof FormData !== "undefined" && options.body instanceof FormData;
  const hasContentType = Object.keys(headers).some(
    (h) => h.toLowerCase() === "content-type"
  );
  if (!isFormData && !hasContentType) {
    headers["Content-Type"] = "application/json";
  }

  const config: RequestInit = {
    ...options,
    headers,
    signal: controller.signal,
  };

  let response: Response;
  try {
    response = await fetch(url, config);
  } catch (err) {
    // Ensure timeout is cleared before rethrowing
    clearTimeout(timeoutId);
    throw err;
  }

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

  clearTimeout(timeoutId);
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
  collection_ids?: string[]; // Collection IDs (optional, array for multiple collections)
  color?: string; // Product color (optional, only for products without variations)
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
  const response = await apiRequest(`${API_BASE_URL}/vendor/add-product`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(productData),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

// Vendor Registration API
export interface VendorRegistrationRequest {
  // Basic User Information
  username: string;
  email: string;
  password: string;

  // Personal Information
  first_name: string;
  last_name: string;
  phone_number: string; // Format: "+2348012345678"

  // Business Information
  business_name: string; // Store name (must be unique)
  business_location: string;
  is_business_registered: "yes" | "no";
  cac_details?: string; // Required only if is_business_registered is "yes"

  // Products/Services (array of selected categories)
  products_services: Array<
    | "Women's Fashion"
    | "Men's Fashion"
    | "Jewelry"
    | "Bags/Accessories"
    | "Skincare"
    | "Beauty and Makeup"
    | "Homewares"
  >;

  // Business Practices
  local_sourcing_percentage:
    | "We source all our products locally - 100%"
    | "We source most locally"
    | "We source some locally"
    | "We don't source locally - 0%";

  // Business Details
  years_in_business: string; // e.g., "3 years"
  brand_special: string; // What makes the brand special

  // Optional Fields
  website_link?: string; // Valid URL
  social_media_handles?: string; // e.g., "@yourbrand"
}

export interface VendorRegistrationResponse {
  success: boolean;
  user_id?: number;
  role?: string;
  business_name?: string;
  status?: string;
}

export interface VendorRegistrationError {
  code: string;
  message: string;
  status: number;
}

export const registerVendor = async (
  vendorData: VendorRegistrationRequest
): Promise<VendorRegistrationResponse> => {
  const response = await fetch(`${API_BASE_URL}/register/vendor`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(vendorData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || `HTTP error! status: ${response.status}`
    );
  }

  return response.json();
};

// Store Settings API
export interface StoreSettings {
  banner_image?: string;
  brand_name: string;
  brand_description: string;
  logo?: string;
  location: string;
  shipping_country: string;
  shipping_address: string;
  returning_country: string;
  returning_address: string;
  open_days: string[];
  opening_hours: string;
  closing_hours: string;
  tin_number: string;
  default_payment_method: string;
  auto_payment_timeline: string;
  brand_cumulative_points: number;
  next_reset_date: string;
  contact_information: ContactInfo[];
  account_details: AccountDetail[];
  is_enabled: boolean;
  store_status: string;
  phone: string;
  email: string;
  address: string;
}

export interface ContactInfo {
  id: string;
  email: string;
  phone: string;
  type: "primary" | "secondary";
  status: "active" | "pending" | "pending_update";
  created_at: string;
  is_verified: boolean;
}

export interface AccountDetail {
  id: string;
  account_type: "savings" | "current" | "checking" | "business";
  bank_name: string;
  account_number: string;
  account_name: string;
  is_primary: boolean;
  is_verified: boolean;
  created_at: string;
  status: "active" | "pending";
}

export interface StoreSettingsResponse {
  success: boolean;
  store_settings: StoreSettings;
}

export interface StoreSettingsUpdateResponse {
  success: boolean;
  message: string;
  updated_fields: string[];
}

export interface ContactInfoResponse {
  success: boolean;
  contact_information: ContactInfo[];
  pending_changes: ContactInfo[];
}

export interface AccountDetailsResponse {
  success: boolean;
  account_details: AccountDetail[];
}

export interface StoreOperationResponse {
  success: boolean;
  message: string;
}

export interface DeletionStatusResponse {
  success: boolean;
  is_deleted: boolean;
  can_delete: boolean;
  blocking_factors: {
    has_pending_orders: boolean;
    has_products: boolean;
    has_active_subscriptions: boolean;
  };
}

// Store Settings API Functions
export const getStoreSettings = async (): Promise<StoreSettingsResponse> => {
  const response = await authenticatedRequest("/stores/settings", {
    method: "GET",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || `HTTP error! status: ${response.status}`
    );
  }

  return response.json();
};

export const updateStoreSettings = async (
  settings: Partial<StoreSettings>
): Promise<StoreSettingsUpdateResponse> => {
  const response = await authenticatedRequest("/stores/settings", {
    method: "PUT",
    body: JSON.stringify(settings),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || `HTTP error! status: ${response.status}`
    );
  }

  return response.json();
};

export const getContactInformation = async (): Promise<ContactInfoResponse> => {
  const response = await authenticatedRequest("/stores/contact-information", {
    method: "GET",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || `HTTP error! status: ${response.status}`
    );
  }

  return response.json();
};

export const addContactInformation = async (contact: {
  email: string;
  phone: string;
  type: "primary" | "secondary";
}): Promise<{ success: boolean; message: string; contact: ContactInfo }> => {
  const response = await authenticatedRequest("/stores/contact-information", {
    method: "POST",
    body: JSON.stringify(contact),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || `HTTP error! status: ${response.status}`
    );
  }

  return response.json();
};

export const updateContactInformation = async (
  contactId: string,
  contact: { email: string; phone: string; type: "primary" | "secondary" }
): Promise<{
  success: boolean;
  message: string;
  update_request: ContactInfo;
}> => {
  const response = await authenticatedRequest(
    `/stores/contact-information/${contactId}`,
    {
      method: "PUT",
      body: JSON.stringify(contact),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || `HTTP error! status: ${response.status}`
    );
  }

  return response.json();
};

export const deleteContactInformation = async (
  contactId: string
): Promise<StoreOperationResponse> => {
  const response = await authenticatedRequest(
    `/stores/contact-information/${contactId}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || `HTTP error! status: ${response.status}`
    );
  }

  return response.json();
};

export const getAccountDetails = async (): Promise<AccountDetailsResponse> => {
  const response = await authenticatedRequest("/stores/account-details", {
    method: "GET",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || `HTTP error! status: ${response.status}`
    );
  }

  return response.json();
};

export const addAccountDetails = async (account: {
  account_type: "savings" | "current" | "checking" | "business";
  bank_name: string;
  account_number: string;
  account_name: string;
  is_primary: boolean;
}): Promise<{ success: boolean; message: string; account: AccountDetail }> => {
  const response = await authenticatedRequest("/stores/account-details", {
    method: "POST",
    body: JSON.stringify(account),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || `HTTP error! status: ${response.status}`
    );
  }

  return response.json();
};

export const updateAccountDetails = async (
  accountId: string,
  account: {
    account_type: "savings" | "current" | "checking" | "business";
    bank_name: string;
    account_number: string;
    account_name: string;
    is_primary: boolean;
  }
): Promise<{ success: boolean; message: string; account: AccountDetail }> => {
  const response = await authenticatedRequest(
    `/stores/account-details/${accountId}`,
    {
      method: "PUT",
      body: JSON.stringify(account),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || `HTTP error! status: ${response.status}`
    );
  }

  return response.json();
};

export const deleteAccountDetails = async (
  accountId: string
): Promise<StoreOperationResponse> => {
  const response = await authenticatedRequest(
    `/stores/account-details/${accountId}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || `HTTP error! status: ${response.status}`
    );
  }

  return response.json();
};

export const disableStore = async (): Promise<StoreOperationResponse> => {
  const response = await authenticatedRequest("/stores/disable", {
    method: "POST",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || `HTTP error! status: ${response.status}`
    );
  }

  return response.json();
};

export const enableStore = async (): Promise<StoreOperationResponse> => {
  const response = await authenticatedRequest("/stores/enable", {
    method: "POST",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || `HTTP error! status: ${response.status}`
    );
  }

  return response.json();
};

export const getDeletionStatus = async (): Promise<DeletionStatusResponse> => {
  const response = await authenticatedRequest("/stores/deletion-status", {
    method: "GET",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || `HTTP error! status: ${response.status}`
    );
  }

  return response.json();
};

export const deleteStore = async (
  confirmDelete: string,
  deletionReason: string
): Promise<StoreOperationResponse> => {
  const response = await authenticatedRequest("/stores/delete", {
    method: "DELETE",
    body: JSON.stringify({
      confirm_delete: confirmDelete,
      deletion_reason: deletionReason,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || `HTTP error! status: ${response.status}`
    );
  }

  return response.json();
};

// Collections API
export interface Collection {
  id: string;
  vendor_id?: number;
  title: string;
  description?: string;
  banner_image?: string;
  product_ids?: number[];
  is_live: boolean;
  created_at: string;
  updated_at?: string;
  products_count: number;
  products?: CollectionProduct[];
}

export interface CollectionProduct {
  id: number;
  name: string;
  price: string;
  sale_price?: string;
  featured_image?: string;
  stock_status: string;
}

export interface CollectionListResponse {
  success: boolean;
  collections: Collection[];
  total: number;
}

export interface CollectionDetailResponse {
  success: boolean;
  collection: Collection;
}

export interface CollectionCreateRequest {
  title: string;
  description?: string;
  banner_image?: string;
  product_ids?: number[];
  is_live?: boolean;
}

export interface CollectionUpdateRequest {
  title?: string;
  description?: string;
  banner_image?: string;
  product_ids?: number[];
  is_live?: boolean;
}

export interface CollectionCreateResponse {
  success: boolean;
  message: string;
  collection: Collection;
}

export interface CollectionUpdateResponse {
  success: boolean;
  message: string;
  collection: Collection;
}

export interface CollectionDeleteResponse {
  success: boolean;
  message: string;
}

export interface ProductSelectionResponse {
  success: boolean;
  products: ProductSelection[];
  total: number;
  total_pages: number;
  current_page: number;
  per_page: number;
}

export interface ProductSelection {
  id: number;
  name: string;
  price: string;
  sale_price?: string;
  featured_image?: string;
  approval_status: string;
  stock_status: string;
}

// Get all collections
export const getCollections = async (): Promise<CollectionListResponse> => {
  const response = await authenticatedRequest("/collections", {
    method: "GET",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || `HTTP error! status: ${response.status}`
    );
  }

  return response.json();
};

// Get single collection
export const getCollection = async (
  collectionId: string
): Promise<CollectionDetailResponse> => {
  const response = await authenticatedRequest(`/collections/${collectionId}`, {
    method: "GET",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || `HTTP error! status: ${response.status}`
    );
  }

  return response.json();
};

// Create collection
export const createCollection = async (
  data: CollectionCreateRequest
): Promise<CollectionCreateResponse> => {
  const response = await authenticatedRequest("/collections", {
    method: "POST",
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || `HTTP error! status: ${response.status}`
    );
  }

  return response.json();
};

// Update collection
export const updateCollection = async (
  collectionId: string,
  data: CollectionUpdateRequest
): Promise<CollectionUpdateResponse> => {
  const response = await authenticatedRequest(`/collections/${collectionId}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || `HTTP error! status: ${response.status}`
    );
  }

  return response.json();
};

// Delete collection
export const deleteCollection = async (
  collectionId: string
): Promise<CollectionDeleteResponse> => {
  const response = await authenticatedRequest(`/collections/${collectionId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || `HTTP error! status: ${response.status}`
    );
  }

  return response.json();
};

// Get products for selection
export const getProductsForSelection = async (params?: {
  page?: number;
  per_page?: number;
  search?: string;
}): Promise<ProductSelectionResponse> => {
  const queryParams = new URLSearchParams();
  if (params?.page) queryParams.append("page", params.page.toString());
  if (params?.per_page)
    queryParams.append("per_page", params.per_page.toString());
  if (params?.search) queryParams.append("search", params.search);

  const queryString = queryParams.toString();
  const endpoint = `/collections/products/selection${
    queryString ? `?${queryString}` : ""
  }`;

  const response = await authenticatedRequest(endpoint, {
    method: "GET",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || `HTTP error! status: ${response.status}`
    );
  }

  return response.json();
};

// Collections Table View API
export interface CollectionTableProduct {
  id: number;
  custom_product_id?: string;
  name: string;
  image?: string;
  stock_status: "in_stock" | "low_stock" | "unavailable";
  stock_quantity: number | null;
  price: number;
  sale_price: number | null;
  last_edited: string | null;
  last_edited_formatted: string | null;
  last_edited_timestamp: number | null;
}

export interface CollectionTableItem {
  id: string;
  title: string;
  description?: string;
  banner_image?: string;
  is_live: boolean;
  created_at: string;
  updated_at: string;
  products_count: number;
  products: CollectionTableProduct[];
}

export interface CollectionTableViewResponse {
  success: boolean;
  collections: CollectionTableItem[];
  total: number;
}

// Get collections with products in table format
export const getCollectionsTableView =
  async (): Promise<CollectionTableViewResponse> => {
    const response = await authenticatedRequest("/collections/table-view", {
      method: "GET",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`
      );
    }

    return response.json();
  };

// Image Upload API
export interface UploadImageResponse {
  success: boolean;
  images: Array<{
    id: number;
    url: string;
    thumbnail?: string;
  }>;
}

// Helper function to convert base64 to File
export const base64ToFile = (
  base64String: string,
  filename: string = "image.jpg"
): File => {
  // Remove data URL prefix if present (e.g., "data:image/jpeg;base64,")
  const base64Data = base64String.includes(",")
    ? base64String.split(",")[1]
    : base64String;

  // Convert base64 to binary
  const byteCharacters = atob(base64Data);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: "image/jpeg" });

  return new File([blob], filename, { type: "image/jpeg" });
};

// Helper function to check if string is base64
export const isBase64 = (str: string): boolean => {
  if (str.startsWith("http://") || str.startsWith("https://")) {
    return false;
  }
  // Check if it's a data URL or base64 string
  return (
    str.includes("base64") ||
    /^[A-Za-z0-9+/=]+$/.test(str.replace(/^data:image\/[^;]+;base64,/, ""))
  );
};

// Upload images using the new media endpoint
export const uploadImages = async (
  files: File[]
): Promise<UploadImageResponse> => {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append("files[]", file);
  });

  // Backend confirmed upload endpoint path:
  // POST /wp-json/custom/v1/upload-images (public with CORS)
  const response = await authenticatedRequest("/upload-images", {
    method: "POST",
    body: formData,
    // Don't set Content-Type header - browser will set it with boundary for multipart/form-data
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || `HTTP error! status: ${response.status}`
    );
  }

  return response.json();
};
