"use client";

import { ReactNode, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Menu,
  LogOut,
  LayoutDashboard,
  Package,
  Bot,
  MessageSquare,
  BarChart3,
  Settings,
  Plug,
  X,
} from "lucide-react";

interface DashboardLayoutProps {
  children: ReactNode;
}

const mainLinks = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
];

const managementLinks = [
  { name: "Products", href: "/dashboard/products", icon: Package },
  { name: "Persona Setup", href: "/dashboard/persona", icon: Bot },
  { name: "Channels", href: "/dashboard/channels", icon: Plug },
  { name: "Conversations", href: "/dashboard/conversations", icon: MessageSquare },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
];

const settingsLinks = [
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const handleLogout = async () => {
    await signOut(auth);
  };

  const renderLinks = (links: typeof mainLinks) =>
    links.map(({ name, href, icon: Icon }) => {
      const isActive = pathname === href;
      return (
        <Link
          key={name}
          href={href}
          className={cn(
            "flex items-center gap-3 rounded-md px-3 py-2 transition-colors font-medium",
            isActive
              ? "bg-indigo-100 text-indigo-600"
              : "text-gray-700 hover:bg-gray-100"
          )}
        >
          <Icon size={18} />
          {name}
        </Link>
      );
    });

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white rounded-r-3xl shadow-lg transform transition-transform duration-300 ease-in-out 
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0 lg:static lg:inset-auto`}
      >
        <div className="flex items-center justify-between px-4 py-4  ">
          <h1 className="text-xl font-bold text-indigo-700">DEALIE</h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div>
          <nav className="flex flex-col p-4 space-y-6  font-semibold overflow-y-auto">
            <div>
              <p className="text-xs text-gray-500 uppercase mb-2 tracking-wide">
                Overview
              </p>
              <div className="space-y-1">{renderLinks(mainLinks)}</div>
            </div>

            <div>
              <p className="text-xs text-gray-500 uppercase mb-2 tracking-wide">
                Management
              </p>
              <div className="space-y-1">{renderLinks(managementLinks)}</div>
            </div>
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="p-4 border-t">
          <div className="space-y-1">
            <p className="text-xs text-gray-500 uppercase mb-2 tracking-wide">
              Settings
            </p>
            <div className="space-y-1">{renderLinks(settingsLinks)}</div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="mt-2 w-full flex items-center justify-start gap-3 text-gray-700 hover:bg-gray-100"
            >
              <LogOut size={16} /> Logout
            </Button>
          </div>
        </div>
      </aside>

      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
        ></div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col md:ml-2 h-full overflow-hidden">
        {/* Navbar */}
        <header className="flex justify-between items-center bg-gray-50 px-6 py-3 border-b">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu />
            </Button>
            
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-700">{user?.email}</span>
          </div>
        </header>

        {/* Scrollable content */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}

