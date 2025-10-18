"use client";

import { useEffect, useState } from "react";
import { VendorSidebar } from "@/components/sidebar";
import { Navbar } from "@/components/navbar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { ProtectedRoute } from "@/components/protected-route";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState("products");

  useEffect(() => {
    if (!pathname) return;
    if (pathname.includes("/orders")) setActiveSection("order management");
    else if (pathname.includes("/products"))
      setActiveSection("product management");
    else if (pathname.includes("/collections")) setActiveSection("collections");
    else if (pathname.includes("/marketing")) setActiveSection("marketing");
    else if (pathname.includes("/analytics")) setActiveSection("analytics");
    else if (pathname.includes("/earnings")) setActiveSection("earnings");
    else if (pathname.includes("/storefront"))
      setActiveSection("storefront-settings");
    else if (pathname.includes("/messaging")) setActiveSection("messaging");
    else if (pathname.includes("/help")) setActiveSection("help");
    else if (pathname.includes("/notifications"))
      setActiveSection("notifications");
    else setActiveSection("product management");
  }, [pathname]);

  return (
    <ProtectedRoute>
      <SidebarProvider>
        <div className="flex w-full">
          <VendorSidebar
            activeSection={activeSection}
            setActiveSection={setActiveSection}
          />

          <SidebarInset className="flex-1 flex flex-col gap-[3rem] py-6 px-10">
            {/* Navbar */}
            <Navbar activeSection={activeSection} />

            {/* Content */}
            <main className="flex-1 overflow-auto">{children}</main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </ProtectedRoute>
  );
}
