import { useReadProjects } from '@/hooks/useProjects';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { PlusCircle, FolderKanban, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function DashboardHome() {
  const { data: projects, isLoading, error } = useReadProjects();

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col xxs:flex-row justify-between items-start xxs:items-center gap-3 xxs:gap-0">
        <h1 className="text-2xl xxs:text-3xl font-bold">Dashboard</h1>
        <Link to="/dashboard/projects/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Project
          </Button>
        </Link>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Failed to load dashboard data. Please try refreshing the page.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid gap-3 xxs:gap-4 grid-cols-1 xs:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            <CardDescription>Number of projects in your portfolio</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? (
                <div className="h-8 w-16 animate-pulse rounded bg-muted"></div>
              ) : (
                projects?.length || 0
              )}
            </div>
            <Link to="/dashboard/projects" className="text-sm text-primary hover:underline">
              View all projects
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Quick Actions</CardTitle>
            <CardDescription>Common tasks you might want to perform</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link to="/dashboard/projects">
              <Button variant="outline" className="w-full justify-start">
                <FolderKanban className="mr-2 h-4 w-4" />
                Manage Projects
              </Button>
            </Link>
            <Link to="/dashboard/projects/new">
              <Button variant="outline" className="w-full justify-start">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add New Project
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
            <CardDescription>Your latest portfolio updates</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-2">
                <div className="h-4 w-full animate-pulse rounded bg-muted"></div>
                <div className="h-4 w-3/4 animate-pulse rounded bg-muted"></div>
              </div>
            ) : projects && projects.length > 0 ? (
              <div className="space-y-2">
                {projects.slice(0, 3).map((project) => (
                  <div key={project.id} className="text-sm">
                    <span className="font-medium">{project.title}</span>
                    <span className="text-muted-foreground block text-xs">
                      {new Date(project.created_at).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No recent activity</p>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 sm:mt-8">
        <h2 className="text-lg xxs:text-xl font-semibold mb-3 sm:mb-4">Recent Projects</h2>
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-20 animate-pulse rounded bg-muted"></div>
            ))}
          </div>
        ) : projects && projects.length > 0 ? (
          <div className="space-y-4">
            {projects.slice(0, 5).map((project) => (
              <Link key={project.id} to={`/dashboard/projects/edit/${project.id}`}>
                <Card className="hover:bg-muted/50 transition-colors">
                  <CardContent className="p-3 xxs:p-4 flex flex-col xxs:flex-row gap-2 xxs:gap-0 xxs:justify-between items-start xxs:items-center">
                    <div>
                      <h3 className="font-medium">{project.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-1">
                        {project.description || 'No description'}
                      </p>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(project.created_at).toLocaleDateString()}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-4 sm:p-6 text-center">
              <p className="text-muted-foreground mb-4">No projects found</p>
              <Link to="/dashboard/projects/new">
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Your First Project
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
