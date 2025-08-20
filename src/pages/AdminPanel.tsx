import React, { useState } from 'react';
import { ShieldIcon, ServerIcon, DatabaseIcon, RefreshCwIcon, UsersIcon, AlertTriangleIcon, CheckCircleIcon, XCircleIcon, PlusIcon, SettingsIcon } from 'lucide-react';
// Mock data for the admin panel
const dataSources = [{
  id: '1',
  name: 'Financial Statements API',
  type: 'Structured',
  status: 'healthy',
  lastUpdate: '10 minutes ago'
}, {
  id: '2',
  name: 'Market Data Feed',
  type: 'Structured',
  status: 'healthy',
  lastUpdate: '5 minutes ago'
}, {
  id: '3',
  name: 'News API',
  type: 'Unstructured',
  status: 'warning',
  lastUpdate: '1 hour ago'
}, {
  id: '4',
  name: 'Social Media Sentiment',
  type: 'Unstructured',
  status: 'error',
  lastUpdate: '3 hours ago'
}, {
  id: '5',
  name: 'Regulatory Filings',
  type: 'Structured',
  status: 'healthy',
  lastUpdate: '30 minutes ago'
}];
const runningJobs = [{
  id: '1',
  name: 'Daily ETL Process',
  status: 'running',
  progress: 65,
  startTime: '07:30 AM'
}, {
  id: '2',
  name: 'Model Retraining',
  status: 'pending',
  progress: 0,
  startTime: 'Scheduled 12:00 PM'
}];
const userActivity = [{
  id: '1',
  user: 'John Analyst',
  action: 'Viewed Tesla Inc.',
  time: '5 minutes ago'
}, {
  id: '2',
  user: 'Sarah Admin',
  action: 'Added new data source',
  time: '30 minutes ago'
}, {
  id: '3',
  user: 'Michael Analyst',
  action: 'Created new alert',
  time: '1 hour ago'
}, {
  id: '4',
  user: 'Emma Analyst',
  action: 'Exported report',
  time: '2 hours ago'
}];
export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('overview');
  // Overview state
  const [lastUpdate, setLastUpdate] = useState('10 minutes ago');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  // Jobs and sources state
  const [jobs, setJobs] = useState(runningJobs);
  const [sources, setSources] = useState(dataSources);
  // Add source modal state
  const [showAddModal, setShowAddModal] = useState(false);
  const [newSourceName, setNewSourceName] = useState('');
  const [newSourceType, setNewSourceType] = useState<'Structured' | 'Unstructured'>('Structured');
  // Feedback banner
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const notify = (msg: string) => {
    setActionNotice(msg);
    window.setTimeout(() => setActionNotice(null), 2000);
  };

  function handleRefreshData() {
    if (isRefreshing) return;
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setLastUpdate('Just now');
      notify('Data refreshed successfully');
    }, 1200);
  }

  function handleAddSource() {
    setShowAddModal(true);
  }

  function handleSaveNewSource() {
    const name = newSourceName.trim();
    if (!name) {
      notify('Please enter a source name');
      return;
    }
    const newSource = {
      id: Date.now().toString(),
      name,
      type: newSourceType,
      status: 'healthy',
      lastUpdate: 'Just now'
    };
    setSources(prev => [newSource, ...prev]);
    setShowAddModal(false);
    setNewSourceName('');
    setNewSourceType('Structured');
    notify('New data source added');
  }

  function handleRetrainModel() {
    setJobs(prev => prev.map(job => job.id === '2' ? { ...job, status: 'running', progress: 0, startTime: 'Now' } : job));
    notify('Model retraining started');
    const interval = setInterval(() => {
      setJobs(prev => prev.map(job => {
        if (job.id === '2' && job.status === 'running') {
          const nextProgress = Math.min(job.progress + Math.ceil(Math.random() * 20), 100);
          if (nextProgress >= 100) {
            clearInterval(interval);
            return { ...job, status: 'pending', progress: 0, startTime: 'Just completed' };
          }
          return { ...job, progress: nextProgress };
        }
        return job;
      }));
    }, 400);
  }

  function handleOpenSettings() {
    setShowSettingsModal(true);
  }

  function handlePerSourceRefresh(sourceId: string) {
    setSources(prev => prev.map(s => s.id === sourceId ? { ...s, lastUpdate: 'Just now' } : s));
    notify('Source refreshed');
  }
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
        return <CheckCircleIcon size={16} className="text-green-500" />;
      case 'warning':
        return <AlertTriangleIcon size={16} className="text-yellow-500" />;
      case 'error':
        return <XCircleIcon size={16} className="text-red-500" />;
      default:
        return null;
    }
  };
  return <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
          <ShieldIcon size={28} className="mr-2 text-blue-500" />
          Admin Control Panel
        </h1>
        <p className="text-gray-600 dark:text-gray-400">System management and monitoring</p>
      </div>
      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
        <div className="flex space-x-6 overflow-x-auto">
          <button className={`py-3 px-1 flex items-center text-sm font-medium border-b-2 ${activeTab === 'overview' ? 'border-blue-500 text-blue-500' : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white'}`} onClick={() => setActiveTab('overview')}>
            <ServerIcon size={16} className="mr-2" />
            System Overview
          </button>
          <button className={`py-3 px-1 flex items-center text-sm font-medium border-b-2 ${activeTab === 'data' ? 'border-blue-500 text-blue-500' : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white'}`} onClick={() => setActiveTab('data')}>
            <DatabaseIcon size={16} className="mr-2" />
            Data Sources
          </button>
          <button className={`py-3 px-1 flex items-center text-sm font-medium border-b-2 ${activeTab === 'users' ? 'border-blue-500 text-blue-500' : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white'}`} onClick={() => setActiveTab('users')}>
            <UsersIcon size={16} className="mr-2" />
            User Activity
          </button>
        </div>
      </div>
      {/* Overview Tab */}
      {activeTab === 'overview' && <>
          {/* System Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-10 w-10 bg-green-500 bg-opacity-15 dark:bg-opacity-20 rounded-md flex items-center justify-center mr-3">
                    <ServerIcon size={20} className="text-green-500" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">System Status</div>
                    <div className="font-medium">{maintenanceMode ? 'Maintenance' : 'Operational'}</div>
                  </div>
                </div>
                <div className={`h-3 w-3 rounded-full ${maintenanceMode ? 'bg-yellow-500' : 'bg-green-500'}`}></div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-10 w-10 bg-blue-500 bg-opacity-15 dark:bg-opacity-20 rounded-md flex items-center justify-center mr-3">
                    <RefreshCwIcon size={20} className="text-blue-500" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Last Update</div>
                    <div className="font-medium">{lastUpdate}</div>
                  </div>
                </div>
                <button onClick={handleRefreshData} className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
                  {isRefreshing ? 'Refreshing…' : 'Refresh'}
                </button>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-10 w-10 bg-yellow-500 bg-opacity-15 dark:bg-opacity-20 rounded-md flex items-center justify-center mr-3">
                    <AlertTriangleIcon size={20} className="text-yellow-500" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Active Alerts</div>
                    <div className="font-medium">2 Warnings</div>
                  </div>
                </div>
                <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
                  View
                </button>
              </div>
            </div>
          </div>
          {/* Running Jobs */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Running Jobs</h2>
              <button className="px-3 py-1 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm">
                View All Jobs
              </button>
            </div>
            <div className="space-y-4">
              {jobs.map(job => <div key={job.id} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">{job.name}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${job.status === 'running' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-600'}`}>
                      {job.status === 'running' ? 'Running' : 'Pending'}
                    </span>
                  </div>
                  {job.status === 'running' && <>
                      <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 mb-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{
                  width: `${job.progress}%`
                }}></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
                        <span>Started: {job.startTime}</span>
                        <span>{job.progress}% Complete</span>
                      </div>
                    </>}
                  {job.status === 'pending' && <div className="text-xs text-gray-600 dark:text-gray-400">{job.startTime}</div>}
                </div>)}
            </div>
          </div>
          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-3">
                <button onClick={handleRefreshData} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors flex flex-col items-center justify-center">
                  <RefreshCwIcon size={24} className="text-blue-500 mb-2" />
                  <span className="text-sm">Refresh Data</span>
                </button>
                <button onClick={handleAddSource} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors flex flex-col items-center justify-center">
                  <DatabaseIcon size={24} className="text-green-500 mb-2" />
                  <span className="text-sm">Add Source</span>
                </button>
                <button onClick={handleRetrainModel} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors flex flex-col items-center justify-center">
                  <ServerIcon size={24} className="text-yellow-500 mb-2" />
                  <span className="text-sm">Retrain Model</span>
                </button>
                <button onClick={handleOpenSettings} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors flex flex-col items-center justify-center">
                  <SettingsIcon size={24} className="text-purple-500 mb-2" />
                  <span className="text-sm">Settings</span>
                </button>
              </div>
              {actionNotice && (
                <div className="mt-4 text-sm text-blue-700 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 dark:text-blue-300 p-2 rounded-md border border-blue-100 dark:border-blue-800">
                  {actionNotice}
                </div>
              )}
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold mb-4">
                Recent User Activity
              </h2>
              <div className="space-y-3">
                {userActivity.slice(0, 3).map(activity => <div key={activity.id} className="flex items-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
                    <div className="h-8 w-8 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mr-3">
                      <UsersIcon size={16} className="text-blue-500" />
                    </div>
                    <div className="flex-grow">
                      <div className="text-sm font-medium">{activity.user}</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        {activity.action}
                      </div>
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">{activity.time}</div>
                  </div>)}
              </div>
            </div>
          </div>
        </>}
      {/* Data Sources Tab */}
      {activeTab === 'data' && <>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <h2 className="text-xl font-semibold">Data Sources</h2>
            <div className="flex space-x-3">
              <button onClick={() => { setLastUpdate('Just now'); notify('All sources refreshed'); }} className="px-3 py-2 rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white flex items-center">
                <RefreshCwIcon size={16} className="mr-2" />
                Refresh All
              </button>
              <button onClick={() => setShowAddModal(true)} className="px-3 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white flex items-center">
                <PlusIcon size={16} className="mr-2" />
                Add Source
              </button>
            </div>
          </div>
          {/* Data sources table */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                    Source Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                    Type
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                    Last Update
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {sources.map(source => <tr key={source.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium">{source.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-md ${source.type === 'Structured' ? 'bg-blue-500 bg-opacity-20 text-blue-400' : 'bg-purple-500 bg-opacity-20 text-purple-400'}`}>
                        {source.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getStatusIcon(source.status)}
                        <span className="ml-2 capitalize">{source.status}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                      {source.lastUpdate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <button onClick={() => handlePerSourceRefresh(source.id)} className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mr-4">
                        Refresh
                      </button>
                      <button className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                        Settings
                      </button>
                    </td>
                  </tr>)}
              </tbody>
            </table>
          </div>
          {/* Data pipeline health */}
          <div className="mt-8">
            <h3 className="text-lg font-medium mb-4">Data Pipeline Health</h3>
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Data Ingestion</h4>
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Processing 250 records/min
                  </div>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Data Transformation</h4>
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Average latency: 1.2s
                  </div>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Model Inference</h4>
                    <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Avg processing time: 3.5s
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>}
      {/* Users Activity Tab */}
      {activeTab === 'users' && <>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <h2 className="text-xl font-semibold">User Activity Log</h2>
            <div className="flex space-x-3">
              <button className="px-3 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white flex items-center">
                Export Log
              </button>
            </div>
          </div>
          {/* User activity table */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                    User
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                    Action
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                    Time
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {userActivity.map(activity => <tr key={activity.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium">{activity.user}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {activity.action}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-600 dark:text-gray-400">
                      {activity.time}
                    </td>
                  </tr>)}
              </tbody>
            </table>
          </div>
          {/* User stats */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
              <div className="text-gray-400 mb-1 text-sm">
                Active Users (Now)
              </div>
              <div className="text-2xl font-bold">12</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
              <div className="text-gray-400 mb-1 text-sm">
                Total Registered Users
              </div>
              <div className="text-2xl font-bold">87</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
              <div className="text-gray-400 mb-1 text-sm">
                Average Session Time
              </div>
              <div className="text-2xl font-bold">18m 24s</div>
            </div>
          </div>
        </>}
      {/* Settings modal */}
      {showSettingsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black bg-opacity-40" onClick={() => setShowSettingsModal(false)}></div>
          <div className="relative bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md border border-gray-200 dark:border-gray-700 shadow-xl">
            <h3 className="text-lg font-semibold mb-4">Panel Settings</h3>
            <label className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div>
                <div className="font-medium">Maintenance Mode</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Limit non-critical features</div>
              </div>
              <input type="checkbox" checked={maintenanceMode} onChange={(e) => setMaintenanceMode(e.target.checked)} />
            </label>
            <div className="mt-6 flex justify-end space-x-2">
              <button onClick={() => setShowSettingsModal(false)} className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600">Cancel</button>
              <button onClick={() => { setShowSettingsModal(false); notify('Settings updated'); }} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md">Save</button>
            </div>
          </div>
        </div>
      )}
      {/* Add source modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black bg-opacity-40" onClick={() => setShowAddModal(false)}></div>
          <div className="relative bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md border border-gray-200 dark:border-gray-700 shadow-xl">
            <h3 className="text-lg font-semibold mb-4">Add Data Source</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-1">Name</label>
                <input value={newSourceName} onChange={(e) => setNewSourceName(e.target.value)} className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md" />
              </div>
              <div>
                <label className="block text-sm mb-1">Type</label>
                <select value={newSourceType} onChange={(e) => setNewSourceType(e.target.value as 'Structured' | 'Unstructured')} className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md">
                  <option value="Structured">Structured</option>
                  <option value="Unstructured">Unstructured</option>
                </select>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-2">
              <button onClick={() => setShowAddModal(false)} className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600">Cancel</button>
              <button onClick={handleSaveNewSource} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md">Add</button>
            </div>
          </div>
        </div>
      )}
    </div>;
}