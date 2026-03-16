import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, Users, Eye, EyeOff } from "lucide-react";

const PrivacySettings = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold text-foreground">Privacy Settings</h1>
        <p className="font-body text-muted-foreground mt-1">Control who sees your stories and manage consent.</p>
      </div>

      <div className="rounded-2xl bg-card border border-border p-6 space-y-4">
        <h2 className="font-display text-lg font-semibold text-foreground flex items-center gap-2">
          <Eye className="w-5 h-5 text-secondary" /> Default Story Visibility
        </h2>
        <div className="space-y-3">
          {[
            { value: "family", label: "All Connected Family", description: "All family members who are connected to your profile can view new stories." },
            { value: "selected", label: "Selected Family Members", description: "Choose which family members can see each story you record." },
            { value: "private", label: "Private", description: "Stories are only visible to you until you choose to share them." },
          ].map(opt => (
            <label key={opt.value} className="flex items-start gap-3 p-4 rounded-lg border border-border hover:border-secondary/50 cursor-pointer">
              <input type="radio" name="visibility" defaultChecked={opt.value === "family"} className="mt-1" />
              <div>
                <p className="font-body text-sm font-medium text-foreground">{opt.label}</p>
                <p className="font-body text-xs text-muted-foreground">{opt.description}</p>
              </div>
            </label>
          ))}
        </div>
      </div>

      <div className="rounded-2xl bg-card border border-border p-6 space-y-4">
        <h2 className="font-display text-lg font-semibold text-foreground flex items-center gap-2">
          <Users className="w-5 h-5 text-secondary" /> Connected Family Members
        </h2>
        <div className="space-y-2">
          {[
            { name: "Sarah Thompson", relationship: "Granddaughter", canView: true },
            { name: "Michael Thompson", relationship: "Son", canView: true },
            { name: "Lisa Chen", relationship: "Daughter-in-law", canView: true },
          ].map(fam => (
            <div key={fam.name} className="flex items-center justify-between p-3 rounded-lg border border-border/50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary font-body text-xs font-bold">
                  {fam.name.charAt(0)}
                </div>
                <div>
                  <p className="font-body text-sm font-medium text-foreground">{fam.name}</p>
                  <p className="font-body text-xs text-muted-foreground">{fam.relationship}</p>
                </div>
              </div>
              <Button variant={fam.canView ? "outline" : "ghost"} size="sm" className="font-body">
                {fam.canView ? <><Eye className="w-3 h-3 mr-1" /> Can View</> : <><EyeOff className="w-3 h-3 mr-1" /> Blocked</>}
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl bg-card border border-border p-6 space-y-4">
        <h2 className="font-display text-lg font-semibold text-foreground flex items-center gap-2">
          <Lock className="w-5 h-5 text-secondary" /> Consent Management
        </h2>
        <div className="space-y-3 font-body text-sm">
          <div className="flex justify-between py-2 border-b border-border/50">
            <span className="text-muted-foreground">Consent Type</span>
            <span className="font-medium text-foreground">Self-Consent</span>
          </div>
          <div className="flex justify-between py-2 border-b border-border/50">
            <span className="text-muted-foreground">Consent Date</span>
            <span className="font-medium text-foreground">January 15, 2025</span>
          </div>
          <div className="flex justify-between py-2 border-b border-border/50">
            <span className="text-muted-foreground">Form Version</span>
            <span className="font-medium text-foreground">v1.0</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-muted-foreground">External Sharing</span>
            <span className="font-medium text-destructive">Disabled</span>
          </div>
        </div>
        <Button variant="outline" className="font-body text-destructive border-destructive/30 hover:bg-destructive/5">
          Withdraw Consent
        </Button>
      </div>
    </div>
  );
};

export default PrivacySettings;
