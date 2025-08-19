import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { useTheme } from '../context/ThemeContext';
import { BarChart2Icon, EyeIcon, BellIcon, SettingsIcon, ShieldIcon, LogOutIcon, MenuIcon, XIcon, UserIcon, SunIcon, MoonIcon, GridIcon } from 'lucide-react';
export default function Navigation() {
  const {
    user,
    logout
  } = useUser();
  const {
    theme,
    toggleTheme
  } = useTheme();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isActive = (path: string) => location.pathname === path;
  // Base navigation items
  const navItems = [{
    name: 'Dashboard',
    path: '/dashboard',
    icon: <BarChart2Icon size={20} />
  }, {
    name: 'Companies',
    path: '/companies',
    icon: <GridIcon size={20} />
  }, {
    name: 'Role Dashboard',
    path: '/role-dashboard',
    icon: <BarChart2Icon size={20} />
  }, {
    name: 'Watchlist',
    path: '/watchlist',
    icon: <EyeIcon size={20} />
  }];
  // Add profile links based on role
  if (user?.role === 'admin') {
    navItems.push({
      name: 'Admin Profile',
      path: '/admin-profile',
      icon: <UserIcon size={20} />
    });
    navItems.push({
      name: 'Admin Panel',
      path: '/admin',
      icon: <ShieldIcon size={20} />
    });
  } else {
    navItems.push({
      name: 'User Profile',
      path: '/user-profile',
      icon: <UserIcon size={20} />
    });
  }
  // Add settings for all users
  navItems.push({
    name: 'Settings',
    path: '/profile',
    icon: <SettingsIcon size={20} />
  });
  return <header className="bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 transition-colors duration-200">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/dashboard" className="flex-shrink-0 flex items-center">
              <div className="h-8 w-8 bg-blue-500 rounded-md flex items-center justify-center mr-2">
                <BarChart2Icon size={20} className="text-white" />
              </div>
              <span className="font-bold text-xl text-gray-900 dark:text-white">
                CreditAI
              </span>
            </Link>
            {/* Desktop navigation */}
            <nav className="hidden md:ml-8 md:flex md:space-x-4">
              {navItems.map(item => <Link key={item.name} to={item.path} className={`px-3 py-2 rounded-md text-sm font-medium flex items-center ${isActive(item.path) ? 'bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'}`}>
                  <span className="mr-2">{item.icon}</span>
                  {item.name}
                </Link>)}
            </nav>
          </div>
          {/* User menu */}
          <div className="hidden md:flex items-center">
            {/* Theme toggle */}
            <button onClick={toggleTheme} className="p-2 rounded-full text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 mr-2" aria-label="Toggle theme">
              {theme === 'dark' ? <SunIcon size={20} /> : <MoonIcon size={20} />}
            </button>
            <button className="p-2 rounded-full text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700" aria-label="Notifications">
              <BellIcon size={20} />
            </button>
            <div className="ml-4 flex items-center">
              <div className="relative">
                <div className="flex items-center">
                  <img className="h-8 w-8 rounded-full" src={user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'} alt="User avatar" />
                  <span className="ml-2 text-sm font-medium text-gray-900 dark:text-white">
                    {user?.name || 'Guest'}
                  </span>
                </div>
              </div>
              <button onClick={logout} className="ml-4 p-2 rounded-full text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700" aria-label="Log out">
                <LogOutIcon size={20} />
              </button>
            </div>
          </div>
          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button onClick={toggleTheme} className="p-2 mr-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700" aria-label="Toggle theme">
              {theme === 'dark' ? <SunIcon size={20} /> : <MoonIcon size={20} />}
            </button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 focus:outline-none">
              {mobileMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      {mobileMenuOpen && <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map(item => <Link key={item.name} to={item.path} className={`block px-3 py-2 rounded-md text-base font-medium flex items-center ${isActive(item.path) ? 'bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'}`} onClick={() => setMobileMenuOpen(false)}>
                <span className="mr-2">{item.icon}</span>
                {item.name}
              </Link>)}
            <button onClick={logout} className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white flex items-center">
              <span className="mr-2">
                <LogOutIcon size={20} />
              </span>
              Log out
            </button>
          </div>
        </div>}
    </header>;
}