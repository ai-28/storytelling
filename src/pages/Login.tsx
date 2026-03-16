import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building2, Heart, Users, ShieldCheck, User } from "lucide-react";

const roles: { role: UserRole; label: string; description: string; icon: React.ElementType }[] = [
  { role: "resident", label: "Resident", description: "Record & share your life stories", icon: User },
  { role: "family", label: "Family Member", description: "View stories & ask questions", icon: Heart },
  { role: "staff", label: "Facility Staff", description: "Facilitate resident storytelling", icon: Users },
  { role: "facility_admin", label: "Facility Admin", description: "Manage your facility", icon: Building2 },
  { role: "platform_admin", label: "Platform Admin", description: "Manage the entire platform", icon: ShieldCheck },
];

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole) {
      login(selectedRole);
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 hero-bg relative items-center justify-center p-12">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-primary/70" />
        <div className="relative z-10 max-w-md text-center">
          <h1 className="font-display text-4xl font-bold text-primary-foreground mb-4">
            Observe<span className="text-secondary"> Life</span>
          </h1>
          <p className="font-body text-primary-foreground/70 text-lg leading-relaxed">
            Every life has a story worth preserving. Sign in to continue capturing,
            sharing, and celebrating the moments that matter most.
          </p>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8 text-center">
            <h1 className="font-display text-2xl font-bold text-foreground">
              Observe<span className="text-secondary"> Life</span>
            </h1>
          </div>

          <h2 className="font-display text-2xl font-bold text-foreground mb-2">Welcome back</h2>
          <p className="font-body text-muted-foreground mb-8">Sign in to your account to continue</p>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label className="font-body">Email</Label>
              <Input type="email" placeholder="you@example.com" defaultValue="demo@observelife.com" className="font-body" />
            </div>

            <div className="space-y-2">
              <Label className="font-body">Password</Label>
              <Input type="password" placeholder="••••••••" defaultValue="password" className="font-body" />
            </div>

            <div>
              <Label className="font-body text-sm text-muted-foreground mb-3 block">Select your role (demo)</Label>
              <div className="grid grid-cols-1 gap-2">
                {roles.map((r) => (
                  <button
                    key={r.role}
                    type="button"
                    onClick={() => setSelectedRole(r.role)}
                    className={`flex items-center gap-3 p-3 rounded-lg border text-left transition-all font-body text-sm ${
                      selectedRole === r.role
                        ? "border-secondary bg-secondary/10 text-foreground"
                        : "border-border hover:border-secondary/50 text-muted-foreground"
                    }`}
                  >
                    <r.icon className={`w-5 h-5 ${selectedRole === r.role ? "text-secondary" : ""}`} />
                    <div>
                      <p className="font-medium">{r.label}</p>
                      <p className="text-xs opacity-70">{r.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <Button variant="hero" size="lg" className="w-full" disabled={!selectedRole}>
              Sign In
            </Button>

            <p className="text-center font-body text-sm text-muted-foreground">
              Don't have an account?{" "}
              <a href="/register" className="text-secondary hover:underline font-medium">
                Create one
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
