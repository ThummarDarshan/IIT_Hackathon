import React, { useState, Component } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeftIcon, BarChart2Icon, TrendingUpIcon, TrendingDownIcon, BookmarkIcon, BellIcon, ChevronDownIcon, FileTextIcon, HistoryIcon, NewspaperIcon } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
// Mock company data
const companyData = {
  id: '1',
  name: 'Tesla, Inc.',
  ticker: 'TSLA',
  sector: 'Automotive',
  currentScore: 82,
  previousScore: 79,
  agencyRating: 'BBB+',
  description: 'Tesla, Inc. designs, develops, manufactures, and sells electric vehicles and energy generation and storage systems.',
  features: [{
    name: 'Liquidity Ratio',
    value: 30,
    color: '#3B82F6'
  }, {
    name: 'Debt Coverage',
    value: 25,
    color: '#10B981'
  }, {
    name: 'Profitability',
    value: 20,
    color: '#F59E0B'
  }, {
    name: 'Market Position',
    value: 15,
    color: '#8B5CF6'
  }, {
    name: 'Industry Outlook',
    value: 10,
    color: '#EC4899'
  }],
  events: [{
    id: '1',
    date: '2023-12-01',
    title: 'Quarterly Earnings Release',
    impact: 'positive',
    description: 'Q3 earnings exceeded analyst expectations with revenue growth of 24%.'
  }, {
    id: '2',
    date: '2023-11-15',
    title: 'New Factory Announcement',
    impact: 'positive',
    description: 'Company announced plans to build a new manufacturing facility in Asia.'
  }, {
    id: '3',
    date: '2023-10-22',
    title: 'Supply Chain Disruption',
    impact: 'negative',
    description: 'Temporary production slowdown due to semiconductor shortage.'
  }]
};
const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899'];
export default function CompanyDetail() {
  const {
    id
  } = useParams();
  const [activeTab, setActiveTab] = useState('overview');
  // In a real app, we would fetch the company data based on the ID
  const company = companyData;
  const CustomTooltip = ({
    active,
    payload
  }: any) => {
    if (active && payload && payload.length) {
      return <div className="bg-gray-900 p-3 border border-gray-700 rounded-md shadow-lg">
          <p className="font-medium">{payload[0].name}</p>
          <p className="text-blue-400">{payload[0].value}%</p>
        </div>;
    }
    return null;
  };
  return <div className="max-w-7xl mx-auto">
      {/* Back button and header */}
      <div className="mb-6">
        <Link to="/dashboard" className="flex items-center text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white mb-4">
          <ArrowLeftIcon size={16} className="mr-1" />
          Back to Dashboard
        </Link>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mr-2">
                {company.name}
              </h1>
              <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm text-gray-700 dark:text-gray-300">
                {company.ticker}
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {company.sector} • Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>
          <div className="flex space-x-3 mt-4 md:mt-0">
            <button className="px-3 py-1 rounded-md border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center">
              <BookmarkIcon size={16} className="mr-2" />
              Watchlist
            </button>
            <button className="px-3 py-1 rounded-md border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center">
              <BellIcon size={16} className="mr-2" />
              Set Alert
            </button>
          </div>
        </div>
      </div>
      {/* Credit score card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col justify-center items-center md:items-start">
            <div className="text-gray-600 dark:text-gray-400 mb-1">Current Credit Score</div>
            <div className="flex items-center">
              <span className="text-4xl font-bold text-green-500">
                {company.currentScore}
              </span>
              <div className="ml-2 flex items-center text-green-500">
                <TrendingUpIcon size={20} />
                <span className="ml-1">
                  +{company.currentScore - company.previousScore}
                </span>
              </div>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Agency Rating:{' '}
              <span className="text-gray-900 dark:text-white">{company.agencyRating}</span>
            </div>
          </div>
          <div className="md:col-span-2">
            <p className="text-gray-700 dark:text-gray-300">{company.description}</p>
            <div className="mt-4 flex space-x-4">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Low Risk</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Medium Risk</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">High Risk</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
        <div className="flex space-x-6 overflow-x-auto">
          <button className={`py-3 px-1 flex items-center text-sm font-medium border-b-2 ${activeTab === 'overview' ? 'border-blue-500 text-blue-500' : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white'}`} onClick={() => setActiveTab('overview')}>
            <BarChart2Icon size={16} className="mr-2" />
            Overview
          </button>
          <button className={`py-3 px-1 flex items-center text-sm font-medium border-b-2 ${activeTab === 'explanations' ? 'border-blue-500 text-blue-500' : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white'}`} onClick={() => setActiveTab('explanations')}>
            <FileTextIcon size={16} className="mr-2" />
            Explanations
          </button>
          <button className={`py-3 px-1 flex items-center text-sm font-medium border-b-2 ${activeTab === 'events' ? 'border-blue-500 text-blue-500' : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white'}`} onClick={() => setActiveTab('events')}>
            <NewspaperIcon size={16} className="mr-2" />
            Events
          </button>
          <button className={`py-3 px-1 flex items-center text-sm font-medium border-b-2 ${activeTab === 'history' ? 'border-blue-500 text-blue-500' : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white'}`} onClick={() => setActiveTab('history')}>
            <HistoryIcon size={16} className="mr-2" />
            History
          </button>
        </div>
      </div>
      {/* Tab content */}
      <div>
        {/* Overview Tab */}
        {activeTab === 'overview' && <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-medium mb-4">Score Components</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={company.features} cx="50%" cy="50%" labelLine={false} outerRadius={100} fill="#8884d8" dataKey="value">
                      {company.features.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {company.features.map((feature, index) => <div key={feature.name} className="flex items-center">
                    <div className="w-3 h-3 rounded-full mr-2" style={{
                backgroundColor: COLORS[index % COLORS.length]
              }}></div>
                    <span className="text-sm">
                      {feature.name}: {feature.value}%
                    </span>
                  </div>)}
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-medium mb-4">
                Key Financial Metrics
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Debt to Equity
                    </span>
                    <span className="text-sm">0.38</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{
                  width: '38%'
                }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Current Ratio</span>
                    <span className="text-sm">1.56</span>
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
                      Return on Equity
                    </span>
                    <span className="text-sm">22.9%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{
                  width: '85%'
                }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Profit Margin</span>
                    <span className="text-sm">15.3%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{
                  width: '65%'
                }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Interest Coverage
                    </span>
                    <span className="text-sm">12.4x</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-pink-500 h-2 rounded-full" style={{
                  width: '90%'
                }}></div>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <button className="w-full py-2 text-sm text-blue-600 dark:text-blue-400 border border-blue-600 dark:border-blue-400 rounded-md hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-colors">
                  View Full Financial Report
                </button>
              </div>
            </div>
          </div>}
        {/* Explanations Tab */}
        {activeTab === 'explanations' && <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium mb-4">
              Credit Score Explanations
            </h3>
            <div className="space-y-6">
              {company.features.map((feature, index) => <div key={feature.name} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <div className="w-4 h-4 rounded-full mr-2" style={{
                  backgroundColor: COLORS[index % COLORS.length]
                }}></div>
                      <h4 className="font-medium">{feature.name}</h4>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium">{feature.value}%</span>
                      <ChevronDownIcon size={16} className="ml-1 text-gray-500 dark:text-gray-400" />
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {index === 0 && 'The company maintains strong cash reserves relative to short-term obligations, indicating good ability to meet immediate financial commitments.'}
                    {index === 1 && 'Current debt levels are manageable with steady cash flows providing adequate coverage for interest payments and principal repayments.'}
                    {index === 2 && 'Consistent profit margins and return on capital demonstrate sustainable business operations and financial health.'}
                    {index === 3 && 'Strong competitive position in the market with growing market share and brand recognition provides stability.'}
                    {index === 4 && 'Industry outlook remains positive with growth opportunities, though facing some regulatory challenges.'}
                  </p>
                </div>)}
            </div>
          </div>}
        {/* Events Tab */}
        {activeTab === 'events' && <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium mb-4">
              Recent Events Impacting Score
            </h3>
            <div className="space-y-6">
              {company.events.map(event => <div key={event.id} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-0">
                  <div className="flex items-start">
                    <div className={`mt-1 h-4 w-4 rounded-full flex-shrink-0 ${event.impact === 'positive' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <div className="ml-3">
                      <div className="flex items-center">
                        <h4 className="font-medium">{event.title}</h4>
                        <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                          {event.date}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                        {event.description}
                      </p>
                      <div className="mt-2 flex items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-400 mr-2">
                          Score Impact:
                        </span>
                        {event.impact === 'positive' ? <div className="flex items-center text-green-500">
                            <TrendingUpIcon size={14} className="mr-1" />
                            <span className="text-sm">+3 points</span>
                          </div> : <div className="flex items-center text-red-500">
                            <TrendingDownIcon size={14} className="mr-1" />
                            <span className="text-sm">-2 points</span>
                          </div>}
                      </div>
                    </div>
                  </div>
                </div>)}
            </div>
          </div>}
        {/* History Tab */}
        {activeTab === 'history' && <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium mb-4">
              Historical Score Timeline
            </h3>
            <div className="relative">
              {/* Vertical timeline line */}
              <div className="absolute h-full w-0.5 bg-gray-200 dark:bg-gray-700 left-2.5 top-0"></div>
              <div className="space-y-6">
                <div className="relative pl-10">
                  <div className="absolute left-0 top-1 h-5 w-5 rounded-full bg-blue-500"></div>
                  <div>
                    <div className="flex items-center">
                      <h4 className="font-medium">Score: 82</h4>
                      <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                        Dec 2023
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                      Strong quarterly earnings and improved debt coverage
                      ratio.
                    </p>
                  </div>
                </div>
                <div className="relative pl-10">
                  <div className="absolute left-0 top-1 h-5 w-5 rounded-full bg-blue-500"></div>
                  <div>
                    <div className="flex items-center">
                      <h4 className="font-medium">Score: 79</h4>
                      <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                        Nov 2023
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                      New factory announcement with positive long-term outlook.
                    </p>
                  </div>
                </div>
                <div className="relative pl-10">
                  <div className="absolute left-0 top-1 h-5 w-5 rounded-full bg-yellow-500"></div>
                  <div>
                    <div className="flex items-center">
                      <h4 className="font-medium">Score: 75</h4>
                      <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                        Oct 2023
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                      Supply chain disruptions affected production temporarily.
                    </p>
                  </div>
                </div>
                <div className="relative pl-10">
                  <div className="absolute left-0 top-1 h-5 w-5 rounded-full bg-yellow-500"></div>
                  <div>
                    <div className="flex items-center">
                      <h4 className="font-medium">Score: 76</h4>
                      <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                        Sep 2023
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                      Stable financial performance with slight improvements in
                      liquidity.
                    </p>
                  </div>
                </div>
                <div className="relative pl-10">
                  <div className="absolute left-0 top-1 h-5 w-5 rounded-full bg-green-500"></div>
                  <div>
                    <div className="flex items-center">
                      <h4 className="font-medium">Score: 73</h4>
                      <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                        Aug 2023
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                      New strategic partnership announced, improving market
                      position.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>}
      </div>
    </div>;
}