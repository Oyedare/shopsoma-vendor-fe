"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Currency = "USD" | "NGN" | "EUR" | "GBP";

interface CurrencySymbols {
  [key: string]: string;
}

const currencySymbols: CurrencySymbols = {
  USD: "$",
  NGN: "₦",
  EUR: "€",
  GBP: "£",
};

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  getCurrencySymbol: () => string;
  formatAmount: (amount: number, currency?: string) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(
  undefined
);

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
};

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currency, setCurrencyState] = useState<Currency>("USD");

  // Load currency from localStorage on mount
  useEffect(() => {
    const savedCurrency = localStorage.getItem("selectedCurrency") as Currency;
    if (savedCurrency && ["USD", "NGN", "EUR", "GBP"].includes(savedCurrency)) {
      setCurrencyState(savedCurrency);
    }
  }, []);

  const setCurrency = (newCurrency: Currency) => {
    setCurrencyState(newCurrency);
    localStorage.setItem("selectedCurrency", newCurrency);
  };

  const getCurrencySymbol = (currencyCode?: string) => {
    const code = currencyCode || currency;
    return currencySymbols[code.toUpperCase()] || code;
  };

  const formatAmount = (amount: number, currencyCode?: string) => {
    const code = currencyCode || currency;
    const symbol = getCurrencySymbol(code);

    // Convert from cents/pennies to actual amount
    const actualAmount = amount / 100;

    // Format with appropriate decimal places
    const formatted = actualAmount.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    return `${symbol}${formatted}`;
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        getCurrencySymbol,
        formatAmount,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

