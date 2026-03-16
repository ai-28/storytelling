import { Users, MessageCircleQuestion, Video, AlertTriangle } from "lucide-react";
import { mockResidents, mockQuestions, mockOrg } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const StaffDashboard = () => {
  const pendingQuestions = mockQuestions.filter(q => q.status === "PENDING");
  const needsAttention = mockResidents.filter(
    r => r.storiesCount === 0 || r.pendingQuestions >= 3 || (r.lastStoryDate && new Date(r.lastStoryDate) < new Date(Date.now() - 30 * 24 * 60 * 60 * 1000))
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold text-foreground">Good morning, Maria</h1>
        <p className="font-body text-muted-foreground mt-1">{mockOrg.name} · {mockOrg.residentsCount} residents</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Users} label="Active Residents" value={String(mockResidents.length)} />
        <StatCard icon={MessageCircleQuestion} label="Pending Questions" value={String(pendingQuestions.length)} accent />
        <StatCard icon={AlertTriangle} label="Needs Attention" value={String(needsAttention.length)} warn />
        <StatCard icon={Video} label="Stories This Week" value="8" />
      </div>

      {needsAttention.length > 0 && (
        <div className="rounded-2xl bg-destructive/5 border border-destructive/20 p-6">
          <h2 className="font-display text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-destructive" /> Residents Needing Attention
          </h2>
          <div className="space-y-2">
            {needsAttention.map(r => (
              <div key={r.id} className="flex items-center justify-between p-3 rounded-lg bg-background border border-border/50">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center font-body text-xs font-bold text-muted-foreground">
                    {r.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-body text-sm font-medium text-foreground">{r.name}</p>
                    <p className="font-body text-xs text-muted-foreground">
                      Room {r.roomNumber} · {r.storiesCount} stories · {r.pendingQuestions} pending Qs
                    </p>
                  </div>
                </div>
                <Link to="/record">
                  <Button variant="outline" size="sm" className="font-body">Quick Record</Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="rounded-2xl bg-card border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-xl font-semibold text-foreground">All Residents</h2>
          <Link to="/residents">
            <Button variant="ghost" size="sm" className="font-body text-secondary">View All</Button>
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left font-body text-xs font-semibold text-muted-foreground uppercase tracking-wider py-3 px-2">Resident</th>
                <th className="text-left font-body text-xs font-semibold text-muted-foreground uppercase tracking-wider py-3 px-2">Room</th>
                <th className="text-left font-body text-xs font-semibold text-muted-foreground uppercase tracking-wider py-3 px-2">Stories</th>
                <th className="text-left font-body text-xs font-semibold text-muted-foreground uppercase tracking-wider py-3 px-2">Pending Qs</th>
                <th className="text-left font-body text-xs font-semibold text-muted-foreground uppercase tracking-wider py-3 px-2">Last Story</th>
                <th className="text-left font-body text-xs font-semibold text-muted-foreground uppercase tracking-wider py-3 px-2">Family</th>
              </tr>
            </thead>
            <tbody>
              {mockResidents.map(r => (
                <tr key={r.id} className="border-b border-border/50 hover:bg-muted/30 cursor-pointer">
                  <td className="py-3 px-2 font-body text-sm font-medium text-foreground">{r.name}</td>
                  <td className="py-3 px-2 font-body text-sm text-muted-foreground">{r.roomNumber}</td>
                  <td className="py-3 px-2 font-body text-sm text-muted-foreground">{r.storiesCount}</td>
                  <td className="py-3 px-2">
                    {r.pendingQuestions > 0 ? (
                      <span className="font-body text-xs font-semibold bg-secondary/10 text-secondary px-2 py-0.5 rounded-full">{r.pendingQuestions}</span>
                    ) : (
                      <span className="font-body text-sm text-muted-foreground">0</span>
                    )}
                  </td>
                  <td className="py-3 px-2 font-body text-sm text-muted-foreground">{r.lastStoryDate || "Never"}</td>
                  <td className="py-3 px-2 font-body text-sm text-muted-foreground">{r.familyConnections}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon: Icon, label, value, accent, warn }: { icon: React.ElementType; label: string; value: string; accent?: boolean; warn?: boolean }) => (
  <div className="rounded-xl bg-card border border-border p-5">
    <div className="flex items-center gap-3">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${warn ? "bg-destructive/10 text-destructive" : accent ? "bg-secondary/10 text-secondary" : "bg-muted text-muted-foreground"}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="font-display text-2xl font-bold text-foreground">{value}</p>
        <p className="font-body text-xs text-muted-foreground">{label}</p>
      </div>
    </div>
  </div>
);

export default StaffDashboard;
