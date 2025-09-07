import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useReadProjects, useDeleteProject } from '@/hooks/useProjects';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  PlusCircle,
  Search,
  Pencil,
  Trash2,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/sonner';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function ProjectListPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);

  const {
    data: projects,
    isLoading,
    error,
    refetch
  } = useReadProjects({ filter: searchTerm });

  const {
    deleteProject,
    isLoading: isDeleting,
    error: deleteError
  } = useDeleteProject();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleDelete = async () => {
    if (!projectToDelete) return;

    try {
      await deleteProject(projectToDelete);
      toast.success('Project deleted successfully');
      refetch();
    } catch (err) {
      toast.error('Failed to delete project');
      console.error('Delete error:', err);
    } finally {
      setProjectToDelete(null);
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col xxs:flex-row justify-between items-start xxs:items-center gap-3 xxs:gap-0">
        <h1 className="text-2xl xxs:text-3xl font-bold">Projects</h1>
        <Link to="/dashboard/projects/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Project
          </Button>
        </Link>
      </div>

      {(error || deleteError) && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error ? 'Failed to load projects.' : 'Failed to delete project.'}
            Please try again.
          </AlertDescription>
        </Alert>
      )}

      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search projects..."
          value={searchTerm}
          onChange={handleSearch}
          className="pl-10"
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : projects && projects.length > 0 ? (
        <Card>
          <CardContent className="p-0 overflow-x-auto">
            <Table className="min-w-[640px]">
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Tags</TableHead>
                  <TableHead>Tech Stack</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        {project.title}
                        {project.featured && (
                          <Badge variant="default" className="text-xs">
                            Featured
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {project.tags?.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        )) || <span className="text-muted-foreground text-xs">No tags</span>}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {project.tech_stack?.map((tech, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        )) || <span className="text-muted-foreground text-xs">No tech stack</span>}
                      </div>
                    </TableCell>
                    <TableCell>
                      {new Date(project.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Link to={`/dashboard/projects/edit/${project.id}`}>
                          <Button variant="outline" size="sm">
                            <Pencil className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                        </Link>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setProjectToDelete(project.id)}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the
                                project "{project.title}" and remove it from your portfolio.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel onClick={() => setProjectToDelete(null)}>
                                Cancel
                              </AlertDialogCancel>
                              <AlertDialogAction
                                onClick={handleDelete}
                                disabled={isDeleting}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                {isDeleting ? (
                                  <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Deleting...
                                  </>
                                ) : (
                                  'Delete'
                                )}
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
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
  );
}
