import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LogOut, Home, FolderKanban, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { useUnreadContactMessagesCount } from "@/hooks/useContactMessages";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, loading, signOut } = useAuth();
  const location = useLocation();
  const { data: unreadCount = 0 } = useUnreadContactMessagesCount();

  // Authentication is now handled by AuthGuard component

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="min-h-screen bg-background flex flex-col sm:flex-row">
      {/* Sidebar */}
      <div className="w-full sm:w-64 bg-card border-b sm:border-b-0 sm:border-r border-border">
        <div className="p-3 sm:p-6">
          <h1 className="text-xl font-bold text-primary">Admin Dashboard</h1>
        </div>
        <nav className="px-3 sm:px-4 py-2">
          <ul className="space-y-2">
            <li>
              <Link to="/dashboard">
                <Button variant="ghost" className="w-full justify-start">
                  <Home className="mr-2 h-4 w-4" />
                  Dashboard
                </Button>
              </Link>
            </li>
            <li>
              <Link to="/dashboard/projects">
                <Button variant="ghost" className="w-full justify-start">
                  <FolderKanban className="mr-2 h-4 w-4" />
                  Projects
                </Button>
              </Link>
            </li>
            <li>
              <Link to="/dashboard/contacts">
                <Button variant="ghost" className="w-full justify-start">
                  <Mail className="mr-2 h-4 w-4" />
                  Messages
                  {unreadCount > 0 && (
                    <Badge variant="destructive" className="ml-auto text-xs">
                      {unreadCount}
                    </Badge>
                  )}
                </Button>
              </Link>
            </li>
          </ul>
        </nav>
        <div className="hidden sm:block absolute bottom-4 left-4 right-4">
          <Button
            variant="outline"
            className="w-fit justify-start"
            onClick={handleSignOut}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto w-full">
        <header className="border-b border-border p-2 sm:p-4 bg-card">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium">
              {location.pathname === "/dashboard" && "Dashboard Overview"}
              {location.pathname === "/dashboard/projects" && "Manage Projects"}
              {location.pathname.includes("/dashboard/projects/new") &&
                "Add New Project"}
              {location.pathname.includes("/dashboard/projects/edit") &&
                "Edit Project"}
              {location.pathname === "/dashboard/contacts" &&
                "Contact Messages"}
            </h2>
            <div className="flex items-center">
              <span className="text-sm text-muted-foreground mr-2 hidden sm:inline">
                {user.email}
              </span>
              <Button
                variant="outline"
                size="sm"
                className="sm:hidden"
                onClick={handleSignOut}
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </header>
        <main className="p-3 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
