// Authentication utilities for managing tokens and user data
import Cookies from "js-cookie";

export interface User {
  user_id: number;
  username: string;
  email: string;
  role: string;
  display_name: string;
  user_nicename: string;
  store_name: string;
  store_data: {
    store_name: string;
    owner_name: string;
    email: string;
    phone: string;
    address: any[];
    location: string;
    banner: string;
    gravatar: number;
    show_email: string;
    enabled: string;
  };
  kyc_status: string;
  can_sell: boolean;
}

export interface LoginResponse {
  success: boolean;
  token: string;
  refresh_token: string;
  refresh_token_expiry: number;
  user_id: number;
  username: string;
  email: string;
  role: string;
  display_name: string;
  user_nicename: string;
  store_name: string;
  store_data: User["store_data"];
  kyc_status: string;
  can_sell: boolean;
}

export interface RefreshResponse {
  success: boolean;
  token: string;
  access_token: string;
  token_type: string;
  expires_in: number;
  expires_at: number;
  user_id: number;
  user_role: string;
}

// Token management
export const setTokens = (
  token: string,
  refreshToken: string,
  refreshTokenExpirySeconds?: number
) => {
  if (typeof window !== "undefined") {
    // Persist in cookies for middleware/SSR access
    // Access token: session cookie (expires when browser closes) or short expiry
    Cookies.set("access_token", token, { sameSite: "lax" });

    // Refresh token: persistent cookie with expiry from server if provided
    if (refreshTokenExpirySeconds) {
      const expires = new Date(refreshTokenExpirySeconds * 1000);
      Cookies.set("refresh_token", refreshToken, { expires, sameSite: "lax" });
    } else {
      Cookies.set("refresh_token", refreshToken, { sameSite: "lax" });
    }
  }
};

export const getAccessToken = (): string | null => {
  if (typeof window !== "undefined") {
    // Prefer cookie
    const cookieToken = Cookies.get("access_token");
    if (cookieToken) return cookieToken;
    return null;
  }
  return null;
};

export const getRefreshToken = (): string | null => {
  if (typeof window !== "undefined") {
    const cookieToken = Cookies.get("refresh_token");
    if (cookieToken) return cookieToken;
    return null;
  }
  return null;
};

export const clearTokens = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("user_data");
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
  }
};

// User data management
export const setUserData = (userData: User) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("user_data", JSON.stringify(userData));
  }
};

export const getUserData = (): User | null => {
  if (typeof window !== "undefined") {
    const userData = localStorage.getItem("user_data");
    return userData ? JSON.parse(userData) : null;
  }
  return null;
};

// API calls
export const loginUser = async (
  username: string,
  password: string
): Promise<LoginResponse> => {
  const response = await fetch("/api/wp/custom/v1/login/vendor", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  return response.json();
};

export const refreshAccessToken = async (): Promise<RefreshResponse> => {
  const refreshToken = getRefreshToken();

  if (!refreshToken) {
    throw new Error("No refresh token available");
  }

  const response = await fetch("/api/wp/custom/v1/token/refresh", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      refresh_token: refreshToken,
    }),
  });

  if (!response.ok) {
    throw new Error("Token refresh failed");
  }

  return response.json();
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  const token = getAccessToken();
  return !!token;
};

// Logout function
export const logout = () => {
  clearTokens();
  if (typeof window !== "undefined") {
    window.location.href = "/auth/login";
  }
};
