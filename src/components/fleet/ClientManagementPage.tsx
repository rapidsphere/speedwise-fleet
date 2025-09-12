import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Building2,
  Plus,
  Search,
  Eye,
  Edit,
  MapPin,
  Users,
  Truck
} from 'lucide-react';

interface Site {
  id: string;
  name: string;
  address: string;
  assignedVehicles: number;
  assignedDrivers: number;
}

interface Client {
  id: string;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  sites: Site[];
  status: 'active' | 'inactive';
  contractStart: string;
  totalVehicles: number;
}

const mockClients: Client[] = [
  {
    id: '1',
    companyName: 'TechCorp Solutions',
    contactPerson: 'David Johnson',
    email: 'david@techcorp.com',
    phone: '+91 98765 43210',
    address: 'Tech Park, Sector 5',
    city: 'Mumbai',
    state: 'Maharashtra',
    country: 'India',
    postalCode: '400001',
    status: 'active',
    contractStart: '2024-01-15',
    totalVehicles: 25,
    sites: [
      {
        id: '1',
        name: 'Mumbai Office',
        address: 'Bandra Kurla Complex, Mumbai',
        assignedVehicles: 15,
        assignedDrivers: 18
      },
      {
        id: '2',
        name: 'Pune Branch',
        address: 'Hinjewadi IT Park, Pune',
        assignedVehicles: 10,
        assignedDrivers: 12
      }
    ]
  },
  {
    id: '2',
    companyName: 'Global Industries Ltd',
    contactPerson: 'Sarah Williams',
    email: 'sarah@globalind.com',
    phone: '+91 87654 32109',
    address: 'Industrial Area, Phase 2',
    city: 'Bangalore',
    state: 'Karnataka',
    country: 'India',
    postalCode: '560001',
    status: 'active',
    contractStart: '2024-02-01',
    totalVehicles: 18,
    sites: [
      {
        id: '3',
        name: 'Bangalore Hub',
        address: 'Electronic City, Bangalore',
        assignedVehicles: 18,
        assignedDrivers: 22
      }
    ]
  },
  {
    id: '3',
    companyName: 'Metro Logistics',
    contactPerson: 'Rajesh Kumar',
    email: 'rajesh@metrologistics.com',
    phone: '+91 76543 21098',
    address: 'Logistics Park, Gurgaon',
    city: 'Delhi',
    state: 'Delhi',
    country: 'India',
    postalCode: '110001',
    status: 'active',
    contractStart: '2024-03-10',
    totalVehicles: 32,
    sites: [
      {
        id: '4',
        name: 'Delhi Warehouse',
        address: 'Industrial Area, Gurgaon',
        assignedVehicles: 20,
        assignedDrivers: 25
      },
      {
        id: '5',
        name: 'Noida Distribution Center',
        address: 'Sector 63, Noida',
        assignedVehicles: 12,
        assignedDrivers: 15
      }
    ]
  }
];

const ClientManagementPage: React.FC = () => {
  const [clients] = useState<Client[]>(mockClients);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  const filteredClients = clients.filter(client =>
    client.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalSites = clients.reduce((sum, client) => sum + client.sites.length, 0);
  const totalVehicles = clients.reduce((sum, client) => sum + client.totalVehicles, 0);
  const activeClients = clients.filter(c => c.status === 'active').length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="fleet-card">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <Building2 className="h-7 w-7 text-primary" />
              Client Management
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage clients, sites, and service agreements
            </p>
          </div>
          <Button className="fleet-gradient-primary text-primary-foreground hover:opacity-90">
            <Plus className="h-4 w-4 mr-2" />
            Add Client
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="fleet-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="fleet-gradient-primary rounded-full p-2 text-primary-foreground">
                <Building2 className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Total Clients</div>
                <div className="text-xl font-bold text-foreground">{clients.length}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="fleet-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="fleet-gradient-success rounded-full p-2 text-fleet-success-foreground">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Active Clients</div>
                <div className="text-xl font-bold text-foreground">{activeClients}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="fleet-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="fleet-gradient-warning rounded-full p-2 text-fleet-warning-foreground">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Total Sites</div>
                <div className="text-xl font-bold text-foreground">{totalSites}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="fleet-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="fleet-gradient-primary rounded-full p-2 text-primary-foreground">
                <Truck className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Total Vehicles</div>
                <div className="text-xl font-bold text-foreground">{totalVehicles}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card className="fleet-card">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search clients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Clients List */}
        <div className="lg:col-span-2">
          <Card className="fleet-card-elevated">
            <CardHeader>
              <CardTitle>Clients ({filteredClients.length})</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-0">
                {filteredClients.map((client) => (
                  <div
                    key={client.id}
                    className={`p-4 border-b border-border hover:bg-muted/30 cursor-pointer transition-colors ${
                      selectedClient?.id === client.id ? 'bg-muted/50' : ''
                    }`}
                    onClick={() => setSelectedClient(client)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <h3 className="font-semibold text-foreground">{client.companyName}</h3>
                          <Badge className="bg-fleet-success text-fleet-success-foreground">
                            {client.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          Contact: {client.contactPerson} • {client.email}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {client.city}, {client.state} • {client.sites.length} sites • {client.totalVehicles} vehicles
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Client Details */}
        <div>
          {selectedClient ? (
            <Card className="fleet-card-elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  {selectedClient.companyName}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-sm text-foreground mb-2">Contact Information</h4>
                  <div className="space-y-1 text-sm">
                    <p><span className="text-muted-foreground">Contact:</span> {selectedClient.contactPerson}</p>
                    <p><span className="text-muted-foreground">Email:</span> {selectedClient.email}</p>
                    <p><span className="text-muted-foreground">Phone:</span> {selectedClient.phone}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-sm text-foreground mb-2">Address</h4>
                  <p className="text-sm text-muted-foreground">
                    {selectedClient.address}<br />
                    {selectedClient.city}, {selectedClient.state}<br />
                    {selectedClient.country} - {selectedClient.postalCode}
                  </p>
                </div>

                <div>
                  <h4 className="font-medium text-sm text-foreground mb-2">Sites</h4>
                  <div className="space-y-2">
                    {selectedClient.sites.map((site) => (
                      <div key={site.id} className="p-3 bg-muted/30 rounded-md">
                        <h5 className="font-medium text-sm text-foreground">{site.name}</h5>
                        <p className="text-xs text-muted-foreground mt-1">{site.address}</p>
                        <div className="flex gap-4 mt-2 text-xs">
                          <span className="text-muted-foreground">
                            <Truck className="h-3 w-3 inline mr-1" />
                            {site.assignedVehicles} vehicles
                          </span>
                          <span className="text-muted-foreground">
                            <Users className="h-3 w-3 inline mr-1" />
                            {site.assignedDrivers} drivers
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <Button className="w-full" variant="outline">
                    View Full Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="fleet-card">
              <CardContent className="p-8 text-center">
                <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-medium text-foreground mb-2">Select a Client</h3>
                <p className="text-sm text-muted-foreground">
                  Choose a client from the list to view details
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientManagementPage;