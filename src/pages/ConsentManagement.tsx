import { useState } from "react";
import { mockResidents, mockConsentRecords } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShieldCheck, Search, CheckCircle, AlertTriangle, Clock, FileText } from "lucide-react";

const ConsentManagement = () => {
  const [search, setSearch] = useState("");
  const [showNewConsent, setShowNewConsent] = useState(false);
  const [consentType, setConsentType] = useState<"SELF" | "REPRESENTATIVE">("SELF");

  const residentsWithConsent = mockResidents.map(r => {
    const consent = mockConsentRecords.find(cr => cr.residentId === r.id && !cr.revokedAt);
    return { ...r, consent };
  });

  const filtered = residentsWithConsent.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">Consent Management</h1>
          <p className="font-body text-muted-foreground mt-1">
            Three-layer consent model · {mockConsentRecords.filter(cr => !cr.revokedAt).length} active consents
          </p>
        </div>
        <Button variant="hero" onClick={() => setShowNewConsent(!showNewConsent)}>
          <ShieldCheck className="w-4 h-4 mr-2" /> Capture Consent
        </Button>
      </div>

      {/* Consent Layers Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-xl bg-card border border-border p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
              <span className="font-display text-sm font-bold text-green-700">1</span>
            </div>
            <h3 className="font-body text-sm font-semibold text-foreground">Platform Enrollment</h3>
          </div>
          <p className="font-body text-xs text-muted-foreground">
            Resident or legal rep agrees to create an Observe Life account. Covers recording, storage, sharing, and data retention.
          </p>
        </div>
        <div className="rounded-xl bg-card border border-border p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
              <span className="font-display text-sm font-bold text-blue-700">2</span>
            </div>
            <h3 className="font-body text-sm font-semibold text-foreground">Recording Consent</h3>
          </div>
          <p className="font-body text-xs text-muted-foreground">
            Each recording session requires explicit consent. Verbal (documented) or digital (in-app signature).
          </p>
        </div>
        <div className="rounded-xl bg-card border border-border p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
              <span className="font-display text-sm font-bold text-purple-700">3</span>
            </div>
            <h3 className="font-body text-sm font-semibold text-foreground">Sharing Consent</h3>
          </div>
          <p className="font-body text-xs text-muted-foreground">
            Separate consent for each family member. Resident controls who sees each story. Revocable at any time.
          </p>
        </div>
      </div>

      {/* New Consent Form */}
      {showNewConsent && (
        <div className="rounded-2xl bg-card border border-secondary/20 p-6 space-y-4">
          <h2 className="font-display text-lg font-semibold text-foreground">Capture New Consent</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="font-body">Resident</Label>
              <select className="w-full h-10 rounded-md border border-input bg-background px-3 font-body text-sm">
                {mockResidents.map(r => (
                  <option key={r.id} value={r.id}>{r.name} — Room {r.roomNumber}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label className="font-body">Consent Type</Label>
              <select
                className="w-full h-10 rounded-md border border-input bg-background px-3 font-body text-sm"
                value={consentType}
                onChange={(e) => setConsentType(e.target.value as "SELF" | "REPRESENTATIVE")}
              >
                <option value="SELF">Self-Consent (resident provides consent)</option>
                <option value="REPRESENTATIVE">Representative Consent (legal rep)</option>
              </select>
            </div>
          </div>
          {consentType === "REPRESENTATIVE" && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="font-body">Representative Name</Label>
                <Input placeholder="Full name of legal representative" className="font-body" />
              </div>
              <div className="space-y-2">
                <Label className="font-body">Relationship</Label>
                <Input placeholder="e.g., Son, Daughter, Legal Guardian" className="font-body" />
              </div>
            </div>
          )}
          <div className="rounded-xl bg-muted p-4 space-y-3">
            <p className="font-body text-sm font-medium text-foreground">Consent covers:</p>
            <div className="space-y-2 font-body text-sm text-muted-foreground">
              <label className="flex items-start gap-2">
                <input type="checkbox" className="mt-1 rounded border-border" />
                Recording and storage of life stories on the Observe Life platform
              </label>
              <label className="flex items-start gap-2">
                <input type="checkbox" className="mt-1 rounded border-border" />
                Sharing stories with invited family members
              </label>
              <label className="flex items-start gap-2">
                <input type="checkbox" className="mt-1 rounded border-border" />
                AI story organization and categorization (Phase 2)
              </label>
              <label className="flex items-start gap-2">
                <input type="checkbox" className="mt-1 rounded border-border" />
                Data retention per platform privacy policy (v1.0)
              </label>
            </div>
          </div>
          <div className="space-y-2">
            <Label className="font-body">Form Version</Label>
            <Input defaultValue="1.0" className="font-body w-32" readOnly />
          </div>
          <div className="flex gap-2">
            <Button variant="hero"><ShieldCheck className="w-4 h-4 mr-2" /> Capture Consent</Button>
            <Button variant="outline" onClick={() => setShowNewConsent(false)}>Cancel</Button>
          </div>
        </div>
      )}

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-background font-body text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary/50"
          placeholder="Search residents..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Residents Consent Table */}
      <div className="rounded-2xl bg-card border border-border overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="text-left font-body text-xs font-semibold text-muted-foreground uppercase tracking-wider py-3 px-5">Resident</th>
              <th className="text-left font-body text-xs font-semibold text-muted-foreground uppercase tracking-wider py-3 px-5">Room</th>
              <th className="text-left font-body text-xs font-semibold text-muted-foreground uppercase tracking-wider py-3 px-5">Consent Status</th>
              <th className="text-left font-body text-xs font-semibold text-muted-foreground uppercase tracking-wider py-3 px-5">Type</th>
              <th className="text-left font-body text-xs font-semibold text-muted-foreground uppercase tracking-wider py-3 px-5">Date</th>
              <th className="text-left font-body text-xs font-semibold text-muted-foreground uppercase tracking-wider py-3 px-5">Version</th>
              <th className="py-3 px-5"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(r => (
              <tr key={r.id} className="border-b border-border/50 hover:bg-muted/20">
                <td className="py-3 px-5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary font-body text-xs font-bold">
                      {r.name.charAt(0)}
                    </div>
                    <span className="font-body text-sm font-medium text-foreground">{r.name}</span>
                  </div>
                </td>
                <td className="py-3 px-5 font-body text-sm text-muted-foreground">{r.roomNumber}</td>
                <td className="py-3 px-5">
                  {r.consent ? (
                    <span className="flex items-center gap-1 font-body text-xs font-semibold text-green-700">
                      <CheckCircle className="w-3.5 h-3.5" /> Active
                    </span>
                  ) : r.consentStatus === "pending" ? (
                    <span className="flex items-center gap-1 font-body text-xs font-semibold text-amber-700">
                      <Clock className="w-3.5 h-3.5" /> Pending
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 font-body text-xs font-semibold text-red-700">
                      <AlertTriangle className="w-3.5 h-3.5" /> Missing
                    </span>
                  )}
                </td>
                <td className="py-3 px-5 font-body text-sm text-muted-foreground">
                  {r.consent ? (r.consent.consentType === "SELF" ? "Self" : "Representative") : "—"}
                </td>
                <td className="py-3 px-5 font-body text-sm text-muted-foreground">
                  {r.consent?.consentDate || "—"}
                </td>
                <td className="py-3 px-5 font-body text-sm text-muted-foreground">
                  {r.consent?.formVersion || "—"}
                </td>
                <td className="py-3 px-5">
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" className="font-body text-xs">
                      <FileText className="w-3 h-3 mr-1" /> View
                    </Button>
                    {!r.consent && (
                      <Button variant="outline" size="sm" className="font-body text-xs" onClick={() => setShowNewConsent(true)}>
                        Capture
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ConsentManagement;
