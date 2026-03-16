import { useState } from "react";
import { mockResidents, mockPrompts } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Moon, Users, CheckCircle } from "lucide-react";

const StoryNight = () => {
  const [activeResidents, setActiveResidents] = useState<string[]>([]);
  const [completedSessions, setCompletedSessions] = useState<string[]>([]);
  const [isActive, setIsActive] = useState(false);

  const toggleResident = (id: string) => {
    setActiveResidents(prev => prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]);
  };

  const markComplete = (id: string) => {
    setCompletedSessions(prev => [...prev, id]);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground flex items-center gap-3">
            <Moon className="w-8 h-8 text-secondary" /> Story Night
          </h1>
          <p className="font-body text-muted-foreground mt-1">
            Run a group storytelling session with residents.
          </p>
        </div>
        <Button variant={isActive ? "outline" : "hero"} size="lg" onClick={() => setIsActive(!isActive)}>
          {isActive ? "End Session" : "Start Story Night"}
        </Button>
      </div>

      {!isActive ? (
        <>
          <div className="rounded-2xl bg-card border border-border p-6">
            <h2 className="font-display text-lg font-semibold text-foreground mb-4">Select Residents for Tonight</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {mockResidents.filter(r => r.consentStatus !== "pending").map(r => (
                <button
                  key={r.id}
                  onClick={() => toggleResident(r.id)}
                  className={`flex items-center gap-3 p-4 rounded-xl border text-left transition-all ${
                    activeResidents.includes(r.id)
                      ? "border-secondary bg-secondary/5"
                      : "border-border hover:border-secondary/50"
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-body text-sm font-bold ${
                    activeResidents.includes(r.id) ? "bg-secondary text-secondary-foreground" : "bg-muted text-muted-foreground"
                  }`}>
                    {r.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-body text-sm font-medium text-foreground">{r.name}</p>
                    <p className="font-body text-xs text-muted-foreground">Room {r.roomNumber}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-card border border-border p-6">
            <h2 className="font-display text-lg font-semibold text-foreground mb-4">Tonight's Prompts</h2>
            <div className="space-y-2">
              {mockPrompts.filter(p => p.category === "GENERAL" || p.category === "FAMILY" || p.category === "CHILDHOOD").slice(0, 5).map(p => (
                <div key={p.id} className="p-3 rounded-lg bg-muted/30 border border-border/50 font-body text-sm text-foreground">
                  {p.text}
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="space-y-4">
          <div className="rounded-2xl bg-secondary/5 border border-secondary/20 p-4">
            <p className="font-body text-sm text-secondary font-semibold">🎙️ Story Night is in progress — {activeResidents.length} residents participating</p>
          </div>
          {activeResidents.map(resId => {
            const resident = mockResidents.find(r => r.id === resId);
            const isComplete = completedSessions.includes(resId);
            return (
              <div key={resId} className={`rounded-xl border p-5 flex items-center justify-between ${
                isComplete ? "border-secondary/30 bg-secondary/5" : "border-border bg-card"
              }`}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary font-body text-sm font-bold">
                    {resident?.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-body text-sm font-medium text-foreground">{resident?.name}</p>
                    <p className="font-body text-xs text-muted-foreground">Room {resident?.roomNumber}</p>
                  </div>
                </div>
                {isComplete ? (
                  <span className="flex items-center gap-1 font-body text-sm text-secondary font-medium">
                    <CheckCircle className="w-4 h-4" /> Completed
                  </span>
                ) : (
                  <div className="flex gap-2">
                    <Button variant="hero" size="sm">Record</Button>
                    <Button variant="outline" size="sm" onClick={() => markComplete(resId)}>Done</Button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default StoryNight;
