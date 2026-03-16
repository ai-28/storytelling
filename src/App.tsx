import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import AppLayout from "@/components/AppLayout";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ResidentsList from "./pages/ResidentsList";
import ResidentProfile from "./pages/ResidentProfile";
import Questions from "./pages/Questions";
import Stories from "./pages/Stories";
import PromptLibrary from "./pages/PromptLibrary";
import RecordStory from "./pages/RecordStory";
import Admissions from "./pages/Admissions";
import StoryNight from "./pages/StoryNight";
import StaffManagement from "./pages/StaffManagement";
import Billing from "./pages/Billing";
import Analytics from "./pages/Analytics";
import PrivacySettings from "./pages/PrivacySettings";
import SettingsPage from "./pages/SettingsPage";
import BedsideMode from "./pages/BedsideMode";
import ConsentManagement from "./pages/ConsentManagement";
import FamilyInvitations from "./pages/FamilyInvitations";
import MilestoneMessages from "./pages/MilestoneMessages";
import PlatformAdminDashboard from "./pages/PlatformAdminDashboard";
import FamilyEngagement from "./pages/FamilyEngagement";
import AnswerMeNext from "./pages/AnswerMeNext";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <AppLayout>{children}</AppLayout>;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/bedside" element={<BedsideMode />} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/residents" element={<ProtectedRoute><ResidentsList /></ProtectedRoute>} />
      <Route path="/residents/:id" element={<ProtectedRoute><ResidentProfile /></ProtectedRoute>} />
      <Route path="/questions" element={<ProtectedRoute><Questions /></ProtectedRoute>} />
      <Route path="/stories" element={<ProtectedRoute><Stories /></ProtectedRoute>} />
      <Route path="/prompts" element={<ProtectedRoute><PromptLibrary /></ProtectedRoute>} />
      <Route path="/record" element={<ProtectedRoute><RecordStory /></ProtectedRoute>} />
      <Route path="/admissions" element={<ProtectedRoute><Admissions /></ProtectedRoute>} />
      <Route path="/story-night" element={<ProtectedRoute><StoryNight /></ProtectedRoute>} />
      <Route path="/staff" element={<ProtectedRoute><StaffManagement /></ProtectedRoute>} />
      <Route path="/billing" element={<ProtectedRoute><Billing /></ProtectedRoute>} />
      <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
      <Route path="/privacy" element={<ProtectedRoute><PrivacySettings /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
      <Route path="/consent" element={<ProtectedRoute><ConsentManagement /></ProtectedRoute>} />
      <Route path="/invitations" element={<ProtectedRoute><FamilyInvitations /></ProtectedRoute>} />
      <Route path="/milestones" element={<ProtectedRoute><MilestoneMessages /></ProtectedRoute>} />
      <Route path="/platform" element={<ProtectedRoute><PlatformAdminDashboard /></ProtectedRoute>} />
      <Route path="/engagement" element={<ProtectedRoute><FamilyEngagement /></ProtectedRoute>} />
      <Route path="/answer-me-next" element={<ProtectedRoute><AnswerMeNext /></ProtectedRoute>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
