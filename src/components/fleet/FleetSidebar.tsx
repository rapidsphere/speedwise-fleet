import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLocation, NavLink } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  Users,
  Building2,
  Truck,
  UserCircle,
  Clock,
  Fuel,
  FileText,
  Settings,
  LogOut,
  Bell
} from 'lucide-react';

interface MenuItem {
  title: string;
  url: string;
  icon: React.ComponentType<any>;
  roles: string[];
}

const menuItems: MenuItem[] = [
  { title: 'Dashboard', url: '/', icon: LayoutDashboard, roles: ['Admin', 'Supervisor', 'Site Manager', 'Driver'] },
  { title: 'Users', url: '/users', icon: Users, roles: ['Admin'] },
  { title: 'Clients', url: '/clients', icon: Building2, roles: ['Admin', 'Supervisor', 'Site Manager'] },
  { title: 'Vehicles', url: '/vehicles', icon: Truck, roles: ['Admin', 'Supervisor', 'Site Manager'] },
  { title: 'Drivers', url: '/drivers', icon: UserCircle, roles: ['Admin', 'Supervisor', 'Site Manager'] },
  { title: 'Attendance', url: '/attendance', icon: Clock, roles: ['Admin', 'Supervisor', 'Site Manager'] },
  { title: 'Diesel Entry', url: '/diesel', icon: Fuel, roles: ['Admin', 'Supervisor', 'Site Manager'] },
  { title: 'Reports', url: '/reports', icon: FileText, roles: ['Admin', 'Supervisor', 'Site Manager'] },
  { title: 'Notifications', url: '/notifications', icon: Bell, roles: ['Admin', 'Supervisor', 'Site Manager'] },
  { title: 'Settings', url: '/settings', icon: Settings, roles: ['Admin'] }
];

export const FleetSidebar: React.FC = () => {
  const { user, logout, hasPermission } = useAuth();
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';
  const location = useLocation();

  const filteredMenuItems = menuItems.filter(item => 
    hasPermission(item.roles as any)
  );

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <Sidebar className={collapsed ? "w-16" : "w-64"} collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <div className="flex items-center gap-3">
          <div className="fleet-gradient-primary rounded-lg p-2 text-primary-foreground">
            <Truck className="h-6 w-6" />
          </div>
          {!collapsed && (
            <div>
              <h2 className="font-bold text-lg text-sidebar-foreground">Rapid Sphere</h2>
              <p className="text-xs text-sidebar-foreground/70">Fleet ERP</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/70">
            {!collapsed && 'Navigation'}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={({ isActive: navIsActive }) =>
                        `flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                          navIsActive || isActive(item.url)
                            ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium'
                            : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
                        }`
                      }
                    >
                      <item.icon className="h-5 w-5" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-4">
        {!collapsed && user && (
          <div className="mb-3">
            <div className="text-sm font-medium text-sidebar-foreground">{user.name}</div>
            <div className="text-xs text-sidebar-foreground/70">{user.role}</div>
          </div>
        )}
        <Button
          onClick={logout}
          variant="outline"
          size={collapsed ? "icon" : "sm"}
          className="w-full justify-start border-sidebar-border text-sidebar-foreground hover:bg-sidebar-accent"
        >
          <LogOut className="h-4 w-4" />
          {!collapsed && <span className="ml-2">Logout</span>}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};