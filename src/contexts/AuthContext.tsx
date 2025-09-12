import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'Admin' | 'Supervisor' | 'Site Manager' | 'Driver';

export interface User {
  id: string;
  username: string;
  name: string;
  role: UserRole;
  email?: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  hasPermission: (requiredRole: UserRole[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data
const mockUsers: Record<string, User & { password: string }> = {
  admin: { id: '1', username: 'admin', password: 'admin', name: 'John Admin', role: 'Admin', email: 'admin@fleet.com' },
  supervisor: { id: '2', username: 'supervisor', password: 'supervisor', name: 'Jane Supervisor', role: 'Supervisor', email: 'supervisor@fleet.com' },
  manager: { id: '3', username: 'manager', password: 'manager', name: 'Mike Manager', role: 'Site Manager', email: 'manager@fleet.com' },
  driver: { id: '4', username: 'driver', password: 'driver', name: 'Sam Driver', role: 'Driver', email: 'driver@fleet.com' }
};

const roleHierarchy: Record<UserRole, number> = {
  'Admin': 4,
  'Supervisor': 3,
  'Site Manager': 2,
  'Driver': 1
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for stored user on mount
    const storedUser = localStorage.getItem('fleet-user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        localStorage.removeItem('fleet-user');
      }
    }
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    const mockUser = mockUsers[username.toLowerCase()];
    if (mockUser && mockUser.password === password) {
      const { password: _, ...userWithoutPassword } = mockUser;
      setUser(userWithoutPassword);
      localStorage.setItem('fleet-user', JSON.stringify(userWithoutPassword));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('fleet-user');
  };

  const hasPermission = (requiredRoles: UserRole[]): boolean => {
    if (!user) return false;
    return requiredRoles.some(role => 
      roleHierarchy[user.role] >= roleHierarchy[role]
    );
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, hasPermission }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};