import { useState } from "react";
import { mockPrompts, Prompt } from "@/data/mockData";
import { useAuth } from "@/contexts/AuthContext";
import { BookOpen, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const categories = [
  { key: "ALL", label: "All" },
  { key: "CHILDHOOD", label: "Childhood" },
  { key: "FAMILY", label: "Family" },
  { key: "WORK", label: "Work & Purpose" },
  { key: "HISTORY", label: "History" },
  { key: "WISDOM", label: "Wisdom" },
  { key: "LEGACY", label: "Legacy" },
  { key: "OT", label: "OT" },
  { key: "SLP", label: "SLP" },
  { key: "RT", label: "RT" },
  { key: "HOSPICE", label: "Hospice" },
  { key: "GRATITUDE", label: "Gratitude" },
  { key: "FAITH", label: "Faith & Meaning" },
];

const PromptLibrary = () => {
  const { user } = useAuth();
  const [selectedCat, setSelectedCat] = useState("ALL");
  const [search, setSearch] = useState("");

  const filtered = mockPrompts.filter(p => {
    const matchesCat = selectedCat === "ALL" || p.category === selectedCat;
    const matchesSearch = p.text.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  // Group by category
  const grouped = filtered.reduce((acc, p) => {
    if (!acc[p.category]) acc[p.category] = [];
    acc[p.category].push(p);
    return acc;
  }, {} as Record<string, Prompt[]>);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold text-foreground">Prompt Library</h1>
        <p className="font-body text-muted-foreground mt-1">
          {mockPrompts.length} curated prompts to inspire meaningful conversations
        </p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-background font-body text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary/50"
          placeholder="Search prompts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map(c => (
          <Button
            key={c.key}
            variant={selectedCat === c.key ? "hero" : "outline"}
            size="sm"
            onClick={() => setSelectedCat(c.key)}
          >
            {c.label}
          </Button>
        ))}
      </div>

      <div className="space-y-8">
        {Object.entries(grouped).map(([category, prompts]) => (
          <div key={category}>
            <h2 className="font-display text-lg font-semibold text-foreground mb-3 capitalize">
              {category.replace("_", " ")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {prompts.map(p => (
                <div key={p.id} className="rounded-xl bg-card border border-border p-4 hover:shadow-sm transition-shadow flex items-start gap-3">
                  <BookOpen className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-body text-sm text-foreground">{p.text}</p>
                    <div className="flex gap-2 mt-2">
                      <span className="font-body text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">{p.source}</span>
                    </div>
                  </div>
                  {user?.role === "family" && (
                    <Button variant="outline" size="sm" className="font-body flex-shrink-0">Ask This</Button>
                  )}
                  {(user?.role === "staff" || user?.role === "resident") && (
                    <Button variant="outline" size="sm" className="font-body flex-shrink-0">Use</Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PromptLibrary;
