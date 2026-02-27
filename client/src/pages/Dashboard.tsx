import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Edit2, Save, X, Building2, User, Calendar, CheckCircle, AlertCircle, Clock } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Organization data type
type Organization = {
  id: number;
  name: string;
  connection: string;
  notes: string;
  status: "No Connection" | "Potential" | "Identified" | "Strong";
  updatedBy?: string;
  lastUpdated?: string;
};

// Initial data
const initialOrganizations: Organization[] = [
  { id: 1, name: "Kaiser Permanente", connection: "No known connection identified", notes: "", status: "No Connection" },
  { id: 2, name: "Disney", connection: "No known connection identified", notes: "", status: "No Connection" },
  { id: 3, name: "Hyundai", connection: "No known connection identified", notes: "", status: "No Connection" },
  { id: 4, name: "Kingston Technologies", connection: "No known connection identified", notes: "", status: "No Connection" },
  { id: 5, name: "Anduril", connection: "No known connection identified", notes: "", status: "No Connection" },
  { id: 6, name: "Samueli Foundation", connection: "No known connection identified", notes: "", status: "No Connection" },
  { id: 7, name: "Doyle Foundation", connection: "No known connection identified", notes: "", status: "No Connection" },
  { id: 8, name: "Lumina Foundation", connection: "No known connection identified", notes: "", status: "No Connection" },
  { id: 9, name: "Ascendium Philanthropy", connection: "No known connection identified", notes: "", status: "No Connection" },
  { id: 10, name: "Boeing", connection: "No known connection identified", notes: "", status: "No Connection" },
  { id: 11, name: "Pacific Life", connection: "No known connection identified", notes: "", status: "No Connection" },
  { id: 12, name: "Bill & Melinda Gates Foundation", connection: "No known connection identified", notes: "", status: "No Connection" },
  { id: 13, name: "Hoag Hospital", connection: "No known connection identified", notes: "", status: "No Connection" },
  { id: 14, name: "JPMorgan Chase", connection: "No known connection identified", notes: "", status: "No Connection" },
  { id: 15, name: "Wells Fargo", connection: "No known connection identified", notes: "", status: "No Connection" },
  { id: 16, name: "Ernst & Young", connection: "No known connection identified", notes: "", status: "No Connection" },
  { id: 17, name: "Bank of California", connection: "No known connection identified", notes: "", status: "No Connection" },
  { id: 18, name: "NuVision", connection: "No known connection identified", notes: "", status: "No Connection" },
  { id: 19, name: "Schools First Credit Union", connection: "No known connection identified", notes: "", status: "No Connection" },
  { id: 20, name: "AT&T", connection: "No known connection identified", notes: "", status: "No Connection" },
  { id: 21, name: "Verizon", connection: "No known connection identified", notes: "", status: "No Connection" },
  { id: 22, name: "Southern California Edison (SCE)", connection: "No known connection identified", notes: "", status: "No Connection" },
  { id: 23, name: "SoCalGas", connection: "No known connection identified", notes: "", status: "No Connection" },
  { id: 24, name: "T-Mobile", connection: "No known connection identified", notes: "", status: "No Connection" },
  { id: 25, name: "Republic Waste Management", connection: "No known connection identified", notes: "", status: "No Connection" },
  { id: 26, name: "The Irvine Company", connection: "No known connection identified", notes: "", status: "No Connection" },
  { id: 27, name: "KOLL Company", connection: "No known connection identified", notes: "", status: "No Connection" },
  { id: 28, name: "Kia", connection: "No known connection identified", notes: "", status: "No Connection" },
  { id: 29, name: "Rivian", connection: "No known connection identified", notes: "", status: "No Connection" },
  { id: 30, name: "Tesla", connection: "No known connection identified", notes: "", status: "No Connection" },
  { id: 31, name: "Microsoft", connection: "No known connection identified", notes: "", status: "No Connection" },
  { id: 32, name: "OpenAI", connection: "No known connection identified", notes: "", status: "No Connection" },
  { id: 33, name: "Robinson Pharma", connection: "No known connection identified", notes: "", status: "No Connection" },
  { id: 34, name: "Edwards Life Sciences", connection: "No known connection identified", notes: "", status: "No Connection" },
  { id: 35, name: "Masimo Foundation", connection: "No known connection identified", notes: "", status: "No Connection" },
  { id: 36, name: "Braun McGaw", connection: "No known connection identified", notes: "", status: "No Connection" },
  { id: 37, name: "BD (Becton, Dickinson)", connection: "No known connection identified", notes: "", status: "No Connection" },
  { id: 38, name: "Vivante", connection: "No known connection identified", notes: "", status: "No Connection" },
  { id: 39, name: "Brookdale Senior Living Foundation", connection: "No known connection identified", notes: "", status: "No Connection" },
  { id: 40, name: "Berkshire Hathaway Home Services", connection: "No known connection identified", notes: "", status: "No Connection" },
  { id: 41, name: "Argyros Foundation", connection: "No known connection identified", notes: "", status: "No Connection" }
];

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.03, delayChildren: 0.05 }
  }
};

const cardVariant = {
  hidden: { opacity: 0, y: 16, scale: 0.98 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }
  }
};

export default function Dashboard() {
  const [organizations, setOrganizations] = useState<Organization[]>(initialOrganizations);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingOrg, setEditingOrg] = useState<Organization | null>(null);
  const [editForm, setEditForm] = useState({ connection: "", notes: "", updatedBy: "" });
  const [statusFilter, setStatusFilter] = useState<string>("All");

  // Load from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem("coastline_organizations");
    if (saved) {
      try {
        setOrganizations(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved organizations", e);
      }
    }
  }, []);

  // Save to local storage whenever organizations change
  useEffect(() => {
    localStorage.setItem("coastline_organizations", JSON.stringify(organizations));
  }, [organizations]);

  const handleEdit = (org: Organization) => {
    setEditingOrg(org);
    setEditForm({
      connection: org.connection,
      notes: org.notes,
      updatedBy: org.updatedBy || ""
    });
  };

  const handleSave = () => {
    if (!editingOrg) return;

    const updatedOrgs = organizations.map(org => {
      if (org.id === editingOrg.id) {
        let status: Organization["status"] = "No Connection";
        const connectionText = editForm.connection.toLowerCase();
        
        if (connectionText.includes("strong") || connectionText.includes("direct") || connectionText.includes("close")) {
          status = "Strong";
        } else if (connectionText.includes("know") || connectionText.includes("met") || connectionText.includes("contact")) {
          status = "Identified";
        } else if (connectionText.length > 30 && !connectionText.includes("no known")) {
          status = "Potential";
        }

        return {
          ...org,
          connection: editForm.connection,
          notes: editForm.notes,
          updatedBy: editForm.updatedBy,
          lastUpdated: new Date().toLocaleDateString(),
          status
        };
      }
      return org;
    });

    setOrganizations(updatedOrgs);
    setEditingOrg(null);
  };

  const filteredOrgs = organizations.filter(org => {
    const matchesSearch = org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      org.connection.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || org.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Strong": return "bg-emerald-50 text-emerald-700 border-emerald-200/60";
      case "Identified": return "bg-blue-50 text-blue-700 border-blue-200/60";
      case "Potential": return "bg-amber-50 text-amber-700 border-amber-200/60";
      default: return "bg-slate-50 text-slate-500 border-slate-200/60";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Strong": return <CheckCircle size={12} className="mr-1" />;
      case "Identified": return <User size={12} className="mr-1" />;
      case "Potential": return <Clock size={12} className="mr-1" />;
      default: return <AlertCircle size={12} className="mr-1" />;
    }
  };

  const getCardTopColor = (status: string) => {
    switch (status) {
      case "Strong": return "bg-gradient-to-r from-emerald-400 to-emerald-500";
      case "Identified": return "bg-gradient-to-r from-blue-400 to-blue-500";
      case "Potential": return "bg-gradient-to-r from-amber-400 to-amber-500";
      default: return "bg-slate-200";
    }
  };

  const statuses = ["All", "Strong", "Identified", "Potential", "No Connection"];

  return (
    <div className="flex flex-col min-h-screen bg-[#fafbfd]">
      {/* ── Dashboard Header ── */}
      <div className="bg-[#0A1628] text-white relative overflow-hidden">
        <div className="absolute inset-0 root-pattern opacity-40" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-600/[0.05] rounded-full blur-[100px]" />
        <div className="container relative z-10 py-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.08] backdrop-blur-xl mb-4">
              <span className="text-[12px] font-medium text-blue-200/90 tracking-wide">Board Members Only</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-heading font-bold mb-2">Board Dashboard</h1>
            <p className="text-slate-400 text-sm">Target List & Relationship Management</p>
          </motion.div>
        </div>
      </div>

      {/* ── Controls Bar ── */}
      <div className="sticky top-[72px] z-30 bg-white/90 backdrop-blur-2xl border-b border-slate-200/60 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
        <div className="container py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
              {statuses.map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 whitespace-nowrap ${
                    statusFilter === status
                      ? "bg-slate-900 text-white shadow-sm"
                      : "bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                  }`}
                >
                  {status}
                  <span className="ml-1.5 text-[10px] opacity-60">
                    {status === "All"
                      ? organizations.length
                      : organizations.filter(o => o.status === status).length}
                  </span>
                </button>
              ))}
            </div>
            
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-300 h-4 w-4" />
              <Input 
                placeholder="Search organizations..." 
                className="pl-10 bg-[#fafbfd] border-slate-200/80 focus:bg-white focus:border-blue-300 transition-all rounded-xl text-sm h-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Stats Overview ── */}
      <div className="container pt-8 pb-4">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          {[
            { label: "Total Targets", value: organizations.length, icon: <Building2 size={18} />, color: "text-slate-600", bg: "bg-slate-50" },
            { label: "Strong", value: organizations.filter(o => o.status === "Strong").length, icon: <CheckCircle size={18} />, color: "text-emerald-600", bg: "bg-emerald-50" },
            { label: "Identified", value: organizations.filter(o => o.status === "Identified").length, icon: <User size={18} />, color: "text-blue-600", bg: "bg-blue-50" },
            { label: "Potential", value: organizations.filter(o => o.status === "Potential").length, icon: <Clock size={18} />, color: "text-amber-600", bg: "bg-amber-50" }
          ].map((stat, idx) => (
            <motion.div key={idx} variants={cardVariant}>
              <div className="glass-card rounded-xl p-4 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-[0.1em]">{stat.label}</p>
                  <p className={`text-2xl font-bold ${stat.color} mt-0.5`}>{stat.value}</p>
                </div>
                <div className={`p-2.5 ${stat.bg} rounded-xl ${stat.color}`}>
                  {stat.icon}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ── Organization Grid ── */}
      <main className="flex-1 container py-6 pb-16">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          {filteredOrgs.map((org) => (
            <motion.div key={org.id} variants={cardVariant}>
              <div className="bg-white rounded-xl border border-slate-100/80 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group">
                <div className={`h-[3px] w-full ${getCardTopColor(org.status)}`} />
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-[15px] font-bold text-slate-900 line-clamp-1 pr-2" title={org.name}>
                      {org.name}
                    </h3>
                    <Dialog open={editingOrg?.id === org.id} onOpenChange={(open) => !open && setEditingOrg(null)}>
                      <DialogTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-7 w-7 text-slate-300 hover:text-blue-600 hover:bg-blue-50 -mr-1 flex-shrink-0 rounded-lg"
                          onClick={() => handleEdit(org)}
                        >
                          <Edit2 size={13} />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[500px] rounded-2xl">
                        <DialogHeader>
                          <DialogTitle className="text-lg font-heading">Update: {org.name}</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="space-y-2">
                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-[0.08em]">Connection Details</label>
                            <Textarea 
                              placeholder="Describe any connections or relationships..." 
                              className="min-h-[100px] rounded-xl bg-[#fafbfd] border-slate-200/80 focus:border-blue-300 text-sm"
                              value={editForm.connection}
                              onChange={(e) => setEditForm({...editForm, connection: e.target.value})}
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-[0.08em]">Additional Notes</label>
                            <Textarea 
                              placeholder="Action items, next steps, or strategic value..." 
                              className="rounded-xl bg-[#fafbfd] border-slate-200/80 focus:border-blue-300 text-sm"
                              value={editForm.notes}
                              onChange={(e) => setEditForm({...editForm, notes: e.target.value})}
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-[0.08em]">Updated By</label>
                            <Input 
                              placeholder="Board Member Name" 
                              className="rounded-xl bg-[#fafbfd] border-slate-200/80 focus:border-blue-300 text-sm"
                              value={editForm.updatedBy}
                              onChange={(e) => setEditForm({...editForm, updatedBy: e.target.value})}
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setEditingOrg(null)} className="rounded-xl">Cancel</Button>
                          <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-500 rounded-xl shadow-lg shadow-blue-600/15 btn-premium">
                            <Save size={14} className="mr-2" /> Save Changes
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                  
                  <Badge variant="outline" className={`${getStatusColor(org.status)} border px-2 py-0.5 text-[11px] font-medium flex w-fit items-center rounded-lg mb-3`}>
                    {getStatusIcon(org.status)} {org.status}
                  </Badge>

                  <div>
                    <p className="text-[10px] font-semibold text-slate-300 uppercase tracking-[0.1em] mb-1">Connection</p>
                    <p className="text-xs text-slate-500 line-clamp-2 min-h-[2rem] leading-relaxed">
                      {org.connection === "No known connection identified" ? 
                        <span className="text-slate-300 italic">No known connection identified</span> : 
                        org.connection}
                    </p>
                  </div>
                  
                  {org.notes && (
                    <div className="pt-3 mt-3 border-t border-slate-100/80">
                      <p className="text-[10px] font-semibold text-slate-300 uppercase tracking-[0.1em] mb-1">Notes</p>
                      <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{org.notes}</p>
                    </div>
                  )}
                  
                  {org.lastUpdated && (
                    <div className="pt-3 mt-3 border-t border-slate-100/80 flex items-center justify-between text-[11px] text-slate-300">
                      <span className="flex items-center"><Calendar size={11} className="mr-1" /> {org.lastUpdated}</span>
                      {org.updatedBy && <span className="flex items-center"><User size={11} className="mr-1" /> {org.updatedBy}</span>}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </main>
    </div>
  );
}
