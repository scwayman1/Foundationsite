import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm">
        <div className="container flex h-20 items-center justify-between">
          <Link href="/">
            <a className="flex items-center space-x-2 group">
              <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary/80 text-white shadow-md group-hover:shadow-lg transition-all duration-300">
                <span className="font-heading font-bold text-xl">C</span>
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-bold text-lg leading-none text-primary">Coastline</span>
                <span className="text-xs font-medium text-muted-foreground tracking-wider uppercase">College Foundation</span>
              </div>
            </a>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link key={item.path} href={item.path}>
                <a
                  className={cn(
                    "px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 relative group",
                    location === item.path
                      ? "text-primary bg-primary/5"
                      : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                  )}
                >
                  {item.name}
                  <span className={cn(
                    "absolute bottom-0 left-0 w-full h-0.5 bg-primary transform origin-left transition-transform duration-300",
                    location === item.path ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  )} />
                </a>
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md text-muted-foreground hover:text-primary hover:bg-primary/5"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t bg-white">
            <div className="container py-4 flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link key={item.path} href={item.path}>
                  <a
                    className={cn(
                      "px-4 py-3 text-sm font-medium rounded-md transition-colors",
                      location === item.path
                        ? "text-primary bg-primary/5 font-semibold"
                        : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

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
