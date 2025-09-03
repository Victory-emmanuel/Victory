import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  useReadProjects,
  useCreateProject,
  useUpdateProject,
} from "@/hooks/useProjects";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toast } from "@/components/ui/sonner";
import {
  ArrowLeft,
  Save,
  Upload,
  Loader2,
  X,
  AlertCircle,
  Plus,
  Trash2,
  Tag,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

// Form validation schema
const projectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  tech_stack: z.array(z.string()).optional(),
  image_url: z.string().optional(),
  project_url: z
    .string()
    .url("Please enter a valid URL")
    .optional()
    .or(z.literal("")),
  github_repo_url: z
    .string()
    .url("Please enter a valid URL")
    .optional()
    .or(z.literal("")),
  tags: z.array(z.string()).optional(),
  featured: z.boolean().optional(),
});

type ProjectFormValues = z.infer<typeof projectSchema>;

export default function ProjectFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  // State for tech stack input
  const [techInput, setTechInput] = useState("");
  const [techStack, setTechStack] = useState<string[]>([]);

  // State for tags
  const [tags, setTags] = useState<string[]>([]);
  const availableTags = ["Featured", "Frontend", "Fullstack"];

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Fetch project data if in edit mode
  const { data: projects, isLoading: isLoadingProject } = useReadProjects({
    enabled: isEditMode,
  });

  const project = projects?.find((p) => p.id === id);

  // CRUD hooks
  const {
    createProject,
    isLoading: isCreating,
    error: createError,
  } = useCreateProject();
  const {
    updateProject,
    isLoading: isUpdating,
    error: updateError,
  } = useUpdateProject();

  // Form setup
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: "",
      description: "",
      tech_stack: [],
      image_url: "",
      project_url: "",
      tags: [],
      featured: false,
    },
  });

  // Set form values when project data is loaded
  useEffect(() => {
    if (project) {
      reset({
        title: project.title,
        description: project.description || "",
        tech_stack: project.tech_stack || [],
        image_url: project.image_url || "",
        project_url: project.project_url || "",
        tags: project.tags || [],
        featured: project.featured || false,
      });

      setTechStack(project.tech_stack || []);
      setTags(project.tags || []);
      setImagePreview(project.image_url || null);
    }
  }, [project, reset]);

  // Handle tech stack input
  const handleAddTech = () => {
    if (techInput.trim() && !techStack.includes(techInput.trim())) {
      const newTechStack = [...techStack, techInput.trim()];
      setTechStack(newTechStack);
      setValue("tech_stack", newTechStack);
      setTechInput("");
    }
  };

  const handleRemoveTech = (tech: string) => {
    const newTechStack = techStack.filter((t) => t !== tech);
    setTechStack(newTechStack);
    setValue("tech_stack", newTechStack);
  };

  // Handle tags selection
  const handleTagChange = (tag: string) => {
    const newTags = tags.includes(tag)
      ? tags.filter((t) => t !== tag)
      : [...tags, tag];

    setTags(newTags);
    setValue("tags", newTags);

    // If the tag is 'Featured', also update the featured field
    if (tag === "Featured") {
      setValue("featured", !tags.includes("Featured"));
    }
  };

  // Handle image upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setValue("image_url", url);
    setImagePreview(url);
  };

  // Remove uploadImage function

  // Update form submission
  const onSubmit = async (data: ProjectFormValues) => {
    try {
      if (isEditMode && id) {
        await updateProject(id, data);
        toast.success("Project updated successfully");
      } else {
        await createProject(data);
        toast.success("Project created successfully");
      }

      navigate("/dashboard/projects");
    } catch (error) {
      toast.error(
        isEditMode ? "Failed to update project" : "Failed to create project"
      );
      console.error("Form submission error:", error);
    }
  };

  // Remove upload-related UI state

  if (isEditMode && isLoadingProject) {
    return (
      <div className="flex justify-center items-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col xxs:flex-row items-start xxs:items-center gap-3 xxs:gap-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate("/dashboard/projects")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Projects
        </Button>
        <h1 className="text-2xl xxs:text-3xl font-bold">
          {isEditMode ? "Edit Project" : "Add New Project"}
        </h1>
      </div>

      {(createError || updateError) && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {isEditMode
              ? "Failed to update project."
              : "Failed to create project."}
            Please try again.
          </AlertDescription>
        </Alert>
      )}

      <Card>
        <CardContent className="p-4 sm:p-6">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 sm:space-y-6"
          >
            <div className="space-y-2">
              <Label htmlFor="title">
                Project Title <span className="text-destructive">*</span>
              </Label>
              <Input
                id="title"
                {...register("title")}
                placeholder="Enter project title"
              />
              {errors.title && (
                <p className="text-sm text-destructive">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                {...register("description")}
                placeholder="Enter project description"
                rows={5}
              />
            </div>

            <div className="space-y-2">
              <Label>Tech Stack</Label>
              <div className="flex flex-col xxs:flex-row gap-2">
                <Input
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  placeholder="Add technology (e.g., React, Node.js)"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddTech();
                    }
                  }}
                />
                <Button
                  type="button"
                  onClick={handleAddTech}
                  className="w-full xxs:w-auto justify-center"
                >
                  <Plus className="h-4 w-4 mr-2 xxs:mr-0" />
                  <span className="xxs:sr-only">Add Technology</span>
                </Button>
              </div>

              {techStack.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {techStack.map((tech, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
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
                {...register("project_url")}
                placeholder="https://example.com"
              />
              {errors.project_url && (
                <p className="text-sm text-destructive">
                  {errors.project_url.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="github_repo_url">GitHub Repository URL</Label>
              <Input
                id="github_repo_url"
                {...register("github_repo_url")}
                placeholder="https://github.com/username/repo"
              />
              {errors.github_repo_url && (
                <p className="text-sm text-destructive">
                  {errors.github_repo_url.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Tag className="h-4 w-4" />
                Project Tags
              </Label>
              <div className="mt-2 space-y-2">
                {availableTags.map((tag) => (
                  <div key={tag} className="flex items-center space-x-2">
                    <Checkbox
                      id={tag.toLowerCase()}
                      checked={tags.includes(tag)}
                      onCheckedChange={() => handleTagChange(tag)}
                    />
                    <Label
                      htmlFor={tag.toLowerCase()}
                      className="cursor-pointer"
                    >
                      {tag}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Project Image URL</Label>
              <Input
                placeholder="https://example.com/image.jpg"
                {...register("image_url")}
              />
              {errors.image_url && (
                <p className="text-sm text-destructive">
                  {errors.image_url.message}
                </p>
              )}
              {imagePreview && (
                <div className="mt-4">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="h-32 w-32 object-cover rounded-md"
                  />
                </div>
              )}
            </div>

            <div className="flex flex-col xxs:flex-row justify-end gap-3 xxs:gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/dashboard/projects")}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isCreating || isUpdating}>
                {isCreating || isUpdating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {isEditMode ? "Updating..." : "Creating..."}
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    {isEditMode ? "Update Project" : "Create Project"}
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
