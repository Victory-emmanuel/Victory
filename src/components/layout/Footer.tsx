
import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      className="py-8 bg-secondary/20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.5 }}
    >
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="text-xl font-bold text-gradient">DevPortfolio</div>
            <p className="text-sm text-muted-foreground">
              Building the web with passion and precision.
            </p>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-sm text-muted-foreground">
              &copy; {currentYear} Your Name. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Built with React, Tailwind, and Three.js
            </p>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
