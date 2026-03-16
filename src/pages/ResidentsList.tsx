import { useState } from "react";
import { mockResidents } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";
import { Link } from "react-router-dom";

const ResidentsList = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "attention">("all");

  const filtered = mockResidents.filter(r => {
    const matchesSearch = r.name.toLowerCase().includes(search.toLowerCase());
    const needsAttention = r.storiesCount === 0 || r.pendingQuestions >= 3;
    return matchesSearch && (filter === "all" || needsAttention);
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">Residents</h1>
          <p className="font-body text-muted-foreground mt-1">{mockResidents.length} residents enrolled</p>
        </div>
        <Link to="/admissions"><Button variant="hero">New Admission</Button></Link>
      </div>

      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-background font-body text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary/50"
            placeholder="Search residents..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button
          variant={filter === "attention" ? "hero" : "outline"}
          onClick={() => setFilter(f => f === "all" ? "attention" : "all")}
        >
          <Filter className="w-4 h-4 mr-2" /> Needs Attention
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(r => (
          <div key={r.id} className="rounded-2xl bg-card border border-border p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary font-display text-lg font-bold">
                {r.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-body text-sm font-semibold text-foreground">{r.name}</h3>
                <p className="font-body text-xs text-muted-foreground">Room {r.roomNumber}</p>
              </div>
              <span className={`ml-auto text-xs font-body font-semibold px-2 py-0.5 rounded-full ${
                r.consentStatus === "self" ? "bg-green-100 text-green-700" :
                r.consentStatus === "representative" ? "bg-blue-100 text-blue-700" :
                "bg-amber-100 text-amber-700"
              }`}>
                {r.consentStatus}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="text-center">
                <p className="font-display text-lg font-bold text-foreground">{r.storiesCount}</p>
                <p className="font-body text-xs text-muted-foreground">Stories</p>
              </div>
              <div className="text-center">
                <p className="font-display text-lg font-bold text-foreground">{r.pendingQuestions}</p>
                <p className="font-body text-xs text-muted-foreground">Pending Qs</p>
              </div>
              <div className="text-center">
                <p className="font-display text-lg font-bold text-foreground">{r.familyConnections}</p>
                <p className="font-body text-xs text-muted-foreground">Family</p>
              </div>
            </div>
            <p className="font-body text-xs text-muted-foreground mb-3">
              Last story: {r.lastStoryDate || "Never recorded"}
            </p>
            <div className="flex gap-2">
              <Link to={`/residents/${r.id}`}><Button variant="outline" size="sm" className="w-full font-body">View Profile</Button></Link>
              <Link to="/record" className="flex-1">
                <Button variant="hero" size="sm" className="w-full font-body">Record</Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResidentsList;
