import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Shield, Briefcase, Heart, Cpu, Palette, Scale, CheckCircle } from "lucide-react";
import { Link } from "wouter";

export default function Programs() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-amber-500 to-orange-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/coastline-classroom.jpg')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 border border-white/30 text-white text-sm font-medium mb-6 backdrop-blur-sm">
              Academic Excellence
            </div>
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6 leading-tight">
              Programs that <span className="text-amber-200">Shape the Future</span>
            </h1>
            <p className="text-xl text-white/90 leading-relaxed max-w-2xl">
              Targeted initiatives aligned with industry needs, preparing students for success in the evolving global economy.
            </p>
          </div>
        </div>
      </section>

      {/* Flagship Programs */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-4">Flagship Programs</h2>
            <p className="text-slate-600 text-lg">Our most impactful areas of study designed for high-demand careers.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* IT & Cybersecurity */}
            <Card className="border-none shadow-xl overflow-hidden group h-full flex flex-col">
              <div className="h-48 overflow-hidden relative">
                <div className="absolute inset-0 bg-blue-900/60 z-10 group-hover:bg-blue-900/40 transition-colors duration-300"></div>
                <img 
                  src="/coastline-classroom.jpg" 
                  alt="Cybersecurity" 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2 text-white">
                  <Shield size={20} className="text-blue-300" />
                  <span className="font-bold tracking-wide">IT & Cybersecurity</span>
                </div>
              </div>
              <CardContent className="p-6 flex-1 flex flex-col">
                <p className="text-slate-600 mb-6 flex-1">
                  Preparing talent for the booming digital economy with programs in Cybersecurity, Computer Networking, and Software Development.
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-sm text-slate-700">
                    <CheckCircle size={16} className="text-blue-500" />
                    <span>33% Job Growth (2023-2033)</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-700">
                    <CheckCircle size={16} className="text-blue-500" />
                    <span>Industry Certifications</span>
                  </div>
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">Learn More</Button>
              </CardContent>
            </Card>

            {/* Business & Finance */}
            <Card className="border-none shadow-xl overflow-hidden group h-full flex flex-col">
              <div className="h-48 overflow-hidden relative bg-gradient-to-br from-teal-600 to-teal-800">
                <div className="absolute inset-0 bg-teal-900/20 z-10 group-hover:bg-teal-900/10 transition-colors duration-300"></div>
                <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2 text-white">
                  <Briefcase size={20} className="text-teal-300" />
                  <span className="font-bold tracking-wide">Business & Finance</span>
                </div>
              </div>
              <CardContent className="p-6 flex-1 flex flex-col">
                <p className="text-slate-600 mb-6 flex-1">
                  Serving the Professional and Business Services sector with programs in management, marketing, and finance.
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-sm text-slate-700">
                    <CheckCircle size={16} className="text-teal-500" />
                    <span>44% Economic Impact</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-700">
                    <CheckCircle size={16} className="text-teal-500" />
                    <span>Entrepreneurship Focus</span>
                  </div>
                </div>
                <Button className="w-full bg-teal-600 hover:bg-teal-700">Learn More</Button>
              </CardContent>
            </Card>

            {/* Healthcare */}
            <Card className="border-none shadow-xl overflow-hidden group h-full flex flex-col">
              <div className="h-48 overflow-hidden relative bg-gradient-to-br from-rose-600 to-rose-800">
                <div className="absolute inset-0 bg-rose-900/20 z-10 group-hover:bg-rose-900/10 transition-colors duration-300"></div>
                <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2 text-white">
                  <Heart size={20} className="text-rose-300" />
                  <span className="font-bold tracking-wide">Stem and Biotech</span>
                </div>
              </div>
              <CardContent className="p-6 flex-1 flex flex-col">
                <p className="text-slate-600 mb-6 flex-1">
                  Aligning with the largest industry in Orange County through health sciences, allied health, and life sciences programs.
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-sm text-slate-700">
                    <CheckCircle size={16} className="text-rose-500" />
                    <span>~195k Regional Jobs</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-700">
                    <CheckCircle size={16} className="text-rose-500" />
                    <span>Clinical Partnerships</span>
                  </div>
                </div>
                <Button className="w-full bg-rose-600 hover:bg-rose-700">Learn More</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* More Programs */}
      <section className="py-20 bg-slate-50">
        <div className="container">
          <h2 className="text-3xl font-heading font-bold text-slate-900 mb-12 text-center">Additional Areas of Excellence</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "STEM",
                desc: "Supporting industries like advanced manufacturing, aerospace, and environmental science.",
                icon: <Cpu size={32} className="text-indigo-500" />,
                color: "border-indigo-200 hover:border-indigo-400"
              },
              {
                title: "Arts & Digital Media",
                desc: "Intersecting with the creative economy through Digital Graphics, Animation, and Visual Arts.",
                icon: <Palette size={32} className="text-purple-500" />,
                color: "border-purple-200 hover:border-purple-400"
              },
              {
                title: "Public Service",
                desc: "Aligning with Public Sector industries through Criminal Justice, Homeland Security, and Education.",
                icon: <Scale size={32} className="text-amber-500" />,
                color: "border-amber-200 hover:border-amber-400"
              }
            ].map((item, idx) => (
              <div key={idx} className={`bg-white p-8 rounded-2xl border-2 ${item.color} transition-all duration-300 hover:shadow-lg group`}>
                <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                <h3 className="text-xl font-heading font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="bg-slate-900 rounded-3xl p-8 md:p-16 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl"></div>
            
            <div className="relative z-10 text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">Ready to Apply?</h2>
              <p className="text-slate-300 text-lg mb-10">
                Start your journey with Coastline College today. Our streamlined application process makes it easy to get started.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 text-left">
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/10">
                  <div className="text-4xl font-bold text-blue-400 mb-2">01</div>
                  <h3 className="font-bold text-lg mb-2">Explore Programs</h3>
                  <p className="text-sm text-slate-300">Browse our catalog to find the right fit for your goals.</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/10">
                  <div className="text-4xl font-bold text-blue-400 mb-2">02</div>
                  <h3 className="font-bold text-lg mb-2">Apply Online</h3>
                  <p className="text-sm text-slate-300">Complete the simple online application form.</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/10">
                  <div className="text-4xl font-bold text-blue-400 mb-2">03</div>
                  <h3 className="font-bold text-lg mb-2">Register</h3>
                  <p className="text-sm text-slate-300">Sign up for classes and begin your education.</p>
                </div>
              </div>
              
              <Button size="lg" className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-8 py-6 rounded-full shadow-lg shadow-blue-500/30 transition-all hover:scale-105">
                Start Application
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
