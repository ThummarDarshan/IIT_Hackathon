import React, { useState, createContext, useContext } from 'react';
type UserRole = 'guest' | 'analyst' | 'admin';
interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
}
interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}
const UserContext = createContext<UserContextType | undefined>(undefined);
// Mock users for demo
const mockUsers = {
  analyst: {
    id: '1',
    name: 'John Analyst',
    email: 'analyst@example.com',
    role: 'analyst' as UserRole,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  admin: {
    id: '2',
    name: 'Sarah Admin',
    email: 'admin@example.com',
    role: 'admin' as UserRole,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  }
};
export function UserProvider({
  children
}: {
  children: ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const login = async (email: string, password: string) => {
    // Mock authentication
    if (email === 'analyst@example.com') {
      setUser(mockUsers.analyst);
    } else if (email === 'admin@example.com') {
      setUser(mockUsers.admin);
    } else {
      throw new Error('Invalid credentials');
    }
  };
  const logout = () => {
    setUser(null);
  };
  return <UserContext.Provider value={{
    user,
    setUser,
    isAuthenticated: !!user,
    login,
    logout
  }}>
      {children}
    </UserContext.Provider>;
}
export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}