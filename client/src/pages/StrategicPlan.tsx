import { Target, TrendingUp, Users, Briefcase, CheckCircle } from "lucide-react";

export default function StrategicPlan() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-900 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/coastline-award-3.jpg')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-sm font-medium mb-6 backdrop-blur-sm">
              2025-2028 Roadmap
            </div>
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6 leading-tight">
              Strategic Plan: <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">Goals & Objectives</span>
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed max-w-2xl">
              A comprehensive framework designed to expand philanthropic support, broaden stewardship, increase community outreach, and strengthen our advancement team.
            </p>
          </div>
        </div>
      </section>

      {/* Strategic Table Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            <div className="bg-slate-900 p-6 md:p-8 border-b border-slate-800">
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-white">2025-2028 Coastline College Foundation Strategic Plan</h2>
              <p className="text-blue-200 mt-2">Key Goals & Objectives for Sustainable Growth</p>
            </div>
            
            <div className="divide-y divide-slate-200">
              {/* Goal 1 */}
              <div className="grid grid-cols-1 md:grid-cols-12 bg-blue-50/50">
                <div className="md:col-span-4 p-6 md:p-8 border-b md:border-b-0 md:border-r border-slate-200">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-100 rounded-lg text-blue-700">
                      <TrendingUp size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-heading font-bold text-slate-900 mb-2">Expand Philanthropic Support</h3>
                      <p className="text-sm text-slate-600">Driving financial growth through diversified funding streams.</p>
                    </div>
                  </div>
                </div>
                <div className="md:col-span-8 p-6 md:p-8">
                  <h4 className="font-bold text-slate-900 mb-4 flex items-center">
                    <Target size={18} className="mr-2 text-blue-600" /> Key Objectives & Initiatives
                  </h4>
                  <div className="space-y-6">
                    <div className="bg-white p-5 rounded-xl border border-blue-100 shadow-sm">
                      <h5 className="font-bold text-slate-800 mb-2">Achieve Campaign Goals</h5>
                      <p className="text-sm text-slate-600 mb-3">Reach annual goals for each campaign:</p>
                      <div className="flex flex-wrap gap-2">
                        {["Naming Opportunities", "Grants", "Scholarships", "President's Circle", "Giving Tuesday"].map((item, idx) => (
                          <span key={idx} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-md border border-blue-100">{item}</span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="bg-white p-5 rounded-xl border border-blue-100 shadow-sm">
                      <h5 className="font-bold text-slate-800 mb-2">Always Carry a Pipeline of $5M in Grant Funding Opportunities</h5>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
                        <div>
                          <p className="text-xs font-bold text-slate-500 uppercase mb-2">Strategic Focus Areas</p>
                          <ul className="space-y-2">
                            <li className="text-sm text-slate-700 flex items-start gap-2">
                              <CheckCircle size={14} className="mt-1 text-teal-500 flex-shrink-0" />
                              <span><strong>Changing Workforce:</strong> Preparing students for emerging industries</span>
                            </li>
                            <li className="text-sm text-slate-700 flex items-start gap-2">
                              <CheckCircle size={14} className="mt-1 text-teal-500 flex-shrink-0" />
                              <span><strong>AI Literacy:</strong> Research powerhouse potential & labor assist initiatives</span>
                            </li>
                            <li className="text-sm text-slate-700 flex items-start gap-2">
                              <CheckCircle size={14} className="mt-1 text-teal-500 flex-shrink-0" />
                              <span><strong>Systemic Inequality:</strong> Addressing basic needs for equity</span>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-500 uppercase mb-2">Current Pipeline Partners</p>
                          <div className="flex flex-wrap gap-2">
                            {["US Bank", "Samueli Fund", "Doyle Foundation", "Lumina Foundation", "Howmet Aerospace", "Ascendium Foundation"].map((partner, idx) => (
                              <span key={idx} className="px-2 py-1 bg-slate-50 text-slate-600 text-xs rounded border border-slate-200">{partner}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-xl border border-blue-100 shadow-sm">
                        <h5 className="font-bold text-slate-800 mb-1">Broaden Donor Base</h5>
                        <p className="text-sm text-slate-600">Expand annual appeals emphasizing stewardship for mid-level donors.</p>
                      </div>
                      <div className="bg-white p-4 rounded-xl border border-blue-100 shadow-sm">
                        <h5 className="font-bold text-slate-800 mb-1">Enhance Donor Stewardship</h5>
                        <p className="text-sm text-slate-600">Annual donor events, improve/increase donor interaction.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Goal 2 */}
              <div className="grid grid-cols-1 md:grid-cols-12 bg-white">
                <div className="md:col-span-4 p-6 md:p-8 border-b md:border-b-0 md:border-r border-slate-200">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-teal-100 rounded-lg text-teal-700">
                      <Users size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-heading font-bold text-slate-900 mb-2">Broaden Stewardship & Cultivation</h3>
                      <p className="text-sm text-slate-600">Deepening relationships with our supporters.</p>
                    </div>
                  </div>
                </div>
                <div className="md:col-span-8 p-6 md:p-8">
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-teal-200 transition-colors">
                      <h5 className="font-bold text-slate-800 mb-1">Strengthen Donor Relationships</h5>
                      <p className="text-sm text-slate-600">Annual donor appreciation events and personalized stewardship plans.</p>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-teal-200 transition-colors">
                      <h5 className="font-bold text-slate-800 mb-1">Cultivate Mid-Level Donors</h5>
                      <p className="text-sm text-slate-600">Tailored stewardship activities to grow mid-tier donor support and engagement.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Goal 3 */}
              <div className="grid grid-cols-1 md:grid-cols-12 bg-blue-50/50">
                <div className="md:col-span-4 p-6 md:p-8 border-b md:border-b-0 md:border-r border-slate-200">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-indigo-100 rounded-lg text-indigo-700">
                      <Briefcase size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-heading font-bold text-slate-900 mb-2">Increase Community Outreach</h3>
                      <p className="text-sm text-slate-600">Expanding visibility and impact in the community.</p>
                    </div>
                  </div>
                </div>
                <div className="md:col-span-8 p-6 md:p-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-xl border border-blue-100 shadow-sm">
                      <h5 className="font-bold text-slate-800 mb-1">Partnership with PR & Marketing</h5>
                      <p className="text-sm text-slate-600">Increase Foundation and College visibility within the community.</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-blue-100 shadow-sm">
                      <h5 className="font-bold text-slate-800 mb-1">Amplify Coastline's Story</h5>
                      <p className="text-sm text-slate-600">Increase community members sharing Coastline's Impact.</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-blue-100 shadow-sm">
                      <h5 className="font-bold text-slate-800 mb-1">Social Responsibility Initiatives</h5>
                      <p className="text-sm text-slate-600">Engage with local organizations, alumni, and staff in community-driven causes.</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-blue-100 shadow-sm">
                      <h5 className="font-bold text-slate-800 mb-1">In-reach and Service Orientation</h5>
                      <p className="text-sm text-slate-600">Establish internal service-oriented processes to collaborate with college departments.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Goal 4 */}
              <div className="grid grid-cols-1 md:grid-cols-12 bg-white">
                <div className="md:col-span-4 p-6 md:p-8 border-b md:border-b-0 md:border-r border-slate-200">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-amber-100 rounded-lg text-amber-700">
                      <Users size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-heading font-bold text-slate-900 mb-2">Build, Support & Strengthen Team</h3>
                      <p className="text-sm text-slate-600">Investing in our people and capabilities.</p>
                    </div>
                  </div>
                </div>
                <div className="md:col-span-8 p-6 md:p-8">
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-amber-200 transition-colors">
                      <h5 className="font-bold text-slate-800 mb-1">Assess Foundation Engagement</h5>
                      <p className="text-sm text-slate-600">Regular surveys to align Foundation support with departmental needs.</p>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-amber-200 transition-colors">
                      <h5 className="font-bold text-slate-800 mb-1">Develop Foundation Ambassadors</h5>
                      <p className="text-sm text-slate-600">Train college staff as fundraisers and community advocates; onboard new Deans and Managers.</p>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-amber-200 transition-colors">
                      <h5 className="font-bold text-slate-800 mb-1">Invest in Professional Development</h5>
                      <p className="text-sm text-slate-600">Provide resources and technology to boost employee efficiency and effectiveness.</p>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-amber-200 transition-colors">
                      <h5 className="font-bold text-slate-800 mb-1">Employee Recognition</h5>
                      <p className="text-sm text-slate-600">Expand opportunities to acknowledge and celebrate team achievements.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
