"use client";

import {
  Truck,
  Package,
  Shirt,
  Store,
  TrendingUp,
  DollarSign,
  Settings,
  MessageCircle,
  HelpCircle,
  Bell,
  Users,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Logo from "@/assets/logo";
import PanelIcon from "@/assets/panel-icon";
import UserGroupIcon from "@/assets/user-group-icon";
import ChevronRight from "@/assets/chevron-right";
import ArrowRight from "@/assets/arrow-right";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export function VendorSidebar({
  activeSection,
  setActiveSection,
}: SidebarProps) {
  const { user } = useAuth();
  const router = useRouter();
  const navigationItems = [
    {
      id: "order management",
      label: "Orders",
      icon: Truck,
      route: "/dashboard/orders",
    },
    {
      id: "product management",
      label: "Products",
      icon: Package,
      route: "/dashboard/products",
    },
    {
      id: "collections",
      label: "Collections",
      icon: Shirt,
      route: "/dashboard/collections",
    },
    {
      id: "marketing",
      label: "Marketing",
      icon: Store,
      route: "/dashboard/marketing",
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: TrendingUp,
      route: "/dashboard/analytics",
    },
    {
      id: "earnings",
      label: "Earnings & Payout",
      icon: DollarSign,
      route: "/dashboard/earnings",
    },
  ];

  const settingsItems = [
    {
      id: "storefront-settings",
      label: "Storefront Settings",
      icon: Settings,
      route: "/dashboard/storefront",
    },
    {
      id: "messaging",
      label: "Messaging",
      icon: MessageCircle,
      route: "/dashboard/messaging",
    },
    {
      id: "help",
      label: "Help & Support",
      icon: HelpCircle,
      route: "/dashboard/help",
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: Bell,
      route: "/dashboard/notifications",
    },
  ];

  return (
    <Sidebar className="border border-[#DCDCDC] rounded-3xl m-4 overflow-hidden">
      <div className="flex flex-col justify-between h-full rounded-3xl overflow-x-hidden overflow-y-auto">
        <div className="flex flex-col gap-10">
          <SidebarHeader className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <Logo />

              <SidebarTrigger>
                <PanelIcon />
              </SidebarTrigger>
            </div>

            <div className="bg-[#FAFAFA] border border-[#DCDCDC] p-3 shadow-sm rounded-[0.75rem] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-[1.75rem] h-[1.75rem] rounded-[0.3125rem] bg-[#EFEFEF] border border-[#DCDCDC] flex items-center justify-center p-[0.40625rem]">
                  <UserGroupIcon />
                </div>
                <div className="flex flex-col items-start">
                  <h3 className="text-[#3D3D3D] text-xs">
                    {user?.store_name || "Loading..."}
                  </h3>
                  <p className="text-[#3D3D3D]/60 text-[0.625rem]">
                    {user?.email || "Loading..."}
                  </p>
                </div>
              </div>
              <div className="h-[2.1875rem] py-2 px-1 flex items-center justify-center bg-[#EFEFEF] border border-[#DCDCDC] rounded-[1.5rem] cursor-pointer">
                <ChevronRight />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <div className="w-[0.375rem] h-[0.375rem] rounded-full bg-[#FAC215]"></div>
                <p className="text-[#292929] text-[0.625rem]">
                  Pending Orders: 26
                </p>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-[0.375rem] h-[0.375rem] rounded-full bg-[#4ADE80]"></div>
                <p className="text-[#292929] text-[0.625rem]">
                  Completed Orders: 23
                </p>
              </div>
            </div>
          </SidebarHeader>

          <SidebarContent className="px-2">
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navigationItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeSection === item.id;

                    return (
                      <SidebarMenuItem key={item.id}>
                        <SidebarMenuButton
                          onClick={() => router.push(item.route)}
                          isActive={isActive}
                          className={`w-full flex items-center gap-2 rounded-lg h-[2.5rem] transition-colors text-xs text-[#292929] tracking-[-0.0225rem] ${
                            isActive
                              ? "bg-[#FAFAFA] shadow-sm border border-[#DCDCDC]"
                              : "hover:bg-[#FAFAFA] hover:border hover:border-[#DCDCDC]"
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          <span>{item.label}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <button className="py-3 cursor-pointer px-5 flex items-center rounded-[0.75rem] w-fit justify-center bg-base-green gap-1 mx-2 text-[#FAFAFA] text-xs tracking-[-0.0075rem]">
            <span>View Store</span>
            <ArrowRight />
          </button>
        </div>

        <SidebarFooter className="px-2">
          {/* Settings Navigation */}
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {settingsItems.map((item) => {
                  const Icon = item.icon;

                  return (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton
                        onClick={() => router.push(item.route)}
                        className={`w-full flex items-center gap-2 rounded-lg h-[2.5rem] text-xs text-[#292929]/60 tracking-[-0.0225rem] transition-colors ${
                          activeSection === item.id
                            ? "bg-[#FAFAFA] shadow-sm border border-[#DCDCDC] text-[#292929]"
                            : "hover:bg-[#FAFAFA] hover:border hover:border-[#DCDCDC]"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarFooter>
      </div>
    </Sidebar>
  );
}
