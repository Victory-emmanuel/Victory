import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Github, Linkedin, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import WorkExperienceModal from "@/components/WorkExperienceModal";
// Import work experience data directly
import workExperienceData from "@/data/workExperience.json";

interface WorkExperience {
  id: number;
  title: string;
  type: string;
  period: string;
  company: string;
  location: string;
  description: string;
  achievements: string[];
}

export default function AboutSection() {
  // Use the imported data directly
  const [selectedExperience, setSelectedExperience] = useState<WorkExperience | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (experience: WorkExperience) => {
    setSelectedExperience(experience);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
    <section id="about" className="py-20 min-h-screen flex items-center">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">About Me</h2>
          <div className="w-16 sm:w-20 h-1 bg-primary mx-auto mb-6 sm:mb-8"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="glass-panel overflow-hidden">
              <CardContent className="p-0">
                <div className="bg-gradient-to-br from-primary/20 to-accent/20 p-4 sm:p-6 md:p-8">
                  <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">
                    Who am I
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    I’m a dedicated Frontend & Full‑Stack Web Developer
                    specializing in React.js, UI/UX design, and Supabase‑powered
                    backends. I partner with brands and entrepreneurs to
                    transform ideas into high‑performance, eye‑catching web apps
                    that drive engagement and conversions.
                  </p>
                  <p className="text-muted-foreground mb-6">
                    With strong communication skills, I listen closely to your
                    goals, craft pixel‑perfect interfaces using Tailwind CSS &
                    Material UI, and deliver robust, scalable solutions on time.
                  </p>
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    <Button variant="secondary" size="sm">
                      <FileText size={16} className="mr-2" />
                      Resume
                    </Button>
                    <Button variant="outline" size="sm">
                      <Github size={16} className="mr-2" />
                      <Link to="https://github.com/Victory-emmanuel?tab=repositories">GitHub</Link>
                    </Button>
                    <Button variant="outline" size="sm">
                      <Linkedin size={16} className="mr-2" />
                      <Link to="https://www.linkedin.com/in/victory-emmanuel-54a090234">LinkedIn</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="glass-panel">
              <CardContent className="p-4 sm:p-6 md:p-8">
                <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">
                  Experience & Education
                </h3>

                <div className="space-y-6">
                  {workExperienceData.map((experience) => (
                    <div key={experience.id} className="relative pl-6 border-l border-muted group">
                      <div className="absolute w-3 h-3 bg-primary rounded-full -left-[6.5px] top-1"></div>
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-base sm:text-lg font-medium">
                            {experience.title}
                          </h4>
                          <p className="text-muted-foreground">
                            {experience.company} • {experience.period}
                          </p>
                          <p className="mt-2 line-clamp-2">
                            {experience.description}
                          </p>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => handleOpenModal(experience)}
                        >
                          <ExternalLink size={16} />
                        </Button>
                      </div>
                    </div>
                  ))}

              
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
    
    {/* Work Experience Modal */}
    <WorkExperienceModal 
      isOpen={isModalOpen} 
      onClose={handleCloseModal} 
      experience={selectedExperience} 
    />
    </>
  );
}
