import { useState } from "react";
import { mockFamilyConnections, mockResidents } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, UserPlus, CheckCircle, Clock, XCircle, Send, Users } from "lucide-react";

const FamilyInvitations = () => {
  const [showInvite, setShowInvite] = useState(false);
  const [tab, setTab] = useState<"all" | "pending" | "accepted">("all");

  const connections = mockFamilyConnections.map(fc => ({
    ...fc,
    resident: mockResidents.find(r => r.id === fc.residentId),
  }));

  const filtered = connections.filter(c =>
    tab === "all" || c.inviteStatus === tab
  );

  const pendingCount = connections.filter(c => c.inviteStatus === "pending").length;
  const acceptedCount = connections.filter(c => c.inviteStatus === "accepted").length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">Family Invitations</h1>
          <p className="font-body text-muted-foreground mt-1">
            {connections.length} total · {acceptedCount} accepted · {pendingCount} pending
          </p>
        </div>
        <Button variant="hero" onClick={() => setShowInvite(!showInvite)}>
          <UserPlus className="w-4 h-4 mr-2" /> Send Invitation
        </Button>
      </div>

      {/* Invitation email preview */}
      {showInvite && (
        <div className="rounded-2xl bg-card border border-secondary/20 p-6 space-y-4">
          <h2 className="font-display text-lg font-semibold text-foreground">Send Family Invitation</h2>
          <p className="font-body text-sm text-muted-foreground">
            This is the most important marketing touchpoint on the platform. The invitation must feel personal, not automated.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="font-body">Resident</Label>
              <select className="w-full h-10 rounded-md border border-input bg-background px-3 font-body text-sm">
                {mockResidents.map(r => (
                  <option key={r.id}>{r.name} — Room {r.roomNumber}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label className="font-body">Relationship to Resident</Label>
              <Input placeholder="e.g., Granddaughter, Son" className="font-body" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="font-body">Family Member Name</Label>
              <Input placeholder="Full name" className="font-body" />
            </div>
            <div className="space-y-2">
              <Label className="font-body">Email or Phone</Label>
              <Input placeholder="email@example.com or phone number" className="font-body" />
            </div>
          </div>

          {/* Email Preview */}
          <div className="rounded-xl border border-border bg-muted/30 p-5 space-y-3">
            <p className="font-body text-xs text-muted-foreground uppercase tracking-wider font-semibold">Email Preview</p>
            <div className="rounded-lg bg-background p-4 space-y-2 border border-border/50">
              <p className="font-body text-sm font-semibold text-foreground">Subject: Eleanor wants to share her stories with you</p>
              <hr className="border-border/50" />
              <p className="font-body text-sm text-foreground">Dear [Name],</p>
              <p className="font-body text-sm text-muted-foreground">
                Your loved one, <span className="font-medium text-foreground">Eleanor Thompson</span>, has started recording their life stories on Observe Life. They'd love for you to be part of the journey.
              </p>
              <p className="font-body text-sm text-muted-foreground">
                You can listen to their stories, ask questions about their life, and help preserve memories that matter — all for free.
              </p>
              <div className="pt-2">
                <span className="inline-block bg-secondary text-secondary-foreground px-4 py-2 rounded-lg font-body text-sm font-semibold">
                  Connect with Eleanor's Stories →
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="hero"><Send className="w-4 h-4 mr-2" /> Send Invitation</Button>
            <Button variant="outline" onClick={() => setShowInvite(false)}>Cancel</Button>
          </div>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex gap-2">
        <Button variant={tab === "all" ? "hero" : "outline"} size="sm" onClick={() => setTab("all")}>
          <Users className="w-4 h-4 mr-1" /> All ({connections.length})
        </Button>
        <Button variant={tab === "pending" ? "hero" : "outline"} size="sm" onClick={() => setTab("pending")}>
          <Clock className="w-4 h-4 mr-1" /> Pending ({pendingCount})
        </Button>
        <Button variant={tab === "accepted" ? "hero" : "outline"} size="sm" onClick={() => setTab("accepted")}>
          <CheckCircle className="w-4 h-4 mr-1" /> Accepted ({acceptedCount})
        </Button>
      </div>

      {/* Connections List */}
      <div className="space-y-3">
        {filtered.map(fc => (
          <div key={fc.id} className="rounded-xl bg-card border border-border p-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary font-body text-sm font-bold">
                {fc.userName.charAt(0)}
              </div>
              <div>
                <p className="font-body text-sm font-medium text-foreground">{fc.userName}</p>
                <p className="font-body text-xs text-muted-foreground">{fc.userEmail}</p>
              </div>
            </div>
            <div className="text-center">
              <p className="font-body text-xs text-muted-foreground">{fc.relationship}</p>
              <p className="font-body text-xs text-muted-foreground">to {fc.resident?.name}</p>
            </div>
            <div className="flex items-center gap-3">
              {fc.inviteStatus === "accepted" && (
                <span className="flex items-center gap-1 font-body text-xs font-semibold text-green-700 bg-green-100 px-2 py-1 rounded-full">
                  <CheckCircle className="w-3 h-3" /> Accepted
                </span>
              )}
              {fc.inviteStatus === "pending" && (
                <>
                  <span className="flex items-center gap-1 font-body text-xs font-semibold text-amber-700 bg-amber-100 px-2 py-1 rounded-full">
                    <Clock className="w-3 h-3" /> Pending
                  </span>
                  <Button variant="outline" size="sm" className="font-body">
                    <Mail className="w-3 h-3 mr-1" /> Resend
                  </Button>
                </>
              )}
              {fc.inviteStatus === "declined" && (
                <span className="flex items-center gap-1 font-body text-xs font-semibold text-red-700 bg-red-100 px-2 py-1 rounded-full">
                  <XCircle className="w-3 h-3" /> Declined
                </span>
              )}
              {fc.connectedAt && (
                <span className="font-body text-xs text-muted-foreground">
                  Connected: {fc.connectedAt}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FamilyInvitations;
