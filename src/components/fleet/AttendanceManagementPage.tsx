import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import {
  Clock,
  Plus,
  Search,
  QrCode,
  CheckCircle,
  XCircle,
  Calendar,
  Users,
  AlertTriangle
} from 'lucide-react';

interface AttendanceRecord {
  id: string;
  date: string;
  clientName: string;
  siteName: string;
  vehicleNumber: string;
  driverName: string;
  checkInTime: string | null;
  checkOutTime: string | null;
  dutyType: 'Full Day' | 'Half Day' | 'Shift 1' | 'Shift 2';
  status: 'checked-in' | 'checked-out' | 'absent' | 'late';
  isLocked: boolean;
  markedBy: string;
}

const mockAttendanceRecords: AttendanceRecord[] = [
  {
    id: '1',
    date: '2024-09-12',
    clientName: 'TechCorp Solutions',
    siteName: 'Mumbai Office',
    vehicleNumber: 'MH12-AB-1234',
    driverName: 'John Doe',
    checkInTime: '08:30',
    checkOutTime: null,
    dutyType: 'Full Day',
    status: 'checked-in',
    isLocked: false,
    markedBy: 'Supervisor Jane'
  },
  {
    id: '2',
    date: '2024-09-12',
    clientName: 'Global Industries',
    siteName: 'Bangalore Hub',
    vehicleNumber: 'KA05-CD-5678',
    driverName: 'Jane Smith',
    checkInTime: '09:15',
    checkOutTime: '17:30',
    dutyType: 'Full Day',
    status: 'checked-out',
    isLocked: true,
    markedBy: 'Supervisor Mike'
  },
  {
    id: '3',
    date: '2024-09-12',
    clientName: 'Metro Logistics',
    siteName: 'Delhi Warehouse',
    vehicleNumber: 'DL08-EF-9012',
    driverName: 'Mike Johnson',
    checkInTime: null,
    checkOutTime: null,
    dutyType: 'Full Day',
    status: 'absent',
    isLocked: false,
    markedBy: 'System'
  },
  {
    id: '4',
    date: '2024-09-12',
    clientName: 'TechCorp Solutions',
    siteName: 'Pune Branch',
    vehicleNumber: 'MH20-XY-5555',
    driverName: 'Sarah Wilson',
    checkInTime: '10:30',
    checkOutTime: null,
    dutyType: 'Half Day',
    status: 'late',
    isLocked: false,
    markedBy: 'Supervisor David'
  }
];

const AttendanceManagementPage: React.FC = () => {
  const [attendanceRecords] = useState<AttendanceRecord[]>(mockAttendanceRecords);
  const [selectedDate, setSelectedDate] = useState('2024-09-12');
  const [selectedClient, setSelectedClient] = useState('all');
  const [selectedSite, setSelectedSite] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showMarkAttendance, setShowMarkAttendance] = useState(false);

  const filteredRecords = attendanceRecords.filter(record => {
    const matchesDate = record.date === selectedDate;
    const matchesClient = selectedClient === 'all' || record.clientName === selectedClient;
    const matchesSite = selectedSite === 'all' || record.siteName === selectedSite;
    const matchesSearch = record.driverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.vehicleNumber.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesDate && matchesClient && matchesSite && matchesSearch;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'checked-in':
        return <Badge className="bg-fleet-success text-fleet-success-foreground">Checked In</Badge>;
      case 'checked-out':
        return <Badge className="bg-primary text-primary-foreground">Checked Out</Badge>;
      case 'absent':
        return <Badge className="bg-fleet-danger text-fleet-danger-foreground">Absent</Badge>;
      case 'late':
        return <Badge className="bg-fleet-warning text-fleet-warning-foreground">Late</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const uniqueClients = Array.from(new Set(attendanceRecords.map(r => r.clientName)));
  const uniqueSites = Array.from(new Set(attendanceRecords
    .filter(r => selectedClient === 'all' || r.clientName === selectedClient)
    .map(r => r.siteName)));

  const todayStats = {
    total: filteredRecords.length,
    checkedIn: filteredRecords.filter(r => r.status === 'checked-in').length,
    checkedOut: filteredRecords.filter(r => r.status === 'checked-out').length,
    absent: filteredRecords.filter(r => r.status === 'absent').length,
    late: filteredRecords.filter(r => r.status === 'late').length
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="fleet-card">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <Clock className="h-7 w-7 text-primary" />
              Attendance Management
            </h1>
            <p className="text-muted-foreground mt-1">
              Track driver attendance and duty assignments
            </p>
          </div>
          <Button 
            className="fleet-gradient-primary text-primary-foreground hover:opacity-90"
            onClick={() => setShowMarkAttendance(!showMarkAttendance)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Mark Attendance
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="fleet-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="fleet-gradient-primary rounded-full p-2 text-primary-foreground">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Total</div>
                <div className="text-xl font-bold text-foreground">{todayStats.total}</div>
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
                <div className="text-sm text-muted-foreground">Checked In</div>
                <div className="text-xl font-bold text-foreground">{todayStats.checkedIn}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="fleet-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-primary rounded-full p-2 text-primary-foreground">
                <CheckCircle className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Checked Out</div>
                <div className="text-xl font-bold text-foreground">{todayStats.checkedOut}</div>
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
                <div className="text-sm text-muted-foreground">Late</div>
                <div className="text-xl font-bold text-foreground">{todayStats.late}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="fleet-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="fleet-gradient-danger rounded-full p-2 text-fleet-danger-foreground">
                <XCircle className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Absent</div>
                <div className="text-xl font-bold text-foreground">{todayStats.absent}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Mark Attendance Form */}
      {showMarkAttendance && (
        <Card className="fleet-card-elevated">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <QrCode className="h-5 w-5" />
              Mark New Attendance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="mark-client">Client</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Client" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="techcorp">TechCorp Solutions</SelectItem>
                    <SelectItem value="global">Global Industries</SelectItem>
                    <SelectItem value="metro">Metro Logistics</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="mark-site">Site</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Site" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mumbai">Mumbai Office</SelectItem>
                    <SelectItem value="pune">Pune Branch</SelectItem>
                    <SelectItem value="bangalore">Bangalore Hub</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="mark-vehicle">Vehicle</Label>
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
                <Label htmlFor="mark-driver">Driver</Label>
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
                <Label htmlFor="mark-duty">Duty Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Duty Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full">Full Day</SelectItem>
                    <SelectItem value="half">Half Day</SelectItem>
                    <SelectItem value="shift1">Shift 1</SelectItem>
                    <SelectItem value="shift2">Shift 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button className="w-full fleet-gradient-success text-fleet-success-foreground">
                  <QrCode className="h-4 w-4 mr-2" />
                  Check In
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filters */}
      <Card className="fleet-card">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div>
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-[150px]"
              />
            </div>
            <div className="flex-1">
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search driver or vehicle..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="client-filter">Client</Label>
              <Select value={selectedClient} onValueChange={setSelectedClient}>
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
            <div>
              <Label htmlFor="site-filter">Site</Label>
              <Select value={selectedSite} onValueChange={setSelectedSite}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Site" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sites</SelectItem>
                  {uniqueSites.map(site => (
                    <SelectItem key={site} value={site}>{site}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Attendance Table */}
      <Card className="fleet-card-elevated">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Attendance Records ({filteredRecords.length})</span>
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              Export Sheet
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="fleet-table">
              <thead>
                <tr className="fleet-table-header">
                  <th className="fleet-table-cell text-left">Driver & Vehicle</th>
                  <th className="fleet-table-cell text-left">Client & Site</th>
                  <th className="fleet-table-cell text-left">Duty Type</th>
                  <th className="fleet-table-cell text-left">Check In</th>
                  <th className="fleet-table-cell text-left">Check Out</th>
                  <th className="fleet-table-cell text-left">Status</th>
                  <th className="fleet-table-cell text-left">Marked By</th>
                  <th className="fleet-table-cell text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRecords.map((record) => (
                  <tr key={record.id} className="fleet-table-row">
                    <td className="fleet-table-cell">
                      <div>
                        <div className="font-medium text-foreground">{record.driverName}</div>
                        <div className="text-sm text-muted-foreground">{record.vehicleNumber}</div>
                      </div>
                    </td>
                    <td className="fleet-table-cell">
                      <div>
                        <div className="font-medium text-sm text-foreground">{record.clientName}</div>
                        <div className="text-xs text-muted-foreground">{record.siteName}</div>
                      </div>
                    </td>
                    <td className="fleet-table-cell">
                      <Badge variant="outline">{record.dutyType}</Badge>
                    </td>
                    <td className="fleet-table-cell">
                      <div className="text-sm text-foreground">
                        {record.checkInTime || '-'}
                      </div>
                    </td>
                    <td className="fleet-table-cell">
                      <div className="text-sm text-foreground">
                        {record.checkOutTime || '-'}
                      </div>
                    </td>
                    <td className="fleet-table-cell">
                      {getStatusBadge(record.status)}
                    </td>
                    <td className="fleet-table-cell">
                      <div className="text-sm text-foreground">{record.markedBy}</div>
                    </td>
                    <td className="fleet-table-cell">
                      <div className="flex items-center gap-2">
                        {record.status === 'checked-in' && (
                          <Button variant="outline" size="sm" className="h-8">
                            Check Out
                          </Button>
                        )}
                        {!record.isLocked && (
                          <Button variant="ghost" size="sm" className="h-8">
                            Edit
                          </Button>
                        )}
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

export default AttendanceManagementPage;