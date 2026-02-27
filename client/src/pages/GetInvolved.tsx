import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Handshake, Users, Mail, Phone, MapPin, ArrowRight } from "lucide-react";

export default function GetInvolved() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-blue-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/coastline-community.jpg')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-sm font-medium mb-6 backdrop-blur-sm">
              Join Our Mission
            </div>
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6 leading-tight">
              Make a <span className="text-teal-400">Lasting Impact</span>
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed max-w-2xl">
              Your support creates opportunities for students, strengthens our workforce, and builds a more equitable community.
            </p>
          </div>
        </div>
      </section>

      {/* Ways to Give */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Donate */}
            <Card className="border-none shadow-xl overflow-hidden group hover:-translate-y-2 transition-transform duration-300">
              <div className="h-2 bg-blue-600 w-full"></div>
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Heart size={32} />
                </div>
                <h3 className="text-2xl font-heading font-bold text-slate-900 mb-4">Donate</h3>
                <p className="text-slate-600 mb-8 leading-relaxed">
                  Support our mission with a one-time or recurring donation to help students achieve their educational goals.
                </p>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">Donate Now</Button>
              </CardContent>
            </Card>

            {/* Partner */}
            <Card className="border-none shadow-xl overflow-hidden group hover:-translate-y-2 transition-transform duration-300">
              <div className="h-2 bg-teal-500 w-full"></div>
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center text-teal-600 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Handshake size={32} />
                </div>
                <h3 className="text-2xl font-heading font-bold text-slate-900 mb-4">Partner</h3>
                <p className="text-slate-600 mb-8 leading-relaxed">
                  Become a corporate partner and help shape the future workforce while supporting educational excellence.
                </p>
                <Button className="w-full bg-teal-600 hover:bg-teal-700">Partner With Us</Button>
              </CardContent>
            </Card>

            {/* Volunteer */}
            <Card className="border-none shadow-xl overflow-hidden group hover:-translate-y-2 transition-transform duration-300">
              <div className="h-2 bg-amber-500 w-full"></div>
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Users size={32} />
                </div>
                <h3 className="text-2xl font-heading font-bold text-slate-900 mb-4">Volunteer</h3>
                <p className="text-slate-600 mb-8 leading-relaxed">
                  Share your expertise and time to help with events, mentoring, and other foundation activities.
                </p>
                <Button className="w-full bg-amber-500 hover:bg-amber-600">Volunteer</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-slate-50">
        <div className="container">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row">
            <div className="md:w-1/2 p-8 md:p-16 bg-slate-900 text-white flex flex-col justify-center">
              <h2 className="text-3xl font-heading font-bold mb-6">Get in Touch</h2>
              <p className="text-slate-300 mb-10 text-lg">
                Have questions about how you can support the Coastline College Foundation? We'd love to hear from you.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-blue-300">
                    <Phone size={20} />
                  </div>
                  <span className="text-lg">(714) 546-7600</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-blue-300">
                    <Mail size={20} />
                  </div>
                  <span className="text-lg">foundation@coastline.edu</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-blue-300">
                    <MapPin size={20} />
                  </div>
                  <span className="text-lg">11460 Warner Avenue, Fountain Valley, CA 92708</span>
                </div>
              </div>
            </div>
            
            <div className="md:w-1/2 p-8 md:p-16">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">First Name</label>
                    <input type="text" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all" placeholder="Jane" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Last Name</label>
                    <input type="text" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all" placeholder="Doe" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Email Address</label>
                  <input type="email" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all" placeholder="jane@example.com" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Message</label>
                  <textarea className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all h-32 resize-none" placeholder="How would you like to get involved?"></textarea>
                </div>
                
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-6">
                  Send Message <ArrowRight size={18} className="ml-2" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
