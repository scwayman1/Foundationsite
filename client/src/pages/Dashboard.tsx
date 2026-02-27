import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Edit2, Save, Building2, User, Calendar, CheckCircle, AlertCircle, Clock } from "lucide-react";
import { useState, useEffect } from "react";

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

export default function Dashboard() {
  const [organizations, setOrganizations] = useState<Organization[]>(initialOrganizations);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingOrg, setEditingOrg] = useState<Organization | null>(null);
  const [editForm, setEditForm] = useState({ connection: "", notes: "", updatedBy: "" });

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
        // Determine status based on connection text
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

  const filteredOrgs = organizations.filter(org => 
    org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    org.connection.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Strong": return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "Identified": return "bg-blue-100 text-blue-700 border-blue-200";
      case "Potential": return "bg-amber-100 text-amber-700 border-amber-200";
      default: return "bg-slate-100 text-slate-600 border-slate-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Strong": return <CheckCircle size={14} className="mr-1" />;
      case "Identified": return <User size={14} className="mr-1" />;
      case "Potential": return <Clock size={14} className="mr-1" />;
      default: return <AlertCircle size={14} className="mr-1" />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="container py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h1 className="text-2xl font-heading font-bold text-slate-900">Board Dashboard</h1>
              <p className="text-sm text-slate-500">Target List & Relationship Management</p>
            </div>
            
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <Input 
                  placeholder="Search organizations..." 
                  className="pl-9 bg-slate-50 border-slate-200 focus:bg-white transition-colors"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon" className="shrink-0">
                <Filter className="h-4 w-4 text-slate-600" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-none shadow-sm bg-white">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase">Total Targets</p>
                <p className="text-2xl font-bold text-slate-900">{organizations.length}</p>
              </div>
              <div className="p-2 bg-slate-100 rounded-lg text-slate-600">
                <Building2 size={20} />
              </div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-sm bg-white">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase">Strong Connections</p>
                <p className="text-2xl font-bold text-emerald-600">
                  {organizations.filter(o => o.status === "Strong").length}
                </p>
              </div>
              <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600">
                <CheckCircle size={20} />
              </div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-sm bg-white">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase">Identified</p>
                <p className="text-2xl font-bold text-blue-600">
                  {organizations.filter(o => o.status === "Identified").length}
                </p>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                <User size={20} />
              </div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-sm bg-white">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase">Potential</p>
                <p className="text-2xl font-bold text-amber-600">
                  {organizations.filter(o => o.status === "Potential").length}
                </p>
              </div>
              <div className="p-2 bg-amber-100 rounded-lg text-amber-600">
                <Clock size={20} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Organization Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOrgs.map((org) => (
            <Card key={org.id} className="border-none shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden group">
              <div className={`h-1 w-full ${
                org.status === "Strong" ? "bg-emerald-500" : 
                org.status === "Identified" ? "bg-blue-500" : 
                org.status === "Potential" ? "bg-amber-500" : "bg-slate-200"
              }`}></div>
              <CardHeader className="pb-2 pt-4 px-5 flex flex-row items-start justify-between space-y-0">
                <CardTitle className="text-lg font-bold text-slate-900 line-clamp-1" title={org.name}>
                  {org.name}
                </CardTitle>
                <Dialog open={editingOrg?.id === org.id} onOpenChange={(open) => !open && setEditingOrg(null)}>
                  <DialogTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-slate-400 hover:text-blue-600 hover:bg-blue-50 -mr-2"
                      onClick={() => handleEdit(org)}
                    >
                      <Edit2 size={16} />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle>Update Connection: {org.name}</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Connection Details</label>
                        <Textarea 
                          placeholder="Describe any connections or relationships..." 
                          className="min-h-[100px]"
                          value={editForm.connection}
                          onChange={(e) => setEditForm({...editForm, connection: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Additional Notes</label>
                        <Textarea 
                          placeholder="Action items, next steps, or strategic value..." 
                          value={editForm.notes}
                          onChange={(e) => setEditForm({...editForm, notes: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Updated By (Your Name)</label>
                        <Input 
                          placeholder="Board Member Name" 
                          value={editForm.updatedBy}
                          onChange={(e) => setEditForm({...editForm, updatedBy: e.target.value})}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setEditingOrg(null)}>Cancel</Button>
                      <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
                        <Save size={16} className="mr-2" /> Save Changes
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent className="px-5 pb-5">
                <div className="mb-4">
                  <Badge variant="outline" className={`${getStatusColor(org.status)} border px-2 py-0.5 text-xs font-medium flex w-fit items-center`}>
                    {getStatusIcon(org.status)} {org.status}
                  </Badge>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <p className="text-xs font-medium text-slate-500 uppercase mb-1">Connection</p>
                    <p className="text-sm text-slate-700 line-clamp-2 min-h-[2.5rem]">
                      {org.connection === "No known connection identified" ? 
                        <span className="text-slate-400 italic">No known connection identified</span> : 
                        org.connection}
                    </p>
                  </div>
                  
                  {org.notes && (
                    <div className="pt-2 border-t border-slate-100">
                      <p className="text-xs font-medium text-slate-500 uppercase mb-1">Notes</p>
                      <p className="text-sm text-slate-600 line-clamp-2">{org.notes}</p>
                    </div>
                  )}
                  
                  {org.lastUpdated && (
                    <div className="pt-2 flex items-center justify-between text-xs text-slate-400">
                      <span className="flex items-center"><Calendar size={12} className="mr-1" /> {org.lastUpdated}</span>
                      {org.updatedBy && <span className="flex items-center"><User size={12} className="mr-1" /> {org.updatedBy}</span>}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
