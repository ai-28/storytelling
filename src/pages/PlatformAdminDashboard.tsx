import { Building2, Users, Video, DollarSign, TrendingUp, AlertTriangle, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const mockOrgs = [
  { id: "org-1", name: "Sunrise Senior Living — Mountain View", type: "SNF", residents: 47, stories: 312, families: 186, status: "active", mrr: 500 },
  { id: "org-2", name: "Golden Oaks Assisted Living", type: "AL", residents: 32, stories: 145, families: 94, status: "active", mrr: 500 },
  { id: "org-3", name: "Peaceful Horizons Hospice", type: "HOSPICE", residents: 18, stories: 89, families: 52, status: "active", mrr: 500 },
  { id: "org-4", name: "Lakewood Senior Center", type: "SNF", residents: 62, stories: 0, families: 0, status: "pending", mrr: 0 },
];

const platformStats = {
  totalOrgs: 4,
  totalResidents: 159,
  totalStories: 546,
  totalFamilyAccounts: 332,
  totalMRR: 1500,
  monthlyGrowth: [
    { month: "Oct", orgs: 1, residents: 35, stories: 45 },
    { month: "Nov", orgs: 2, residents: 65, stories: 98 },
    { month: "Dec", orgs: 2, residents: 78, stories: 156 },
    { month: "Jan", orgs: 3, residents: 97, stories: 245 },
    { month: "Feb", orgs: 3, residents: 125, stories: 389 },
    { month: "Mar", orgs: 4, residents: 159, stories: 546 },
  ],
};

const PlatformAdminDashboard = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">Platform Overview</h1>
          <p className="font-body text-muted-foreground mt-1">Observe Life — All Facilities</p>
        </div>
        <Button variant="hero"><Plus className="w-4 h-4 mr-2" /> Add Organization</Button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <StatCard icon={Building2} label="Organizations" value={String(platformStats.totalOrgs)} />
        <StatCard icon={Users} label="Total Residents" value={String(platformStats.totalResidents)} />
        <StatCard icon={Video} label="Total Stories" value={String(platformStats.totalStories)} />
        <StatCard icon={Users} label="Family Accounts" value={String(platformStats.totalFamilyAccounts)} />
        <StatCard icon={DollarSign} label="Monthly Revenue" value={`$${platformStats.totalMRR}`} accent />
      </div>

      <div className="rounded-2xl bg-card border border-border p-6">
        <h2 className="font-display text-lg font-semibold text-foreground mb-4">Growth Trends</h2>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={platformStats.monthlyGrowth}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(35 20% 88%)" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fontFamily: "Inter" }} />
              <YAxis tick={{ fontSize: 12, fontFamily: "Inter" }} />
              <Tooltip contentStyle={{ fontFamily: "Inter", fontSize: 12 }} />
              <Bar dataKey="residents" fill="hsl(220 40% 20%)" radius={[4, 4, 0, 0]} name="Residents" />
              <Bar dataKey="stories" fill="hsl(35 60% 52%)" radius={[4, 4, 0, 0]} name="Stories" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div>
        <h2 className="font-display text-xl font-semibold text-foreground mb-4">All Organizations</h2>
        <div className="space-y-4">
          {mockOrgs.map(org => (
            <div key={org.id} className="rounded-xl bg-card border border-border p-5 hover:shadow-sm transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-body text-sm font-semibold text-foreground">{org.name}</h3>
                    <p className="font-body text-xs text-muted-foreground">
                      {org.type} · {org.residents} residents · {org.families} family accounts
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="font-display text-lg font-bold text-foreground">{org.stories}</p>
                    <p className="font-body text-xs text-muted-foreground">stories</p>
                  </div>
                  <div className="text-right">
                    <p className="font-display text-lg font-bold text-foreground">${org.mrr}</p>
                    <p className="font-body text-xs text-muted-foreground">MRR</p>
                  </div>
                  <span className={`font-body text-xs font-semibold px-2 py-1 rounded-full ${
                    org.status === "active" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                  }`}>
                    {org.status}
                  </span>
                  <Button variant="outline" size="sm" className="font-body">Manage</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon: Icon, label, value, accent }: { icon: React.ElementType; label: string; value: string; accent?: boolean }) => (
  <div className="rounded-xl bg-card border border-border p-4">
    <Icon className={`w-5 h-5 mb-2 ${accent ? "text-secondary" : "text-muted-foreground"}`} />
    <p className="font-display text-xl font-bold text-foreground">{value}</p>
    <p className="font-body text-xs text-muted-foreground">{label}</p>
  </div>
);

export default PlatformAdminDashboard;
