
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code, User, FolderOpen, Send, Home } from 'lucide-react';
import { usePortfolio } from '@/context/PortfolioContext';
import { Button } from '@/components/ui/button';

export default function Navigation() {
  const { activeSection, setActiveSection, isMobileMenuOpen, setIsMobileMenuOpen } = usePortfolio();
  const [scrollY, setScrollY] = useState(0);

  // Update scroll position
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home', icon: <Home size={18} /> },
    { id: 'about', label: 'About', icon: <User size={18} /> },
    { id: 'skills', label: 'Skills', icon: <Code size={18} /> },
    { id: 'projects', label: 'Projects', icon: <FolderOpen size={18} /> },
    { id: 'contact', label: 'Contact', icon: <Send size={18} /> },
  ];

  const handleItemClick = (section: string) => {
    setActiveSection(section);
    setIsMobileMenuOpen(false);
    
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 hidden md:block"
        initial={{ opacity: 0, y: -20 }}
        animate={{ 
          opacity: 1, 
          y: 0,
          backgroundColor: scrollY > 50 ? 'rgba(0, 0, 0, 0.7)' : 'transparent',
          backdropFilter: scrollY > 50 ? 'blur(10px)' : 'none',
        }}
        transition={{ 
          duration: 0.3,
          ease: "easeInOut" 
        }}
      >
        <div className="container flex items-center justify-between py-4">
          <motion.div 
            className="text-xl font-bold text-gradient flex items-center"
            whileHover={{ scale: 1.05 }}
          >
            <img src="/logo.png" alt="CodeSquid Logo" className="w-8 h-8 mr-2 inline-block align-middle" />
            CodeSquid
          </motion.div>
          
          <ul className="flex items-center gap-6">
            {navItems.map((item) => (
              <li key={item.id}>
                <Button
                  variant={activeSection === item.id ? "secondary" : "ghost"}
                  size="sm"
                  className="flex gap-2 items-center"
                  onClick={() => handleItemClick(item.id)}
                >
                  {item.icon}
                  {item.label}
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </motion.nav>

      {/* Mobile Navigation (Top) */}
      <motion.nav
        className="fixed top-4 left-2 transform -translate-x-1/2 z-50 md:hidden w-[60%] max-w-sm"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="glass-effect rounded-full px-2 sm:px-4 py-2 flex items-center justify-between gap-1 sm:gap-2 w-full overflow-hidden">
          {navItems.map((item) => (
            <motion.button
              key={item.id}
              className={`p-1.5 sm:p-2 rounded-full flex-shrink-0 ${
                activeSection === item.id 
                ? 'text-primary bg-secondary/60' 
                : 'text-muted-foreground hover:text-primary/80'
              }`}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleItemClick(item.id)}
            >
              {item.icon}
            </motion.button>
          ))}
        </div>
      </motion.nav>
    </>
  );
}
