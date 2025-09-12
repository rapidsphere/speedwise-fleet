import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Truck,
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  AlertTriangle,
  CheckCircle,
  Calendar,
  QrCode
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Vehicle {
  id: string;
  registration: string;
  type: string;
  brand: string;
  year: number;
  client: string;
  site: string;
  driver: string;
  status: 'active' | 'maintenance' | 'inactive';
  insurance: {
    expiry: string;
    status: 'valid' | 'expiring' | 'expired';
  };
  permit: {
    expiry: string;
    status: 'valid' | 'expiring' | 'expired';
  };
  lastService: string;
  mileage: number;
}

const mockVehicles: Vehicle[] = [
  {
    id: '1',
    registration: 'MH12-AB-1234',
    type: 'Heavy Truck',
    brand: 'Tata',
    year: 2020,
    client: 'TechCorp Solutions',
    site: 'Mumbai Office',
    driver: 'John Doe',
    status: 'active',
    insurance: { expiry: '2024-12-15', status: 'valid' },
    permit: { expiry: '2024-10-30', status: 'expiring' },
    lastService: '2024-09-01',
    mileage: 45000
  },
  {
    id: '2',
    registration: 'KA05-CD-5678',
    type: 'Light Vehicle',
    brand: 'Mahindra',
    year: 2021,
    client: 'Global Industries',
    site: 'Bangalore Hub',
    driver: 'Jane Smith',
    status: 'active',
    insurance: { expiry: '2025-03-20', status: 'valid' },
    permit: { expiry: '2025-01-15', status: 'valid' },
    lastService: '2024-08-15',
    mileage: 32000
  },
  {
    id: '3',
    registration: 'DL08-EF-9012',
    type: 'Medium Truck',
    brand: 'Ashok Leyland',
    year: 2019,
    client: 'Metro Logistics',
    site: 'Delhi Warehouse',
    driver: 'Mike Johnson',
    status: 'maintenance',
    insurance: { expiry: '2024-09-30', status: 'expired' },
    permit: { expiry: '2024-11-10', status: 'valid' },
    lastService: '2024-09-10',
    mileage: 78000
  }
];

const VehicleListPage: React.FC = () => {
  const [vehicles] = useState<Vehicle[]>(mockVehicles);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [clientFilter, setClientFilter] = useState<string>('all');
  const navigate = useNavigate();

  const filteredVehicles = vehicles.filter(vehicle => {
    const matchesSearch = vehicle.registration.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vehicle.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vehicle.driver.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || vehicle.status === statusFilter;
    const matchesClient = clientFilter === 'all' || vehicle.client === clientFilter;
    
    return matchesSearch && matchesStatus && matchesClient;
  });

  const uniqueClients = Array.from(new Set(vehicles.map(v => v.client)));

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-fleet-success text-fleet-success-foreground">Active</Badge>;
      case 'maintenance':
        return <Badge className="bg-fleet-warning text-fleet-warning-foreground">Maintenance</Badge>;
      case 'inactive':
        return <Badge variant="secondary">Inactive</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getComplianceStatus = (insurance: Vehicle['insurance'], permit: Vehicle['permit']) => {
    if (insurance.status === 'expired' || permit.status === 'expired') {
      return <Badge className="bg-fleet-danger text-fleet-danger-foreground">Non-Compliant</Badge>;
    }
    if (insurance.status === 'expiring' || permit.status === 'expiring') {
      return <Badge className="bg-fleet-warning text-fleet-warning-foreground">Expiring Soon</Badge>;
    }
    return <Badge className="bg-fleet-success text-fleet-success-foreground">Compliant</Badge>;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="fleet-card">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <Truck className="h-7 w-7 text-primary" />
              Vehicle Management
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage your fleet vehicles, compliance, and maintenance
            </p>
          </div>
          <Button 
            onClick={() => navigate('/vehicles/new')}
            className="fleet-gradient-primary text-primary-foreground hover:opacity-90"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Vehicle
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="fleet-card">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search vehicles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              <Select value={clientFilter} onValueChange={setClientFilter}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Client" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Clients</SelectItem>
                  {uniqueClients.map(client => (
                    <SelectItem key={client} value={client}>{client}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Vehicles Table */}
      <Card className="fleet-card-elevated">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Vehicles ({filteredVehicles.length})</span>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Advanced Filters
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="fleet-table">
              <thead>
                <tr className="fleet-table-header">
                  <th className="fleet-table-cell text-left">Vehicle</th>
                  <th className="fleet-table-cell text-left">Client & Site</th>
                  <th className="fleet-table-cell text-left">Driver</th>
                  <th className="fleet-table-cell text-left">Status</th>
                  <th className="fleet-table-cell text-left">Compliance</th>
                  <th className="fleet-table-cell text-left">Mileage</th>
                  <th className="fleet-table-cell text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredVehicles.map((vehicle) => (
                  <tr key={vehicle.id} className="fleet-table-row">
                    <td className="fleet-table-cell">
                      <div>
                        <div className="font-medium text-foreground">{vehicle.registration}</div>
                        <div className="text-sm text-muted-foreground">
                          {vehicle.brand} {vehicle.type} ({vehicle.year})
                        </div>
                      </div>
                    </td>
                    <td className="fleet-table-cell">
                      <div>
                        <div className="font-medium text-sm text-foreground">{vehicle.client}</div>
                        <div className="text-xs text-muted-foreground">{vehicle.site}</div>
                      </div>
                    </td>
                    <td className="fleet-table-cell">
                      <div className="text-sm text-foreground">{vehicle.driver}</div>
                    </td>
                    <td className="fleet-table-cell">
                      {getStatusBadge(vehicle.status)}
                    </td>
                    <td className="fleet-table-cell">
                      {getComplianceStatus(vehicle.insurance, vehicle.permit)}
                    </td>
                    <td className="fleet-table-cell">
                      <div className="text-sm text-foreground">{vehicle.mileage.toLocaleString()} km</div>
                    </td>
                    <td className="fleet-table-cell">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => navigate(`/vehicles/${vehicle.id}`)}
                          className="h-8 w-8"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => navigate(`/vehicles/${vehicle.id}/edit`)}
                          className="h-8 w-8"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                        >
                          <QrCode className="h-4 w-4" />
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

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="fleet-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="fleet-gradient-success rounded-full p-2 text-fleet-success-foreground">
                <CheckCircle className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Active Vehicles</div>
                <div className="text-xl font-bold text-foreground">
                  {vehicles.filter(v => v.status === 'active').length}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="fleet-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="fleet-gradient-warning rounded-full p-2 text-fleet-warning-foreground">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Need Attention</div>
                <div className="text-xl font-bold text-foreground">
                  {vehicles.filter(v => 
                    v.insurance.status !== 'valid' || v.permit.status !== 'valid'
                  ).length}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="fleet-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="fleet-gradient-primary rounded-full p-2 text-primary-foreground">
                <Calendar className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Due for Service</div>
                <div className="text-xl font-bold text-foreground">5</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VehicleListPage;