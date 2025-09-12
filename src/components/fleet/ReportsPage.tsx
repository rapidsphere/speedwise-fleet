import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  FileText,
  Download,
  Calendar,
  TrendingUp,
  AlertTriangle,
  Users,
  Truck,
  Fuel,
  CheckCircle,
  Clock
} from 'lucide-react';

interface ReportData {
  id: string;
  title: string;
  description: string;
  type: 'expiry' | 'attendance' | 'fuel' | 'vehicle' | 'driver';
  lastGenerated: string;
  records: number;
  alerts?: number;
}

const availableReports: ReportData[] = [
  {
    id: '1',
    title: 'Vehicle Expiry Reminders',
    description: 'Insurance, permits, and compliance expiry tracking',
    type: 'expiry',
    lastGenerated: '2024-09-12 09:00',
    records: 156,
    alerts: 8
  },
  {
    id: '2',
    title: 'Driver License Expiry',
    description: 'Driving license renewal and compliance status',
    type: 'expiry',
    lastGenerated: '2024-09-12 08:30',
    records: 89,
    alerts: 5
  },
  {
    id: '3',
    title: 'Daily Attendance Report',
    description: 'Driver attendance and duty assignment summary',
    type: 'attendance',
    lastGenerated: '2024-09-12 10:00',
    records: 89,
    alerts: 3
  },
  {
    id: '4',
    title: 'Weekly Attendance Summary',
    description: 'Site-wise attendance compliance and trends',
    type: 'attendance',
    lastGenerated: '2024-09-11 18:00',
    records: 623,
    alerts: 12
  },
  {
    id: '5',
    title: 'Fuel Efficiency Report',
    description: 'Vehicle-wise mileage and fuel consumption analysis',
    type: 'fuel',
    lastGenerated: '2024-09-12 07:30',
    records: 156,
    alerts: 15
  },
  {
    id: '6',
    title: 'Monthly Fuel Summary',
    description: 'Fleet fuel consumption and cost analysis',
    type: 'fuel',
    lastGenerated: '2024-09-01 09:00',
    records: 892,
    alerts: 0
  },
  {
    id: '7',
    title: 'Vehicle Maintenance Report',
    description: 'Service schedules and maintenance tracking',
    type: 'vehicle',
    lastGenerated: '2024-09-10 15:30',
    records: 156,
    alerts: 22
  },
  {
    id: '8',
    title: 'Driver Performance Report',
    description: 'Driver efficiency and compliance metrics',
    type: 'driver',
    lastGenerated: '2024-09-11 16:00',
    records: 89,
    alerts: 8
  }
];

const quickStats = [
  {
    title: 'Total Reports',
    value: '8',
    change: '+2 this month',
    icon: FileText,
    color: 'primary'
  },
  {
    title: 'Active Alerts',
    value: '73',
    change: '15 critical',
    icon: AlertTriangle,
    color: 'warning'
  },
  {
    title: 'Last 24h Downloads',
    value: '24',
    change: '8 pending',
    icon: Download,
    color: 'success'
  },
  {
    title: 'Scheduled Reports',
    value: '5',
    change: 'Auto-generated',
    icon: Clock,
    color: 'info'
  }
];

const ReportsPage: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedPeriod, setSelectedPeriod] = useState<string>('today');

  const filteredReports = availableReports.filter(report => 
    selectedType === 'all' || report.type === selectedType
  );

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'expiry':
        return <Calendar className="h-4 w-4" />;
      case 'attendance':
        return <Users className="h-4 w-4" />;
      case 'fuel':
        return <Fuel className="h-4 w-4" />;
      case 'vehicle':
        return <Truck className="h-4 w-4" />;
      case 'driver':
        return <Users className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'expiry':
        return <Badge className="bg-fleet-warning text-fleet-warning-foreground">Expiry</Badge>;
      case 'attendance':
        return <Badge className="bg-primary text-primary-foreground">Attendance</Badge>;
      case 'fuel':
        return <Badge className="bg-fleet-success text-fleet-success-foreground">Fuel</Badge>;
      case 'vehicle':
        return <Badge className="bg-fleet-danger text-fleet-danger-foreground">Vehicle</Badge>;
      case 'driver':
        return <Badge variant="secondary">Driver</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  const getStatCardClass = (color: string) => {
    switch (color) {
      case 'primary':
        return 'fleet-gradient-primary text-primary-foreground';
      case 'warning':
        return 'fleet-gradient-warning text-fleet-warning-foreground';
      case 'success':
        return 'fleet-gradient-success text-fleet-success-foreground';
      case 'info':
        return 'bg-primary/80 text-primary-foreground';
      default:
        return 'fleet-gradient-primary text-primary-foreground';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="fleet-card">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <FileText className="h-7 w-7 text-primary" />
              Reports & Analytics
            </h1>
            <p className="text-muted-foreground mt-1">
              Generate and download fleet management reports
            </p>
          </div>
          <Button className="fleet-gradient-primary text-primary-foreground hover:opacity-90">
            <TrendingUp className="h-4 w-4 mr-2" />
            Custom Report
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => (
          <Card key={index} className="overflow-hidden">
            <CardContent className="p-0">
              <div className={`${getStatCardClass(stat.color)} p-4`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-90">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <stat.icon className="h-8 w-8 opacity-80" />
                </div>
              </div>
              <div className="p-3">
                <p className="text-xs text-muted-foreground">{stat.change}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card className="fleet-card">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Report Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="expiry">Expiry Reports</SelectItem>
                  <SelectItem value="attendance">Attendance</SelectItem>
                  <SelectItem value="fuel">Fuel Reports</SelectItem>
                  <SelectItem value="vehicle">Vehicle Reports</SelectItem>
                  <SelectItem value="driver">Driver Reports</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Time Period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="quarter">This Quarter</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1"></div>
            <Button variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Report
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredReports.map((report) => (
          <Card key={report.id} className="fleet-card-elevated hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-muted rounded-lg">
                    {getTypeIcon(report.type)}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{report.title}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      {report.description}
                    </p>
                  </div>
                </div>
                {getTypeBadge(report.type)}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Report Stats */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div>
                      <div className="text-sm text-muted-foreground">Records</div>
                      <div className="font-semibold">{report.records}</div>
                    </div>
                    {report.alerts !== undefined && (
                      <div>
                        <div className="text-sm text-muted-foreground">Alerts</div>
                        <div className="font-semibold text-fleet-warning">{report.alerts}</div>
                      </div>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">Last Generated</div>
                    <div className="text-sm font-medium">{report.lastGenerated}</div>
                  </div>
                </div>

                {/* Alert Indicator */}
                {report.alerts && report.alerts > 0 && (
                  <div className="flex items-center gap-2 p-3 bg-fleet-warning/10 rounded-lg border border-fleet-warning/20">
                    <AlertTriangle className="h-4 w-4 text-fleet-warning" />
                    <span className="text-sm text-fleet-warning">
                      {report.alerts} items need attention
                    </span>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" className="flex-1">
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Download className="h-4 w-4 mr-2" />
                    Export Excel
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Downloads */}
      <Card className="fleet-card-elevated">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Recent Downloads
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { name: 'Vehicle Expiry Report - September 2024', time: '2 hours ago', format: 'PDF', size: '1.2 MB' },
              { name: 'Daily Attendance - 12 Sept 2024', time: '4 hours ago', format: 'Excel', size: '856 KB' },
              { name: 'Fuel Efficiency Report - Week 37', time: '1 day ago', format: 'PDF', size: '2.1 MB' },
              { name: 'Driver License Expiry Alert', time: '2 days ago', format: 'Excel', size: '524 KB' }
            ].map((download, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="font-medium text-sm">{download.name}</div>
                    <div className="text-xs text-muted-foreground">{download.time}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="text-xs">
                    {download.format}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{download.size}</span>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Download className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportsPage;