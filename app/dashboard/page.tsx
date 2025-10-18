"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to products page by default
    router.push("/dashboard/products");
  }, [router]);

  return null;
}
