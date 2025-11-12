import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/contexts/auth-context";
import { CurrencyProvider } from "@/contexts/currency-context";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Shop Soma Vendor Dashboard",
  description: "Vendor dashboard for Shop Soma",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <CurrencyProvider>{children}</CurrencyProvider>
        </AuthProvider>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
