import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
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
  // Add admin panel link for admins (profile/settings moved to user menu)
  if (user?.role === 'admin') {
    navItems.push({
      name: 'Admin Panel',
      path: '/admin',
      icon: <ShieldIcon size={20} />
    });
  }
  const profilePath = user?.role === 'admin' ? '/admin-profile' : '/user-profile';
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [navNotifications, setNavNotifications] = useState<Array<{ id: string; title: string; message: string; time: string; read: boolean }>>([
    {
      id: 'n1',
      title: 'General Electric',
      message: 'Credit score dropped by 12 points',
      time: '10 minutes ago',
      read: false
    },
    {
      id: 'n2',
      title: 'Boeing Co.',
      message: 'Downgraded by traditional agency',
      time: '2 hours ago',
      read: false
    },
    {
      id: 'n3',
      title: 'JPMorgan Chase',
      message: 'New financial statements available',
      time: '4 hours ago',
      read: true
    }
  ]);
  const unreadCount = navNotifications.filter(n => !n.read).length;
  const markAllRead = () => setNavNotifications(prev => prev.map(n => ({ ...n, read: true })));
  const clearAll = () => setNavNotifications([]);
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
            <div className="relative">
              <button onClick={() => setNotifOpen(!notifOpen)} className="p-2 rounded-full text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700" aria-label="Notifications">
                <BellIcon size={20} />
              </button>
              {notifOpen && <div className="absolute right-0 mt-2 w-96 max-w-[24rem] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg overflow-hidden z-50">
                  <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                    <div className="font-semibold text-gray-900 dark:text-white">Notifications</div>
                    <div className="flex items-center space-x-3">
                      <button onClick={markAllRead} className="text-xs text-gray-600 dark:text-gray-300 hover:underline">Mark all as read</button>
                      <button onClick={clearAll} className="text-xs text-red-600 dark:text-red-400 hover:underline">Clear</button>
                      <button onClick={() => { setNotifOpen(false); navigate('/notifications'); }} className="text-xs text-blue-600 dark:text-blue-400 hover:underline">View all</button>
                    </div>
                  </div>
                  <div className="max-h-80 overflow-y-auto divide-y divide-gray-200 dark:divide-gray-700">
                    {navNotifications.length === 0 && (
                      <div className="px-4 py-6 text-sm text-gray-600 dark:text-gray-300">No notifications</div>
                    )}
                    {navNotifications.map(n => (
                      <div key={n.id} className={`px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer ${!n.read ? 'bg-gray-50 dark:bg-gray-700/50' : ''}`} onClick={() => setNavNotifications(prev => prev.map(x => x.id === n.id ? { ...x, read: true } : x))}>
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">{n.title}</div>
                          {!n.read && <span className="h-2 w-2 rounded-full bg-blue-500"></span>}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">{n.message}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{n.time}</div>
                      </div>
                    ))}
                  </div>
                  <div className="px-4 py-2 bg-gray-50 dark:bg-gray-700 text-xs text-gray-600 dark:text-gray-300">{unreadCount > 0 ? `${unreadCount} unread` : 'All caught up'}</div>
                </div>}
            </div>
            <div className="ml-4 relative">
              <button onClick={() => setUserMenuOpen(!userMenuOpen)} className="flex items-center rounded-md px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-700">
                <img className="h-8 w-8 rounded-full" src={user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'} alt="User avatar" />
                <span className="ml-2 text-sm font-medium text-gray-900 dark:text-white">{user?.name || 'Guest'}</span>
              </button>
              {userMenuOpen && <div className="absolute right-0 mt-2 w-56 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg overflow-hidden z-50">
                  <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center">
                      <div className="h-9 w-9 rounded-full overflow-hidden mr-3">
                        <img className="h-full w-full object-cover" src={user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'} alt="User" />
                      </div>
                      <div>
                        <button onClick={() => { setUserMenuOpen(false); navigate(profilePath); }} className="text-sm font-medium text-gray-900 dark:text-white hover:underline">
                          {user?.name || 'Profile'}
                        </button>
                        <div className="text-xs text-gray-600 dark:text-gray-400">{user?.email}</div>
                      </div>
                    </div>
                  </div>
                  <button onClick={() => { setUserMenuOpen(false); navigate(profilePath); }} className="w-full flex items-center px-4 py-2 text-sm text-left hover:bg-gray-100 dark:hover:bg-gray-700">
                    <UserIcon size={16} className="mr-2" />
                    User Profile
                  </button>
                  <button onClick={() => { setUserMenuOpen(false); navigate('/profile'); }} className="w-full flex items-center px-4 py-2 text-sm text-left hover:bg-gray-100 dark:hover:bg-gray-700">
                    <SettingsIcon size={16} className="mr-2" />
                    Settings
                  </button>
                  <button onClick={() => { setUserMenuOpen(false); logout(); navigate('/'); }} className="w-full flex items-center px-4 py-2 text-sm text-left hover:bg-gray-100 dark:hover:bg-gray-700">
                    <LogOutIcon size={16} className="mr-2" />
                    Log out
                  </button>
                </div>}
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
            <Link to="/notifications" className="block px-3 py-2 rounded-md text-base font-medium flex items-center text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white" onClick={() => setMobileMenuOpen(false)}>
              <span className="mr-2"><BellIcon size={20} /></span>
              Notifications
            </Link>
            <Link to={profilePath} className="block px-3 py-2 rounded-md text-base font-medium flex items-center text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white" onClick={() => setMobileMenuOpen(false)}>
              <span className="mr-2"><UserIcon size={20} /></span>
              {user?.name || 'Profile'}
            </Link>
            <Link to="/profile" className="block px-3 py-2 rounded-md text-base font-medium flex items-center text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white" onClick={() => setMobileMenuOpen(false)}>
              <span className="mr-2"><SettingsIcon size={20} /></span>
              Settings
            </Link>
            <button onClick={() => { setMobileMenuOpen(false); logout(); navigate('/'); }} className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white flex items-center">
              <span className="mr-2"><LogOutIcon size={20} /></span>
              Log out
            </button>
          </div>
        </div>}
    </header>;
}