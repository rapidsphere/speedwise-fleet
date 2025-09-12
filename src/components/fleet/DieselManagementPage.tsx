import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Fuel,
  Plus,
  Search,
  Upload,
  CheckCircle,
  AlertTriangle,
  TrendingDown,
  Calculator
} from 'lucide-react';

interface DieselEntry {
  id: string;
  date: string;
  vehicleNumber: string;
  driverName: string;
  dieselQuantity: number;
  odometerReading: number;
  previousReading: number;
  distanceCovered: number;
  mileage: number;
  idealMileage: number;
  efficiency: 'excellent' | 'good' | 'average' | 'poor';
  pumpBillAmount: number;
  pumpBillNumber: string;
  approvedBy: string | null;
  status: 'pending' | 'approved' | 'rejected';
  enteredBy: string;
  notes?: string;
}

const mockDieselEntries: DieselEntry[] = [
  {
    id: '1',
    date: '2024-09-12',
    vehicleNumber: 'MH12-AB-1234',
    driverName: 'John Doe',
    dieselQuantity: 50,
    odometerReading: 45250,
    previousReading: 45000,
    distanceCovered: 250,
    mileage: 5.0,
    idealMileage: 4.5,
    efficiency: 'excellent',
    pumpBillAmount: 4500,
    pumpBillNumber: 'PB-2024-001',
    approvedBy: 'Manager Mike',
    status: 'approved',
    enteredBy: 'Supervisor Jane',
    notes: 'Highway driving, good efficiency'
  },
  {
    id: '2',
    date: '2024-09-12',
    vehicleNumber: 'KA05-CD-5678',
    driverName: 'Jane Smith',
    dieselQuantity: 40,
    odometerReading: 32150,
    previousReading: 32000,
    distanceCovered: 150,
    mileage: 3.75,
    idealMileage: 4.2,
    efficiency: 'poor',
    pumpBillAmount: 3600,
    pumpBillNumber: 'PB-2024-002',
    approvedBy: null,
    status: 'pending',
    enteredBy: 'Supervisor Mike',
    notes: 'City traffic, low efficiency'
  },
  {
    id: '3',
    date: '2024-09-11',
    vehicleNumber: 'DL08-EF-9012',
    driverName: 'Mike Johnson',
    dieselQuantity: 60,
    odometerReading: 78500,
    previousReading: 78200,
    distanceCovered: 300,
    mileage: 5.0,
    idealMileage: 4.8,
    efficiency: 'good',
    pumpBillAmount: 5400,
    pumpBillNumber: 'PB-2024-003',
    approvedBy: 'Manager Sarah',
    status: 'approved',
    enteredBy: 'Supervisor David'
  }
];

const DieselManagementPage: React.FC = () => {
  const [dieselEntries] = useState<DieselEntry[]>(mockDieselEntries);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState('2024-09-12');
  const [showAddEntry, setShowAddEntry] = useState(false);

  const filteredEntries = dieselEntries.filter(entry => {
    const matchesSearch = entry.vehicleNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.driverName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || entry.status === statusFilter;
    const matchesDate = !dateFilter || entry.date === dateFilter;
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-fleet-success text-fleet-success-foreground">Approved</Badge>;
      case 'pending':
        return <Badge className="bg-fleet-warning text-fleet-warning-foreground">Pending</Badge>;
      case 'rejected':
        return <Badge className="bg-fleet-danger text-fleet-danger-foreground">Rejected</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getEfficiencyBadge = (efficiency: string) => {
    switch (efficiency) {
      case 'excellent':
        return <Badge className="bg-fleet-success text-fleet-success-foreground">Excellent</Badge>;
      case 'good':
        return <Badge className="bg-primary text-primary-foreground">Good</Badge>;
      case 'average':
        return <Badge className="bg-fleet-warning text-fleet-warning-foreground">Average</Badge>;
      case 'poor':
        return <Badge className="bg-fleet-danger text-fleet-danger-foreground">Poor</Badge>;
      default:
        return <Badge variant="secondary">{efficiency}</Badge>;
    }
  };

  const todayStats = {
    totalEntries: filteredEntries.length,
    totalFuel: filteredEntries.reduce((sum, entry) => sum + entry.dieselQuantity, 0),
    totalAmount: filteredEntries.reduce((sum, entry) => sum + entry.pumpBillAmount, 0),
    avgMileage: filteredEntries.reduce((sum, entry) => sum + entry.mileage, 0) / filteredEntries.length || 0,
    pending: filteredEntries.filter(e => e.status === 'pending').length
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="fleet-card">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <Fuel className="h-7 w-7 text-primary" />
              Diesel Entry Management
            </h1>
            <p className="text-muted-foreground mt-1">
              Track fuel consumption, mileage, and efficiency
            </p>
          </div>
          <Button 
            className="fleet-gradient-primary text-primary-foreground hover:opacity-90"
            onClick={() => setShowAddEntry(!showAddEntry)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Diesel Entry
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="fleet-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="fleet-gradient-primary rounded-full p-2 text-primary-foreground">
                <Fuel className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Total Entries</div>
                <div className="text-xl font-bold text-foreground">{todayStats.totalEntries}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="fleet-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="fleet-gradient-warning rounded-full p-2 text-fleet-warning-foreground">
                <Fuel className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Total Fuel (L)</div>
                <div className="text-xl font-bold text-foreground">{todayStats.totalFuel}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="fleet-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="fleet-gradient-success rounded-full p-2 text-fleet-success-foreground">
                <Calculator className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Total Amount</div>
                <div className="text-xl font-bold text-foreground">₹{todayStats.totalAmount.toLocaleString()}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="fleet-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-primary rounded-full p-2 text-primary-foreground">
                <TrendingDown className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Avg Mileage</div>
                <div className="text-xl font-bold text-foreground">{todayStats.avgMileage.toFixed(1)} km/l</div>
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
                <div className="text-sm text-muted-foreground">Pending</div>
                <div className="text-xl font-bold text-foreground">{todayStats.pending}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add Diesel Entry Form */}
      {showAddEntry && (
        <Card className="fleet-card-elevated">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Add New Diesel Entry
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="entry-vehicle">Vehicle Number</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Vehicle" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mh12">MH12-AB-1234</SelectItem>
                    <SelectItem value="ka05">KA05-CD-5678</SelectItem>
                    <SelectItem value="dl08">DL08-EF-9012</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="entry-driver">Driver</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Driver" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="john">John Doe</SelectItem>
                    <SelectItem value="jane">Jane Smith</SelectItem>
                    <SelectItem value="mike">Mike Johnson</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="entry-quantity">Diesel Quantity (L)</Label>
                <Input id="entry-quantity" type="number" placeholder="Enter quantity" />
              </div>
              <div>
                <Label htmlFor="entry-odometer">Odometer Reading</Label>
                <Input id="entry-odometer" type="number" placeholder="Current reading" />
              </div>
              <div>
                <Label htmlFor="entry-amount">Pump Bill Amount</Label>
                <Input id="entry-amount" type="number" placeholder="Enter amount" />
              </div>
              <div>
                <Label htmlFor="entry-bill">Pump Bill Number</Label>
                <Input id="entry-bill" placeholder="Bill number" />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="entry-notes">Notes (Optional)</Label>
                <Textarea id="entry-notes" placeholder="Any additional notes..." />
              </div>
              <div>
                <Label htmlFor="entry-upload">Upload Bill</Label>
                <div className="flex gap-2">
                  <Input id="entry-upload" type="file" accept="image/*,application/pdf" />
                  <Button variant="outline" size="icon">
                    <Upload className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              <Button className="fleet-gradient-success text-fleet-success-foreground">
                Save Entry
              </Button>
              <Button variant="outline" onClick={() => setShowAddEntry(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filters */}
      <Card className="fleet-card">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div>
              <Label htmlFor="date-filter">Date</Label>
              <Input
                id="date-filter"
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="w-[150px]"
              />
            </div>
            <div className="flex-1">
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search vehicle or driver..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="status-filter">Status</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Diesel Entries Table */}
      <Card className="fleet-card-elevated">
        <CardHeader>
          <CardTitle>Diesel Entries ({filteredEntries.length})</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="fleet-table">
              <thead>
                <tr className="fleet-table-header">
                  <th className="fleet-table-cell text-left">Vehicle & Driver</th>
                  <th className="fleet-table-cell text-left">Fuel Details</th>
                  <th className="fleet-table-cell text-left">Mileage</th>
                  <th className="fleet-table-cell text-left">Efficiency</th>
                  <th className="fleet-table-cell text-left">Bill Details</th>
                  <th className="fleet-table-cell text-left">Status</th>
                  <th className="fleet-table-cell text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEntries.map((entry) => (
                  <tr key={entry.id} className="fleet-table-row">
                    <td className="fleet-table-cell">
                      <div>
                        <div className="font-medium text-foreground">{entry.vehicleNumber}</div>
                        <div className="text-sm text-muted-foreground">{entry.driverName}</div>
                        <div className="text-xs text-muted-foreground">{entry.date}</div>
                      </div>
                    </td>
                    <td className="fleet-table-cell">
                      <div>
                        <div className="text-sm text-foreground">{entry.dieselQuantity}L</div>
                        <div className="text-xs text-muted-foreground">
                          {entry.distanceCovered} km traveled
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {entry.odometerReading.toLocaleString()} km
                        </div>
                      </div>
                    </td>
                    <td className="fleet-table-cell">
                      <div>
                        <div className="text-sm text-foreground">{entry.mileage} km/l</div>
                        <div className="text-xs text-muted-foreground">
                          Ideal: {entry.idealMileage} km/l
                        </div>
                      </div>
                    </td>
                    <td className="fleet-table-cell">
                      {getEfficiencyBadge(entry.efficiency)}
                    </td>
                    <td className="fleet-table-cell">
                      <div>
                        <div className="text-sm text-foreground">₹{entry.pumpBillAmount}</div>
                        <div className="text-xs text-muted-foreground">{entry.pumpBillNumber}</div>
                      </div>
                    </td>
                    <td className="fleet-table-cell">
                      {getStatusBadge(entry.status)}
                    </td>
                    <td className="fleet-table-cell">
                      <div className="flex items-center gap-2">
                        {entry.status === 'pending' && (
                          <>
                            <Button variant="outline" size="sm" className="h-8 text-fleet-success border-fleet-success">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Approve
                            </Button>
                          </>
                        )}
                        <Button variant="ghost" size="sm" className="h-8">
                          View
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

export default DieselManagementPage;