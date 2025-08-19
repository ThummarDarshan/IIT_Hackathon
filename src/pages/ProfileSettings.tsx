import React, { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext';
import { useTheme } from '../context/ThemeContext';
import { UserIcon, BellIcon, MoonIcon, SunIcon, SaveIcon, LogOutIcon, CheckIcon } from 'lucide-react';
export default function ProfileSettings() {
  const {
    user,
    logout
  } = useUser();
  const {
    theme,
    setTheme
  } = useTheme();
  const [darkMode, setDarkMode] = useState(theme === 'dark');
  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    push: true,
    scoreChanges: true,
    newsAlerts: true,
    weeklyDigest: false
  });
  // Keep local state in sync with theme context
  useEffect(() => {
    setDarkMode(theme === 'dark');
  }, [theme]);
  const handleToggleNotification = (key: keyof typeof notificationSettings) => {
    setNotificationSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };
  const handleThemeChange = (isDark: boolean) => {
    setDarkMode(isDark);
    setTheme(isDark ? 'dark' : 'light');
  };
  const handleSaveSettings = () => {
    // In a real app, this would save to the backend
    alert('Settings saved successfully');
  };
  return <div className="max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Profile & Settings
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your account preferences
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="flex flex-col items-center text-center">
              <div className="h-24 w-24 rounded-full overflow-hidden mb-4">
                <img src={user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'} alt="Profile" className="h-full w-full object-cover" />
              </div>
              <h2 className="text-xl font-semibold mb-1 text-gray-900 dark:text-white">
                {user?.name || 'User'}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {user?.role || 'Analyst'}
              </p>
              <button className="w-full py-2 rounded-md border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors mb-2">
                Change Photo
              </button>
              <button onClick={logout} className="w-full py-2 rounded-md border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900 dark:hover:bg-opacity-30 transition-colors flex items-center justify-center">
                <LogOutIcon size={16} className="mr-2" />
                Sign Out
              </button>
            </div>
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Account Created
              </div>
              <div className="font-medium text-gray-900 dark:text-white">
                January 15, 2023
              </div>
            </div>
          </div>
        </div>
        {/* Main settings */}
        <div className="lg:col-span-2">
          {/* Personal Information */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm mb-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-900 dark:text-white">
              <UserIcon size={20} className="mr-2 text-blue-500" />
              Personal Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">
                  First Name
                </label>
                <input type="text" id="firstName" defaultValue={user?.name.split(' ')[0] || ''} className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">
                  Last Name
                </label>
                <input type="text" id="lastName" defaultValue={user?.name.split(' ')[1] || ''} className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">
                Email Address
              </label>
              <input type="email" id="email" defaultValue={user?.email || ''} className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">
                Role
              </label>
              <input type="text" id="role" defaultValue={user?.role || ''} disabled className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-500 dark:text-gray-400 focus:outline-none cursor-not-allowed" />
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                Role cannot be changed. Contact system administrator for role
                changes.
              </p>
            </div>
          </div>
          {/* Notification Settings */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm mb-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-900 dark:text-white">
              <BellIcon size={20} className="mr-2 text-blue-500" />
              Notification Settings
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    Email Notifications
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Receive notifications via email
                  </p>
                </div>
                <button onClick={() => handleToggleNotification('email')} className={`relative inline-flex h-6 w-11 items-center rounded-full ${notificationSettings.email ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'}`}>
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${notificationSettings.email ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    Push Notifications
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Receive notifications in the browser
                  </p>
                </div>
                <button onClick={() => handleToggleNotification('push')} className={`relative inline-flex h-6 w-11 items-center rounded-full ${notificationSettings.push ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'}`}>
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${notificationSettings.push ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <h3 className="font-medium mb-3 text-gray-900 dark:text-white">
                  Notification Types
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <input type="checkbox" id="scoreChanges" checked={notificationSettings.scoreChanges} onChange={() => handleToggleNotification('scoreChanges')} className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-800" />
                    <label htmlFor="scoreChanges" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                      Score Changes
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="newsAlerts" checked={notificationSettings.newsAlerts} onChange={() => handleToggleNotification('newsAlerts')} className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-800" />
                    <label htmlFor="newsAlerts" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                      News & Events
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="weeklyDigest" checked={notificationSettings.weeklyDigest} onChange={() => handleToggleNotification('weeklyDigest')} className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-800" />
                    <label htmlFor="weeklyDigest" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                      Weekly Digest
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Appearance Settings */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm mb-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-900 dark:text-white">
              <SunIcon size={20} className="mr-2 text-blue-500" />
              Appearance
            </h2>
            <div className="flex space-x-4">
              <button onClick={() => handleThemeChange(false)} className={`flex-1 p-4 rounded-lg border ${!darkMode ? 'border-blue-500 bg-gray-100 dark:bg-gray-700' : 'border-gray-300 dark:border-gray-700'} flex flex-col items-center`}>
                <SunIcon size={24} className={!darkMode ? 'text-blue-500' : 'text-gray-600 dark:text-gray-400'} />
                <span className={`mt-2 ${!darkMode ? 'text-blue-500' : 'text-gray-900 dark:text-gray-300'}`}>
                  Light Mode
                </span>
                {!darkMode && <CheckIcon size={16} className="text-blue-500 mt-2" />}
              </button>
              <button onClick={() => handleThemeChange(true)} className={`flex-1 p-4 rounded-lg border ${darkMode ? 'border-blue-500 bg-gray-100 dark:bg-gray-700' : 'border-gray-300 dark:border-gray-700'} flex flex-col items-center`}>
                <MoonIcon size={24} className={darkMode ? 'text-blue-500' : 'text-gray-600 dark:text-gray-400'} />
                <span className={`mt-2 ${darkMode ? 'text-blue-500' : 'text-gray-900 dark:text-gray-300'}`}>
                  Dark Mode
                </span>
                {darkMode && <CheckIcon size={16} className="text-blue-500 mt-2" />}
              </button>
            </div>
          </div>
          {/* Save Button */}
          <div className="flex justify-end">
            <button onClick={handleSaveSettings} className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md flex items-center shadow-sm">
              <SaveIcon size={16} className="mr-2" />
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>;
}