import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  Home, Users, MessageCircleQuestion, Video, BookOpen,
  Settings, LogOut, Menu, X, BarChart3, CreditCard,
  UserPlus, ShieldCheck, Heart, Gift, Sparkles, Mail,
  Building2, TrendingUp, Moon
} from "lucide-react";
import { Button } from "@/components/ui/button";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navItems = getNavItems(user?.role);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-primary text-primary-foreground transform transition-transform duration-200 lg:translate-x-0 lg:static ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-5 border-b border-primary-foreground/10">
            <Link to="/" className="font-display text-xl font-bold">
              Observe<span className="text-secondary"> Life</span>
            </Link>
            <p className="font-body text-xs text-primary-foreground/50 mt-1">
              {user?.role === "staff" && "Staff Portal"}
              {user?.role === "facility_admin" && "Admin Portal"}
              {user?.role === "resident" && "My Stories"}
              {user?.role === "family" && "Family Portal"}
              {user?.role === "platform_admin" && "Platform Admin"}
            </p>
          </div>

          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-body text-sm transition-colors ${
                    isActive
                      ? "bg-secondary/20 text-secondary font-semibold"
                      : "text-primary-foreground/70 hover:bg-primary-foreground/5 hover:text-primary-foreground"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                  {item.badge && (
                    <span className="ml-auto bg-secondary/30 text-secondary text-xs font-semibold px-1.5 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-primary-foreground/10">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center text-secondary font-body text-sm font-bold">
                {user?.name?.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-body text-sm font-medium text-primary-foreground truncate">{user?.name}</p>
                <p className="font-body text-xs text-primary-foreground/50 truncate">{user?.email}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="w-full justify-start text-primary-foreground/60 hover:text-primary-foreground hover:bg-primary-foreground/5"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-foreground/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="sticky top-0 z-30 bg-background border-b border-border px-4 lg:px-8 h-14 flex items-center gap-4">
          <button className="lg:hidden text-foreground" onClick={() => setSidebarOpen(true)}>
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex-1" />
          <p className="font-body text-sm text-muted-foreground hidden sm:block">
            {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
          </p>
        </header>
        <main className="flex-1 p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
  badge?: string;
}

function getNavItems(role?: string): NavItem[] {
  switch (role) {
    case "resident":
      return [
        { href: "/dashboard", label: "My Dashboard", icon: Home },
        { href: "/questions", label: "Question Queue", icon: MessageCircleQuestion },
        { href: "/stories", label: "My Stories", icon: Video },
        { href: "/record", label: "Record Story", icon: Video },
        { href: "/milestones", label: "Milestone Messages", icon: Gift },
        { href: "/answer-me-next", label: "Answer Me Next", icon: Sparkles },
        { href: "/privacy", label: "Privacy Settings", icon: ShieldCheck },
        { href: "/settings", label: "Settings", icon: Settings },
      ];
    case "family":
      return [
        { href: "/dashboard", label: "Dashboard", icon: Home },
        { href: "/stories", label: "Stories", icon: Video },
        { href: "/questions", label: "My Questions", icon: MessageCircleQuestion },
        { href: "/prompts", label: "Question Library", icon: BookOpen },
        { href: "/answer-me-next", label: "Answer Me Next", icon: Sparkles },
        { href: "/settings", label: "Settings", icon: Settings },
      ];
    case "staff":
      return [
        { href: "/dashboard", label: "Dashboard", icon: Home },
        { href: "/residents", label: "Residents", icon: Users },
        { href: "/questions", label: "Pending Questions", icon: MessageCircleQuestion },
        { href: "/prompts", label: "Prompt Library", icon: BookOpen },
        { href: "/record", label: "Record Session", icon: Video },
        { href: "/admissions", label: "Admissions", icon: UserPlus },
        { href: "/consent", label: "Consent Management", icon: ShieldCheck },
        { href: "/invitations", label: "Family Invitations", icon: Mail },
        { href: "/story-night", label: "Story Night", icon: Moon },
        { href: "/milestones", label: "Milestone Messages", icon: Gift },
        { href: "/settings", label: "Settings", icon: Settings },
      ];
    case "facility_admin":
      return [
        { href: "/dashboard", label: "Dashboard", icon: Home },
        { href: "/analytics", label: "Analytics", icon: BarChart3 },
        { href: "/residents", label: "Residents", icon: Users },
        { href: "/staff", label: "Staff Management", icon: Users },
        { href: "/engagement", label: "Family Engagement", icon: TrendingUp },
        { href: "/billing", label: "Billing", icon: CreditCard },
        { href: "/admissions", label: "Admissions", icon: UserPlus },
        { href: "/consent", label: "Consent Management", icon: ShieldCheck },
        { href: "/invitations", label: "Family Invitations", icon: Mail },
        { href: "/prompts", label: "Prompt Library", icon: BookOpen },
        { href: "/milestones", label: "Milestone Messages", icon: Gift },
        { href: "/settings", label: "Settings", icon: Settings },
      ];
    case "platform_admin":
      return [
        { href: "/platform", label: "Platform Overview", icon: Building2 },
        { href: "/analytics", label: "Analytics", icon: BarChart3 },
        { href: "/residents", label: "All Residents", icon: Users },
        { href: "/staff", label: "Staff Management", icon: Users },
        { href: "/engagement", label: "Family Engagement", icon: TrendingUp },
        { href: "/billing", label: "Billing", icon: CreditCard },
        { href: "/consent", label: "Consent Management", icon: ShieldCheck },
        { href: "/settings", label: "Settings", icon: Settings },
      ];
    default:
      return [
        { href: "/dashboard", label: "Dashboard", icon: Home },
        { href: "/settings", label: "Settings", icon: Settings },
      ];
  }
}

export default AppLayout;
