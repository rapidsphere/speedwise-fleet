import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { FleetSidebar } from './FleetSidebar';
import LoginPage from './LoginPage';

interface FleetLayoutProps {
  children: React.ReactNode;
}

const FleetLayout: React.FC<FleetLayoutProps> = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return <LoginPage />;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <FleetSidebar />
        <main className="flex-1 flex flex-col">
          <header className="h-14 border-b border-border bg-card flex items-center px-4">
            <SidebarTrigger className="mr-4" />
            <div className="flex items-center gap-2">
              <h2 className="font-semibold text-foreground">Fleet Management System</h2>
            </div>
          </header>
          <div className="flex-1 overflow-auto">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default FleetLayout;