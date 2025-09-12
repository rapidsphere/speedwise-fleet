import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Users,
  Building2,
  Truck,
  UserCircle,
  Clock,
  Fuel,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Calendar,
  MapPin
} from 'lucide-react';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();

  const kpiCards = [
    {
      title: 'Total Clients',
      value: '24',
      change: '+2 this month',
      icon: Building2,
      gradient: 'fleet-gradient-primary',
      textColor: 'text-primary-foreground'
    },
    {
      title: 'Active Vehicles',
      value: '156',
      change: '12 on route',
      icon: Truck,
      gradient: 'fleet-gradient-success',
      textColor: 'text-fleet-success-foreground'
    },
    {
      title: 'Total Drivers',
      value: '89',
      change: '8 on duty',
      icon: UserCircle,
      gradient: 'fleet-gradient-primary',
      textColor: 'text-primary-foreground'
    },
    {
      title: 'Attendance Today',
      value: '92%',
      change: '82/89 checked in',
      icon: Clock,
      gradient: 'fleet-gradient-success',
      textColor: 'text-fleet-success-foreground'
    }
  ];

  const alerts = [
    {
      id: 1,
      type: 'warning',
      title: 'Vehicle Insurance Expiring',
      description: '3 vehicles have insurance expiring in next 7 days',
      time: '2 hours ago',
      priority: 'high'
    },
    {
      id: 2,
      type: 'info',
      title: 'Driver License Renewal',
      description: '2 drivers need license renewal this month',
      time: '4 hours ago',
      priority: 'medium'
    },
    {
      id: 3,
      type: 'success',
      title: 'Fuel Efficiency Improved',
      description: 'Fleet average improved by 8% this quarter',
      time: '1 day ago',
      priority: 'low'
    }
  ];

  const recentActivities = [
    { id: 1, activity: 'Vehicle MH12-AB-1234 completed maintenance', time: '30 min ago', type: 'maintenance' },
    { id: 2, activity: 'Driver John Doe checked in for duty', time: '1 hour ago', type: 'attendance' },
    { id: 3, activity: 'Fuel entry recorded for vehicle KA05-CD-5678', time: '2 hours ago', type: 'fuel' },
    { id: 4, activity: 'New client TechCorp added to system', time: '3 hours ago', type: 'client' },
    { id: 5, activity: 'Weekly reports generated successfully', time: '1 day ago', type: 'report' }
  ];

  const quickStats = [
    { label: 'Today\'s Distance', value: '2,345 km', icon: MapPin },
    { label: 'Fuel Consumption', value: '456 L', icon: Fuel },
    { label: 'Active Routes', value: '18', icon: TrendingUp },
    { label: 'Completed Trips', value: '67', icon: CheckCircle }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Header */}
      <div className="fleet-card">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Welcome back, {user?.name}!
            </h1>
            <p className="text-muted-foreground mt-1">
              Here's what's happening with your fleet today
            </p>
          </div>
          <Badge variant="secondary" className="px-3 py-1">
            {user?.role}
          </Badge>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiCards.map((card, index) => (
          <Card key={index} className="overflow-hidden">
            <CardContent className="p-0">
              <div className={`${card.gradient} p-4 ${card.textColor}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-90">{card.title}</p>
                    <p className="text-2xl font-bold">{card.value}</p>
                  </div>
                  <card.icon className="h-8 w-8 opacity-80" />
                </div>
              </div>
              <div className="p-3">
                <p className="text-xs text-muted-foreground">{card.change}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Alerts Panel */}
        <div className="lg:col-span-2">
          <Card className="fleet-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-fleet-warning" />
                Alerts & Notifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alerts.map((alert) => (
                  <div key={alert.id} className="flex items-start gap-3 p-3 rounded-lg border border-border hover:bg-muted/30 transition-colors">
                    <div className={`rounded-full p-1 ${
                      alert.type === 'warning' ? 'bg-fleet-warning/20 text-fleet-warning' :
                      alert.type === 'success' ? 'bg-fleet-success/20 text-fleet-success' :
                      'bg-primary/20 text-primary'
                    }`}>
                      {alert.type === 'warning' ? <AlertTriangle className="h-4 w-4" /> :
                       alert.type === 'success' ? <CheckCircle className="h-4 w-4" /> :
                       <Clock className="h-4 w-4" />}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{alert.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1">{alert.description}</p>
                      <p className="text-xs text-muted-foreground mt-2">{alert.time}</p>
                    </div>
                    <Badge 
                      variant={alert.priority === 'high' ? 'destructive' : alert.priority === 'medium' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {alert.priority}
                    </Badge>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                View All Notifications
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats & Recent Activity */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <Card className="fleet-card">
            <CardHeader>
              <CardTitle>Today's Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {quickStats.map((stat, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <stat.icon className="h-4 w-4 text-primary" />
                      <span className="text-sm text-muted-foreground">{stat.label}</span>
                    </div>
                    <span className="font-medium text-sm">{stat.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activities */}
          <Card className="fleet-card">
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivities.slice(0, 4).map((activity) => (
                  <div key={activity.id} className="text-sm">
                    <p className="text-foreground">{activity.activity}</p>
                    <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                  </div>
                ))}
              </div>
              <Button variant="outline" size="sm" className="w-full mt-4">
                View All Activities
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;