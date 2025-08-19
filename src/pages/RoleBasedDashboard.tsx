import React, { useState, Component } from 'react';
import { useUser } from '../context/UserContext';
import { BarChart2Icon, ShieldIcon, UserIcon, EyeIcon, PieChartIcon, TrendingUpIcon, AlertCircleIcon, FileTextIcon, DatabaseIcon, UsersIcon, LockIcon, ServerIcon } from 'lucide-react';
export default function RoleBasedDashboard() {
  const {
    user
  } = useUser();
  const [activeTab, setActiveTab] = useState('overview');
  // Get role-specific content
  const getRoleContent = () => {
    switch (user?.role) {
      case 'admin':
        return <AdminDashboard activeTab={activeTab} setActiveTab={setActiveTab} />;
      case 'analyst':
        return <AnalystDashboard activeTab={activeTab} setActiveTab={setActiveTab} />;
      default:
        return <GuestDashboard />;
    }
  };
  return <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Role-Based Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Welcome, {user?.name || 'Guest'} • {user?.role || 'guest'} view
        </p>
      </div>
      {getRoleContent()}
    </div>;
}
// Admin Dashboard Component
function AdminDashboard({
  activeTab,
  setActiveTab
}: {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}) {
  return <>
      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
        <div className="flex space-x-6 overflow-x-auto">
          <button className={`py-3 px-1 flex items-center text-sm font-medium border-b-2 ${activeTab === 'overview' ? 'border-blue-500 text-blue-500' : 'border-transparent text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'}`} onClick={() => setActiveTab('overview')}>
            <ShieldIcon size={16} className="mr-2" />
            Admin Overview
          </button>
          <button className={`py-3 px-1 flex items-center text-sm font-medium border-b-2 ${activeTab === 'system' ? 'border-blue-500 text-blue-500' : 'border-transparent text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'}`} onClick={() => setActiveTab('system')}>
            <ServerIcon size={16} className="mr-2" />
            System Management
          </button>
          <button className={`py-3 px-1 flex items-center text-sm font-medium border-b-2 ${activeTab === 'users' ? 'border-blue-500 text-blue-500' : 'border-transparent text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'}`} onClick={() => setActiveTab('users')}>
            <UsersIcon size={16} className="mr-2" />
            User Management
          </button>
        </div>
      </div>
      {/* Admin Overview */}
      {activeTab === 'overview' && <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="h-10 w-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-3">
                <ShieldIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Admin Privileges
              </h2>
            </div>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li className="flex items-center">
                <LockIcon className="h-4 w-4 mr-2 text-green-500" />
                Full system access
              </li>
              <li className="flex items-center">
                <UsersIcon className="h-4 w-4 mr-2 text-green-500" />
                User management
              </li>
              <li className="flex items-center">
                <DatabaseIcon className="h-4 w-4 mr-2 text-green-500" />
                Data source control
              </li>
              <li className="flex items-center">
                <ServerIcon className="h-4 w-4 mr-2 text-green-500" />
                System configuration
              </li>
            </ul>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="h-10 w-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mr-3">
                <UsersIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                User Statistics
              </h2>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Active Users
                  </span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    24
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{
                width: '60%'
              }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    New Registrations (Week)
                  </span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    12
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{
                width: '30%'
              }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Premium Accounts
                  </span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    8
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{
                width: '20%'
              }}></div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="h-10 w-10 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center mr-3">
                <AlertCircleIcon className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                System Alerts
              </h2>
            </div>
            <div className="space-y-3">
              <div className="p-3 bg-red-50 dark:bg-red-900 dark:bg-opacity-20 rounded-lg border border-red-100 dark:border-red-800">
                <div className="font-medium text-red-800 dark:text-red-400">
                  API Rate Limit Warning
                </div>
                <div className="text-sm text-red-600 dark:text-red-300">
                  5 minutes ago
                </div>
              </div>
              <div className="p-3 bg-yellow-50 dark:bg-yellow-900 dark:bg-opacity-20 rounded-lg border border-yellow-100 dark:border-yellow-800">
                <div className="font-medium text-yellow-800 dark:text-yellow-400">
                  Database Backup Pending
                </div>
                <div className="text-sm text-yellow-600 dark:text-yellow-300">
                  2 hours ago
                </div>
              </div>
            </div>
          </div>
        </div>}
      {/* System Management */}
      {activeTab === 'system' && <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            System Configuration
          </h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    API Connections
                  </h3>
                  <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                    Active
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  All API endpoints are functioning normally.
                </p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    Database Status
                  </h3>
                  <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                    Healthy
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Database performance is optimal. Last backup: 6 hours ago.
                </p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    Model Training
                  </h3>
                  <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                    In Progress
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Credit model training in progress. 65% complete.
                </p>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 mt-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{
                width: '65%'
              }}></div>
                </div>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    System Resources
                  </h3>
                  <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                    Warning
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  CPU usage at 78%. Consider scaling resources.
                </p>
              </div>
            </div>
            <div className="flex justify-end">
              <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md">
                Manage System Settings
              </button>
            </div>
          </div>
        </div>}
      {/* User Management */}
      {activeTab === 'users' && <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            User Management
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    User
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Role
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Last Active
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="User" className="h-full w-full object-cover" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          John Analyst
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          john@example.com
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                      Analyst
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        Active
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    5 minutes ago
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <button className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 mr-3">
                      Edit
                    </button>
                    <button className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300">
                      Suspend
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="User" className="h-full w-full object-cover" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          Sarah Admin
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          sarah@example.com
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300">
                      Admin
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        Active
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    Just now
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <button className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 mr-3">
                      Edit
                    </button>
                    <button className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300">
                      Suspend
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="User" className="h-full w-full object-cover" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          Michael Guest
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          michael@example.com
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                      Guest
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-2.5 w-2.5 rounded-full bg-yellow-500 mr-2"></div>
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        Inactive
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    2 days ago
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <button className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 mr-3">
                      Edit
                    </button>
                    <button className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300">
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>}
    </>;
}
// Analyst Dashboard Component
function AnalystDashboard({
  activeTab,
  setActiveTab
}: {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}) {
  return <>
      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
        <div className="flex space-x-6 overflow-x-auto">
          <button className={`py-3 px-1 flex items-center text-sm font-medium border-b-2 ${activeTab === 'overview' ? 'border-blue-500 text-blue-500' : 'border-transparent text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'}`} onClick={() => setActiveTab('overview')}>
            <BarChart2Icon size={16} className="mr-2" />
            Analyst Overview
          </button>
          <button className={`py-3 px-1 flex items-center text-sm font-medium border-b-2 ${activeTab === 'analytics' ? 'border-blue-500 text-blue-500' : 'border-transparent text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'}`} onClick={() => setActiveTab('analytics')}>
            <PieChartIcon size={16} className="mr-2" />
            Analytics Tools
          </button>
          <button className={`py-3 px-1 flex items-center text-sm font-medium border-b-2 ${activeTab === 'reports' ? 'border-blue-500 text-blue-500' : 'border-transparent text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'}`} onClick={() => setActiveTab('reports')}>
            <FileTextIcon size={16} className="mr-2" />
            Reports
          </button>
        </div>
      </div>
      {/* Analyst Overview */}
      {activeTab === 'overview' && <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="h-10 w-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-3">
                <BarChart2Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Analyst Tools
              </h2>
            </div>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li className="flex items-center">
                <PieChartIcon className="h-4 w-4 mr-2 text-green-500" />
                Advanced Analytics
              </li>
              <li className="flex items-center">
                <TrendingUpIcon className="h-4 w-4 mr-2 text-green-500" />
                Trend Analysis
              </li>
              <li className="flex items-center">
                <EyeIcon className="h-4 w-4 mr-2 text-green-500" />
                Watchlist Management
              </li>
              <li className="flex items-center">
                <FileTextIcon className="h-4 w-4 mr-2 text-green-500" />
                Report Generation
              </li>
            </ul>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="h-10 w-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mr-3">
                <TrendingUpIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Recent Performance
              </h2>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Reports Generated
                  </span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    12
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{
                width: '75%'
              }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Companies Analyzed
                  </span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    28
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{
                width: '90%'
              }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Accuracy Rate
                  </span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    92%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{
                width: '92%'
              }}></div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="h-10 w-10 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center mr-3">
                <AlertCircleIcon className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Recent Alerts
              </h2>
            </div>
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 rounded-lg border border-blue-100 dark:border-blue-800">
                <div className="font-medium text-blue-800 dark:text-blue-400">
                  Tesla Credit Score Update
                </div>
                <div className="text-sm text-blue-600 dark:text-blue-300">
                  10 minutes ago
                </div>
              </div>
              <div className="p-3 bg-yellow-50 dark:bg-yellow-900 dark:bg-opacity-20 rounded-lg border border-yellow-100 dark:border-yellow-800">
                <div className="font-medium text-yellow-800 dark:text-yellow-400">
                  Apple Quarterly Report
                </div>
                <div className="text-sm text-yellow-600 dark:text-yellow-300">
                  2 hours ago
                </div>
              </div>
            </div>
          </div>
        </div>}
      {/* Analytics Tools */}
      {activeTab === 'analytics' && <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            Analytics Tools
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-500 transition-colors">
              <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-3">
                <PieChartIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-medium mb-1 text-gray-900 dark:text-white">
                Sector Analysis
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                Compare company performance across different sectors.
              </p>
              <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center">
                Launch Tool
              </button>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-500 transition-colors">
              <div className="h-12 w-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-3">
                <TrendingUpIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-medium mb-1 text-gray-900 dark:text-white">
                Trend Forecasting
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                Predict future credit scores based on historical data.
              </p>
              <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center">
                Launch Tool
              </button>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-500 transition-colors">
              <div className="h-12 w-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-3">
                <BarChart2Icon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="font-medium mb-1 text-gray-900 dark:text-white">
                Comparative Analysis
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                Compare multiple companies side by side.
              </p>
              <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center">
                Launch Tool
              </button>
            </div>
          </div>
        </div>}
      {/* Reports */}
      {activeTab === 'reports' && <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Recent Reports
            </h2>
            <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md">
              Generate New Report
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Report Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Type
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Date Created
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      Q3 Technology Sector Analysis
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                      Sector Analysis
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    Oct 15, 2023
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <button className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 mr-3">
                      View
                    </button>
                    <button className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 mr-3">
                      Download
                    </button>
                    <button className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300">
                      Delete
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      Tesla Inc. Credit Assessment
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                      Company Report
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    Oct 12, 2023
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <button className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 mr-3">
                      View
                    </button>
                    <button className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 mr-3">
                      Download
                    </button>
                    <button className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300">
                      Delete
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      Financial Services Risk Assessment
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300">
                      Risk Analysis
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    Oct 5, 2023
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <button className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 mr-3">
                      View
                    </button>
                    <button className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 mr-3">
                      Download
                    </button>
                    <button className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300">
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>}
    </>;
}
// Guest Dashboard Component
function GuestDashboard() {
  return <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Welcome to CreditAI
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              You're currently viewing the platform as a guest user.
            </p>
          </div>
          <div className="flex space-x-3">
            <button className="px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
              Sign Up
            </button>
            <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors">
              Login
            </button>
          </div>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
        <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
          Limited Guest Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
            <div className="h-10 w-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-3">
              <BarChart2Icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="font-medium mb-1 text-gray-900 dark:text-white">
              Basic Analytics
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Access to basic market overview and limited company data.
            </p>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
            <div className="h-10 w-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-3">
              <EyeIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="font-medium mb-1 text-gray-900 dark:text-white">
              Limited Watchlist
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Track up to 3 companies with basic monitoring features.
            </p>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
            <div className="h-10 w-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-3">
              <FileTextIcon className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="font-medium mb-1 text-gray-900 dark:text-white">
              Sample Reports
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              View sample reports to understand the platform's capabilities.
            </p>
          </div>
        </div>
      </div>
      <div className="bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="h-12 w-12 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center flex-shrink-0">
            <ShieldIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="flex-grow">
            <h3 className="text-lg font-medium text-blue-800 dark:text-blue-300">
              Upgrade Your Account
            </h3>
            <p className="text-blue-700 dark:text-blue-400 mt-1">
              Unlock full access to our advanced analytics, unlimited
              watchlists, and comprehensive reports by upgrading to an Analyst
              account.
            </p>
          </div>
          <div className="flex-shrink-0 mt-4 md:mt-0">
            <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors">
              View Plans
            </button>
          </div>
        </div>
      </div>
    </div>;
}