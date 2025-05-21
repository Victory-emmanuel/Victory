
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Github, Linkedin } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="about" className="py-20 min-h-screen flex items-center">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl font-bold mb-2">About Me</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-8"></div>
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
                <div className="bg-gradient-to-br from-primary/20 to-accent/20 p-8">
                  <h3 className="text-2xl font-semibold mb-4">Who am I</h3>
                  <p className="text-muted-foreground mb-4">
                    I'm a passionate full-stack developer with expertise in modern web technologies. 
                    I create responsive, accessible, and high-performance web applications with clean 
                    and maintainable code.
                  </p>
                  <p className="text-muted-foreground mb-6">
                    With a background in [your background], I bring a unique perspective to software development,
                    focusing on solving real-world problems with elegant technical solutions.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="secondary" size="sm">
                      <FileText size={16} className="mr-2" />
                      Resume
                    </Button>
                    <Button variant="outline" size="sm">
                      <Github size={16} className="mr-2" />
                      GitHub
                    </Button>
                    <Button variant="outline" size="sm">
                      <Linkedin size={16} className="mr-2" />
                      LinkedIn
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
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold mb-4">Experience & Education</h3>
                
                <div className="space-y-6">
                  <div className="relative pl-6 border-l border-muted">
                    <div className="absolute w-3 h-3 bg-primary rounded-full -left-[6.5px] top-1"></div>
                    <h4 className="text-lg font-medium">Senior Developer</h4>
                    <p className="text-muted-foreground">Company Name • 2021 - Present</p>
                    <p className="mt-2">Led development of several key projects and mentored junior developers.</p>
                  </div>
                  
                  <div className="relative pl-6 border-l border-muted">
                    <div className="absolute w-3 h-3 bg-primary rounded-full -left-[6.5px] top-1"></div>
                    <h4 className="text-lg font-medium">Frontend Developer</h4>
                    <p className="text-muted-foreground">Company Name • 2018 - 2021</p>
                    <p className="mt-2">Built responsive web applications with React and TypeScript.</p>
                  </div>
                  
                  <div className="relative pl-6 border-l border-muted">
                    <div className="absolute w-3 h-3 bg-primary rounded-full -left-[6.5px] top-1"></div>
                    <h4 className="text-lg font-medium">Computer Science, BSc</h4>
                    <p className="text-muted-foreground">University Name • 2014 - 2018</p>
                    <p className="mt-2">Specialized in software engineering and web development.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
