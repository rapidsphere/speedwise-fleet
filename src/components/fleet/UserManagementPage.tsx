import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Users,
  Plus,
  Search,
  Eye,
  Edit,
  Shield,
  UserCheck,
  UserX,
  Settings
} from 'lucide-react';

interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  role: 'Admin' | 'Supervisor' | 'Site Manager' | 'Driver';
  status: 'active' | 'disabled';
  lastLogin: string;
  createdAt: string;
}

const mockUsers: User[] = [
  {
    id: '1',
    username: 'admin',
    name: 'John Admin',
    email: 'admin@fleet.com',
    role: 'Admin',
    status: 'active',
    lastLogin: '2024-09-12 09:30',
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    username: 'supervisor1',
    name: 'Jane Supervisor',
    email: 'supervisor@fleet.com',
    role: 'Supervisor',
    status: 'active',
    lastLogin: '2024-09-12 08:45',
    createdAt: '2024-02-20'
  },
  {
    id: '3',
    username: 'manager1',
    name: 'Mike Manager',
    email: 'manager@fleet.com',
    role: 'Site Manager',
    status: 'active',
    lastLogin: '2024-09-11 16:20',
    createdAt: '2024-03-10'
  },
  {
    id: '4',
    username: 'driver1',
    name: 'Sam Driver',
    email: 'driver@fleet.com',
    role: 'Driver',
    status: 'active',
    lastLogin: '2024-09-12 07:15',
    createdAt: '2024-04-05'
  },
  {
    id: '5',
    username: 'manager2',
    name: 'Lisa Wilson',
    email: 'lisa.wilson@fleet.com',
    role: 'Site Manager',
    status: 'disabled',
    lastLogin: '2024-09-08 14:30',
    createdAt: '2024-05-12'
  }
];

const UserManagementPage: React.FC = () => {
  const [users] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.username.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'Admin':
        return <Badge className="bg-fleet-danger text-fleet-danger-foreground">Admin</Badge>;
      case 'Supervisor':
        return <Badge className="bg-primary text-primary-foreground">Supervisor</Badge>;
      case 'Site Manager':
        return <Badge className="bg-fleet-warning text-fleet-warning-foreground">Site Manager</Badge>;
      case 'Driver':
        return <Badge className="bg-fleet-success text-fleet-success-foreground">Driver</Badge>;
      default:
        return <Badge variant="secondary">{role}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-fleet-success text-fleet-success-foreground">Active</Badge>;
      case 'disabled':
        return <Badge variant="secondary">Disabled</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="fleet-card">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <Users className="h-7 w-7 text-primary" />
              User Management
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage system users, roles, and permissions
            </p>
          </div>
          <Button className="fleet-gradient-primary text-primary-foreground hover:opacity-90">
            <Plus className="h-4 w-4 mr-2" />
            Add User
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="fleet-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="fleet-gradient-primary rounded-full p-2 text-primary-foreground">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Total Users</div>
                <div className="text-xl font-bold text-foreground">{users.length}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="fleet-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="fleet-gradient-success rounded-full p-2 text-fleet-success-foreground">
                <UserCheck className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Active Users</div>
                <div className="text-xl font-bold text-foreground">
                  {users.filter(u => u.status === 'active').length}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="fleet-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-muted rounded-full p-2 text-muted-foreground">
                <UserX className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Disabled</div>
                <div className="text-xl font-bold text-foreground">
                  {users.filter(u => u.status === 'disabled').length}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="fleet-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="fleet-gradient-warning rounded-full p-2 text-fleet-warning-foreground">
                <Shield className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Admins</div>
                <div className="text-xl font-bold text-foreground">
                  {users.filter(u => u.role === 'Admin').length}
                </div>
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
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="Supervisor">Supervisor</SelectItem>
                  <SelectItem value="Site Manager">Site Manager</SelectItem>
                  <SelectItem value="Driver">Driver</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="disabled">Disabled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card className="fleet-card-elevated">
        <CardHeader>
          <CardTitle>Users ({filteredUsers.length})</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="fleet-table">
              <thead>
                <tr className="fleet-table-header">
                  <th className="fleet-table-cell text-left">User</th>
                  <th className="fleet-table-cell text-left">Role</th>
                  <th className="fleet-table-cell text-left">Status</th>
                  <th className="fleet-table-cell text-left">Last Login</th>
                  <th className="fleet-table-cell text-left">Created</th>
                  <th className="fleet-table-cell text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="fleet-table-row">
                    <td className="fleet-table-cell">
                      <div>
                        <div className="font-medium text-foreground">{user.name}</div>
                        <div className="text-sm text-muted-foreground">{user.email}</div>
                        <div className="text-xs text-muted-foreground">@{user.username}</div>
                      </div>
                    </td>
                    <td className="fleet-table-cell">
                      {getRoleBadge(user.role)}
                    </td>
                    <td className="fleet-table-cell">
                      {getStatusBadge(user.status)}
                    </td>
                    <td className="fleet-table-cell">
                      <div className="text-sm text-foreground">{user.lastLogin}</div>
                    </td>
                    <td className="fleet-table-cell">
                      <div className="text-sm text-foreground">{user.createdAt}</div>
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
                          <Settings className="h-4 w-4" />
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

export default UserManagementPage;