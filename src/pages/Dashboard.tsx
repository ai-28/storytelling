import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import ResidentDashboard from "@/components/dashboards/ResidentDashboard";
import FamilyDashboard from "@/components/dashboards/FamilyDashboard";
import StaffDashboard from "@/components/dashboards/StaffDashboard";
import AdminDashboard from "@/components/dashboards/AdminDashboard";

const Dashboard = () => {
  const { user } = useAuth();

  switch (user?.role) {
    case "resident":
      return <ResidentDashboard />;
    case "family":
      return <FamilyDashboard />;
    case "staff":
      return <StaffDashboard />;
    case "facility_admin":
      return <AdminDashboard />;
    case "platform_admin":
      return <Navigate to="/platform" replace />;
    default:
      return <AdminDashboard />;
  }
};

export default Dashboard;
