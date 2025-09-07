
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Scene from '../three/Scene';

const frontendSkills = [
  { name: "React / React Native", level: 95 },
  { name: "TypeScript / JavaScript", level: 90 },
  { name: "HTML / CSS / SCSS", level: 85 },
  { name: "Tailwind CSS", level: 90 },
  { name: "Next.js", level: 80 },
];

const backendSkills = [
  { name: "Node.js / Express", level: 85 },
  { name: "Python / Django", level: 75 },
  { name: "MongoDB / PostgreSQL", level: 80 },
  { name: "GraphQL", level: 70 },
  { name: "Supabase", level: 90 },
];

const otherSkills = [
  "Docker", "CI/CD", "AWS", "Git", "Agile Methodologies",
  "Jest / Testing", "Redux", "Figma", "UX/UI Design", "Three.js"
];

export default function SkillsSection() {
  const progressVariants = {
    initial: { width: 0 },
    animate: (level: number) => ({
      width: `${level}%`,
      transition: { duration: 1, delay: 0.3 }
    })
  };

  return (
    <section id="skills" className="py-20 min-h-screen">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">My Skills</h2>
          <div className="w-16 sm:w-20 h-1 bg-primary mx-auto mb-6 sm:mb-8"></div>
          <p className="max-w-xl mx-auto text-muted-foreground">
            My tech stack and areas of expertise in development and design.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <Card className="glass-panel">
              <CardContent className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 flex items-center">
                  <span className="text-primary mr-2">&#9632;</span> Frontend Development
                </h3>
                <div className="space-y-4">
                  {frontendSkills.map((skill, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>{skill.name}</span>
                        <span>{skill.level}%</span>
                      </div>
                      <div className="h-2 bg-secondary/40 rounded overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-primary to-accent"
                          variants={progressVariants}
                          initial="initial"
                          whileInView="animate"
                          viewport={{ once: true }}
                          custom={skill.level}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="glass-panel">
              <CardContent className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 flex items-center">
                  <span className="text-accent mr-2">&#9632;</span> Backend Development
                </h3>
                <div className="space-y-4">
                  {backendSkills.map((skill, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>{skill.name}</span>
                        <span>{skill.level}%</span>
                      </div>
                      <div className="h-2 bg-secondary/40 rounded overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-accent to-primary"
                          variants={progressVariants}
                          initial="initial"
                          whileInView="animate"
                          viewport={{ once: true }}
                          custom={skill.level}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="glass-panel h-full">
              <CardContent className="p-4 sm:p-6 flex flex-col h-full">
                <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 flex items-center">
                  <span className="text-primary mr-2">&#9632;</span> Other Technologies
                </h3>

                <div className="flex-grow mb-6 relative h-60">
                  <Scene modelType="sphere" controlsEnabled={false} />
                </div>

                <div className="flex flex-wrap gap-2">
                  {otherSkills.map((skill, index) => (
                    <motion.span
                      key={index}
                      className="px-3 py-1 rounded-full glass-effect text-sm"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * index }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card className="glass-panel">
            <CardContent className="p-4 sm:p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4">
                <div className="text-center p-4">
                  <div className="text-3xl sm:text-4xl font-bold text-primary mb-1 sm:mb-2">5+</div>
                  <p className="text-muted-foreground">Years Experience</p>
                </div>
                <div className="text-center p-4">
                  <div className="text-3xl sm:text-4xl font-bold text-primary mb-1 sm:mb-2">20+</div>
                  <p className="text-muted-foreground">Projects Completed</p>
                </div>
                <div className="text-center p-4">
                  <div className="text-3xl sm:text-4xl font-bold text-primary mb-1 sm:mb-2">20+</div>
                  <p className="text-muted-foreground">Happy Clients</p>
                </div>
                <div className="text-center p-4">
                  <div className="text-3xl sm:text-4xl font-bold text-primary mb-1 sm:mb-2">10+</div>
                  <p className="text-muted-foreground">Open Source Contrib.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
