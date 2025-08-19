import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import CompanyDetail from './pages/CompanyDetail';
import Watchlist from './pages/Watchlist';
import AdminPanel from './pages/AdminPanel';
import ProfileSettings from './pages/ProfileSettings';
import AdminProfile from './pages/AdminProfile';
import UserProfile from './pages/UserProfile';
import RoleBasedDashboard from './pages/RoleBasedDashboard';
import CompaniesOverview from './pages/CompaniesOverview';
import Notifications from './pages/Notifications';
import Navigation from './components/Navigation';
import { UserProvider } from './context/UserContext';
import { ThemeProvider } from './context/ThemeContext';
import { useUser } from './context/UserContext';
export function App() {
  return <ThemeProvider>
      <UserProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white transition-colors duration-200">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/*" element={<AuthenticatedRoutes />} />
            </Routes>
          </div>
        </Router>
      </UserProvider>
    </ThemeProvider>;
}
// Component to handle authenticated routes with navigation
function AuthenticatedRoutes() {
  const { isAuthenticated } = useUser();
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="flex-grow p-4 md:p-6">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/role-dashboard" element={<RoleBasedDashboard />} />
          <Route path="/company/:id" element={<CompanyDetail />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/profile" element={<ProfileSettings />} />
          <Route path="/admin-profile" element={<AdminProfile />} />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/companies" element={<CompaniesOverview />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </main>
    </div>;
}