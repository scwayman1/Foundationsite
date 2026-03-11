import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Briefcase, Building2, GraduationCap, Landmark, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.08 }
  }
};

const cardVariant = {
  hidden: { opacity: 0, y: 28, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }
  }
};

type BoardMember = {
  name: string;
  title: string;
  organization?: string;
  role?: string;
  bio: string;
  category: "Foundation Leadership" | "College Leadership" | "Community & Industry" | "Trustee Liaison";
};

const members: BoardMember[] = [
  {
    name: "Alex A. Accetta, C.P.A.",
    title: "Owner",
    organization: "Alex A. Accetta, CPA & Associates",
    role: "President",
    category: "Foundation Leadership",
    bio: "Alex Accetta is a Certified Public Accountant and business owner with decades of experience in tax, accounting, and financial planning. Through his Orange County practice, he advises individuals, families, and small businesses on long-term financial strategy, estate planning, and business operations. His professional discipline and deep community roots bring strong fiscal stewardship to the Foundation Board."
  },
  {
    name: "Christine Nguyen, M.B.A.",
    title: "Vice President, Administrative Services",
    organization: "Coastline College",
    role: "Treasurer",
    category: "College Leadership",
    bio: "Christine Nguyen brings more than two decades of experience within the Coast Community College District, spanning financial aid, budgeting, and fiscal services. As Coastline's Vice President of Administrative Services, she oversees key operational areas including finance, facilities, technology, grants, and auxiliary services. Her expertise in institutional finance and operations supports the Foundation's commitment to strong governance and accountability."
  },
  {
    name: "Dennis Cole, M.A.",
    title: "Director of District Partnerships & Operations, ACCESS",
    organization: "Orange County Department of Education",
    category: "Community & Industry",
    bio: "Dennis Cole is a seasoned educational leader whose career includes service as a teacher, principal, district administrator, and county-level executive. His work has centered on partnerships, student support, and innovative initiatives that expand opportunity for vulnerable and underserved learners. He brings to the Foundation Board a strong regional perspective on collaboration, access, and student success across Orange County."
  },
  {
    name: "Adam Carrillo",
    title: "CEO",
    organization: "Partake Collective",
    category: "Community & Industry",
    bio: "Adam Carrillo is the CEO of Partake Collective, where he leads business growth at the intersection of food innovation, commercial real estate, and entrepreneurship. His background spans economic development, marketing, and small-business expansion, with experience supporting scalable ventures across Southern California. He contributes an entrepreneurial lens to the Foundation's work in workforce alignment, industry partnerships, and community impact."
  },
  {
    name: "Camille Howarth",
    title: "Real Estate Agent",
    organization: "Surterre Properties",
    category: "Community & Industry",
    bio: "Camille Howarth is an Orange County real estate professional with extensive experience in residential sales, marketing, negotiation, and client advising. Raised in the real estate industry, she brings a multigenerational understanding of relationship-building, local community engagement, and service. Her perspective strengthens the Foundation's connection to philanthropy, stewardship, and long-term community partnerships."
  },
  {
    name: "Vincent Rodriguez, Ed.D.",
    title: "President",
    organization: "Coastline College",
    category: "College Leadership",
    bio: "Dr. Vincent Rodriguez serves as President of Coastline College and is recognized for his leadership in educational access, equity, and student-centered innovation. He champions the role of community colleges as pathways to opportunity for diverse learners and working adults. His leadership helps align the Foundation's efforts with Coastline's institutional mission, student outcomes, and broader community impact."
  },
  {
    name: "Jordan Valdez",
    title: "Assistant Vice President, Card Sales Support Manager",
    organization: "U.S. Bank",
    category: "Community & Industry",
    bio: "Jordan Valdez is a banking leader with more than a decade of experience across branch operations, customer service, and sales support. His career at U.S. Bank reflects steady advancement through leadership roles requiring operational discipline, team development, and client relationship management. He brings financial-sector insight, professional rigor, and an emerging-leader perspective to the Foundation Board."
  },
  {
    name: "Scott Wayman",
    title: "Director, Foundation & Community Relations",
    organization: "Coastline College",
    category: "Foundation Leadership",
    bio: "Scott Wayman leads Foundation and Community Relations at Coastline College, where he advances partnerships, philanthropic strategy, and institutional engagement in support of students. His background includes executive leadership across mission-driven, education-focused, and high-growth organizations, with experience in strategy, operations, and stakeholder development. He brings a builder's mindset to the Foundation's work in growth, visibility, and long-term impact."
  },
  {
    name: "Jacob Williams, M.B.A.",
    title: "President & Founder",
    organization: "JWINS (Jacob Williams Insurance Services)",
    category: "Community & Industry",
    bio: "Jacob Williams is a financial advisor and founder of JWINS, where he focuses on employee benefits, risk management, and strategic planning for businesses and individuals. His background includes experience with retirement planning, insurance strategy, and executive benefits, informed by both large-firm and entrepreneurial environments. He adds financial planning expertise and a disciplined advisory perspective to the Foundation Board."
  },
  {
    name: "Phu Nguyen",
    title: "Trustee Liaison",
    organization: "Coast Community College District Board of Trustees",
    category: "Trustee Liaison",
    bio: "Phu Nguyen brings a distinguished record of public service, educational governance, and community leadership to his role as Trustee Liaison. His experience includes school district governance, civic leadership within Southern California's Vietnamese community, and oversight of major public infrastructure investments. His perspective strengthens the Foundation's connection to public accountability, educational equity, and the broader communities Coastline serves."
  },
  {
    name: "Dominique Anne Abadines",
    title: "Member Service Representative V",
    organization: "Navy Federal Credit Union",
    category: "Community & Industry",
    bio: "Dominique Anne Abadines is a Member Service Representative V at Navy Federal Credit Union, where her work combines member support, financial education, team mentorship, and community outreach. She has led high-impact financial education presentations, supported onboarding and professional development for colleagues, and helped organize service initiatives ranging from blood drives to care-kit campaigns and grant-supported community programs. She brings to the Foundation Board a strong commitment to financial wellness, volunteer leadership, and community-centered impact."
  }
];

const categoryStyles = {
  "Foundation Leadership": "bg-blue-50 text-blue-700 border-blue-200/70",
  "College Leadership": "bg-teal-50 text-teal-700 border-teal-200/70",
  "Community & Industry": "bg-amber-50 text-amber-700 border-amber-200/70",
  "Trustee Liaison": "bg-violet-50 text-violet-700 border-violet-200/70"
};

const categoryIcons = {
  "Foundation Leadership": <Users className="w-4 h-4" />,
  "College Leadership": <GraduationCap className="w-4 h-4" />,
  "Community & Industry": <Building2 className="w-4 h-4" />,
  "Trustee Liaison": <Landmark className="w-4 h-4" />
};

export default function Board() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative py-28 md:py-36 bg-[#0A1628] text-white overflow-hidden">
        <img
          src="/Scott Podium2.jpg"
          alt="Coastline College Foundation leadership"
          className="absolute inset-0 w-full h-full object-cover object-[center_24%]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A1628]/78 via-[#0A1628]/60 to-[#0A1628]/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A1628]/50 to-transparent" />
        <div className="absolute inset-0 dot-grid opacity-[0.04]" />
        <div className="absolute top-1/4 -left-24 w-[420px] h-[420px] bg-blue-600/[0.08] rounded-full blur-[120px]" />

        <motion.div
          className="container relative z-10"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <div className="max-w-3xl">
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.06] border border-white/[0.08] backdrop-blur-xl mb-6"
              variants={fadeInUp}
            >
              <span className="text-[13px] font-medium text-blue-200/90 tracking-wide">Foundation Governance</span>
            </motion.div>
            <motion.h1
              className="text-4xl md:text-6xl font-heading font-bold mb-6 leading-[1.08]"
              variants={fadeInUp}
            >
              Meet Our <span className="gradient-text-hero">Board</span>
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl text-slate-300/90 leading-relaxed max-w-2xl"
              variants={fadeInUp}
            >
              The Coastline College Foundation Board brings together leaders from education, finance, business, public service, and community development to expand opportunity for Coastline students.
            </motion.p>
          </div>
        </motion.div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
      </section>

      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 ring-pattern" />
        <div className="container relative z-10">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-14"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={staggerContainer}
          >
            {[
              { label: "Board Members", value: "13", icon: <Users className="w-5 h-5" /> },
              { label: "Industries Represented", value: "6+", icon: <Briefcase className="w-5 h-5" /> },
              { label: "Foundation Since", value: "1985", icon: <Landmark className="w-5 h-5" /> },
              { label: "Shared Focus", value: "Student Success", icon: <GraduationCap className="w-5 h-5" /> }
            ].map((item, idx) => (
              <motion.div key={idx} variants={cardVariant}>
                <div className="glass-card rounded-2xl p-6 card-hover h-full">
                  <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-blue-50 text-blue-600 mb-4">
                    {item.icon}
                  </div>
                  <div className="text-2xl font-bold text-slate-900 mb-1">{item.value}</div>
                  <div className="text-sm text-slate-500">{item.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="text-center max-w-2xl mx-auto mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
          >
            <motion.span className="text-[11px] font-semibold text-blue-600 uppercase tracking-[0.12em] mb-3 block" variants={fadeInUp}>
              Board Directory
            </motion.span>
            <motion.h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-4" variants={fadeInUp}>
              Leadership in Service of Students
            </motion.h2>
            <motion.p className="text-slate-400 text-[16px] leading-relaxed" variants={fadeInUp}>
              Our board combines fiduciary stewardship, institutional leadership, and community engagement to advance Coastline College Foundation's mission.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={staggerContainer}
          >
            {members.map((member) => (
              <motion.div key={member.name} variants={cardVariant}>
                <Card className="border border-slate-100/80 shadow-sm hover:shadow-xl transition-all duration-500 rounded-2xl overflow-hidden h-full card-hover">
                  <div className="h-1 w-full bg-gradient-to-r from-blue-500 via-teal-400 to-blue-600" />
                  <CardContent className="p-7 md:p-8">
                    <div className="flex items-start justify-between gap-4 mb-5">
                      <div>
                        <h3 className="text-xl font-heading font-bold text-slate-900 leading-tight">{member.name}</h3>
                        <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                          {member.title}
                          {member.organization ? `, ${member.organization}` : ""}
                        </p>
                      </div>
                      <Badge variant="outline" className={`${categoryStyles[member.category]} border rounded-full px-3 py-1 text-[11px] font-semibold whitespace-nowrap`}>
                        <span className="inline-flex items-center gap-1.5">
                          {categoryIcons[member.category]}
                          {member.category}
                        </span>
                      </Badge>
                    </div>

                    {member.role && (
                      <div className="mb-4">
                        <span className="inline-flex items-center rounded-full bg-slate-900 text-white px-3 py-1 text-[11px] font-semibold tracking-[0.04em]">
                          {member.role}
                        </span>
                      </div>
                    )}

                    <p className="text-[15px] text-slate-600 leading-7">{member.bio}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-[#fafbfd] border-t border-slate-100/80">
        <div className="container">
          <motion.div
            className="rounded-2xl bg-white border border-slate-100/80 shadow-sm p-8 md:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div>
              <p className="text-[11px] font-semibold text-blue-600 uppercase tracking-[0.12em] mb-2">Partner With Coastline</p>
              <h3 className="text-2xl font-heading font-bold text-slate-900 mb-2">Interested in supporting the Foundation?</h3>
              <p className="text-slate-500">Connect with our team to explore giving, partnership, and volunteer opportunities.</p>
            </div>
            <Link href="/get-involved">
              <a className="inline-flex items-center justify-center rounded-xl bg-blue-600 hover:bg-blue-500 text-white px-6 py-3.5 font-semibold shadow-lg shadow-blue-600/15 transition-colors whitespace-nowrap">
                Get Involved <ArrowRight size={16} className="ml-2" />
              </a>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
