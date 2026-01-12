import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, DollarSign, TrendingUp, PieChart, ArrowUpRight, FileText } from "lucide-react";

export default function Budget() {

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/coastline-speaker-wide.jpg')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/30 border border-white/40 text-slate-900 text-sm font-medium mb-6 backdrop-blur-sm">
              Fiscal Year 2024-25
            </div>
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6 leading-tight">
              Financial <span className="text-white drop-shadow-md">Transparency</span>
            </h1>
            <p className="text-xl text-slate-800 leading-relaxed max-w-2xl font-medium">
              A clear overview of our revenue sources, strategic investments, and long-term sustainability goals.
            </p>
            
            <div className="mt-8">
              <Button
                size="lg"
                className="bg-slate-900 text-white hover:bg-slate-800 shadow-xl shadow-slate-900/20 border-none"
                onClick={() => window.open('https://acrobat.adobe.com/id/urn:aaid:sc:VA6C2:d9574f31-703b-4958-bfb3-52d45d1f522d', '_blank')}
              >
                <FileText className="mr-2 h-5 w-5" /> View FY 24-25 Budget Document
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Financial Summary Cards */}
      <section className="py-12 bg-slate-50 -mt-10 relative z-20">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-none shadow-xl shadow-slate-200/50">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Total Donations</p>
                    <h3 className="text-3xl font-bold text-slate-900 mt-1">$363.0K</h3>
                  </div>
                  <div className="p-3 bg-emerald-100 rounded-xl text-emerald-600">
                    <TrendingUp size={24} />
                  </div>
                </div>
                <p className="text-sm text-slate-600 mt-2">Fiscal Year 2024-25</p>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-xl shadow-slate-200/50">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Scholarships Awarded</p>
                    <h3 className="text-3xl font-bold text-slate-900 mt-1">$384.6K</h3>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-xl text-blue-600">
                    <BarChart3 size={24} />
                  </div>
                </div>
                <p className="text-sm text-slate-600 mt-2">309 awards in FY24/25</p>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-xl shadow-slate-200/50">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Total Assets</p>
                    <h3 className="text-3xl font-bold text-slate-900 mt-1">$4.62M</h3>
                  </div>
                  <div className="p-3 bg-teal-100 rounded-xl text-teal-600">
                    <PieChart size={24} />
                  </div>
                </div>
                <p className="text-sm text-slate-600 mt-2">+10.0% from prior year</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Detailed Breakdown */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-heading font-bold text-slate-900 mb-6">Revenue Strategy</h2>
              <p className="text-slate-600 mb-8 leading-relaxed">
                Our strategy focuses on diversifying income streams to ensure long-term sustainability and independence.
              </p>
              
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 font-bold">1</div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Financial Independence</h3>
                    <p className="text-slate-600">
                      Generating <span className="font-bold text-slate-900">$80,000</span> through our "Indirect Cost" revenue model, capturing 10% of all originated funding to support operations.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 font-bold">2</div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">President's Circle Growth</h3>
                    <p className="text-slate-600">
                      Expanding membership to increase revenue from <span className="font-bold text-slate-900">$4,200 to $13,000</span>, building a strong network of core supporters.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 font-bold">3</div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Strategic Events</h3>
                    <p className="text-slate-600">
                      Targeting <span className="font-bold text-slate-900">$75,000</span> from fundraising events designed to engage the community and showcase student success.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100">
              <h3 className="text-xl font-heading font-bold text-slate-900 mb-6">Future Growth: Planned Giving</h3>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                    <ArrowUpRight size={20} />
                  </div>
                  <h4 className="font-bold text-slate-900">Unrealized Assets Tracking</h4>
                </div>
                <p className="text-slate-600 text-sm">
                  We are implementing a system to track Planned Giving and Legacy Gifts "below the line" to monitor future pipeline value without distorting current operating budgets.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-teal-100 rounded-lg text-teal-600">
                    <DollarSign size={20} />
                  </div>
                  <h4 className="font-bold text-slate-900">Portfolio Valuation</h4>
                </div>
                <p className="text-slate-600 text-sm">
                  Developing a standardized "rule set" for the "Mark Up Value" of our planned giving portfolio to ensure accurate long-term financial projections.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
