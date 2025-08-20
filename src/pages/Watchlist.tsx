import React, { useEffect, useState } from 'react';
import { EyeIcon, SearchIcon, FilterIcon, BellIcon, TrendingUpIcon, TrendingDownIcon, PlusIcon, XIcon } from 'lucide-react';
import CompanyCard from '../components/CompanyCard';
// Mock data for the watchlist
const initialWatchlistCompanies = [{
  id: '1',
  name: 'Tesla, Inc.',
  ticker: 'TSLA',
  score: 82,
  change: 3,
  industry: 'Automotive'
}, {
  id: '2',
  name: 'Apple Inc.',
  ticker: 'AAPL',
  score: 91,
  change: -1,
  industry: 'Technology'
}, {
  id: '3',
  name: 'Microsoft Corp.',
  ticker: 'MSFT',
  score: 89,
  change: 0,
  industry: 'Technology'
}, {
  id: '4',
  name: 'Amazon.com Inc.',
  ticker: 'AMZN',
  score: 85,
  change: 2,
  industry: 'E-Commerce'
}, {
  id: '5',
  name: 'Alphabet Inc.',
  ticker: 'GOOGL',
  score: 88,
  change: 1,
  industry: 'Technology'
}, {
  id: '6',
  name: 'Meta Platforms Inc.',
  ticker: 'META',
  score: 79,
  change: -2,
  industry: 'Technology'
}, {
  id: '7',
  name: 'JPMorgan Chase & Co.',
  ticker: 'JPM',
  score: 76,
  change: 1,
  industry: 'Financial Services'
}, {
  id: '8',
  name: 'Johnson & Johnson',
  ticker: 'JNJ',
  score: 84,
  change: -1,
  industry: 'Healthcare'
}];
// Mock alerts
const initialAlerts = [{
  id: '1',
  company: 'Tesla, Inc.',
  ticker: 'TSLA',
  threshold: 'below 75',
  frequency: 'Immediate'
}, {
  id: '2',
  company: 'Apple Inc.',
  ticker: 'AAPL',
  threshold: 'below 85',
  frequency: 'Daily'
}];
export default function Watchlist() {
  const [activeTab, setActiveTab] = useState('companies');
  const [searchQuery, setSearchQuery] = useState('');
  const storageKey = 'watchlistCompanies';
  const readWatchlist = () => {
    try {
      const raw = localStorage.getItem(storageKey);
      return raw ? JSON.parse(raw) : initialWatchlistCompanies;
    } catch {
      return initialWatchlistCompanies;
    }
  };
  const [companies, setCompanies] = useState(readWatchlist());
  useEffect(() => {
    const sync = () => setCompanies(readWatchlist());
    window.addEventListener('watchlist:updated', sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener('watchlist:updated', sync);
      window.removeEventListener('storage', sync);
    };
  }, []);
  const [alerts, setAlerts] = useState(initialAlerts);
  const [isAddCompanyOpen, setIsAddCompanyOpen] = useState(false);
  const [newCompanyName, setNewCompanyName] = useState('');
  const [newCompanyTicker, setNewCompanyTicker] = useState('');
  const [newCompanyScore, setNewCompanyScore] = useState('');
  const [newCompanyChange, setNewCompanyChange] = useState('');
  const [newCompanyIndustry, setNewCompanyIndustry] = useState('');
  const [isCreateAlertOpen, setIsCreateAlertOpen] = useState(false);
  const [alertCompanyTicker, setAlertCompanyTicker] = useState('');
  const [alertThresholdType, setAlertThresholdType] = useState('below');
  const [alertThresholdValue, setAlertThresholdValue] = useState('');
  const [alertFrequency, setAlertFrequency] = useState('Immediate');
  // Filter companies based on search query
  const filteredCompanies = companies.filter(company => company.name.toLowerCase().includes(searchQuery.toLowerCase()) || company.ticker.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleAddCompany = () => {
    const score = parseFloat(newCompanyScore);
    const change = parseFloat(newCompanyChange);
    if (!newCompanyName || !newCompanyTicker || Number.isNaN(score) || Number.isNaN(change) || !newCompanyIndustry) {
      return;
    }
    const newCompany = {
      id: String(Date.now()),
      name: newCompanyName,
      ticker: newCompanyTicker.toUpperCase(),
      score: Math.max(0, Math.min(100, Math.round(score))),
      change: Math.round(change),
      industry: newCompanyIndustry
    };
    setCompanies(prev => [newCompany, ...prev]);
    setIsAddCompanyOpen(false);
    setNewCompanyName('');
    setNewCompanyTicker('');
    setNewCompanyScore('');
    setNewCompanyChange('');
    setNewCompanyIndustry('');
  };
  const handleCreateAlert = () => {
    if (!alertCompanyTicker || !alertThresholdValue) return;
    const selectedCompany = companies.find(c => c.ticker === alertCompanyTicker);
    const newAlert = {
      id: String(Date.now()),
      company: selectedCompany ? selectedCompany.name : alertCompanyTicker,
      ticker: alertCompanyTicker,
      threshold: `${alertThresholdType} ${alertThresholdValue}`,
      frequency: alertFrequency
    };
    setAlerts(prev => [newAlert, ...prev]);
    setIsCreateAlertOpen(false);
    setAlertCompanyTicker('');
    setAlertThresholdType('below');
    setAlertThresholdValue('');
    setAlertFrequency('Immediate');
  };
  return <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Watchlist & Alerts</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Monitor your tracked companies and manage alerts
        </p>
      </div>
      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
        <div className="flex space-x-6">
          <button className={`py-3 px-1 flex items-center text-sm font-medium border-b-2 ${activeTab === 'companies' ? 'border-blue-500 text-blue-500' : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white'}`} onClick={() => setActiveTab('companies')}>
            <EyeIcon size={16} className="mr-2" />
            Watchlist Companies
          </button>
          <button className={`py-3 px-1 flex items-center text-sm font-medium border-b-2 ${activeTab === 'alerts' ? 'border-blue-500 text-blue-500' : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white'}`} onClick={() => setActiveTab('alerts')}>
            <BellIcon size={16} className="mr-2" />
            My Alerts
          </button>
        </div>
      </div>
      {/* Companies Tab */}
      {activeTab === 'companies' && <>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon size={16} className="text-gray-400" />
              </div>
              <input type="text" placeholder="Search companies or tickers..." className="w-full md:w-80 pl-10 pr-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
            </div>
            <div className="flex space-x-3">
              <button className="px-3 py-2 rounded-md bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white flex items-center">
                <FilterIcon size={16} className="mr-2" />
                Filter
              </button>
            </div>
          </div>
          {/* Summary stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
              <div className="text-gray-400 mb-1 text-sm">
                Companies Tracked
              </div>
              <div className="text-2xl font-bold">
                {companies.length}
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
              <div className="text-gray-400 mb-1 text-sm">Improving</div>
              <div className="flex items-center">
                <span className="text-2xl font-bold mr-2">
                  {companies.filter(c => c.change > 0).length}
                </span>
                <TrendingUpIcon size={20} className="text-green-500" />
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
              <div className="text-gray-400 mb-1 text-sm">Declining</div>
              <div className="flex items-center">
                <span className="text-2xl font-bold mr-2">
                  {companies.filter(c => c.change < 0).length}
                </span>
                <TrendingDownIcon size={20} className="text-red-500" />
              </div>
            </div>
          </div>
          {/* Company grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredCompanies.map(company => <CompanyCard key={company.id} company={company} />)}
          </div>
          {filteredCompanies.length === 0 && <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <SearchIcon size={24} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-medium mb-1 text-gray-900 dark:text-white">No companies found</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Try adjusting your search or add new companies to your watchlist
              </p>
            </div>}
        </>}
      {/* Alerts Tab */}
      {activeTab === 'alerts' && <>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <h2 className="text-xl font-semibold">Configured Alerts</h2>
            <button className="px-3 py-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white flex items-center" onClick={() => setIsCreateAlertOpen(true)}>
              <PlusIcon size={16} className="mr-2" />
              Create Alert
            </button>
          </div>
          {/* Alerts table */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                    Company
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                    Alert Threshold
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                    Frequency
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {alerts.map(alert => <tr key={alert.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div>
                          <div className="font-medium">{alert.company}</div>
                          <div className="text-sm text-gray-400">
                            {alert.ticker}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-sm rounded-md bg-red-500 bg-opacity-20 text-red-400">
                        Score {alert.threshold}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {alert.frequency}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <button className="text-blue-400 hover:text-blue-300 mr-4">
                        Edit
                      </button>
                      <button className="text-red-400 hover:text-red-300">
                        Delete
                      </button>
                    </td>
                  </tr>)}
              </tbody>
            </table>
            {alerts.length === 0 && <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BellIcon size={24} className="text-gray-400" />
                </div>
                <h3 className="text-lg font-medium mb-1">
                  No alerts configured
                </h3>
                <p className="text-gray-400">
                  Create alerts to get notified when company scores change
                </p>
              </div>}
          </div>
          {/* Alert history */}
          <div className="mt-8">
            <h3 className="text-lg font-medium mb-4">Recent Alert History</h3>
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center justify-center h-40">
                <div className="text-center">
                  <BellIcon size={32} className="text-gray-500 mx-auto mb-3" />
                  <p className="text-gray-400">
                    Alert history will appear here
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>}
      {/* Modals */}
      <AddCompanyModal
        open={isAddCompanyOpen}
        onClose={() => setIsAddCompanyOpen(false)}
        onSubmit={handleAddCompany}
        values={{
          name: newCompanyName,
          ticker: newCompanyTicker,
          score: newCompanyScore,
          change: newCompanyChange,
          industry: newCompanyIndustry
        }}
        setValues={(v) => {
          setNewCompanyName(v.name);
          setNewCompanyTicker(v.ticker);
          setNewCompanyScore(v.score);
          setNewCompanyChange(v.change);
          setNewCompanyIndustry(v.industry);
        }}
      />
      <CreateAlertModal
        open={isCreateAlertOpen}
        onClose={() => setIsCreateAlertOpen(false)}
        onSubmit={handleCreateAlert}
        values={{
          ticker: alertCompanyTicker,
          thresholdType: alertThresholdType,
          thresholdValue: alertThresholdValue,
          frequency: alertFrequency
        }}
        setValues={(v) => {
          setAlertCompanyTicker(v.ticker);
          setAlertThresholdType(v.thresholdType);
          setAlertThresholdValue(v.thresholdValue);
          setAlertFrequency(v.frequency);
        }}
        tickers={companies.map(c => c.ticker)}
      />
    </div>;
}

// Simple modal components rendered at the end of the file
export function AddCompanyModal({
  open,
  onClose,
  onSubmit,
  values,
  setValues
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  values: {
    name: string;
    ticker: string;
    score: string;
    change: string;
    industry: string;
  };
  setValues: (v: {
    name: string;
    ticker: string;
    score: string;
    change: string;
    industry: string;
  }) => void;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl w-full max-w-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Add Company</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"><XIcon size={18} /></button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700 dark:text-gray-400 mb-1">Name</label>
            <input className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-gray-900 dark:text-white" value={values.name} onChange={e => setValues({ ...values, name: e.target.value })} placeholder="e.g., Netflix, Inc." />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm text-gray-700 dark:text-gray-400 mb-1">Ticker</label>
              <input className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-gray-900 dark:text-white" value={values.ticker} onChange={e => setValues({ ...values, ticker: e.target.value.toUpperCase() })} placeholder="e.g., NFLX" />
            </div>
            <div>
              <label className="block text-sm text-gray-700 dark:text-gray-400 mb-1">Industry</label>
              <input className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-gray-900 dark:text-white" value={values.industry} onChange={e => setValues({ ...values, industry: e.target.value })} placeholder="e.g., Entertainment" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm text-gray-700 dark:text-gray-400 mb-1">Score (0-100)</label>
              <input type="number" className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-gray-900 dark:text-white" value={values.score} onChange={e => setValues({ ...values, score: e.target.value })} placeholder="85" />
            </div>
            <div>
              <label className="block text-sm text-gray-700 dark:text-gray-400 mb-1">Change (+/-)</label>
              <input type="number" className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-gray-900 dark:text-white" value={values.change} onChange={e => setValues({ ...values, change: e.target.value })} placeholder="2" />
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-end space-x-3">
          <button className="px-3 py-2 rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white" onClick={onClose}>Cancel</button>
          <button className="px-3 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white" onClick={onSubmit}>Add</button>
        </div>
      </div>
    </div>
  );
}

export function CreateAlertModal({
  open,
  onClose,
  onSubmit,
  values,
  setValues,
  tickers
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  values: {
    ticker: string;
    thresholdType: string;
    thresholdValue: string;
    frequency: string;
  };
  setValues: (v: { ticker: string; thresholdType: string; thresholdValue: string; frequency: string }) => void;
  tickers: string[];
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl w-full max-w-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Create Alert</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"><XIcon size={18} /></button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700 dark:text-gray-400 mb-1">Company Ticker</label>
            <select className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-gray-900 dark:text-white" value={values.ticker} onChange={e => setValues({ ...values, ticker: e.target.value })}>
              <option value="">Select...</option>
              {tickers.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm text-gray-700 dark:text-gray-400 mb-1">Condition</label>
              <select className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-gray-900 dark:text-white" value={values.thresholdType} onChange={e => setValues({ ...values, thresholdType: e.target.value })}>
                <option value="below">Score below</option>
                <option value="above">Score above</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-700 dark:text-gray-400 mb-1">Score</label>
              <input type="number" className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-gray-900 dark:text-white" value={values.thresholdValue} onChange={e => setValues({ ...values, thresholdValue: e.target.value })} placeholder="80" />
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-700 dark:text-gray-400 mb-1">Frequency</label>
            <select className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-gray-900 dark:text-white" value={values.frequency} onChange={e => setValues({ ...values, frequency: e.target.value })}>
              <option>Immediate</option>
              <option>Hourly</option>
              <option>Daily</option>
              <option>Weekly</option>
            </select>
          </div>
        </div>
        <div className="mt-6 flex justify-end space-x-3">
          <button className="px-3 py-2 rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white" onClick={onClose}>Cancel</button>
          <button className="px-3 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white" onClick={onSubmit}>Create</button>
        </div>
      </div>
    </div>
  );
}