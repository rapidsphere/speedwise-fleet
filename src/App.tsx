import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import FleetLayout from "@/components/fleet/FleetLayout";
import DashboardPage from "@/components/fleet/DashboardPage";
import VehiclesPage from "./pages/VehiclesPage";
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
              <Route path="/users" element={<div className="p-6"><h1 className="text-2xl font-bold">User Management</h1><p className="text-muted-foreground">Coming soon...</p></div>} />
              <Route path="/clients" element={<div className="p-6"><h1 className="text-2xl font-bold">Client Management</h1><p className="text-muted-foreground">Coming soon...</p></div>} />
              <Route path="/drivers" element={<div className="p-6"><h1 className="text-2xl font-bold">Driver Management</h1><p className="text-muted-foreground">Coming soon...</p></div>} />
              <Route path="/attendance" element={<div className="p-6"><h1 className="text-2xl font-bold">Attendance Management</h1><p className="text-muted-foreground">Coming soon...</p></div>} />
              <Route path="/diesel" element={<div className="p-6"><h1 className="text-2xl font-bold">Diesel Entry Management</h1><p className="text-muted-foreground">Coming soon...</p></div>} />
              <Route path="/reports" element={<div className="p-6"><h1 className="text-2xl font-bold">Reports</h1><p className="text-muted-foreground">Coming soon...</p></div>} />
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
