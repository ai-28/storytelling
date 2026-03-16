import { mockAnalytics, mockResidents, mockFamilyConnections } from "@/data/mockData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const COLORS = ["hsl(220 40% 20%)", "hsl(35 60% 52%)", "hsl(220 35% 45%)", "hsl(35 40% 65%)"];

const Analytics = () => {
  const a = mockAnalytics;

  const consentData = [
    { name: "Self", value: mockResidents.filter(r => r.consentStatus === "self").length },
    { name: "Representative", value: mockResidents.filter(r => r.consentStatus === "representative").length },
    { name: "Pending", value: mockResidents.filter(r => r.consentStatus === "pending").length },
  ];

  const familyEngagement = mockResidents.map(r => ({
    name: r.name.split(" ")[0],
    family: r.familyConnections,
    stories: r.storiesCount,
    questions: r.pendingQuestions,
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">Analytics</h1>
          <p className="font-body text-muted-foreground mt-1">Facility-wide engagement and usage data</p>
        </div>
        <Button variant="outline" className="font-body">
          <Download className="w-4 h-4 mr-2" /> Export CSV
        </Button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat label="Total Stories" value={String(a.totalStories)} change="+13%" />
        <Stat label="Questions This Month" value={String(a.questionsAskedThisMonth)} change="+25%" />
        <Stat label="Family Accounts" value={String(a.totalFamilyAccounts)} change="+8%" />
        <Stat label="Engagement Rate" value={`${a.engagementRate}%`} change="+5%" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-2xl bg-card border border-border p-6">
          <h2 className="font-display text-lg font-semibold text-foreground mb-4">Monthly Trends</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={a.monthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(35 20% 88%)" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fontFamily: "Inter" }} />
                <YAxis tick={{ fontSize: 12, fontFamily: "Inter" }} />
                <Tooltip contentStyle={{ fontFamily: "Inter", fontSize: 12 }} />
                <Bar dataKey="stories" fill="hsl(220 40% 20%)" radius={[4, 4, 0, 0]} name="Stories" />
                <Bar dataKey="questions" fill="hsl(35 60% 52%)" radius={[4, 4, 0, 0]} name="Questions" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl bg-card border border-border p-6">
          <h2 className="font-display text-lg font-semibold text-foreground mb-4">Consent Status</h2>
          <div className="h-72 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={consentData} cx="50%" cy="50%" outerRadius={100} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                  {consentData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ fontFamily: "Inter", fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="rounded-2xl bg-card border border-border p-6">
        <h2 className="font-display text-lg font-semibold text-foreground mb-4">Per-Resident Engagement</h2>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={familyEngagement}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(35 20% 88%)" />
              <XAxis dataKey="name" tick={{ fontSize: 12, fontFamily: "Inter" }} />
              <YAxis tick={{ fontSize: 12, fontFamily: "Inter" }} />
              <Tooltip contentStyle={{ fontFamily: "Inter", fontSize: 12 }} />
              <Bar dataKey="stories" fill="hsl(220 40% 20%)" name="Stories" radius={[4, 4, 0, 0]} />
              <Bar dataKey="family" fill="hsl(35 60% 52%)" name="Family Connected" radius={[4, 4, 0, 0]} />
              <Bar dataKey="questions" fill="hsl(220 35% 45%)" name="Pending Questions" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

const Stat = ({ label, value, change }: { label: string; value: string; change: string }) => (
  <div className="rounded-xl bg-card border border-border p-5">
    <p className="font-body text-xs text-muted-foreground uppercase tracking-wider mb-1">{label}</p>
    <div className="flex items-baseline gap-2">
      <p className="font-display text-2xl font-bold text-foreground">{value}</p>
      <span className="font-body text-xs text-green-600 font-medium">{change}</span>
    </div>
  </div>
);

export default Analytics;
