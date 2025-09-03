import { useReadProjects } from "@/hooks/useProjects";
import {
  useReadContactMessages,
  useUnreadContactMessagesCount,
} from "@/hooks/useContactMessages";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import {
  PlusCircle,
  FolderKanban,
  AlertCircle,
  Mail,
  MailOpen,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function DashboardHome() {
  const { data: projects, isLoading, error } = useReadProjects();
  const { data: recentMessages, isLoading: messagesLoading } =
    useReadContactMessages();
  const { data: unreadCount = 0 } = useUnreadContactMessagesCount();

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

      <div className="grid gap-3 xxs:gap-4 grid-cols-1 xs:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Total Projects
            </CardTitle>
            <CardDescription>
              Number of projects in your portfolio
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? (
                <div className="h-8 w-16 animate-pulse rounded bg-muted"></div>
              ) : (
                projects?.length || 0
              )}
            </div>
            <Link
              to="/dashboard/projects"
              className="text-sm text-primary hover:underline"
            >
              View all projects
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Contact Messages
            </CardTitle>
            <CardDescription>Messages from your contact form</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {messagesLoading ? (
                <div className="h-8 w-16 animate-pulse rounded bg-muted"></div>
              ) : (
                recentMessages?.length || 0
              )}
            </div>
            <div className="flex items-center justify-between">
              <Link
                to="/dashboard/contacts"
                className="text-sm text-primary hover:underline"
              >
                View all messages
              </Link>
              {unreadCount > 0 && (
                <Badge variant="destructive" className="text-xs">
                  {unreadCount} unread
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Quick Actions</CardTitle>
            <CardDescription>
              Common tasks you might want to perform
            </CardDescription>
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
            <Link to="/dashboard/contacts">
              <Button variant="outline" className="w-full justify-start">
                <Mail className="mr-2 h-4 w-4" />
                View Messages
                {unreadCount > 0 && (
                  <Badge variant="destructive" className="ml-auto text-xs">
                    {unreadCount}
                  </Badge>
                )}
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Recent Activity
            </CardTitle>
            <CardDescription>
              Your latest portfolio updates and messages
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading || messagesLoading ? (
              <div className="space-y-2">
                <div className="h-4 w-full animate-pulse rounded bg-muted"></div>
                <div className="h-4 w-3/4 animate-pulse rounded bg-muted"></div>
              </div>
            ) : (
              <div className="space-y-2">
                {/* Recent Messages */}
                {recentMessages &&
                  recentMessages.slice(0, 2).map((message) => (
                    <div
                      key={`message-${message.id}`}
                      className="text-sm flex items-center gap-2"
                    >
                      {message.is_read ? (
                        <MailOpen className="h-3 w-3 text-muted-foreground" />
                      ) : (
                        <Mail className="h-3 w-3 text-primary" />
                      )}
                      <div className="flex-1">
                        <span className="font-medium">
                          Message from {message.name}
                        </span>
                        <span className="text-muted-foreground block text-xs">
                          {new Date(message.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))}

                {/* Recent Projects */}
                {projects &&
                  projects
                    .slice(
                      0,
                      projects.length > 0 &&
                        recentMessages &&
                        recentMessages.length > 0
                        ? 1
                        : 3
                    )
                    .map((project) => (
                      <div
                        key={`project-${project.id}`}
                        className="text-sm flex items-center gap-2"
                      >
                        <FolderKanban className="h-3 w-3 text-muted-foreground" />
                        <div className="flex-1">
                          <span className="font-medium">{project.title}</span>
                          <span className="text-muted-foreground block text-xs">
                            {new Date(project.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    ))}

                {(!projects || projects.length === 0) &&
                  (!recentMessages || recentMessages.length === 0) && (
                    <p className="text-sm text-muted-foreground">
                      No recent activity
                    </p>
                  )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 sm:mt-8">
        <h2 className="text-lg xxs:text-xl font-semibold mb-3 sm:mb-4">
          Recent Projects
        </h2>
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-20 animate-pulse rounded bg-muted"
              ></div>
            ))}
          </div>
        ) : projects && projects.length > 0 ? (
          <div className="space-y-4">
            {projects.slice(0, 5).map((project) => (
              <Link
                key={project.id}
                to={`/dashboard/projects/edit/${project.id}`}
              >
                <Card className="hover:bg-muted/50 transition-colors">
                  <CardContent className="p-3 xxs:p-4 flex flex-col xxs:flex-row gap-2 xxs:gap-0 xxs:justify-between items-start xxs:items-center">
                    <div>
                      <h3 className="font-medium">{project.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-1">
                        {project.description || "No description"}
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
