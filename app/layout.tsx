import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/contexts/auth-context";
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
    <html
      lang="en"
      style={{ fontFamily: '"Lexend", sans-serif', fontWeight: 400 }}
    >
      <body style={{ fontFamily: '"Lexend", sans-serif', fontWeight: 400 }}>
        <AuthProvider>{children}</AuthProvider>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
