"use client";

import * as React from "react";
import {
  Home,
  FileText,
  Settings,
  HelpCircle,
  LogOut,
  Download,
  MessageCircle,
  PlayCircle,
  Apple,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

const menuItems = [
  { id: "menu_01", title: "Dashboard", icon: Home, href: "#" },
  { id: "menu_02", title: "Tracking", icon: FileText, href: "#" },
  {
    id: "menu_03",
    title: "Reports",
    icon: FileText,
    href: "#",
    subMenu: [
      {
        title: "Job",
        items: [
          {
            name: "Job Summary",
            href: "/jobsummary",
          },
          {
            name: "Job Details Summary",
            href: "/jobdetailssummary",
          },
        ],
      },
    ],
  },
  { id: "menu_04", title: "Settings", icon: Settings, href: "#" },
];

export function AppSidebar({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [openSubmenu, setOpenSubmenu] = React.useState<string | null>(null);
  const submenuRef = React.useRef<HTMLDivElement>(null);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (id: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setOpenSubmenu(id);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpenSubmenu(null);
    }, 300); // Delay before closing submenu
  };

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        submenuRef.current &&
        !submenuRef.current.contains(event.target as Node)
      ) {
        setOpenSubmenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <SidebarProvider>
      <Sidebar className=" bg-[#f2f2f2] text-gray-700">
        <SidebarHeader className="p-2">
          <Avatar className="w-16 h-16 mx-auto">
            <AvatarImage src="/placeholder.svg?height=64&width=64" alt="Logo" />
            <AvatarFallback>Logo</AvatarFallback>
          </Avatar>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {menuItems.map((item, index) => (
              <div key={index}>
                <SidebarMenuItem
                  key={index}
                  onMouseEnter={() => handleMouseEnter(item.id)}
                  onMouseLeave={handleMouseLeave}
                  className="relative"
                >
                  <SidebarMenuButton
                    asChild
                    className="flex flex-col items-center justify-center h-20"
                  >
                    <Button variant="ghost" className=" h-full">
                      <item.icon className="h-6 w-6 mb-1" />
                      <span className="text-xs">{item.title}</span>
                    </Button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                {item.subMenu && openSubmenu === item.id && (
                  <div
                    ref={submenuRef}
                    className="absolute left-full top-52 ml-2 w-64 bg-white shadow-lg rounded-md overflow-hidden z-50"
                    onMouseEnter={() => handleMouseEnter(item.id)}
                    onMouseLeave={handleMouseLeave}
                  >
                    {item.subMenu.map((group, index) => (
                      <div
                        key={index}
                        className="p-2 bg-[#DB4848] flex flex-col my-2"
                      >
                        {/* <Button
                          variant="ghost"
                          className="w-full justify-between font-semibold text-sm"
                        > */}
                        {group.title}
                        {/* </Button> */}
                        {group.items.map((subItem, subIndex) => (
                          <Link
                            key={subIndex}
                            href={subItem.href}
                            // variant="ghost"
                            className=" hover:bg-zinc-900 text-white transition duration-150 ease-out hover:ease-in rounded p-2 text-sm pl-4"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="mt-auto">
          <div className="flex flex-col items-center gap-2 p-2">
            {[
              { icon: HelpCircle, title: "Help" },
              { icon: LogOut, title: "Sign out" },
              { icon: Download, title: "Cloud Download" },
              { icon: MessageCircle, title: "Support" },
            ].map((item, index) => (
              <Button
                key={index}
                variant="ghost"
                size="icon"
                title={item.title}
              >
                <item.icon className="h-6 w-6" />
              </Button>
            ))}
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" title="Share Android App">
                <PlayCircle className="h-6 w-6" />
              </Button>
              <Button variant="ghost" size="icon" title="Share iOS App">
                <Apple className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </SidebarFooter>
      </Sidebar>
      {children}
    </SidebarProvider>
  );
}
