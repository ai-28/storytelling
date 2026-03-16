import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle, ChevronRight, UserPlus, ShieldCheck, Mail, Users } from "lucide-react";

const steps = ["Add Resident", "Create Profile", "Capture Consent", "Add Family", "Send Invitations", "Confirmation"];

const Admissions = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [familyContacts, setFamilyContacts] = useState([
    { name: "", email: "", relationship: "" },
  ]);

  const addContact = () => {
    if (familyContacts.length < 10) {
      setFamilyContacts([...familyContacts, { name: "", email: "", relationship: "" }]);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold text-foreground">New Admission</h1>
        <p className="font-body text-muted-foreground mt-1">
          Complete the admissions workflow in under 2 minutes.
        </p>
      </div>

      {/* Stepper */}
      <div className="flex items-center gap-1 overflow-x-auto pb-2">
        {steps.map((step, i) => (
          <div key={step} className="flex items-center gap-1 flex-shrink-0">
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full font-body text-xs font-medium ${
              i === currentStep ? "bg-secondary text-secondary-foreground" :
              i < currentStep ? "bg-secondary/10 text-secondary" : "bg-muted text-muted-foreground"
            }`}>
              {i < currentStep ? <CheckCircle className="w-3.5 h-3.5" /> : <span>{i + 1}</span>}
              <span className="hidden sm:inline">{step}</span>
            </div>
            {i < steps.length - 1 && <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />}
          </div>
        ))}
      </div>

      {/* Step content */}
      <div className="rounded-2xl bg-card border border-border p-6">
        {currentStep === 0 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <UserPlus className="w-5 h-5 text-secondary" />
              <h2 className="font-display text-xl font-semibold text-foreground">Resident Information</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="font-body">First Name</Label>
                <Input placeholder="Eleanor" className="font-body" />
              </div>
              <div className="space-y-2">
                <Label className="font-body">Last Name</Label>
                <Input placeholder="Thompson" className="font-body" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="font-body">Date of Birth</Label>
                <Input type="date" className="font-body" />
              </div>
              <div className="space-y-2">
                <Label className="font-body">Room / Unit Number</Label>
                <Input placeholder="204A" className="font-body" />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="font-body">Care Type</Label>
              <select className="w-full h-10 rounded-md border border-input bg-background px-3 font-body text-sm">
                <option>Skilled Nursing (SNF)</option>
                <option>Assisted Living (AL)</option>
                <option>Hospice</option>
              </select>
            </div>
          </div>
        )}

        {currentStep === 1 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-5 h-5 text-secondary" />
              <h2 className="font-display text-xl font-semibold text-foreground">Story Profile</h2>
            </div>
            <div className="rounded-xl bg-secondary/5 border border-secondary/20 p-4 text-center">
              <p className="font-body text-sm text-muted-foreground">
                A story profile will be automatically created for this resident.
              </p>
              <p className="font-body text-sm text-foreground font-medium mt-2">
                Profile URL: <span className="text-secondary">observelife.com/stories/eleanor-thompson</span>
              </p>
            </div>
            <div className="space-y-2">
              <Label className="font-body">Profile Photo (optional)</Label>
              <div className="border-2 border-dashed border-border rounded-xl p-8 text-center">
                <p className="font-body text-sm text-muted-foreground">Drag and drop or click to upload</p>
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheck className="w-5 h-5 text-secondary" />
              <h2 className="font-display text-xl font-semibold text-foreground">Consent Capture</h2>
            </div>
            <div className="space-y-3">
              <div className="space-y-2">
                <Label className="font-body">Consent Type</Label>
                <select className="w-full h-10 rounded-md border border-input bg-background px-3 font-body text-sm">
                  <option>Self-Consent (resident provides consent)</option>
                  <option>Representative Consent (legal rep provides consent)</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="font-body">Representative Name (if applicable)</Label>
                  <Input placeholder="Full name" className="font-body" />
                </div>
                <div className="space-y-2">
                  <Label className="font-body">Relationship</Label>
                  <Input placeholder="e.g., Son, Daughter, Legal Guardian" className="font-body" />
                </div>
              </div>
              <div className="rounded-xl bg-muted p-4 space-y-3">
                <p className="font-body text-sm font-medium text-foreground">Consent covers:</p>
                <div className="space-y-2 font-body text-sm text-muted-foreground">
                  <label className="flex items-start gap-2">
                    <input type="checkbox" className="mt-1 rounded border-border" />
                    Recording and storage of stories on the Observe Life platform
                  </label>
                  <label className="flex items-start gap-2">
                    <input type="checkbox" className="mt-1 rounded border-border" />
                    Sharing stories with invited family members
                  </label>
                  <label className="flex items-start gap-2">
                    <input type="checkbox" className="mt-1 rounded border-border" />
                    Data retention per platform privacy policy (v1.0)
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-secondary" />
                <h2 className="font-display text-xl font-semibold text-foreground">Family Contacts</h2>
              </div>
              <Button variant="outline" size="sm" onClick={addContact} disabled={familyContacts.length >= 10}>
                + Add Contact
              </Button>
            </div>
            <p className="font-body text-sm text-muted-foreground">
              Add up to 10 family members. Each will receive a personalized invitation.
            </p>
            <div className="space-y-3">
              {familyContacts.map((_, i) => (
                <div key={i} className="grid grid-cols-3 gap-3 p-3 rounded-lg bg-muted/30 border border-border/50">
                  <Input placeholder="Full name" className="font-body" />
                  <Input placeholder="Email or phone" className="font-body" />
                  <Input placeholder="Relationship" className="font-body" />
                </div>
              ))}
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Mail className="w-5 h-5 text-secondary" />
              <h2 className="font-display text-xl font-semibold text-foreground">Send Invitations</h2>
            </div>
            <div className="rounded-xl bg-secondary/5 border border-secondary/20 p-6 text-center">
              <p className="font-body text-lg font-medium text-foreground mb-2">
                Ready to invite {familyContacts.length} family member{familyContacts.length > 1 ? "s" : ""}
              </p>
              <p className="font-body text-sm text-muted-foreground mb-4">
                Each contact will receive a personalized email with a direct link to create
                their free Observe Life account and connect with their loved one's stories.
              </p>
              <Button variant="hero" size="lg">Send All Invitations</Button>
            </div>
          </div>
        )}

        {currentStep === 5 && (
          <div className="space-y-4 text-center py-8">
            <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8 text-secondary" />
            </div>
            <h2 className="font-display text-2xl font-semibold text-foreground">Admission Complete!</h2>
            <p className="font-body text-muted-foreground max-w-md mx-auto">
              The resident profile is live and ready for their first recording.
              {familyContacts.length > 0 && ` ${familyContacts.length} invitation(s) have been sent.`}
            </p>
            <div className="flex justify-center gap-3 pt-4">
              <Button variant="hero">Start First Recording</Button>
              <Button variant="outline" onClick={() => setCurrentStep(0)}>Add Another Resident</Button>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      {currentStep < 5 && (
        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setCurrentStep(Math.max(0, currentStep - 1))} disabled={currentStep === 0}>
            Back
          </Button>
          <Button variant="hero" onClick={() => setCurrentStep(Math.min(5, currentStep + 1))}>
            {currentStep === 4 ? "Complete" : "Continue"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default Admissions;
