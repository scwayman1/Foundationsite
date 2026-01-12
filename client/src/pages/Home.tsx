import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, TrendingUp, TrendingDown, Users, GraduationCap, DollarSign, Briefcase } from "lucide-react";
import { Link, useLocation } from "wouter";

export default function Home() {
  const [, setLocation] = useLocation();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
        <div className="absolute inset-0 bg-[url('/coastline-speaker-close.jpg')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
        
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-sm font-medium mb-4 backdrop-blur-sm">
              <span className="flex h-2 w-2 rounded-full bg-blue-400 mr-2 animate-pulse"></span>
              Empowering Future Leaders
            </div>
            <h1 className="text-4xl md:text-6xl font-heading font-bold leading-tight tracking-tight">
              Investing in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">Student Success</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Supporting students through scholarships, endowments, and innovative financial programs that expand Coastline's capacity to meet student and community needs.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button 
                size="lg" 
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white border-none shadow-lg shadow-blue-900/20 transition-all hover:scale-105"
                onClick={() => setLocation("/strategic-plan")}
              >
                View Strategic Plan
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="w-full sm:w-auto border-white/20 bg-white/5 hover:bg-white/10 text-white backdrop-blur-sm transition-all hover:scale-105"
                onClick={() => setLocation("/dashboard")}
              >
                Board Dashboard
              </Button>
            </div>
          </div>
        </div>
        
        {/* Abstract shapes */}
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl"></div>
      </section>

      {/* KPI Section */}
      <section className="py-16 bg-slate-50 -mt-10 relative z-20">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Total Assets Card - Updated */}
            <Card className="border-none shadow-xl shadow-slate-200/50 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full bg-blue-600 group-hover:h-full transition-all duration-300"></div>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Total Assets</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl font-bold text-slate-900">$4.62M</span>
                  <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center">
                    <TrendingUp size={12} className="mr-1" />
                    10.0%
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">Growth from $4.2M previous year</p>
              </CardContent>
            </Card>

            {/* Total Donations Card */}
            <Card className="border-none shadow-xl shadow-slate-200/50 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full bg-teal-500 group-hover:h-full transition-all duration-300"></div>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Total Donations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl font-bold text-slate-900">$363.0K</span>
                  <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center">
                    <TrendingUp size={12} className="mr-1" />
                    30.4%
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">From previous year</p>
              </CardContent>
            </Card>

            {/* Scholarships Awarded Card */}
            <Card className="border-none shadow-xl shadow-slate-200/50 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full bg-amber-500 group-hover:h-full transition-all duration-300"></div>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Scholarships Awarded</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl font-bold text-slate-900">$384.6K</span>
                  <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center">
                    <TrendingUp size={12} className="mr-1" />
                    18.2%
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">309 awards issued in FY24/25</p>
                <p className="text-xs text-slate-400 mt-1">Internal: $323,362 • External: $61,215</p>
              </CardContent>
            </Card>

            {/* Students Impacted Card */}
            <Card className="border-none shadow-xl shadow-slate-200/50 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500 group-hover:h-full transition-all duration-300"></div>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Students Impacted</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl font-bold text-slate-900">208</span>
                  <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center">
                    <TrendingUp size={12} className="mr-1" />
                    38.67%
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">From previous year</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="w-full md:w-1/2 relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-100 rounded-full z-0"></div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-teal-50 rounded-full z-0"></div>
              <img
                src="/coastline-community.jpg"
                alt="Coastline College community"
                className="relative z-10 rounded-2xl shadow-2xl w-full object-cover h-[400px]"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl z-20 max-w-xs hidden md:block border border-slate-100">
                <p className="font-heading font-bold text-4xl text-blue-600 mb-1">1985</p>
                <p className="text-sm text-slate-600 font-medium">Established to support student success</p>
              </div>
            </div>
            <div className="w-full md:w-1/2 space-y-6">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-medium">
                Our Mission
              </div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-900">
                Bridging Resource Gaps for <span className="text-blue-600">Student Success</span>
              </h2>
              <p className="text-slate-600 leading-relaxed text-lg">
                The Coastline College Foundation embodies an entrepreneurial spirit as the college's charitable arm. Our mission is to support students through scholarships, endowments, and innovative financial programs that expand Coastline's capacity to meet student and community needs.
              </p>
              <p className="text-slate-600 leading-relaxed">
                In alignment with Coastline's core values of accessibility and upward mobility, the Foundation's role is to bridge resource gaps – empowering students to become impactful contributors to society – and to foster the innovative, "no barriers" ethos of the college.
              </p>
              <div className="pt-4">
                <Button 
                  variant="outline" 
                  className="border-blue-200 text-blue-700 hover:bg-blue-50 hover:text-blue-800 hover:border-blue-300"
                  onClick={() => setLocation("/about")}
                >
                  Learn More About Us <ArrowRight size={16} className="ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Objectives */}
      <section className="py-20 bg-slate-50">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-4">Strategic Objectives</h2>
            <p className="text-slate-600 text-lg">Our roadmap for the future focuses on four key pillars designed to maximize impact and sustainability.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                id: 1,
                title: "Strengthen Fundraising and Resource Development",
                desc: "Diversify funding sources and expand partnerships to increase financial support.",
                icon: <DollarSign className="w-6 h-6 text-white" />,
                color: "bg-blue-600"
              },
              {
                id: 2,
                title: "Enhance Program Innovation and Student Success",
                desc: "Develop new programs in emerging fields and expand work-based learning opportunities.",
                icon: <GraduationCap className="w-6 h-6 text-white" />,
                color: "bg-teal-500"
              },
              {
                id: 3,
                title: "Strengthen Outreach and Community Engagement",
                desc: "Increase Coastline's visibility and forge stronger community connections.",
                icon: <Users className="w-6 h-6 text-white" />,
                color: "bg-indigo-500"
              },
              {
                id: 4,
                title: "Enhance Industry Engagement and Workforce Impact",
                desc: "Deepen relationships with employers and align programs to labor market needs.",
                icon: <Briefcase className="w-6 h-6 text-white" />,
                color: "bg-amber-500"
              }
            ].map((item) => (
              <div key={item.id} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-slate-100 flex items-start gap-6 group">
                <div className={`flex-shrink-0 w-14 h-14 rounded-xl ${item.color} flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-xl font-heading font-bold text-slate-900 mb-3 group-hover:text-blue-700 transition-colors">{item.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Program Areas */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-2">Program Areas</h2>
              <p className="text-slate-600">Targeted initiatives aligned with industry needs</p>
            </div>
            <Link href="/programs">
              <Button variant="ghost" className="hidden md:flex text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                View All Programs <ArrowRight size={16} className="ml-2" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "IT & Cybersecurity",
                desc: "Preparing talent for the booming digital economy with programs in Cybersecurity, Computer Networking, and Software Development.",
                stat: "33% Job Growth",
                image: "/coastline-classroom.jpg"
              },
              {
                title: "Business & Finance",
                desc: "Serving the Professional and Business Services sector with programs in management, marketing, and finance.",
                stat: "44% Economic Impact",
                image: null
              },
              {
                title: "Healthcare & Biotech",
                desc: "Aligning with the largest industry in Orange County through health sciences, allied health, and life sciences programs.",
                stat: "~195k Regional Jobs",
                image: null
              }
            ].map((program, idx) => (
              <div key={idx} className="group rounded-2xl overflow-hidden bg-white border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300">
                <div className="h-48 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent z-10"></div>
                  {program.image ? (
                    <img
                      src={program.image}
                      alt={program.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className={`w-full h-full ${idx === 1 ? 'bg-gradient-to-br from-blue-600 to-blue-800' : 'bg-gradient-to-br from-teal-600 to-teal-800'}`}></div>
                  )}
                  <div className="absolute bottom-4 left-4 z-20">
                    <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-medium">
                      {program.stat}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-heading font-bold text-slate-900 mb-3">{program.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4">{program.desc}</p>
                  <Link href="/programs">
                    <span className="text-blue-600 text-sm font-semibold flex items-center group-hover:translate-x-1 transition-transform cursor-pointer">
                      Learn more <ArrowRight size={14} className="ml-1" />
                    </span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center md:hidden">
            <Link href="/programs">
              <Button variant="outline" className="w-full">View All Programs</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/coastline-speaker-wide.jpg')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        <div className="container relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">Ready to Make an Impact?</h2>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto mb-10">
            Join us in shaping the future of education and workforce development. Your support creates opportunities for students and strengthens our community.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/get-involved">
              <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-50 font-semibold">
                Get Involved
              </Button>
            </Link>
            <Link href="/about">
              <Button size="lg" variant="outline" className="border-blue-400 text-blue-100 hover:bg-blue-800 hover:text-white hover:border-white">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
