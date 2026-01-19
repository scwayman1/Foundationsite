import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Strategic Plan", path: "/strategic-plan" },
    { name: "Programs", path: "/programs" },
    { name: "Budget", path: "/budget" },
    { name: "Get Involved", path: "/get-involved" },
    { name: "Board Dashboard", path: "/dashboard" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans">
      <motion.header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300",
          isScrolled
            ? "bg-white/80 backdrop-blur-xl border-b border-slate-200/50 shadow-lg shadow-slate-200/20"
            : "bg-transparent border-b border-transparent"
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="container flex h-20 items-center justify-between">
          <Link href="/">
            <motion.a
              className="flex items-center space-x-3 group"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 text-white shadow-lg shadow-blue-500/25 group-hover:shadow-xl group-hover:shadow-blue-500/30 transition-all duration-300">
                <span className="font-heading font-bold text-xl">C</span>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 to-transparent" />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-bold text-lg leading-none bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">Coastline</span>
                <span className="text-xs font-medium text-slate-500 tracking-wider uppercase">College Foundation</span>
              </div>
            </motion.a>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link href={item.path}>
                  <a
                    className={cn(
                      "px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 relative group",
                      location === item.path
                        ? "text-blue-700 bg-blue-50"
                        : "text-slate-600 hover:text-blue-700 hover:bg-blue-50/50"
                    )}
                  >
                    {item.name}
                    <motion.span
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: location === item.path ? 1 : 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  </a>
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2.5 rounded-xl text-slate-600 hover:text-blue-700 hover:bg-blue-50 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={24} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="md:hidden border-t border-slate-100 bg-white/95 backdrop-blur-xl"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="container py-4 flex flex-col space-y-1">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link href={item.path}>
                      <a
                        className={cn(
                          "px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 block",
                          location === item.path
                            ? "text-blue-700 bg-blue-50 font-semibold"
                            : "text-slate-600 hover:text-blue-700 hover:bg-blue-50/50"
                        )}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.name}
                      </a>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <main className="flex-1">
        {children}
      </main>

      <footer className="bg-slate-900 text-slate-200 py-12 border-t border-slate-800">
        <div className="container grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex items-center justify-center w-8 h-8 rounded bg-white/10 text-white">
                <span className="font-heading font-bold">C</span>
              </div>
              <span className="font-heading font-bold text-lg text-white">Coastline College Foundation</span>
            </div>
            <p className="text-slate-400 mb-6 max-w-md">
              Supporting students through scholarships, endowments, and innovative financial programs that expand Coastline's capacity to meet student and community needs.
            </p>
            <div className="flex space-x-4">
              {/* Social icons would go here */}
            </div>
          </div>
          
          <div>
            <h3 className="font-heading font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/about"><a className="text-slate-400 hover:text-white transition-colors">About Us</a></Link></li>
              <li><Link href="/programs"><a className="text-slate-400 hover:text-white transition-colors">Programs</a></Link></li>
              <li><Link href="/strategic-plan"><a className="text-slate-400 hover:text-white transition-colors">Strategic Plan</a></Link></li>
              <li><Link href="/get-involved"><a className="text-slate-400 hover:text-white transition-colors">Get Involved</a></Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-heading font-semibold text-white mb-4">Contact</h3>
            <ul className="space-y-2 text-slate-400">
              <li>11460 Warner Avenue</li>
              <li>Fountain Valley, CA 92708</li>
              <li>(714) 546-7600</li>
              <li>foundation@coastline.edu</li>
            </ul>
          </div>
        </div>
        <div className="container mt-12 pt-8 border-t border-slate-800 text-center text-slate-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Coastline College Foundation. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
