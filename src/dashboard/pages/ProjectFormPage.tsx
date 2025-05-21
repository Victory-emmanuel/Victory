import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useReadProjects, useCreateProject, useUpdateProject } from '@/hooks/useProjects';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { toast } from '@/components/ui/sonner';
import { 
  ArrowLeft, 
  Save, 
  Upload, 
  Loader2, 
  X, 
  AlertCircle,
  Plus,
  Trash2
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// Form validation schema
const projectSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  tech_stack: z.array(z.string()).optional(),
  image_url: z.string().optional(),
  project_url: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
});

type ProjectFormValues = z.infer<typeof projectSchema>;

export default function ProjectFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);
  
  // State for tech stack input
  const [techInput, setTechInput] = useState('');
  const [techStack, setTechStack] = useState<string[]>([]);
  
  // State for image upload
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  
  // Fetch project data if in edit mode
  const { data: projects, isLoading: isLoadingProject } = useReadProjects({
    enabled: isEditMode,
  });
  
  const project = projects?.find(p => p.id === id);
  
  // CRUD hooks
  const { createProject, isLoading: isCreating, error: createError } = useCreateProject();
  const { updateProject, isLoading: isUpdating, error: updateError } = useUpdateProject();
  
  // Form setup
  const { 
    register, 
    handleSubmit, 
    setValue, 
    formState: { errors },
    reset
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: '',
      description: '',
      tech_stack: [],
      image_url: '',
      project_url: '',
    }
  });
  
  // Set form values when project data is loaded
  useEffect(() => {
    if (project) {
      reset({
        title: project.title,
        description: project.description || '',
        tech_stack: project.tech_stack || [],
        image_url: project.image_url || '',
        project_url: project.project_url || '',
      });
      
      setTechStack(project.tech_stack || []);
      setImagePreview(project.image_url || null);
    }
  }, [project, reset]);
  
  // Handle tech stack input
  const handleAddTech = () => {
    if (techInput.trim() && !techStack.includes(techInput.trim())) {
      const newTechStack = [...techStack, techInput.trim()];
      setTechStack(newTechStack);
      setValue('tech_stack', newTechStack);
      setTechInput('');
    }
  };
  
  const handleRemoveTech = (tech: string) => {
    const newTechStack = techStack.filter(t => t !== tech);
    setTechStack(newTechStack);
    setValue('tech_stack', newTechStack);
  };
  
  // Handle image upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setImageFile(file);
    
    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };
  
  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setValue('image_url', '');
  };
  
  // Upload image to Supabase Storage
  const uploadImage = async (file: File): Promise<string> => {
    setIsUploading(true);
    
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      const filePath = `projects/${fileName}`;
      
      const { error: uploadError } = await supabase.storage
        .from('portfolio')
        .upload(filePath, file);
      
      if (uploadError) throw uploadError;
      
      const { data } = supabase.storage
        .from('portfolio')
        .getPublicUrl(filePath);
      
      return data.publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw new Error('Failed to upload image');
    } finally {
      setIsUploading(false);
    }
  };
  
  // Form submission
  const onSubmit = async (data: ProjectFormValues) => {
    try {
      // Upload image if there's a new file
      if (imageFile) {
        const imageUrl = await uploadImage(imageFile);
        data.image_url = imageUrl;
      }
      
      if (isEditMode && id) {
        await updateProject(id, data);
        toast.success('Project updated successfully');
      } else {
        await createProject(data);
        toast.success('Project created successfully');
      }
      
      navigate('/dashboard/projects');
    } catch (error) {
      toast.error(isEditMode ? 'Failed to update project' : 'Failed to create project');
      console.error('Form submission error:', error);
    }
  };
  
  if (isEditMode && isLoadingProject) {
    return (
      <div className="flex justify-center items-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" onClick={() => navigate('/dashboard/projects')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Projects
        </Button>
        <h1 className="text-3xl font-bold">
          {isEditMode ? 'Edit Project' : 'Add New Project'}
        </h1>
      </div>
      
      {(createError || updateError) && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {isEditMode ? 'Failed to update project.' : 'Failed to create project.'}
            Please try again.
          </AlertDescription>
        </Alert>
      )}
      
      <Card>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Project Title <span className="text-destructive">*</span></Label>
              <Input
                id="title"
                {...register('title')}
                placeholder="Enter project title"
              />
              {errors.title && (
                <p className="text-sm text-destructive">{errors.title.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                {...register('description')}
                placeholder="Enter project description"
                rows={5}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Tech Stack</Label>
              <div className="flex gap-2">
                <Input
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  placeholder="Add technology (e.g., React, Node.js)"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddTech();
                    }
                  }}
                />
                <Button type="button" onClick={handleAddTech}>
                  <Plus className="h-4 w-4" />
                  <span className="sr-only">Add</span>
                </Button>
              </div>
              
              {techStack.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {techStack.map((tech, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {tech}
                      <button
                        type="button"
                        onClick={() => handleRemoveTech(tech)}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <X className="h-3 w-3" />
                        <span className="sr-only">Remove {tech}</span>
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="project_url">Project URL</Label>
              <Input
                id="project_url"
                {...register('project_url')}
                placeholder="https://example.com"
              />
              {errors.project_url && (
                <p className="text-sm text-destructive">{errors.project_url.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label>Project Image</Label>
              <div className="flex items-center gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById('image-upload')?.click()}
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Image
                </Button>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                {imagePreview && (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="h-16 w-16 object-cover rounded-md"
                    />
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute -top-2 -right-2 bg-background rounded-full p-1 border border-border"
                    >
                      <X className="h-3 w-3" />
                      <span className="sr-only">Remove image</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex justify-end gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/dashboard/projects')}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isCreating || isUpdating || isUploading}
              >
                {(isCreating || isUpdating || isUploading) ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {isUploading ? 'Uploading...' : isEditMode ? 'Updating...' : 'Creating...'}
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    {isEditMode ? 'Update Project' : 'Create Project'}
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
