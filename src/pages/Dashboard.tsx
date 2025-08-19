import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { AlertCircleIcon, TrendingUpIcon, TrendingDownIcon, BarChart2Icon, NewspaperIcon, EyeIcon, ArrowRightIcon } from 'lucide-react';
import CreditScoreChart from '../components/CreditScoreChart';
import CompanyCard from '../components/CompanyCard';
import AlertsWidget from '../components/AlertsWidget';
import NewsWidget from '../components/NewsWidget';
// Mock data for the dashboard
const watchlistCompanies = [{
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
}];
export default function Dashboard() {
  const {
    user
  } = useUser();
  // Watchlist statistics derived from user's watchlist
  const totalCompanies = watchlistCompanies.length;
  const averageScore = totalCompanies > 0
    ? Math.round((watchlistCompanies.reduce((sum, c) => sum + c.score, 0) / totalCompanies) * 10) / 10
    : 0;
  const improvingCount = watchlistCompanies.filter(c => c.change > 0).length;
  const decliningCount = watchlistCompanies.filter(c => c.change < 0).length;
  const unchangedCount = watchlistCompanies.filter(c => c.change === 0).length;
  const topMover = totalCompanies > 0
    ? watchlistCompanies.reduce((best, c) => Math.abs(c.change) > Math.abs(best.change) ? c : best, watchlistCompanies[0])
    : null;
  const highestScore = totalCompanies > 0
    ? watchlistCompanies.reduce((best, c) => c.score > best.score ? c : best, watchlistCompanies[0])
    : null;
  const lowestScore = totalCompanies > 0
    ? watchlistCompanies.reduce((worst, c) => c.score < worst.score ? c : worst, watchlistCompanies[0])
    : null;
  const industryToCount = watchlistCompanies.reduce<Record<string, number>>((acc, c) => {
    acc[c.industry] = (acc[c.industry] || 0) + 1;
    return acc;
  }, {});
  const industryDistribution = Object.entries(industryToCount).sort((a, b) => b[1] - a[1]);
  return <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Welcome back, {user?.name || 'User'}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Dashboard overview • {new Date().toLocaleDateString()}
        </p>
      </div>
      {/* Main dashboard grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - Credit Score Chart */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 h-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold flex items-center">
                <BarChart2Icon size={20} className="mr-2 text-blue-500" />
                Credit Score Timeline
              </h2>
              <div className="flex space-x-2">
                <button className="px-3 py-1 text-sm bg-blue-500 bg-opacity-20 text-blue-600 dark:text-blue-400 rounded-md">
                  1D
                </button>
                <button className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md">
                  1W
                </button>
                <button className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md">
                  1M
                </button>
                <button className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md">
                  1Y
                </button>
              </div>
            </div>
            {/* Credit score chart component */}
            <CreditScoreChart />
          </div>
        </div>
        {/* Right column - Alerts */}
        <div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold flex items-center">
                <AlertCircleIcon size={20} className="mr-2 text-red-500" />
                Recent Alerts
              </h2>
              <Link to="/watchlist" className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center">
                View all <ArrowRightIcon size={16} className="ml-1" />
              </Link>
            </div>
            {/* Alerts widget */}
            <AlertsWidget />
          </div>
          {/* News feed */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 mt-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold flex items-center">
                <NewspaperIcon size={20} className="mr-2 text-blue-500" />
                Latest News
              </h2>
              <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
                Refresh
              </button>
            </div>
            {/* News widget */}
            <NewsWidget />
          </div>
        </div>
      </div>
      {/* Watchlist section */}
      <div className="mt-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold flex items-center">
            <EyeIcon size={20} className="mr-2 text-blue-500" />
            Your Watchlist
          </h2>
          <Link to="/watchlist" className="text-sm text-blue-400 hover:text-blue-300 flex items-center">
            Manage watchlist <ArrowRightIcon size={16} className="ml-1" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {watchlistCompanies.map(company => <CompanyCard key={company.id} company={company} />)}
        </div>
      </div>
      {/* Watchlist Statistics (replaces heatmap) */}
      <div className="mt-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold flex items-center">
              <TrendingUpIcon size={20} className="mr-2 text-blue-500" />
              Watchlist Statistics
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
              <div className="text-gray-600 dark:text-gray-400 text-sm mb-1">Companies</div>
              <div className="text-2xl font-bold">{totalCompanies}</div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
              <div className="text-gray-600 dark:text-gray-400 text-sm mb-1">Average Score</div>
              <div className="text-2xl font-bold">{averageScore}</div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
              <div className="text-gray-600 dark:text-gray-400 text-sm mb-1">Improving</div>
              <div className="flex items-center">
                <span className="text-2xl font-bold mr-2">{improvingCount}</span>
                <TrendingUpIcon size={20} className="text-green-500" />
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
              <div className="text-gray-600 dark:text-gray-400 text-sm mb-1">Declining</div>
              <div className="flex items-center">
                <span className="text-2xl font-bold mr-2">{decliningCount}</span>
                <TrendingDownIcon size={20} className="text-red-500" />
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
              <div className="text-gray-600 dark:text-gray-400 text-sm mb-1">Unchanged</div>
              <div className="text-2xl font-bold">{unchangedCount}</div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
              <div className="text-gray-600 dark:text-gray-400 text-sm mb-1">Top Mover</div>
              <div className="text-sm">
                {topMover ? (
                  <>
                    <span className="font-semibold">{topMover.name}</span>
                    <span className={topMover.change >= 0 ? 'text-green-400 ml-2' : 'text-red-400 ml-2'}>
                      {topMover.change >= 0 ? '+' : ''}{topMover.change}
                    </span>
                  </>
                ) : '-'}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
              <div className="text-gray-600 dark:text-gray-400 text-sm mb-2">Highest Score</div>
              <div className="flex items-center justify-between">
                <div className="truncate mr-3">{highestScore ? highestScore.name : '-'}</div>
                <div className="text-xl font-bold">{highestScore ? highestScore.score : '-'}</div>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
              <div className="text-gray-600 dark:text-gray-400 text-sm mb-2">Lowest Score</div>
              <div className="flex items-center justify-between">
                <div className="truncate mr-3">{lowestScore ? lowestScore.name : '-'}</div>
                <div className="text-xl font-bold">{lowestScore ? lowestScore.score : '-'}</div>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
              <div className="text-gray-600 dark:text-gray-400 text-sm mb-3">Industry Distribution</div>
              <div className="space-y-2">
                {industryDistribution.map(([industry, count]) => {
                  const percentage = totalCompanies > 0 ? Math.round((count / totalCompanies) * 100) : 0;
                  return (
                    <div key={industry} className="w-full">
                      <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
                        <span>{industry}</span>
                        <span>{count} • {percentage}%</span>
                      </div>
                      <div className="h-2 bg-gray-200 dark:bg-gray-800 rounded">
                        <div className="h-2 bg-blue-500 rounded" style={{ width: `${percentage}%` }} />
                      </div>
                    </div>
                  );
                })}
                {industryDistribution.length === 0 && <div className="text-sm text-gray-500 dark:text-gray-400">No data</div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
}