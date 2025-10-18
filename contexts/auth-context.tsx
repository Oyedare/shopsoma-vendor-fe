"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  User,
  getUserData,
  setUserData,
  setTokens,
  getAccessToken,
  getRefreshToken,
  refreshAccessToken,
  logout as authLogout,
} from "@/lib/auth";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const userData = getUserData();
    const token = getAccessToken();

    if (userData && token) {
      setUser(userData);
    }
    setIsLoading(false);
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const { loginUser } = await import("@/lib/auth");
      const response = await loginUser(username, password);

      // Store tokens
      setTokens(
        response.token,
        response.refresh_token,
        response.refresh_token_expiry
      );

      // Store user data
      const userData: User = {
        user_id: response.user_id,
        username: response.username,
        email: response.email,
        role: response.role,
        display_name: response.display_name,
        user_nicename: response.user_nicename,
        store_name: response.store_name,
        store_data: response.store_data,
        kyc_status: response.kyc_status,
        can_sell: response.can_sell,
      };

      setUserData(userData);
      setUser(userData);
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    authLogout();
    setUser(null);
  };

  const isAuthenticated = !!user && !!getAccessToken();

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
