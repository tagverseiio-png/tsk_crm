"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Building2,
  Phone,
  FileText,
  CreditCard,
  Briefcase,
  CheckSquare,
  Calendar,
  Share2,
  Video,
  PieChart,
  Settings,
  UsersRound,
} from "lucide-react";

import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  {
    name: "CRM",
    items: [
      { name: "Leads", href: "/leads", icon: Users },
      { name: "Clients", href: "/clients", icon: Building2 },
      { name: "Follow-ups", href: "/follow-ups", icon: Phone },
    ],
  },
  {
    name: "Sales",
    items: [
      { name: "Quotations", href: "/quotations", icon: FileText },
      { name: "Invoices", href: "/invoices", icon: FileText },
      { name: "Payments", href: "/payments", icon: CreditCard },
    ],
  },
  {
    name: "Projects",
    items: [
      { name: "Projects", href: "/projects", icon: Briefcase },
      { name: "Tasks", href: "/tasks", icon: CheckSquare },
      { name: "Calendar", href: "/calendar", icon: Calendar },
    ],
  },
  {
    name: "Marketing",
    items: [
      { name: "Social Media", href: "/social", icon: Share2 },
      { name: "Content Calendar", href: "/content", icon: Calendar },
      { name: "Video Production", href: "/video", icon: Video },
    ],
  },
  {
    name: "Finance",
    items: [
      { name: "Revenue", href: "/revenue", icon: CreditCard },
      { name: "Expenses", href: "/expenses", icon: CreditCard },
      { name: "Profit & Loss", href: "/profit-loss", icon: PieChart },
    ],
  },
  { name: "Reports", href: "/reports", icon: FileText },
  { name: "Team", href: "/team", icon: UsersRound },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-64 flex-col border-r bg-muted/20">
      <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
        <Link href="/" className="flex items-center gap-3 font-bold text-xl">
          <div className="relative h-8 w-8 overflow-hidden rounded-full">
            <Image 
              src="/tsklogo.png" 
              alt="TSK Logo" 
              fill 
              className="object-cover"
              sizes="32px"
            />
          </div>
          <span>TSK CRM</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-4">
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
          {navigation.map((item, index) => {
            if (item.items) {
              return (
                <div key={index} className="pb-4">
                  <h4 className="mb-1 rounded-md px-2 py-1 text-xs font-semibold uppercase text-muted-foreground tracking-wider">
                    {item.name}
                  </h4>
                  <div className="grid gap-1">
                    {item.items.map((subItem) => {
                      const isActive = pathname === subItem.href || pathname.startsWith(subItem.href + '/');
                      return (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className={cn(
                            "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted",
                            isActive && "bg-muted text-primary font-medium"
                          )}
                        >
                          <subItem.icon className="h-4 w-4" />
                          {subItem.name}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            }

            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted mb-1",
                  isActive && "bg-muted text-primary font-medium"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="mt-auto border-t p-4">
        <div className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-muted cursor-pointer transition-colors">
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
            JD
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium">John Doe</span>
            <span className="text-xs text-muted-foreground">Admin</span>
          </div>
        </div>
      </div>
    </div>
  );
}
