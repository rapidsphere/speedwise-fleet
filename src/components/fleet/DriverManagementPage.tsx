import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  UserCircle,
  Plus,
  Search,
  Eye,
  Edit,
  AlertTriangle,
  CheckCircle,
  Calendar,
  CreditCard,
  Phone
} from 'lucide-react';

interface Driver {
  id: string;
  driverId: string;
  name: string;
  phone: string;
  email: string;
  experience: number;
  licenseNumber: string;
  licenseExpiry: string;
  licenseStatus: 'valid' | 'expiring' | 'expired';
  eligibleVehicles: string[];
  heavyBadge: boolean;
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  status: 'active' | 'suspended' | 'inactive';
  currentVehicle: string | null;
  joinDate: string;
  lastDuty: string;
}

const mockDrivers: Driver[] = [
  {
    id: '1',
    driverId: 'STAFF001',
    name: 'John Doe',
    phone: '+91 98765 43210',
    email: 'john.doe@fleet.com',
    experience: 8,
    licenseNumber: 'DL1420110012345',
    licenseExpiry: '2025-03-15',
    licenseStatus: 'valid',
    eligibleVehicles: ['Heavy Truck', 'Medium Truck'],
    heavyBadge: true,
    bankName: 'HDFC Bank',
    accountNumber: '1234567890',
    ifscCode: 'HDFC0001234',
    status: 'active',
    currentVehicle: 'MH12-AB-1234',
    joinDate: '2022-01-15',
    lastDuty: '2024-09-12'
  },
  {
    id: '2',
    driverId: 'ROUTE002',
    name: 'Jane Smith',
    phone: '+91 87654 32109',
    email: 'jane.smith@fleet.com',
    experience: 5,
    licenseNumber: 'DL1420110067890',
    licenseExpiry: '2024-11-20',
    licenseStatus: 'expiring',
    eligibleVehicles: ['Light Vehicle', 'Medium Truck'],
    heavyBadge: false,
    bankName: 'SBI Bank',
    accountNumber: '0987654321',
    ifscCode: 'SBIN0001234',
    status: 'active',
    currentVehicle: 'KA05-CD-5678',
    joinDate: '2023-03-20',
    lastDuty: '2024-09-12'
  },
  {
    id: '3',
    driverId: 'CASH003',
    name: 'Mike Johnson',
    phone: '+91 76543 21098',
    email: 'mike.johnson@fleet.com',
    experience: 12,
    licenseNumber: 'DL1420110011111',
    licenseExpiry: '2024-09-30',
    licenseStatus: 'expired',
    eligibleVehicles: ['Heavy Truck', 'Medium Truck', 'Light Vehicle'],
    heavyBadge: true,
    bankName: 'ICICI Bank',
    accountNumber: '5555666677',
    ifscCode: 'ICIC0001234',
    status: 'suspended',
    currentVehicle: null,
    joinDate: '2020-06-10',
    lastDuty: '2024-09-08'
  },
  {
    id: '4',
    driverId: 'STAFF004',
    name: 'Sarah Wilson',
    phone: '+91 65432 10987',
    email: 'sarah.wilson@fleet.com',
    experience: 3,
    licenseNumber: 'DL1420110022222',
    licenseExpiry: '2025-12-10',
    licenseStatus: 'valid',
    eligibleVehicles: ['Light Vehicle'],
    heavyBadge: false,
    bankName: 'Axis Bank',
    accountNumber: '9999888877',
    ifscCode: 'UTIB0001234',
    status: 'active',
    currentVehicle: null,
    joinDate: '2024-02-01',
    lastDuty: '2024-09-11'
  }
];

const DriverManagementPage: React.FC = () => {
  const [drivers] = useState<Driver[]>(mockDrivers);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [licenseFilter, setLicenseFilter] = useState<string>('all');

  const filteredDrivers = drivers.filter(driver => {
    const matchesSearch = driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         driver.driverId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         driver.phone.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || driver.status === statusFilter;
    const matchesLicense = licenseFilter === 'all' || driver.licenseStatus === licenseFilter;
    
    return matchesSearch && matchesStatus && matchesLicense;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-fleet-success text-fleet-success-foreground">Active</Badge>;
      case 'suspended':
        return <Badge className="bg-fleet-danger text-fleet-danger-foreground">Suspended</Badge>;
      case 'inactive':
        return <Badge variant="secondary">Inactive</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getLicenseStatusBadge = (status: string) => {
    switch (status) {
      case 'valid':
        return <Badge className="bg-fleet-success text-fleet-success-foreground">Valid</Badge>;
      case 'expiring':
        return <Badge className="bg-fleet-warning text-fleet-warning-foreground">Expiring Soon</Badge>;
      case 'expired':
        return <Badge className="bg-fleet-danger text-fleet-danger-foreground">Expired</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const activeDrivers = drivers.filter(d => d.status === 'active').length;
  const expiredLicenses = drivers.filter(d => d.licenseStatus === 'expired').length;
  const expiringLicenses = drivers.filter(d => d.licenseStatus === 'expiring').length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="fleet-card">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <UserCircle className="h-7 w-7 text-primary" />
              Driver Management
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage drivers, licenses, and compliance status
            </p>
          </div>
          <Button className="fleet-gradient-primary text-primary-foreground hover:opacity-90">
            <Plus className="h-4 w-4 mr-2" />
            Add Driver
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="fleet-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="fleet-gradient-primary rounded-full p-2 text-primary-foreground">
                <UserCircle className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Total Drivers</div>
                <div className="text-xl font-bold text-foreground">{drivers.length}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="fleet-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="fleet-gradient-success rounded-full p-2 text-fleet-success-foreground">
                <CheckCircle className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Active Drivers</div>
                <div className="text-xl font-bold text-foreground">{activeDrivers}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="fleet-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="fleet-gradient-warning rounded-full p-2 text-fleet-warning-foreground">
                <Calendar className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Expiring Licenses</div>
                <div className="text-xl font-bold text-foreground">{expiringLicenses}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="fleet-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="fleet-gradient-danger rounded-full p-2 text-fleet-danger-foreground">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Expired Licenses</div>
                <div className="text-xl font-bold text-foreground">{expiredLicenses}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="fleet-card">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search drivers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              <Select value={licenseFilter} onValueChange={setLicenseFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="License" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Licenses</SelectItem>
                  <SelectItem value="valid">Valid</SelectItem>
                  <SelectItem value="expiring">Expiring</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Drivers Table */}
      <Card className="fleet-card-elevated">
        <CardHeader>
          <CardTitle>Drivers ({filteredDrivers.length})</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="fleet-table">
              <thead>
                <tr className="fleet-table-header">
                  <th className="fleet-table-cell text-left">Driver</th>
                  <th className="fleet-table-cell text-left">License</th>
                  <th className="fleet-table-cell text-left">Status</th>
                  <th className="fleet-table-cell text-left">Vehicle</th>
                  <th className="fleet-table-cell text-left">Experience</th>
                  <th className="fleet-table-cell text-left">Last Duty</th>
                  <th className="fleet-table-cell text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredDrivers.map((driver) => (
                  <tr key={driver.id} className="fleet-table-row">
                    <td className="fleet-table-cell">
                      <div>
                        <div className="font-medium text-foreground flex items-center gap-2">
                          {driver.name}
                          {driver.heavyBadge && (
                            <Badge variant="outline" className="text-xs">Heavy</Badge>
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          ID: {driver.driverId}
                        </div>
                        <div className="text-xs text-muted-foreground flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {driver.phone}
                        </div>
                      </div>
                    </td>
                    <td className="fleet-table-cell">
                      <div>
                        <div className="text-sm text-foreground">{driver.licenseNumber}</div>
                        <div className="text-xs text-muted-foreground">
                          Expires: {driver.licenseExpiry}
                        </div>
                        <div className="mt-1">
                          {getLicenseStatusBadge(driver.licenseStatus)}
                        </div>
                      </div>
                    </td>
                    <td className="fleet-table-cell">
                      {getStatusBadge(driver.status)}
                    </td>
                    <td className="fleet-table-cell">
                      <div className="text-sm text-foreground">
                        {driver.currentVehicle || 'Not Assigned'}
                      </div>
                    </td>
                    <td className="fleet-table-cell">
                      <div className="text-sm text-foreground">{driver.experience} years</div>
                    </td>
                    <td className="fleet-table-cell">
                      <div className="text-sm text-foreground">{driver.lastDuty}</div>
                    </td>
                    <td className="fleet-table-cell">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <CreditCard className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DriverManagementPage;