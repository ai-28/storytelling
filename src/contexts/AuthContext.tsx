import { createContext, useContext, useState, ReactNode } from "react";
import { User, UserRole } from "@/data/mockData";

interface AuthContextType {
  user: User | null;
  login: (role: UserRole) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const roleUsers: Record<UserRole, User> = {
  resident: { id: "user-res-1", name: "Eleanor Thompson", email: "eleanor@family.com", role: "resident" },
  family: { id: "user-fam-1", name: "Sarah Thompson", email: "sarah@email.com", role: "family" },
  staff: { id: "user-staff-1", name: "Maria Santos", email: "maria@sunrisesenior.com", role: "staff", orgId: "org-1" },
  facility_admin: { id: "user-admin-1", name: "Angela Rivera", email: "arivera@sunrisesenior.com", role: "facility_admin", orgId: "org-1" },
  platform_admin: { id: "user-padmin-1", name: "Brandon Beard", email: "brandon@observelife.com", role: "platform_admin" },
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (role: UserRole) => setUser(roleUsers[role]);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
