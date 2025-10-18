"use client";

import { DashboardContent } from "@/components/dashboard-content";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function NotificationsPage() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState("notifications");

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

  return <DashboardContent activeSection={activeSection} />;
}
