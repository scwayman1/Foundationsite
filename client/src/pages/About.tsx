import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Users, Award, Target, Heart, Globe } from "lucide-react";
import { Link } from "wouter";

export default function About() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-20"></div>
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-sm font-medium mb-6 backdrop-blur-sm">
              About Us
            </div>
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6 leading-tight">
              Empowering Students since <span className="text-blue-400">1985</span>
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed max-w-2xl">
              The Coastline College Foundation is dedicated to bridging the gap between student potential and financial reality through scholarships, endowments, and innovative programs.
            </p>
          </div>
        </div>
      </section>

      {/* Our Journey */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-full h-full border-2 border-blue-100 rounded-2xl z-0"></div>
              <img 
                src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                alt="Coastline College Campus" 
                className="relative z-10 rounded-2xl shadow-xl w-full object-cover h-[500px]"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-xl z-20 max-w-xs border border-slate-100">
                <div className="flex items-center gap-4 mb-2">
                  <div className="bg-blue-100 p-2 rounded-full text-blue-600">
                    <Award size={24} />
                  </div>
                  <span className="font-heading font-bold text-lg text-slate-900">Excellence</span>
                </div>
                <p className="text-sm text-slate-600">Committed to the highest standards of educational support and integrity.</p>
              </div>
            </div>
            
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-heading font-bold text-slate-900 mb-4">Our Journey</h2>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">1985</div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2">Foundation Established</h3>
                      <p className="text-slate-600">Founded as the charitable arm of Coastline College to support student success through philanthropy.</p>
                    </div>
                  </div>
                  <div className="w-0.5 h-8 bg-slate-200 ml-6"></div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 font-bold">2025</div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2">Expanding Impact</h3>
                      <p className="text-slate-600">Today, we manage over $4.6M in assets and award hundreds of scholarships annually, focusing on equity and innovation.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="pt-4">
                <h3 className="text-xl font-heading font-bold text-slate-900 mb-4">Our Core Values</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    "Student-Centered",
                    "Integrity & Transparency",
                    "Innovation & Agility",
                    "Equity & Inclusion",
                    "Community Partnership",
                    "Stewardship"
                  ].map((value, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-slate-700">
                      <CheckCircle size={16} className="text-teal-500" />
                      <span className="font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-slate-50">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-none shadow-lg overflow-hidden group">
              <div className="h-2 bg-blue-600 w-full"></div>
              <CardContent className="p-8 md:p-10">
                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Target size={28} />
                </div>
                <h2 className="text-2xl font-heading font-bold text-slate-900 mb-4">Our Mission</h2>
                <p className="text-slate-600 leading-relaxed text-lg">
                  To support students through scholarships, endowments, and innovative financial programs that expand Coastline's capacity to meet student and community needs. We bridge resource gaps to empower students to become impactful contributors to society.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-lg overflow-hidden group">
              <div className="h-2 bg-teal-500 w-full"></div>
              <CardContent className="p-8 md:p-10">
                <div className="w-14 h-14 bg-teal-100 rounded-xl flex items-center justify-center text-teal-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Globe size={28} />
                </div>
                <h2 className="text-2xl font-heading font-bold text-slate-900 mb-4">Our Vision</h2>
                <p className="text-slate-600 leading-relaxed text-lg">
                  To be a catalyst for educational innovation and social mobility, ensuring that every student has the resources to succeed regardless of their background or financial circumstances. We envision a community where education has no barriers.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "$4.6M+", label: "Total Assets", icon: <Award className="w-6 h-6 mb-2 mx-auto opacity-70" /> },
              { number: "200+", label: "Students Impacted", icon: <Users className="w-6 h-6 mb-2 mx-auto opacity-70" /> },
              { number: "$325K", label: "Scholarships Awarded", icon: <Heart className="w-6 h-6 mb-2 mx-auto opacity-70" /> },
              { number: "40+", label: "Corporate Partners", icon: <Globe className="w-6 h-6 mb-2 mx-auto opacity-70" /> }
            ].map((stat, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors">
                {stat.icon}
                <div className="text-3xl md:text-4xl font-bold mb-2 text-blue-300">{stat.number}</div>
                <div className="text-sm md:text-base text-slate-300 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-4">Foundation Leadership</h2>
            <p className="text-slate-600 text-lg">Guided by a dedicated Board of Directors committed to student success and fiscal responsibility.</p>
          </div>
          
          <div className="bg-slate-50 rounded-2xl p-8 md:p-12 border border-slate-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-xl font-heading font-bold text-slate-900 mb-6 border-b pb-4">Executive Committee</h3>
                <ul className="space-y-4">
                  <li className="flex justify-between items-center">
                    <span className="font-medium text-slate-900">President</span>
                    <span className="text-slate-600">Community Leader</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="font-medium text-slate-900">Vice President</span>
                    <span className="text-slate-600">Industry Partner</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="font-medium text-slate-900">Treasurer</span>
                    <span className="text-slate-600">Financial Expert</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="font-medium text-slate-900">Secretary</span>
                    <span className="text-slate-600">Education Advocate</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-heading font-bold text-slate-900 mb-6 border-b pb-4">Board Oversight</h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  The Foundation Board provides strategic direction, fiduciary oversight, and fundraising leadership. Members represent diverse industries including finance, technology, healthcare, and public service.
                </p>
                <Link href="/dashboard">
                  <Button className="w-full md:w-auto bg-slate-900 text-white hover:bg-slate-800">
                    Access Board Dashboard
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
