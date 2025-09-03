import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Github, ExternalLink, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import type { Tables } from "@/lib/supabase";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type Project = Tables["projects"]["Row"];

// Fallback image if no image is provided
const fallbackImage =
  "https://images.unsplash.com/photo-1661956602944-249bcd04b63f?q=80&w=2070&auto=format&fit=crop";

export default function ProjectsSection() {
  const [filter, setFilter] = useState("all");
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch projects from Supabase
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from("projects")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;

        setProjects(data);
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError("Failed to load projects");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter((project) => {
        // For 'featured' filter, check the featured field or the 'Featured' tag
        if (filter === "featured") {
          return (
            project.featured ||
            (project.tags && project.tags.includes("Featured"))
          );
        }
        // For other filters, check if the project has the corresponding tag
        // Handle special cases for proper capitalization
        let expectedTag = "";
        switch (filter) {
          case "frontend":
            expectedTag = "Frontend";
            break;
          case "backend":
            expectedTag = "Backend";
            break;
          case "fullstack":
            expectedTag = "Fullstack";
            break;
          default:
            expectedTag = filter.charAt(0).toUpperCase() + filter.slice(1);
        }
        return project.tags && project.tags.includes(expectedTag);
      });

  return (
    <section id="projects" className="py-20 min-h-screen">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl font-bold mb-2">My Projects</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-8"></div>
          <p className="max-w-xl mx-auto text-muted-foreground mb-8">
            A selection of my recent work, personal projects and client
            collaborations.
          </p>

          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {["all", "featured", "frontend", "backend", "fullstack"].map(
              (category) => (
                <Button
                  key={category}
                  variant={filter === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter(category)}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Button>
              )
            )}
          </div>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-destructive mb-4">{error}</p>
            <Button variant="outline" onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground mb-4">
              No projects found for this filter.
            </p>
            <Button variant="outline" onClick={() => setFilter("all")}>
              View All Projects
            </Button>
          </div>
        ) : (
          <Carousel className="w-full">
            <CarouselContent>
              {filteredProjects.map((project, index) => (
                <CarouselItem
                  key={project.id}
                  className="md:basis-1/2 basis-full"
                >
                  <Card className="glass-panel overflow-hidden h-full">
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={project.image_url || fallbackImage}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                      {(project.featured ||
                        (project.tags && project.tags.includes("Featured"))) && (
                          <Badge className="absolute top-2 right-2 bg-accent text-accent-foreground">
                            Featured
                          </Badge>
                        )}
                      {project.tags &&
                        project.tags
                          .filter((tag) => tag !== "Featured")
                          .map((tag, idx) => (
                            <Badge
                              key={idx}
                              className="absolute top-2 left-2 bg-primary text-primary-foreground"
                            >
                              {tag}
                            </Badge>
                          ))}
                    </div>

                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-2">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground mb-4 line-clamp-10">
                        {project.description || "No description available"}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {project.tech_stack?.map((tech, idx) => (
                          <Badge
                            key={idx}
                            variant="outline"
                            className="bg-secondary/20"
                          >
                            {tech}
                          </Badge>
                        )) || (
                            <Badge variant="outline" className="bg-secondary/20">
                              No technologies specified
                            </Badge>
                          )}
                      </div>
                    </CardContent>

                    <CardFooter className="px-6 pb-6 pt-0 flex flex-wrap gap-2 sm:gap-4">
                      {project.project_url && (
                        <Button
                          size="sm"
                          className="flex gap-2 items-center"
                          onClick={() =>
                            window.open(project.project_url, "_blank")
                          }
                        >
                          <ExternalLink size={16} />
                          Live Demo
                        </Button>
                      )}

                      <Button
                        size="sm"
                        variant="outline"
                        className="flex gap-2 items-center"
                        onClick={() =>
                          window.open(
                            project.github_repo_url || "https://github.com",
                            "_blank"
                          )
                        }
                      >
                        <Github size={16} />
                        Code
                      </Button>
                    </CardFooter>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>
        )}

        {!isLoading && !error && filteredProjects.length > 0 && (
          <div className="text-center mt-10">
            <Button
              variant="outline"
              size="lg"
              onClick={() => setFilter("all")}
            >
              ...
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
