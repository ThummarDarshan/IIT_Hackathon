import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUpIcon, TrendingDownIcon, ArrowRightIcon } from 'lucide-react';
interface Company {
  id: string;
  name: string;
  ticker: string;
  score: number;
  change: number;
  industry: string;
}
interface CompanyCardProps {
  company: Company;
}
export default function CompanyCard({
  company
}: CompanyCardProps) {
  const {
    id,
    name,
    ticker,
    score,
    change,
    industry
  } = company;
  // Determine color and icon based on score and change
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };
  const getChangeColor = (change: number) => {
    if (change > 0) return 'text-green-500';
    if (change < 0) return 'text-red-500';
    return 'text-gray-400';
  };
  const getChangeIcon = (change: number) => {
    if (change > 0) return <TrendingUpIcon size={16} className="text-green-500" />;
    if (change < 0) return <TrendingDownIcon size={16} className="text-red-500" />;
    return null;
  };
  return <Link to={`/company/${id}`} className="block">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 hover:border-blue-500 transition-all h-full">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white">{name}</h3>
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <span className="mr-2">{ticker}</span>
              <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-xs text-gray-700 dark:text-gray-300">
                {industry}
              </span>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600 dark:text-gray-400">Credit Score</span>
            <span className={`text-xl font-bold ${getScoreColor(score)}`}>
              {score}
            </span>
          </div>
          <div className="flex justify-between items-center mt-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Change</span>
            <div className="flex items-center">
              <span className={`font-medium ${getChangeColor(change)}`}>
                {change > 0 ? '+' : ''}
                {change}
              </span>
              <span className="ml-1">{getChangeIcon(change)}</span>
            </div>
          </div>
          <div className="mt-4 pt-2 border-t border-gray-200 dark:border-gray-700 flex justify-end">
            <span className="text-xs text-blue-600 dark:text-blue-400 flex items-center">
              View details <ArrowRightIcon size={12} className="ml-1" />
            </span>
          </div>
        </div>
      </div>
    </Link>;
}