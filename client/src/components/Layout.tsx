import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Menu, X, ExternalLink, Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Strategic Plan", path: "/strategic-plan" },
    { name: "Programs", path: "/programs" },
    { name: "Budget", path: "/budget" },
    { name: "Get Involved", path: "/get-involved" },
    { name: "Dashboard", path: "/dashboard" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans">
      {/* ── Premium Navigation ── */}
      <motion.header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-500 ease-out",
          isScrolled
            ? "bg-white/85 backdrop-blur-2xl border-b border-slate-200/60 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)]"
            : "bg-transparent border-b border-transparent"
        )}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="container flex h-[72px] items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <motion.a
              className="flex items-center gap-3 group"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
            >
              <img 
                src="/coastline-shield-primary.svg" 
                alt="Coastline College" 
                className="w-10 h-10 object-contain flex-shrink-0"
              />
              <div className="flex flex-col">
                <span className="font-heading font-bold text-[15px] leading-tight text-slate-900 tracking-tight">Coastline College</span>
                <span className="text-[11px] font-semibold text-slate-400 tracking-[0.08em] uppercase">Foundation</span>
              </div>
            </motion.a>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {navItems.map((item, index) => (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.04, duration: 0.4 }}
              >
                <Link href={item.path}>
                  <a
                    className={cn(
                      "relative px-3.5 py-2 text-[13px] font-medium rounded-lg transition-all duration-300",
                      location === item.path
                        ? "text-blue-700 bg-blue-50/80"
                        : "text-slate-500 hover:text-slate-900 hover:bg-slate-50/80"
                    )}
                  >
                    {item.name}
                    {location === item.path && (
                      <motion.span
                        className="absolute bottom-0.5 left-3 right-3 h-[2px] bg-gradient-to-r from-blue-500 to-teal-500 rounded-full"
                        layoutId="nav-indicator"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </a>
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            className="lg:hidden p-2.5 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100/80 transition-colors"
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
                  <X size={22} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={22} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="lg:hidden border-t border-slate-100/80 bg-white/95 backdrop-blur-2xl"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="container py-3 flex flex-col gap-0.5">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.04 }}
                  >
                    <Link href={item.path}>
                      <a
                        className={cn(
                          "px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 block",
                          location === item.path
                            ? "text-blue-700 bg-blue-50/80 font-semibold"
                            : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
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

      {/* ── Main Content ── */}
      <main className="flex-1">
        {children}
      </main>

      {/* ── Premium Footer ── */}
      <footer className="relative bg-[#0A1628] text-slate-300 overflow-hidden">
        {/* Subtle background texture */}
        <div className="absolute inset-0 root-pattern opacity-40" />
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/[0.03] rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-teal-500/[0.03] rounded-full blur-[100px]" />

        <div className="container relative z-10 pt-16 pb-8">
          {/* Top Section */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-white/[0.06]">
            {/* Brand Column */}
            <div className="md:col-span-5">
              <div className="flex items-center gap-3 mb-5">
                <img 
                  src="/coastline-shield-white.svg" 
                  alt="Coastline College" 
                  className="w-9 h-9 object-contain flex-shrink-0"
                />
                <div>
                  <span className="font-heading font-bold text-white text-sm tracking-tight">Coastline College Foundation</span>
                </div>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed max-w-sm mb-6">
                Supporting students through scholarships, endowments, and innovative financial programs that expand Coastline's capacity to meet student and community needs.
              </p>
              <div className="flex items-center gap-3">
                <a
                  href="https://www.coastline.edu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors"
                >
                  coastline.edu <ExternalLink size={11} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="md:col-span-3">
              <h3 className="text-xs font-semibold text-white uppercase tracking-[0.1em] mb-5">Quick Links</h3>
              <ul className="space-y-3">
                {[
                  { name: "About Us", path: "/about" },
                  { name: "Strategic Plan", path: "/strategic-plan" },
                  { name: "Programs", path: "/programs" },
                  { name: "Budget & Finance", path: "/budget" },
                  { name: "Get Involved", path: "/get-involved" },
                  { name: "Board Dashboard", path: "/dashboard" },
                ].map((link) => (
                  <li key={link.path}>
                    <Link href={link.path}>
                      <a className="text-sm text-slate-400 hover:text-white transition-colors duration-200 flex items-center gap-1 group">
                        {link.name}
                        <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="md:col-span-4">
              <h3 className="text-xs font-semibold text-white uppercase tracking-[0.1em] mb-5">Contact</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-white/[0.05] flex items-center justify-center text-slate-400">
                    <MapPin size={14} />
                  </div>
                  <div className="text-sm text-slate-400">
                    <p>11460 Warner Avenue</p>
                    <p>Fountain Valley, CA 92708</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-white/[0.05] flex items-center justify-center text-slate-400">
                    <Phone size={14} />
                  </div>
                  <span className="text-sm text-slate-400">(714) 241-6154</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-white/[0.05] flex items-center justify-center text-slate-400">
                    <Mail size={14} />
                  </div>
                  <a href="mailto:foundation@coastline.edu" className="text-sm text-slate-400 hover:text-white transition-colors">
                    foundation@coastline.edu
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-500">
              &copy; {new Date().getFullYear()} Coastline College Foundation. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="https://www.coastline.edu" target="_blank" rel="noopener noreferrer" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">
                Coastline College
              </a>
              <span className="text-slate-700">|</span>
              <a href="https://www.cccd.edu" target="_blank" rel="noopener noreferrer" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">
                Coast Community College District
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
