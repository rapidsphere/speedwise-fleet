import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import FleetLayout from "@/components/fleet/FleetLayout";
import DashboardPage from "@/components/fleet/DashboardPage";
import VehiclesPage from "./pages/VehiclesPage";
import UserManagementPage from "@/components/fleet/UserManagementPage";
import ClientManagementPage from "@/components/fleet/ClientManagementPage";
import DriverManagementPage from "@/components/fleet/DriverManagementPage";
import AttendanceManagementPage from "@/components/fleet/AttendanceManagementPage";
import DieselManagementPage from "@/components/fleet/DieselManagementPage";
import ReportsPage from "@/components/fleet/ReportsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <FleetLayout>
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/vehicles" element={<VehiclesPage />} />
              <Route path="/users" element={<UserManagementPage />} />
              <Route path="/clients" element={<ClientManagementPage />} />
              <Route path="/drivers" element={<DriverManagementPage />} />
              <Route path="/attendance" element={<AttendanceManagementPage />} />
              <Route path="/diesel" element={<DieselManagementPage />} />
              <Route path="/reports" element={<ReportsPage />} />
              <Route path="/notifications" element={<div className="p-6"><h1 className="text-2xl font-bold">Notifications</h1><p className="text-muted-foreground">Coming soon...</p></div>} />
              <Route path="/settings" element={<div className="p-6"><h1 className="text-2xl font-bold">Settings</h1><p className="text-muted-foreground">Coming soon...</p></div>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </FleetLayout>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
