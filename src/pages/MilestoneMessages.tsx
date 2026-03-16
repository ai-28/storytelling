import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Gift, Lock, Clock, Calendar, Heart, GraduationCap, Baby, Star, Plus } from "lucide-react";

const occasions = [
  { key: "WEDDING", label: "Wedding", icon: Heart },
  { key: "GRADUATION", label: "Graduation", icon: GraduationCap },
  { key: "BIRTHDAY_18", label: "18th Birthday", icon: Gift },
  { key: "BIRTHDAY_21", label: "21st Birthday", icon: Gift },
  { key: "BIRTH_OF_CHILD", label: "Birth of a Child", icon: Baby },
  { key: "MEMORIAL", label: "Memorial", icon: Star },
  { key: "CUSTOM_DATE", label: "Custom Date", icon: Calendar },
];

const mockMilestones = [
  { id: "mm-1", residentName: "Eleanor Thompson", recipientName: "Sarah Thompson", occasion: "WEDDING", occasionDate: "2026-06-15", unlockStatus: "LOCKED", createdAt: "2025-03-10", storyTitle: "A message for your wedding day" },
  { id: "mm-2", residentName: "Eleanor Thompson", recipientName: "Tom Thompson", occasion: "GRADUATION", occasionDate: "2027-05-20", unlockStatus: "LOCKED", createdAt: "2025-03-12", storyTitle: "Words of wisdom for your future" },
  { id: "mm-3", residentName: "Dorothy Williams", recipientName: "Grace Williams", occasion: "BIRTHDAY_18", occasionDate: "2025-12-01", unlockStatus: "LOCKED", createdAt: "2025-02-28", storyTitle: "Welcome to adulthood, my dear" },
];

const MilestoneMessages = () => {
  const [showCreate, setShowCreate] = useState(false);
  const [selectedOccasion, setSelectedOccasion] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground flex items-center gap-3">
            <Gift className="w-8 h-8 text-secondary" /> Milestone Messages
          </h1>
          <p className="font-body text-muted-foreground mt-1">
            Time-locked messages for delivery at future life occasions.
          </p>
        </div>
        <Button variant="hero" onClick={() => setShowCreate(!showCreate)}>
          <Plus className="w-4 h-4 mr-2" /> Create Message
        </Button>
      </div>

      {/* Phase 2 Banner */}
      <div className="rounded-xl bg-secondary/5 border border-secondary/20 p-4">
        <p className="font-body text-sm text-secondary font-medium">
          ✨ Phase 2 Feature — Record a message today for someone special to receive on a future occasion. 
          The recipient will be notified when the date arrives.
        </p>
      </div>

      {/* Create New */}
      {showCreate && (
        <div className="rounded-2xl bg-card border border-secondary/20 p-6 space-y-5">
          <h2 className="font-display text-lg font-semibold text-foreground">Create Milestone Message</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="font-body">Recipient Name</Label>
              <Input placeholder="Who is this message for?" className="font-body" />
            </div>
            <div className="space-y-2">
              <Label className="font-body">Recipient Email</Label>
              <Input placeholder="Their email address" className="font-body" />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="font-body">Occasion</Label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {occasions.map(o => (
                <button
                  key={o.key}
                  onClick={() => setSelectedOccasion(o.key)}
                  className={`flex items-center gap-2 p-3 rounded-lg border text-left font-body text-sm transition-all ${
                    selectedOccasion === o.key
                      ? "border-secondary bg-secondary/10 text-foreground"
                      : "border-border hover:border-secondary/50 text-muted-foreground"
                  }`}
                >
                  <o.icon className="w-4 h-4" /> {o.label}
                </button>
              ))}
            </div>
          </div>
          {selectedOccasion === "CUSTOM_DATE" && (
            <div className="space-y-2">
              <Label className="font-body">Delivery Date</Label>
              <Input type="date" className="font-body w-48" />
            </div>
          )}
          {selectedOccasion && selectedOccasion !== "CUSTOM_DATE" && (
            <div className="space-y-2">
              <Label className="font-body">Expected Date (optional)</Label>
              <Input type="date" className="font-body w-48" />
              <p className="font-body text-xs text-muted-foreground">
                If you don't know the exact date, you can set it later.
              </p>
            </div>
          )}
          <div className="space-y-2">
            <Label className="font-body">Message Title</Label>
            <Input placeholder="Give your message a title..." className="font-body" />
          </div>
          <div className="flex gap-3">
            <Button variant="hero">Record Message</Button>
            <Button variant="outline" onClick={() => setShowCreate(false)}>Cancel</Button>
          </div>
        </div>
      )}

      {/* Existing Milestones */}
      <div className="space-y-4">
        <h2 className="font-display text-xl font-semibold text-foreground">Scheduled Messages</h2>
        {mockMilestones.map(m => {
          const occasion = occasions.find(o => o.key === m.occasion);
          const OccasionIcon = occasion?.icon || Gift;
          return (
            <div key={m.id} className="rounded-xl bg-card border border-border p-5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                  <OccasionIcon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-body text-sm font-semibold text-foreground">{m.storyTitle}</h3>
                  <p className="font-body text-xs text-muted-foreground">
                    From {m.residentName} → To {m.recipientName}
                  </p>
                  <p className="font-body text-xs text-muted-foreground mt-0.5">
                    {occasion?.label} · Recorded {m.createdAt}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="flex items-center gap-1 font-body text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" /> Delivery: {m.occasionDate}
                  </div>
                  <span className="flex items-center gap-1 font-body text-xs font-semibold text-amber-700 mt-1">
                    <Lock className="w-3 h-3" /> Locked
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MilestoneMessages;
