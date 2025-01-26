import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Package,
  Inbox,
  MessageSquare,
  ClipboardList,
  BoxesIcon,
  Menu,
  X,
} from "lucide-react";

const sidebarLinks = [
  { path: "/", icon: LayoutDashboard, label: "Dashboard" },
  { path: "/products", icon: Package, label: "Products" },
  { path: "/inbox", icon: Inbox, label: "Inbox" },
  { path: "/chat", icon: MessageSquare, label: "Chat" },
  { path: "/orders", icon: ClipboardList, label: "Orders" },
  { path: "/stock", icon: BoxesIcon, label: "Stock" },
];

function Layout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Close sidebar when clicking outside on mobile
  const handleContentClick = () => {
    if (isSidebarOpen) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? <X /> : <Menu />}
      </Button>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-40 w-64 h-screen transition-transform bg-card border-r",
          !isSidebarOpen && "-translate-x-full",
          "lg:translate-x-0" // Always show on desktop
        )}
      >
        <div className="h-full px-3 py-4 overflow-y-auto">
          <div className="mb-10 px-2 py-3">
            <h1 className="text-2xl font-bold">Admin Panel</h1>
          </div>
          <ul className="space-y-2 font-medium">
            {sidebarLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path;

              return (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={cn(
                      "flex items-center p-2 rounded-lg hover:bg-accent group",
                      isActive && "bg-accent"
                    )}
                    onClick={() => setIsSidebarOpen(false)} // Close sidebar on link click (mobile)
                  >
                    <Icon className="w-5 h-5" />
                    <span className="ml-3">{link.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={handleContentClick}
        />
      )}

      {/* Main content */}
      <main
        className={cn(
          "transition-all duration-200 ease-in-out",
          "lg:ml-64" // Always offset on desktop
        )}
        onClick={handleContentClick}
      >
        <div className="p-4 sm:p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}

export default Layout;
