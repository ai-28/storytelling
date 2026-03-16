import { Users, Video, MessageCircleQuestion, TrendingUp, DollarSign, BarChart3 } from "lucide-react";
import { mockOrg, mockAnalytics } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

const AdminDashboard = () => {
  const a = mockAnalytics;

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">Facility Overview</h1>
          <p className="font-body text-muted-foreground mt-1">{mockOrg.name}</p>
        </div>
        <Button variant="outline" className="font-body">Export CSV</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard icon={Users} label="Total Residents" value={String(a.totalResidents)} />
        <StatCard icon={Video} label="Total Stories" value={String(a.totalStories)} />
        <StatCard icon={Users} label="Family Accounts" value={String(a.totalFamilyAccounts)} />
        <StatCard icon={MessageCircleQuestion} label="Qs This Month" value={String(a.questionsAskedThisMonth)} />
        <StatCard icon={TrendingUp} label="Engagement" value={`${a.engagementRate}%`} accent />
        <StatCard icon={DollarSign} label="Monthly Bill" value={`$${a.totalResidents * 10}`} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-2xl bg-card border border-border p-6">
          <h2 className="font-display text-lg font-semibold text-foreground mb-4">Stories & Questions Trend</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={a.monthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(35 20% 88%)" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fontFamily: "Inter" }} stroke="hsl(220 15% 45%)" />
                <YAxis tick={{ fontSize: 12, fontFamily: "Inter" }} stroke="hsl(220 15% 45%)" />
                <Tooltip contentStyle={{ fontFamily: "Inter", fontSize: 12 }} />
                <Bar dataKey="stories" fill="hsl(220 40% 20%)" radius={[4, 4, 0, 0]} name="Stories" />
                <Bar dataKey="questions" fill="hsl(35 60% 52%)" radius={[4, 4, 0, 0]} name="Questions" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl bg-card border border-border p-6">
          <h2 className="font-display text-lg font-semibold text-foreground mb-4">Engagement Over Time</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={a.monthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(35 20% 88%)" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fontFamily: "Inter" }} stroke="hsl(220 15% 45%)" />
                <YAxis tick={{ fontSize: 12, fontFamily: "Inter" }} stroke="hsl(220 15% 45%)" />
                <Tooltip contentStyle={{ fontFamily: "Inter", fontSize: 12 }} />
                <Line type="monotone" dataKey="stories" stroke="hsl(220 40% 20%)" strokeWidth={2} name="Stories" />
                <Line type="monotone" dataKey="questions" stroke="hsl(35 60% 52%)" strokeWidth={2} name="Questions" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-2xl bg-card border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg font-semibold text-foreground">Billing Summary</h2>
            <Link to="/billing"><Button variant="ghost" size="sm" className="font-body text-secondary">Manage</Button></Link>
          </div>
          <div className="space-y-3 font-body text-sm">
            <div className="flex justify-between py-2 border-b border-border/50">
              <span className="text-muted-foreground">Plan Type</span>
              <span className="font-medium text-foreground">{mockOrg.type} — ${mockOrg.type === "SNF" ? 10 : mockOrg.type === "AL" ? 8 : 15}/resident/mo</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border/50">
              <span className="text-muted-foreground">Active Residents</span>
              <span className="font-medium text-foreground">{mockOrg.residentsCount}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border/50">
              <span className="text-muted-foreground">Monthly Total</span>
              <span className="font-bold text-foreground">${mockOrg.residentsCount * 10}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-muted-foreground">Status</span>
              <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-semibold capitalize">{mockOrg.billingStatus}</span>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-card border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg font-semibold text-foreground">Quick Actions</h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Link to="/admissions"><Button variant="outline" className="w-full h-auto py-4 flex-col gap-1 font-body"><Users className="w-5 h-5" /><span className="text-xs">New Admission</span></Button></Link>
            <Link to="/staff"><Button variant="outline" className="w-full h-auto py-4 flex-col gap-1 font-body"><Users className="w-5 h-5" /><span className="text-xs">Manage Staff</span></Button></Link>
            <Link to="/analytics"><Button variant="outline" className="w-full h-auto py-4 flex-col gap-1 font-body"><BarChart3 className="w-5 h-5" /><span className="text-xs">Full Analytics</span></Button></Link>
            <Link to="/billing"><Button variant="outline" className="w-full h-auto py-4 flex-col gap-1 font-body"><DollarSign className="w-5 h-5" /><span className="text-xs">Billing Portal</span></Button></Link>
          </div>
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

export default AdminDashboard;
