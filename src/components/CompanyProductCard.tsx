import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUpIcon, TrendingDownIcon, StarIcon, ExternalLinkIcon, MapPinIcon, CalendarIcon, UserIcon, GlobeIcon, BarChart2Icon, EyeIcon } from 'lucide-react';
interface Company {
  id: string;
  name: string;
  ticker: string;
  score: number;
  change: number;
  industry: string;
  description: string;
  logo?: string;
  ceo?: string;
  founded?: string;
  headquarters?: string;
  marketCap?: string;
  employees?: string;
  website?: string;
  rating: number;
}
interface CompanyProductCardProps {
  company: Company;
}
export default function CompanyProductCard({
  company
}: CompanyProductCardProps) {
  // Watchlist helpers using localStorage
  const storageKey = 'watchlistCompanies';
  const readWatchlist = (): Array<Partial<Company>> => {
    try {
      const raw = localStorage.getItem(storageKey);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  };
  const [isWatched, setIsWatched] = useState<boolean>(() => readWatchlist().some(c => c.id === company.id));
  useEffect(() => {
    setIsWatched(readWatchlist().some(c => c.id === company.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [company.id]);
  const toggleWatchlist = () => {
    const list = readWatchlist();
    const exists = list.some(c => c.id === company.id);
    let updated: Array<Partial<Company>>;
    if (exists) {
      updated = list.filter(c => c.id !== company.id);
    } else {
      const entry: Partial<Company> = {
        id: company.id,
        name: company.name,
        ticker: company.ticker,
        score: company.score,
        change: company.change,
        industry: company.industry,
        logo: company.logo
      } as Partial<Company>;
      updated = [entry, ...list];
    }
    localStorage.setItem(storageKey, JSON.stringify(updated));
    setIsWatched(!exists);
    // Notify other pages to refresh
    window.dispatchEvent(new Event('watchlist:updated'));
  };
  // Determine color based on score
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };
  // Determine change color and icon
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
  return <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:border-blue-500 transition-all duration-200 flex flex-col h-full">
      {/* Company header with logo */}
      <div className="relative">
        <div className="h-40 bg-gray-100 dark:bg-gray-700 flex items-center justify-center p-4">
          {company.logo ? <img src={company.logo} alt={company.name} className="max-h-full max-w-full object-contain" /> : <div className="h-20 w-20 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-2xl font-bold text-gray-700 dark:text-white">
              {company.ticker.substring(0, 2)}
            </div>}
        </div>
        {/* Watchlist toggle */}
        <button onClick={toggleWatchlist} title={isWatched ? 'Remove from Watchlist' : 'Add to Watchlist'} className={`absolute top-3 left-3 p-2 rounded-full border ${isWatched ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white/90 dark:bg-gray-900/70 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200'} hover:opacity-90 transition` }>
          <EyeIcon size={16} />
        </button>
        {/* Industry badge */}
        <div className="absolute top-3 right-3">
          <span className="px-2 py-1 bg-white dark:bg-gray-900 bg-opacity-90 dark:bg-opacity-70 rounded text-xs text-gray-700 dark:text-white border border-gray-200 dark:border-transparent">
            {company.industry}
          </span>
        </div>
        {/* Score badge */}
        <div className="absolute -bottom-5 right-4">
          <div className="h-10 w-10 rounded-full bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 flex items-center justify-center">
            <span className={`text-sm font-bold ${getScoreColor(company.score)}`}>
              {company.score}
            </span>
          </div>
        </div>
      </div>
      {/* Company info */}
      <div className="p-4 flex-grow">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white">{company.name}</h3>
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mt-0.5">
              <span className="text-xs px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-gray-700 dark:text-gray-300">
                {company.ticker}
              </span>
            </div>
          </div>
          {/* Rating stars */}
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => <StarIcon key={i} size={14} className={i < Math.floor(company.rating) ? 'text-yellow-400' : i < company.rating ? 'text-yellow-400 opacity-50' : 'text-gray-500'} fill={i < Math.floor(company.rating) ? 'currentColor' : 'none'} />)}
            <span className="ml-1 text-xs text-gray-600 dark:text-gray-400">{company.rating}</span>
          </div>
        </div>
        {/* Description */}
        <p className="mt-3 text-sm text-gray-700 dark:text-gray-300 line-clamp-3">
          {company.description}
        </p>
        {/* Company details */}
        <div className="mt-4 space-y-2 text-sm">
          {company.ceo && <div className="flex items-center text-gray-600 dark:text-gray-400">
              <UserIcon size={14} className="mr-2" />
              <span>
                CEO: <span className="text-gray-800 dark:text-gray-300">{company.ceo}</span>
              </span>
            </div>}
          {company.founded && <div className="flex items-center text-gray-600 dark:text-gray-400">
              <CalendarIcon size={14} className="mr-2" />
              <span>
                Founded:{' '}
                <span className="text-gray-800 dark:text-gray-300">{company.founded}</span>
              </span>
            </div>}
          {company.headquarters && <div className="flex items-center text-gray-600 dark:text-gray-400">
              <MapPinIcon size={14} className="mr-2" />
              <span className="truncate">{company.headquarters}</span>
            </div>}
        </div>
      </div>
      {/* Card footer */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 mt-auto">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <BarChart2Icon size={16} className="text-gray-400 mr-1" />
            <span className="text-gray-600 dark:text-gray-400 text-sm">Change:</span>
            <div className="ml-1 flex items-center">
              {getChangeIcon(company.change)}
              <span className={`ml-1 ${getChangeColor(company.change)}`}>
                {company.change > 0 ? `+${company.change}` : company.change}
              </span>
            </div>
          </div>
          <Link to={`/company/${company.id}`} className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded-md flex items-center">
            Details
            <ExternalLinkIcon size={12} className="ml-1" />
          </Link>
        </div>
      </div>
    </div>;
}