import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, MessageCircleQuestion, Users, Send, CheckCircle, Sparkles } from "lucide-react";
import { mockFamilyConnections, mockResidents } from "@/data/mockData";

const mockPassForwards = [
  { id: "pf-1", fromName: "Eleanor Thompson", toName: "Michael Thompson", question: "Dad, what was it like raising us on the farm?", status: "PENDING", createdAt: "2025-03-14" },
  { id: "pf-2", fromName: "Eleanor Thompson", toName: "Lisa Chen", question: "Lisa, can you tell the kids about how you and Michael met from your perspective?", status: "ANSWERED", createdAt: "2025-03-10" },
  { id: "pf-3", fromName: "Robert Chen", toName: "David Chen", question: "Son, what memories do you have of our first years in America?", status: "PENDING", createdAt: "2025-03-12" },
];

const AnswerMeNext = () => {
  const [showCreate, setShowCreate] = useState(false);
  const [tab, setTab] = useState<"pending" | "answered">("pending");

  const filtered = mockPassForwards.filter(p =>
    tab === "pending" ? p.status === "PENDING" : p.status === "ANSWERED"
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-secondary" /> Answer Me Next
          </h1>
          <p className="font-body text-muted-foreground mt-1">
            Pass a question forward to another family member after recording a story.
          </p>
        </div>
        <Button variant="hero" onClick={() => setShowCreate(!showCreate)}>
          <ArrowRight className="w-4 h-4 mr-2" /> Pass a Question
        </Button>
      </div>

      {/* Phase 2 Banner */}
      <div className="rounded-xl bg-secondary/5 border border-secondary/20 p-4">
        <p className="font-body text-sm text-secondary font-medium">
          ✨ Phase 2 Feature — After recording a story, the storyteller can pass a question to another family member, 
          creating a branching conversation across generations.
        </p>
      </div>

      {/* How it works */}
      <div className="rounded-2xl bg-card border border-border p-6">
        <h2 className="font-display text-lg font-semibold text-foreground mb-4">How It Works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="text-center p-4">
            <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary mx-auto mb-3">
              <MessageCircleQuestion className="w-6 h-6" />
            </div>
            <h3 className="font-body text-sm font-semibold text-foreground mb-1">1. Record a Story</h3>
            <p className="font-body text-xs text-muted-foreground">
              After answering a family question, the storyteller is prompted to pass a question forward.
            </p>
          </div>
          <div className="text-center p-4">
            <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary mx-auto mb-3">
              <ArrowRight className="w-6 h-6" />
            </div>
            <h3 className="font-body text-sm font-semibold text-foreground mb-1">2. Pass It Forward</h3>
            <p className="font-body text-xs text-muted-foreground">
              Choose a family member and ask them a question. They receive a notification with the original story.
            </p>
          </div>
          <div className="text-center p-4">
            <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary mx-auto mb-3">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-body text-sm font-semibold text-foreground mb-1">3. Growing Archive</h3>
            <p className="font-body text-xs text-muted-foreground">
              The family member records their answer, creating a branching conversation thread across generations.
            </p>
          </div>
        </div>
      </div>

      {/* Create */}
      {showCreate && (
        <div className="rounded-2xl bg-card border border-secondary/20 p-6 space-y-4">
          <h2 className="font-display text-lg font-semibold text-foreground">Pass a Question Forward</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="font-body">Select Family Member</Label>
              <select className="w-full h-10 rounded-md border border-input bg-background px-3 font-body text-sm">
                {mockFamilyConnections.filter(fc => fc.inviteStatus === "accepted").map(fc => (
                  <option key={fc.id}>{fc.userName} ({fc.relationship})</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label className="font-body">Connected Resident</Label>
              <select className="w-full h-10 rounded-md border border-input bg-background px-3 font-body text-sm">
                {mockResidents.map(r => (
                  <option key={r.id}>{r.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="space-y-2">
            <Label className="font-body">Your Question</Label>
            <Input placeholder="Ask them something meaningful..." className="font-body" />
          </div>
          <div className="flex gap-2">
            <Button variant="hero"><Send className="w-4 h-4 mr-2" /> Send Question</Button>
            <Button variant="outline" onClick={() => setShowCreate(false)}>Cancel</Button>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2">
        <Button variant={tab === "pending" ? "hero" : "outline"} size="sm" onClick={() => setTab("pending")}>
          Pending ({mockPassForwards.filter(p => p.status === "PENDING").length})
        </Button>
        <Button variant={tab === "answered" ? "hero" : "outline"} size="sm" onClick={() => setTab("answered")}>
          Answered ({mockPassForwards.filter(p => p.status === "ANSWERED").length})
        </Button>
      </div>

      {/* Pass Forward List */}
      <div className="space-y-3">
        {filtered.map(pf => (
          <div key={pf.id} className="rounded-xl bg-card border border-border p-5">
            <div className="flex items-start gap-4">
              <div className="flex items-center gap-2 flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-body text-xs font-bold">
                  {pf.fromName.charAt(0)}
                </div>
                <ArrowRight className="w-4 h-4 text-secondary" />
                <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary font-body text-xs font-bold">
                  {pf.toName.charAt(0)}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-body text-sm font-medium text-foreground">"{pf.question}"</p>
                <p className="font-body text-xs text-muted-foreground mt-1">
                  From {pf.fromName} → To {pf.toName} · {pf.createdAt}
                </p>
              </div>
              {pf.status === "ANSWERED" ? (
                <span className="flex items-center gap-1 font-body text-xs font-semibold text-green-700 bg-green-100 px-2 py-1 rounded-full">
                  <CheckCircle className="w-3 h-3" /> Answered
                </span>
              ) : (
                <Button variant="outline" size="sm" className="font-body">Remind</Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnswerMeNext;
