import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      className="py-8 bg-secondary/20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.5 }}
    >
      <div className="container px-4 sm:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-3 md:mb-0">
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="CodeSquid Logo" className="w-6 h-6 inline-block align-middle" />
              <span className="text-lg font-bold text-gradient">CodeSquid</span>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Building the web with passion and precision.
            </p>
          </div>

          <div className="text-center md:text-right">
            <p className="text-xs sm:text-sm text-muted-foreground">
              &copy; {currentYear} Your Name. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Built with React, Tailwind, and Three.js
              <span className="mx-1">•</span>
              <Link
                to="/dashboard/login"
                className="hover:text-primary hover:underline transition-colors"
              >
                Admin Access
              </Link>
            </p>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
