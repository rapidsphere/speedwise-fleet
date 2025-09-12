import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Truck, Shield, Users, Wrench } from 'lucide-react';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const success = await login(username, password);
      if (!success) {
        setError('Invalid username or password');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const demoCredentials = [
    { username: 'admin', role: 'Admin', icon: Shield, description: 'Full system access' },
    { username: 'supervisor', role: 'Supervisor', icon: Users, description: 'Manage teams & operations' },
    { username: 'manager', role: 'Site Manager', icon: Wrench, description: 'Site-specific management' },
    { username: 'driver', role: 'Driver', icon: Truck, description: 'Driver portal access' }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-primary-light/10 to-background p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="fleet-gradient-primary rounded-full p-3 text-primary-foreground">
              <Truck className="h-8 w-8" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Rapid Sphere</h1>
          </div>
          <p className="text-muted-foreground">Fleet Management System</p>
        </div>

        <Card className="fleet-card-elevated">
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Sign In</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>

              {error && (
                <Alert className="border-fleet-danger/50 bg-fleet-danger/10">
                  <AlertDescription className="text-fleet-danger">
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              <Button 
                type="submit" 
                className="w-full fleet-gradient-primary text-primary-foreground hover:opacity-90"
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="mt-6 fleet-card">
          <CardHeader>
            <CardTitle className="text-lg">Demo Credentials</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {demoCredentials.map(({ username, role, icon: Icon, description }) => (
                <div 
                  key={username}
                  className="flex items-center gap-3 p-2 rounded-md hover:bg-muted/50 cursor-pointer transition-colors"
                  onClick={() => {
                    setUsername(username);
                    setPassword(username);
                  }}
                >
                  <Icon className="h-4 w-4 text-primary" />
                  <div className="flex-1">
                    <div className="font-medium text-sm">{role}</div>
                    <div className="text-xs text-muted-foreground">{description}</div>
                  </div>
                  <div className="text-xs text-muted-foreground">{username}</div>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-3 text-center">
              Click any role to auto-fill credentials
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;