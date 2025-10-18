"use client";

import { OrdersSection } from "@/components/sections/orders-section";
import { ProductsSection } from "@/components/sections/products-section";
import { CollectionsSection } from "@/components/sections/collections-section";
import { MarketingSection } from "@/components/sections/marketing-section";
import { AnalyticsSection } from "@/components/sections/analytics-section";
import { EarningsSection } from "@/components/sections/earnings-section";
import { StorefrontSettingsSection } from "@/components/sections/storefront-settings-section";
import { MessagingSection } from "@/components/sections/messaging-section";
import { HelpSection } from "@/components/sections/help-section";
import { NotificationsSection } from "@/components/sections/notifications-section";

interface DashboardContentProps {
  activeSection: string;
}

export function DashboardContent({ activeSection }: DashboardContentProps) {
  switch (activeSection) {
    case "order management":
      return <OrdersSection />;
    case "products":
      return <ProductsSection />;
    case "collections":
      return <CollectionsSection />;
    case "marketing":
      return <MarketingSection />;
    case "analytics":
      return <AnalyticsSection />;
    case "earnings":
      return <EarningsSection />;
    case "storefront-settings":
      return <StorefrontSettingsSection />;
    case "messaging":
      return <MessagingSection />;
    case "help":
      return <HelpSection />;
    case "notifications":
      return <NotificationsSection />;
    default:
      return <ProductsSection />;
  }
}
