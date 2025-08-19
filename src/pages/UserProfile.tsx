import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { UserIcon, BarChart2Icon, EyeIcon, FileTextIcon, BellIcon, ClockIcon, BookmarkIcon, TrendingUpIcon, TrendingDownIcon, AlertTriangleIcon, LogOutIcon } from 'lucide-react';
export default function UserProfile() {
  const {
    user,
    logout
  } = useUser();
  const {
    theme
  } = useTheme();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  // Mock data
  const recentActivity = [{
    id: '1',
    type: 'view',
    company: 'Tesla, Inc.',
    time: '10 minutes ago'
  }, {
    id: '2',
    type: 'alert',
    company: 'Apple Inc.',
    time: '2 hours ago',
    alert: 'Credit score dropped by 5 points'
  }, {
    id: '3',
    type: 'watchlist',
    company: 'Microsoft Corp.',
    time: '1 day ago',
    action: 'added to watchlist'
  }, {
    id: '4',
    type: 'report',
    title: 'Q3 Tech Sector Analysis',
    time: '3 days ago'
  }];
  const savedReports = [{
    id: '1',
    title: 'Technology Sector Overview',
    date: 'Oct 15, 2023',
    type: 'Sector Analysis'
  }, {
    id: '2',
    title: 'Tesla Credit Assessment',
    date: 'Oct 10, 2023',
    type: 'Company Report'
  }, {
    id: '3',
    title: 'Semiconductor Industry Trends',
    date: 'Oct 5, 2023',
    type: 'Industry Report'
  }];
  const watchlistItems = [{
    id: '1',
    name: 'Tesla, Inc.',
    ticker: 'TSLA',
    score: 82,
    change: 3
  }, {
    id: '2',
    name: 'Apple Inc.',
    ticker: 'AAPL',
    score: 91,
    change: -1
  }, {
    id: '3',
    name: 'Microsoft Corp.',
    ticker: 'MSFT',
    score: 89,
    change: 0
  }];
  const alerts = [{
    id: '1',
    company: 'Tesla, Inc.',
    message: 'Credit score increased by 3 points',
    time: '1 day ago',
    type: 'positive'
  }, {
    id: '2',
    company: 'Apple Inc.',
    message: 'Credit score decreased by 1 point',
    time: '2 days ago',
    type: 'negative'
  }, {
    id: '3',
    company: 'General Electric',
    message: 'Added to watchlist',
    time: '3 days ago',
    type: 'info'
  }];
  return <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          User Profile
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          View your activity and manage your preferences
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm mb-6">
            <div className="flex flex-col items-center text-center">
              <div className="h-24 w-24 rounded-full overflow-hidden mb-4">
                <img src={user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'} alt="User profile" className="h-full w-full object-cover" />
              </div>
              <h2 className="text-xl font-semibold mb-1 text-gray-900 dark:text-white">
                {user?.name || 'John Analyst'}
              </h2>
              <div className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 text-xs rounded-full mb-3">
                Financial Analyst
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {user?.email || 'analyst@example.com'}
              </p>
              <button onClick={() => { logout(); navigate('/'); }} className="w-full py-2 rounded-md border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900 dark:hover:bg-opacity-30 transition-colors flex items-center justify-center">
                <LogOutIcon size={16} className="mr-2" />
                Sign Out
              </button>
            </div>
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <h3 className="font-medium mb-3 text-gray-900 dark:text-white">
                User Statistics
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    Companies Tracked
                  </span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    12
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    Reports Generated
                  </span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    8
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    Active Alerts
                  </span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    5
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* Navigation tabs */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
            <div className="p-4 bg-gray-50 dark:bg-gray-700">
              <h3 className="font-medium text-gray-900 dark:text-white">
                Profile Navigation
              </h3>
            </div>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              <button onClick={() => setActiveTab('overview')} className={`w-full flex items-center py-3 px-4 text-sm ${activeTab === 'overview' ? 'bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 text-blue-700 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`}>
                <UserIcon size={16} className="mr-3" />
                Overview
              </button>
              <button onClick={() => setActiveTab('watchlist')} className={`w-full flex items-center py-3 px-4 text-sm ${activeTab === 'watchlist' ? 'bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 text-blue-700 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`}>
                <EyeIcon size={16} className="mr-3" />
                My Watchlist
              </button>
              <button onClick={() => setActiveTab('reports')} className={`w-full flex items-center py-3 px-4 text-sm ${activeTab === 'reports' ? 'bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 text-blue-700 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`}>
                <FileTextIcon size={16} className="mr-3" />
                Saved Reports
              </button>
              <button onClick={() => setActiveTab('alerts')} className={`w-full flex items-center py-3 px-4 text-sm ${activeTab === 'alerts' ? 'bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 text-blue-700 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`}>
                <BellIcon size={16} className="mr-3" />
                My Alerts
              </button>
            </div>
          </div>
        </div>
        {/* Main content */}
        <div className="lg:col-span-3">
          {/* Overview Tab */}
          {activeTab === 'overview' && <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
                <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                  Account Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Full Name
                    </label>
                    <input type="text" defaultValue={user?.name || 'John Analyst'} className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email Address
                    </label>
                    <input type="email" defaultValue={user?.email || 'analyst@example.com'} className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Job Title
                    </label>
                    <input type="text" defaultValue="Financial Analyst" className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Company
                    </label>
                    <input type="text" defaultValue="Global Investments LLC" className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                </div>
                <div className="mt-6">
                  <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md">
                    Update Profile
                  </button>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
                <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                  Recent Activity
                </h2>
                <div className="space-y-4">
                  {recentActivity.map(activity => <div key={activity.id} className="flex items-start p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="h-8 w-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                        {activity.type === 'view' && <div className="bg-blue-100 dark:bg-blue-900 h-full w-full rounded-full flex items-center justify-center">
                            <BarChart2Icon size={16} className="text-blue-600 dark:text-blue-400" />
                          </div>}
                        {activity.type === 'alert' && <div className="bg-yellow-100 dark:bg-yellow-900 h-full w-full rounded-full flex items-center justify-center">
                            <AlertTriangleIcon size={16} className="text-yellow-600 dark:text-yellow-400" />
                          </div>}
                        {activity.type === 'watchlist' && <div className="bg-green-100 dark:bg-green-900 h-full w-full rounded-full flex items-center justify-center">
                            <EyeIcon size={16} className="text-green-600 dark:text-green-400" />
                          </div>}
                        {activity.type === 'report' && <div className="bg-purple-100 dark:bg-purple-900 h-full w-full rounded-full flex items-center justify-center">
                            <FileTextIcon size={16} className="text-purple-600 dark:text-purple-400" />
                          </div>}
                      </div>
                      <div className="flex-grow">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {activity.type === 'view' && `Viewed ${activity.company}`}
                          {activity.type === 'alert' && `Alert for ${activity.company}: ${activity.alert}`}
                          {activity.type === 'watchlist' && `${activity.company} ${activity.action}`}
                          {activity.type === 'report' && `Generated report: ${activity.title}`}
                        </div>
                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-1">
                          <ClockIcon size={12} className="mr-1" />
                          {activity.time}
                        </div>
                      </div>
                    </div>)}
                </div>
              </div>
            </div>}
          {/* Watchlist Tab */}
          {activeTab === 'watchlist' && <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  My Watchlist
                </h2>
                <button className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-md">
                  Add Company
                </button>
              </div>
              <div className="space-y-4">
                {watchlistItems.map(item => <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                    <div className="flex items-center">
                      <div className="h-10 w-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-4">
                        <span className="font-bold text-blue-600 dark:text-blue-400">
                          {item.ticker.substring(0, 2)}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">
                          {item.name}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {item.ticker}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="mr-6">
                        <div className="text-lg font-bold text-gray-900 dark:text-white">
                          {item.score}
                        </div>
                        <div className="flex items-center text-xs">
                          {item.change > 0 && <div className="flex items-center text-green-600 dark:text-green-400">
                              <TrendingUpIcon size={12} className="mr-1" />+
                              {item.change}
                            </div>}
                          {item.change < 0 && <div className="flex items-center text-red-600 dark:text-red-400">
                              <TrendingDownIcon size={12} className="mr-1" />
                              {item.change}
                            </div>}
                          {item.change === 0 && <div className="text-gray-500 dark:text-gray-400">
                              No change
                            </div>}
                        </div>
                      </div>
                      <button className="text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400">
                        <BookmarkIcon size={18} />
                      </button>
                    </div>
                  </div>)}
              </div>
              <div className="mt-6 text-center">
                <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                  View full watchlist
                </button>
              </div>
            </div>}
          {/* Saved Reports Tab */}
          {activeTab === 'reports' && <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Saved Reports
                </h2>
                <button className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-md">
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
                    {savedReports.map(report => <tr key={report.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {report.title}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                            {report.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {report.date}
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
                      </tr>)}
                  </tbody>
                </table>
              </div>
            </div>}
          {/* Alerts Tab */}
          {activeTab === 'alerts' && <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Recent Alerts
                  </h2>
                  <button className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-md">
                    Configure Alerts
                  </button>
                </div>
                <div className="space-y-4">
                  {alerts.map(alert => <div key={alert.id} className="flex items-start p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="h-8 w-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                        {alert.type === 'positive' && <div className="bg-green-100 dark:bg-green-900 h-full w-full rounded-full flex items-center justify-center">
                            <TrendingUpIcon size={16} className="text-green-600 dark:text-green-400" />
                          </div>}
                        {alert.type === 'negative' && <div className="bg-red-100 dark:bg-red-900 h-full w-full rounded-full flex items-center justify-center">
                            <TrendingDownIcon size={16} className="text-red-600 dark:text-red-400" />
                          </div>}
                        {alert.type === 'info' && <div className="bg-blue-100 dark:bg-blue-900 h-full w-full rounded-full flex items-center justify-center">
                            <BellIcon size={16} className="text-blue-600 dark:text-blue-400" />
                          </div>}
                      </div>
                      <div className="flex-grow">
                        <div className="font-medium text-gray-900 dark:text-white">
                          {alert.company}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                          {alert.message}
                        </div>
                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-2">
                          <ClockIcon size={12} className="mr-1" />
                          {alert.time}
                        </div>
                      </div>
                      <button className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 p-1">
                        ×
                      </button>
                    </div>)}
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
                <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                  Alert Settings
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        Email Notifications
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Receive alerts via email
                      </p>
                    </div>
                    <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-500">
                      <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6"></span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        Push Notifications
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Receive alerts in the browser
                      </p>
                    </div>
                    <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-500">
                      <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6"></span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        Daily Digest
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Receive a daily summary of all alerts
                      </p>
                    </div>
                    <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-300 dark:bg-gray-600">
                      <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-1"></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>}
        </div>
      </div>
    </div>;
}