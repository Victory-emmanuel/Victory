import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { LogOut, Home, FolderKanban } from 'lucide-react';
import { Link } from 'react-router-dom';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, loading, signOut } = useAuth();
  const location = useLocation();

  // Authentication is now handled by AuthGuard component

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <div className="w-64 bg-card border-r border-border">
        <div className="p-6">
          <h1 className="text-xl font-bold text-primary">Admin Dashboard</h1>
        </div>
        <nav className="px-4 py-2">
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
          </ul>
        </nav>
        <div className="absolute bottom-4 left-4 right-4">
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
      <div className="flex-1 overflow-auto">
        <header className="border-b border-border p-4 bg-card">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium">
              {location.pathname === '/dashboard' && 'Dashboard Overview'}
              {location.pathname === '/dashboard/projects' && 'Manage Projects'}
              {location.pathname.includes('/dashboard/projects/new') && 'Add New Project'}
              {location.pathname.includes('/dashboard/projects/edit') && 'Edit Project'}
            </h2>
            <div className="flex items-center">
              <span className="text-sm text-muted-foreground mr-2">
                {user.email}
              </span>
            </div>
          </div>
        </header>
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
