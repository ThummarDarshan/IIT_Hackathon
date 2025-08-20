import React, { useState, useRef } from 'react';
import { useUser } from '../context/UserContext';
import { useTheme } from '../context/ThemeContext';
import { ShieldIcon, UserIcon, KeyIcon, AlertTriangleIcon, FileTextIcon, SettingsIcon, DatabaseIcon, ServerIcon, BellIcon, CheckCircleIcon, XCircleIcon, LogOutIcon } from 'lucide-react';
export default function AdminProfile() {
  const {
    user,
    logout
  } = useUser();
  const {
    theme
  } = useTheme();
  const [activeTab, setActiveTab] = useState('overview');
  // System Controls interactive state
  const [apiServiceStatus, setApiServiceStatus] = useState<'operational' | 'restarting'>('operational');
  const [lastBackupTime, setLastBackupTime] = useState<string | null>(null);
  const [backupProgress, setBackupProgress] = useState<number>(0);
  const [actionLogs, setActionLogs] = useState<Array<{ id: string; title: string; detail: string; time: string }>>([]);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const [settings, setSettings] = useState<{ maintenanceMode: boolean; autoScaling: boolean }>({ maintenanceMode: false, autoScaling: true });
  const [alertsModalOpen, setAlertsModalOpen] = useState(false);
  const [modelProgress] = useState<number>(65);
  const notificationsRef = useRef<HTMLDivElement | null>(null);

  function addActionLog(title: string, detail: string) {
    const time = new Date().toLocaleString();
    setActionLogs(prev => [{ id: `${Date.now()}`, title, detail, time }, ...prev].slice(0, 8));
  }

  function handleRestartServices() {
    if (apiServiceStatus === 'restarting') return;
    setApiServiceStatus('restarting');
    addActionLog('Restart initiated', 'API services are restarting...');
    setTimeout(() => {
      setApiServiceStatus('operational');
      addActionLog('Restart complete', 'API services are back online.');
    }, 1800);
  }

  function handleBackupDatabase() {
    if (backupProgress > 0 && backupProgress < 100) return;
    setBackupProgress(1);
    addActionLog('Backup started', 'Database backup has started.');
    const interval = setInterval(() => {
      setBackupProgress(prev => {
        const next = Math.min(prev + Math.ceil(Math.random() * 20), 100);
        if (next >= 100) {
          clearInterval(interval);
          const finishedAt = new Date().toLocaleString();
          setLastBackupTime(finishedAt);
          addActionLog('Backup completed', `Database backup finished at ${finishedAt}.`);
          setTimeout(() => setBackupProgress(0), 1200);
        }
        return next;
      });
    }, 350);
  }

  function handleOpenSettings() {
    setSettingsModalOpen(true);
  }

  function handleViewAlerts() {
    setAlertsModalOpen(true);
    if (notificationsRef.current) {
      notificationsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
  if (user?.role !== 'admin') {
    return <div className="max-w-5xl mx-auto">
        <div className="bg-red-50 dark:bg-red-900 dark:bg-opacity-20 p-6 rounded-xl border border-red-200 dark:border-red-800 text-center">
          <AlertTriangleIcon className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-red-800 dark:text-red-400 mb-2">
            Access Denied
          </h2>
          <p className="text-red-700 dark:text-red-300 mb-4">
            You don't have permission to view this page. This page is restricted
            to admin users only.
          </p>
          <button onClick={() => window.history.back()} className="px-4 py-2 bg-red-100 dark:bg-red-800 text-red-700 dark:text-red-300 rounded-md hover:bg-red-200 dark:hover:bg-red-700">
            Go Back
          </button>
        </div>
      </div>;
  }
  return <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
          <ShieldIcon size={28} className="mr-2 text-blue-500" />
          Admin Profile
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your admin account and system privileges
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm mb-6">
            <div className="flex flex-col items-center text-center">
              <div className="h-24 w-24 rounded-full overflow-hidden mb-4">
                <img src={user?.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'} alt="Admin profile" className="h-full w-full object-cover" />
              </div>
              <h2 className="text-xl font-semibold mb-1 text-gray-900 dark:text-white">
                {user?.name || 'Admin User'}
              </h2>
              <div className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-300 text-xs rounded-full mb-3">
                System Administrator
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {user?.email}
              </p>
              <button onClick={logout} className="w-full py-2 rounded-md border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900 dark:hover:bg-opacity-30 transition-colors flex items-center justify-center">
                <LogOutIcon size={16} className="mr-2" />
                Sign Out
              </button>
            </div>
          </div>
          {/* Navigation tabs */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
            <div className="p-4 bg-gray-50 dark:bg-gray-700">
              <h3 className="font-medium text-gray-900 dark:text-white">
                Admin Navigation
              </h3>
            </div>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              <button onClick={() => setActiveTab('overview')} className={`w-full flex items-center py-3 px-4 text-sm ${activeTab === 'overview' ? 'bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 text-blue-700 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`}>
                <UserIcon size={16} className="mr-3" />
                Account Overview
              </button>
              <button onClick={() => setActiveTab('security')} className={`w-full flex items-center py-3 px-4 text-sm ${activeTab === 'security' ? 'bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 text-blue-700 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`}>
                <KeyIcon size={16} className="mr-3" />
                Security Settings
              </button>
              <button onClick={() => setActiveTab('activity')} className={`w-full flex items-center py-3 px-4 text-sm ${activeTab === 'activity' ? 'bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 text-blue-700 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`}>
                <FileTextIcon size={16} className="mr-3" />
                Activity Log
              </button>
              <button onClick={() => setActiveTab('system')} className={`w-full flex items-center py-3 px-4 text-sm ${activeTab === 'system' ? 'bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 text-blue-700 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`}>
                <ServerIcon size={16} className="mr-3" />
                System Controls
              </button>
            </div>
          </div>
        </div>
        {/* Main content */}
        <div className="lg:col-span-3">
          {/* Account Overview */}
          {activeTab === 'overview' && <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
                <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                  Admin Account Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Full Name
                    </label>
                    <input type="text" defaultValue={user?.name} className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email Address
                    </label>
                    <input type="email" defaultValue={user?.email} className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Admin ID
                    </label>
                    <input type="text" defaultValue="ADM-2023-00892" readOnly className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-600 border border-gray-300 dark:border-gray-600 rounded-md text-gray-500 dark:text-gray-300 cursor-not-allowed" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Role
                    </label>
                    <select className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>System Administrator</option>
                      <option>Security Administrator</option>
                      <option>Data Administrator</option>
                    </select>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 flex justify-end">
                  <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md">
                    Update Profile
                  </button>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
                <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                  Admin Privileges
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        User Management
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Create, modify, and delete user accounts
                      </p>
                    </div>
                    <div className="h-5 w-5 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                      <CheckCircleIcon size={14} className="text-green-600 dark:text-green-400" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        System Configuration
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Modify system settings and configurations
                      </p>
                    </div>
                    <div className="h-5 w-5 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                      <CheckCircleIcon size={14} className="text-green-600 dark:text-green-400" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        Data Management
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Add, modify, and remove data sources
                      </p>
                    </div>
                    <div className="h-5 w-5 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                      <CheckCircleIcon size={14} className="text-green-600 dark:text-green-400" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        API Key Management
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Generate and revoke API keys
                      </p>
                    </div>
                    <div className="h-5 w-5 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                      <CheckCircleIcon size={14} className="text-green-600 dark:text-green-400" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        Billing Management
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Access and modify billing information
                      </p>
                    </div>
                    <div className="h-5 w-5 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                      <XCircleIcon size={14} className="text-red-600 dark:text-red-400" />
                    </div>
                  </div>
                </div>
              </div>
            </div>}
          {/* Security Settings */}
          {activeTab === 'security' && <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
                <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                  Password & Authentication
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Current Password
                    </label>
                    <input type="password" className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      New Password
                    </label>
                    <input type="password" className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Confirm New Password
                    </label>
                    <input type="password" className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                </div>
                <div className="mt-6">
                  <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md">
                    Update Password
                  </button>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
                <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                  Two-Factor Authentication
                </h2>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      2FA Status
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Two-factor authentication adds an extra layer of security
                    </p>
                  </div>
                  <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-green-500">
                    <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6"></span>
                  </div>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <h3 className="font-medium mb-2 text-gray-900 dark:text-white">
                    Recovery Codes
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    Keep these recovery codes in a safe place. You can use them
                    to regain access to your account if you lose your 2FA
                    device.
                  </p>
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div className="bg-gray-100 dark:bg-gray-600 p-2 rounded text-sm font-mono text-gray-800 dark:text-gray-200">
                      84729-ASDFE
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-600 p-2 rounded text-sm font-mono text-gray-800 dark:text-gray-200">
                      28374-ZXCVB
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-600 p-2 rounded text-sm font-mono text-gray-800 dark:text-gray-200">
                      98765-QWERT
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-600 p-2 rounded text-sm font-mono text-gray-800 dark:text-gray-200">
                      12345-YUIOP
                    </div>
                  </div>
                  <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                    Download recovery codes
                  </button>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
                <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                  Security Log
                </h2>
                <div className="space-y-3">
                  <div className="flex items-start p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="h-8 w-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <KeyIcon size={16} className="text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        Password Changed
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Oct 15, 2023 at 10:30 AM
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                        IP: 192.168.1.1
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="h-8 w-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <UserIcon size={16} className="text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        Successful Login
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Oct 14, 2023 at 8:45 AM
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                        IP: 192.168.1.1
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="h-8 w-8 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <AlertTriangleIcon size={16} className="text-yellow-600 dark:text-yellow-400" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        Failed Login Attempt
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Oct 13, 2023 at 11:15 PM
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                        IP: 203.0.113.1 (Unknown location)
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                    View full security log
                  </button>
                </div>
              </div>
            </div>}
          {/* Activity Log */}
          {activeTab === 'activity' && <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Admin Activity Log
                </h2>
                <div className="flex items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400 mr-2">
                    Filter by:
                  </span>
                  <select className="text-sm bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-200 px-2 py-1">
                    <option>All Activities</option>
                    <option>User Management</option>
                    <option>System Changes</option>
                    <option>Data Operations</option>
                  </select>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="h-10 w-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <UserIcon size={20} className="text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-grow">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                      <div className="font-medium text-gray-900 dark:text-white">
                        User Account Modified
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Today, 2:30 PM
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                      Modified user permissions for John Analyst (ID:
                      USR-2023-00456)
                    </p>
                    <div className="mt-2 flex items-center">
                      <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                        User Management
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-start p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="h-10 w-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <DatabaseIcon size={20} className="text-green-600 dark:text-green-400" />
                  </div>
                  <div className="flex-grow">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                      <div className="font-medium text-gray-900 dark:text-white">
                        Data Source Added
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Today, 11:15 AM
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                      Added new financial data source: "Bloomberg Terminal API"
                    </p>
                    <div className="mt-2 flex items-center">
                      <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                        Data Operations
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-start p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="h-10 w-10 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <ServerIcon size={20} className="text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="flex-grow">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                      <div className="font-medium text-gray-900 dark:text-white">
                        System Setting Modified
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Yesterday, 4:45 PM
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                      Updated system backup schedule from weekly to daily
                    </p>
                    <div className="mt-2 flex items-center">
                      <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300">
                        System Changes
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-start p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="h-10 w-10 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <AlertTriangleIcon size={20} className="text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <div className="flex-grow">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                      <div className="font-medium text-gray-900 dark:text-white">
                        Alert Cleared
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Yesterday, 10:20 AM
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                      Cleared system alert: "API Rate Limit Warning"
                    </p>
                    <div className="mt-2 flex items-center">
                      <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                        System Changes
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex justify-center">
                <nav className="flex items-center">
                  <button className="px-3 py-1 rounded-md text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                    Previous
                  </button>
                  <button className="px-3 py-1 rounded-md bg-blue-50 dark:bg-blue-900 dark:bg-opacity-30 text-blue-600 dark:text-blue-400">
                    1
                  </button>
                  <button className="px-3 py-1 rounded-md text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                    2
                  </button>
                  <button className="px-3 py-1 rounded-md text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                    3
                  </button>
                  <button className="px-3 py-1 rounded-md text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                    Next
                  </button>
                </nav>
              </div>
            </div>}
          {/* System Controls */}
          {activeTab === 'system' && <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
                <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                  System Status
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center mb-2">
                      <div className={`h-3 w-3 rounded-full mr-2 ${apiServiceStatus === 'operational' ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        API Services
                      </h3>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {apiServiceStatus === 'operational' ? 'All services operational' : 'Restarting services...'}
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center mb-2">
                      <div className="h-3 w-3 bg-green-500 rounded-full mr-2"></div>
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        Database
                      </h3>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Connected and healthy{lastBackupTime ? ` • Last backup: ${lastBackupTime}` : ''}
                    </p>
                    {backupProgress > 0 && backupProgress < 100 && (
                      <div className="mt-2">
                        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: `${backupProgress}%` }}></div>
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Backup in progress: {backupProgress}%</div>
                      </div>
                    )}
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center mb-2">
                      <div className="h-3 w-3 bg-yellow-500 rounded-full mr-2"></div>
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        Model Training
                      </h3>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      In progress ({modelProgress}%)
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 rounded-lg border border-blue-100 dark:border-blue-800">
                  <div>
                    <h3 className="font-medium text-blue-800 dark:text-blue-300">
                      {settings.maintenanceMode ? 'Maintenance Mode' : 'System Maintenance'}
                    </h3>
                    <p className="text-sm text-blue-700 dark:text-blue-400">
                      {settings.maintenanceMode ? 'Maintenance mode is enabled. Non-critical services may be limited.' : 'Scheduled maintenance: Oct 20, 2023 at 2:00 AM UTC'}
                    </p>
                  </div>
                  <button onClick={() => setSettingsModalOpen(true)} className="px-3 py-1 bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-300 rounded-md text-sm">
                    Reschedule
                  </button>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
                <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                  Quick Actions
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <button onClick={handleRestartServices} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-500 transition-colors flex flex-col items-center">
                    <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-2">
                      <ServerIcon size={24} className="text-blue-600 dark:text-blue-400" />
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      Restart Services
                    </span>
                  </button>
                  <button onClick={handleBackupDatabase} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-500 transition-colors flex flex-col items-center">
                    <div className="h-12 w-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-2">
                      <DatabaseIcon size={24} className="text-green-600 dark:text-green-400" />
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      Backup Database
                    </span>
                  </button>
                  <button onClick={handleOpenSettings} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-500 transition-colors flex flex-col items-center">
                    <div className="h-12 w-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-2">
                      <SettingsIcon size={24} className="text-purple-600 dark:text-purple-400" />
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      System Settings
                    </span>
                  </button>
                  <button onClick={handleViewAlerts} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-500 transition-colors flex flex-col items-center">
                    <div className="h-12 w-12 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center mb-2">
                      <AlertTriangleIcon size={24} className="text-red-600 dark:text-red-400" />
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      View Alerts
                    </span>
                  </button>
                </div>
                {actionLogs.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Recent Actions</h3>
                    <div className="space-y-2">
                      {actionLogs.map(log => (
                        <div key={log.id} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                          <div className="flex items-center justify-between">
                            <div className="font-medium text-gray-900 dark:text-white">{log.title}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">{log.time}</div>
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-300">{log.detail}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div ref={notificationsRef} className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
                <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                  System Notifications
                </h2>
                <div className="space-y-3">
                  <div className="flex items-start p-3 bg-yellow-50 dark:bg-yellow-900 dark:bg-opacity-20 rounded-lg border border-yellow-100 dark:border-yellow-800">
                    <div className="h-8 w-8 bg-yellow-100 dark:bg-yellow-800 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <AlertTriangleIcon size={16} className="text-yellow-600 dark:text-yellow-400" />
                    </div>
                    <div>
                      <div className="font-medium text-yellow-800 dark:text-yellow-300">
                        High CPU Usage
                      </div>
                      <p className="text-sm text-yellow-700 dark:text-yellow-400">
                        System is experiencing high CPU usage (78%). Consider
                        scaling resources.
                      </p>
                      <div className="flex items-center mt-2">
                        <button className="text-xs text-yellow-800 dark:text-yellow-300 bg-yellow-100 dark:bg-yellow-800 px-2 py-1 rounded mr-2">
                          View Details
                        </button>
                        <button className="text-xs text-yellow-800 dark:text-yellow-300 hover:text-yellow-900 dark:hover:text-yellow-200">
                          Dismiss
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start p-3 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 rounded-lg border border-blue-100 dark:border-blue-800">
                    <div className="h-8 w-8 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <BellIcon size={16} className="text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <div className="font-medium text-blue-800 dark:text-blue-300">
                        System Update Available
                      </div>
                      <p className="text-sm text-blue-700 dark:text-blue-400">
                        Version 2.5.0 is available. Includes security patches
                        and performance improvements.
                      </p>
                      <div className="flex items-center mt-2">
                        <button className="text-xs text-blue-800 dark:text-blue-300 bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded mr-2">
                          Update Now
                        </button>
                        <button className="text-xs text-blue-800 dark:text-blue-300 hover:text-blue-900 dark:hover:text-blue-200">
                          Schedule
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Settings Modal */}
              {settingsModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                  <div className="absolute inset-0 bg-black bg-opacity-40" onClick={() => setSettingsModalOpen(false)}></div>
                  <div className="relative bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md border border-gray-200 dark:border-gray-700 shadow-xl">
                    <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">System Settings</h3>
                    <div className="space-y-4">
                      <label className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">Maintenance Mode</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Temporarily limit non-critical features.</div>
                        </div>
                        <input type="checkbox" checked={settings.maintenanceMode} onChange={(e) => setSettings(s => ({ ...s, maintenanceMode: e.target.checked }))} />
                      </label>
                      <label className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">Auto-scaling</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Automatically scale services under load.</div>
                        </div>
                        <input type="checkbox" checked={settings.autoScaling} onChange={(e) => setSettings(s => ({ ...s, autoScaling: e.target.checked }))} />
                      </label>
                    </div>
                    <div className="mt-6 flex justify-end space-x-2">
                      <button onClick={() => setSettingsModalOpen(false)} className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200">
                        Cancel
                      </button>
                      <button onClick={() => { setSettingsModalOpen(false); addActionLog('Settings saved', `Maintenance: ${settings.maintenanceMode ? 'On' : 'Off'}, Auto-scaling: ${settings.autoScaling ? 'On' : 'Off'}`); }} className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md">
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {/* Alerts Modal */}
              {alertsModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                  <div className="absolute inset-0 bg-black bg-opacity-40" onClick={() => setAlertsModalOpen(false)}></div>
                  <div className="relative bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-lg border border-gray-200 dark:border-gray-700 shadow-xl">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Active Alerts</h3>
                      <button onClick={() => setAlertsModalOpen(false)} className="text-gray-600 dark:text-gray-300">✕</button>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-start p-3 bg-yellow-50 dark:bg-yellow-900 dark:bg-opacity-20 rounded-lg border border-yellow-100 dark:border-yellow-800">
                        <div className="h-8 w-8 bg-yellow-100 dark:bg-yellow-800 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                          <AlertTriangleIcon size={16} className="text-yellow-600 dark:text-yellow-400" />
                        </div>
                        <div>
                          <div className="font-medium text-yellow-800 dark:text-yellow-300">High CPU Usage</div>
                          <div className="text-sm text-yellow-700 dark:text-yellow-400">System is experiencing high CPU usage (78%).</div>
                        </div>
                      </div>
                      <div className="flex items-start p-3 bg-red-50 dark:bg-red-900 dark:bg-opacity-20 rounded-lg border border-red-100 dark:border-red-800">
                        <div className="h-8 w-8 bg-red-100 dark:bg-red-800 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                          <BellIcon size={16} className="text-red-600 dark:text-red-400" />
                        </div>
                        <div>
                          <div className="font-medium text-red-800 dark:text-red-300">Security Patch Pending</div>
                          <div className="text-sm text-red-700 dark:text-red-400">A critical security update is available (v2.5.0).</div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 text-right">
                      <button onClick={() => { setAlertsModalOpen(false); addActionLog('Alerts reviewed', 'Admin viewed current system alerts.'); }} className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md">Mark as Reviewed</button>
                    </div>
                  </div>
                </div>
              )}
            </div>}
        </div>
      </div>
    </div>;
}