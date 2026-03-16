import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const SettingsPage = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold text-foreground">Settings</h1>
        <p className="font-body text-muted-foreground mt-1">Manage your account preferences</p>
      </div>

      <div className="rounded-2xl bg-card border border-border p-6 space-y-4">
        <h2 className="font-display text-lg font-semibold text-foreground">Profile</h2>
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center text-secondary font-display text-2xl font-bold">
            {user?.name?.charAt(0)}
          </div>
          <Button variant="outline" size="sm" className="font-body">Change Photo</Button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="font-body">Full Name</Label>
            <Input defaultValue={user?.name} className="font-body" />
          </div>
          <div className="space-y-2">
            <Label className="font-body">Email</Label>
            <Input defaultValue={user?.email} className="font-body" />
          </div>
        </div>
        <Button variant="hero">Save Changes</Button>
      </div>

      <div className="rounded-2xl bg-card border border-border p-6 space-y-4">
        <h2 className="font-display text-lg font-semibold text-foreground">Notifications</h2>
        <div className="space-y-3">
          {[
            { label: "New question received", checked: true },
            { label: "Question answered", checked: true },
            { label: "New story from connected resident", checked: true },
            { label: "Weekly digest email", checked: false },
          ].map(n => (
            <label key={n.label} className="flex items-center justify-between p-3 rounded-lg border border-border/50">
              <span className="font-body text-sm text-foreground">{n.label}</span>
              <input type="checkbox" defaultChecked={n.checked} className="rounded border-border" />
            </label>
          ))}
        </div>
      </div>

      <div className="rounded-2xl bg-card border border-border p-6 space-y-4">
        <h2 className="font-display text-lg font-semibold text-foreground">Security</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="font-body">Current Password</Label>
            <Input type="password" className="font-body" />
          </div>
          <div className="space-y-2">
            <Label className="font-body">New Password</Label>
            <Input type="password" className="font-body" />
          </div>
          <Button variant="outline" className="font-body">Update Password</Button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
