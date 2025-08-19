import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SearchIcon, FilterIcon, GridIcon, ListIcon, SlidersIcon, StarIcon, TrendingUpIcon, TrendingDownIcon, ExternalLinkIcon, ChevronDownIcon } from 'lucide-react';
import CompanyProductCard from '../components/CompanyProductCard';
// Mock data for companies
const companiesData = [{
  id: '1',
  name: 'Tesla, Inc.',
  ticker: 'TSLA',
  score: 82,
  change: 3,
  industry: 'Automotive',
  description: 'Tesla, Inc. designs, develops, manufactures, and sells electric vehicles and energy generation and storage systems.',
  logo: 'https://logo.clearbit.com/tesla.com',
  ceo: 'Elon Musk',
  founded: '2003',
  headquarters: 'Austin, Texas, US',
  marketCap: '$800.45B',
  employees: '127,855',
  website: 'tesla.com',
  rating: 4.5
}, {
  id: '2',
  name: 'Apple Inc.',
  ticker: 'AAPL',
  score: 91,
  change: -1,
  industry: 'Technology',
  description: 'Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide.',
  logo: 'https://logo.clearbit.com/apple.com',
  ceo: 'Tim Cook',
  founded: '1976',
  headquarters: 'Cupertino, California, US',
  marketCap: '$2.94T',
  employees: '161,000',
  website: 'apple.com',
  rating: 4.8
}, {
  id: '3',
  name: 'Microsoft Corp.',
  ticker: 'MSFT',
  score: 89,
  change: 0,
  industry: 'Technology',
  description: 'Microsoft Corporation develops, licenses, and supports software, services, devices, and solutions worldwide.',
  logo: 'https://logo.clearbit.com/microsoft.com',
  ceo: 'Satya Nadella',
  founded: '1975',
  headquarters: 'Redmond, Washington, US',
  marketCap: '$2.81T',
  employees: '221,000',
  website: 'microsoft.com',
  rating: 4.7
}, {
  id: '4',
  name: 'Amazon.com Inc.',
  ticker: 'AMZN',
  score: 85,
  change: 2,
  industry: 'E-Commerce',
  description: 'Amazon.com, Inc. engages in the retail sale of consumer products and subscriptions in North America and internationally.',
  logo: 'https://logo.clearbit.com/amazon.com',
  ceo: 'Andy Jassy',
  founded: '1994',
  headquarters: 'Seattle, Washington, US',
  marketCap: '$1.73T',
  employees: '1,541,000',
  website: 'amazon.com',
  rating: 4.6
}, {
  id: '5',
  name: 'Alphabet Inc.',
  ticker: 'GOOGL',
  score: 88,
  change: 1,
  industry: 'Technology',
  description: 'Alphabet Inc. provides online advertising services, search engine, and cloud computing services through its Google segment.',
  logo: 'https://logo.clearbit.com/abc.xyz',
  ceo: 'Sundar Pichai',
  founded: '2015',
  headquarters: 'Mountain View, California, US',
  marketCap: '$1.97T',
  employees: '156,500',
  website: 'abc.xyz',
  rating: 4.5
}, {
  id: '6',
  name: 'Meta Platforms Inc.',
  ticker: 'META',
  score: 79,
  change: -2,
  industry: 'Technology',
  description: 'Meta Platforms, Inc. builds technologies that help people connect, find communities, and grow businesses worldwide.',
  logo: 'https://logo.clearbit.com/meta.com',
  ceo: 'Mark Zuckerberg',
  founded: '2004',
  headquarters: 'Menlo Park, California, US',
  marketCap: '$1.23T',
  employees: '86,482',
  website: 'meta.com',
  rating: 4.0
}, {
  id: '7',
  name: 'JPMorgan Chase & Co.',
  ticker: 'JPM',
  score: 76,
  change: 1,
  industry: 'Financial Services',
  description: 'JPMorgan Chase & Co. operates as a financial services company worldwide, offering investment banking, financial services for consumers and businesses.',
  logo: 'https://logo.clearbit.com/jpmorganchase.com',
  ceo: 'Jamie Dimon',
  founded: '2000',
  headquarters: 'New York City, New York, US',
  marketCap: '$503.54B',
  employees: '293,723',
  website: 'jpmorganchase.com',
  rating: 4.2
}, {
  id: '8',
  name: 'Johnson & Johnson',
  ticker: 'JNJ',
  score: 84,
  change: -1,
  industry: 'Healthcare',
  description: 'Johnson & Johnson researches, develops, manufactures, and sells healthcare products worldwide.',
  logo: 'https://logo.clearbit.com/jnj.com',
  ceo: 'Joaquin Duato',
  founded: '1886',
  headquarters: 'New Brunswick, New Jersey, US',
  marketCap: '$381.95B',
  employees: '142,000',
  website: 'jnj.com',
  rating: 4.4
}, {
  id: '9',
  name: 'Visa Inc.',
  ticker: 'V',
  score: 87,
  change: 2,
  industry: 'Financial Services',
  description: 'Visa Inc. operates as a payments technology company worldwide, facilitating digital payments among consumers, merchants, and financial institutions.',
  logo: 'https://logo.clearbit.com/visa.com',
  ceo: 'Ryan McInerney',
  founded: '1958',
  headquarters: 'San Francisco, California, US',
  marketCap: '$510.12B',
  employees: '26,500',
  website: 'visa.com',
  rating: 4.6
}, {
  id: '10',
  name: 'Walmart Inc.',
  ticker: 'WMT',
  score: 80,
  change: 3,
  industry: 'Retail',
  description: 'Walmart Inc. engages in the operation of retail, wholesale, and other units worldwide, offering discount stores, supermarkets, and e-commerce.',
  logo: 'https://logo.clearbit.com/walmart.com',
  ceo: 'Doug McMillon',
  founded: '1962',
  headquarters: 'Bentonville, Arkansas, US',
  marketCap: '$420.70B',
  employees: '2,100,000',
  website: 'walmart.com',
  rating: 4.1
}, {
  id: '11',
  name: 'Berkshire Hathaway Inc.',
  ticker: 'BRK.A',
  score: 92,
  change: 0,
  industry: 'Conglomerate',
  description: 'Berkshire Hathaway Inc. engages in insurance, freight rail transportation, and utility businesses worldwide.',
  logo: 'https://logo.clearbit.com/berkshirehathaway.com',
  ceo: 'Warren Buffett',
  founded: '1839',
  headquarters: 'Omaha, Nebraska, US',
  marketCap: '$785.33B',
  employees: '372,000',
  website: 'berkshirehathaway.com',
  rating: 4.9
}, {
  id: '12',
  name: 'UnitedHealth Group Inc.',
  ticker: 'UNH',
  score: 86,
  change: 1,
  industry: 'Healthcare',
  description: 'UnitedHealth Group Incorporated operates as a diversified health care company in the United States.',
  logo: 'https://logo.clearbit.com/unitedhealthgroup.com',
  ceo: 'Andrew Witty',
  founded: '1977',
  headquarters: 'Minnetonka, Minnesota, US',
  marketCap: '$490.15B',
  employees: '400,000',
  website: 'unitedhealthgroup.com',
  rating: 4.3
}];
export default function CompaniesOverview() {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [industryFilter, setIndustryFilter] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('score');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  // Get unique industries for filter
  const industries = ['All', ...Array.from(new Set(companiesData.map(company => company.industry)))];
  // Filter companies based on search and industry
  const filteredCompanies = companiesData.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchQuery.toLowerCase()) || company.ticker.toLowerCase().includes(searchQuery.toLowerCase()) || company.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesIndustry = industryFilter === 'All' || company.industry === industryFilter;
    return matchesSearch && matchesIndustry;
  });
  // Sort companies
  const sortedCompanies = [...filteredCompanies].sort((a, b) => {
    let comparison = 0;
    if (sortBy === 'name') {
      comparison = a.name.localeCompare(b.name);
    } else if (sortBy === 'score') {
      comparison = a.score - b.score;
    } else if (sortBy === 'change') {
      comparison = a.change - b.change;
    } else if (sortBy === 'rating') {
      comparison = a.rating - b.rating;
    }
    return sortOrder === 'desc' ? -comparison : comparison;
  });
  return <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white">Companies Overview</h1>
        <p className="text-gray-400">
          Browse and analyze companies in our database
        </p>
      </div>
      {/* Search and filters */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          {/* Search */}
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon size={16} className="text-gray-400" />
            </div>
            <input type="text" placeholder="Search companies, tickers, or descriptions..." className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
          </div>
          {/* Industry Filter */}
          <div className="flex-shrink-0">
            <div className="relative">
              <select className="appearance-none pl-3 pr-10 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500" value={industryFilter} onChange={e => setIndustryFilter(e.target.value)}>
                {industries.map(industry => <option key={industry} value={industry}>
                    {industry}
                  </option>)}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <ChevronDownIcon size={16} className="text-gray-400" />
              </div>
            </div>
          </div>
          {/* Sort By */}
          <div className="flex-shrink-0">
            <div className="relative">
              <select className="appearance-none pl-3 pr-10 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500" value={sortBy} onChange={e => setSortBy(e.target.value)}>
                <option value="score">Credit Score</option>
                <option value="name">Company Name</option>
                <option value="change">Score Change</option>
                <option value="rating">Rating</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <ChevronDownIcon size={16} className="text-gray-400" />
              </div>
            </div>
          </div>
          {/* Sort Order */}
          <div className="flex-shrink-0">
            <button className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none hover:bg-gray-600" onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
              {sortOrder === 'desc' ? <TrendingDownIcon size={16} /> : <TrendingUpIcon size={16} />}
            </button>
          </div>
          {/* View Toggle */}
          <div className="flex-shrink-0">
            <div className="flex border border-gray-600 rounded-md overflow-hidden">
              <button className={`px-3 py-2 ${viewMode === 'grid' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`} onClick={() => setViewMode('grid')}>
                <GridIcon size={16} />
              </button>
              <button className={`px-3 py-2 ${viewMode === 'list' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`} onClick={() => setViewMode('list')}>
                <ListIcon size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Results count */}
      <div className="mb-4 text-sm text-gray-400">
        Showing {sortedCompanies.length}{' '}
        {sortedCompanies.length === 1 ? 'company' : 'companies'}
      </div>
      {/* Grid View */}
      {viewMode === 'grid' && <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {sortedCompanies.map(company => <CompanyProductCard key={company.id} company={company} />)}
        </div>}
      {/* List View */}
      {viewMode === 'list' && <div className="space-y-4">
          {sortedCompanies.map(company => <div key={company.id} className="bg-gray-800 rounded-xl border border-gray-700 p-4 hover:border-blue-500 transition-colors">
              <div className="flex items-start">
                <div className="h-16 w-16 flex-shrink-0 bg-gray-700 rounded-md overflow-hidden">
                  {company.logo ? <img src={company.logo} alt={company.name} className="h-full w-full object-cover" /> : <div className="h-full w-full flex items-center justify-center text-gray-400">
                      {company.ticker.substring(0, 2)}
                    </div>}
                </div>
                <div className="ml-4 flex-grow">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-medium text-white flex items-center">
                        {company.name}
                        <span className="ml-2 px-2 py-0.5 bg-gray-700 rounded text-xs text-gray-300">
                          {company.ticker}
                        </span>
                      </h3>
                      <p className="text-sm text-gray-400">
                        {company.industry}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <div className="flex items-center mr-4">
                        {[...Array(5)].map((_, i) => <StarIcon key={i} size={14} className={i < Math.floor(company.rating) ? 'text-yellow-400' : i < company.rating ? 'text-yellow-400 opacity-50' : 'text-gray-500'} fill={i < Math.floor(company.rating) ? 'currentColor' : 'none'} />)}
                        <span className="ml-1 text-sm text-gray-400">
                          {company.rating}
                        </span>
                      </div>
                      <div className="text-2xl font-bold text-right">
                        <span className={company.score >= 80 ? 'text-green-500' : company.score >= 60 ? 'text-yellow-500' : 'text-red-500'}>
                          {company.score}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-300 mt-2 line-clamp-2">
                    {company.description}
                  </p>
                  <div className="flex justify-between items-center mt-3">
                    <div className="flex items-center">
                      <span className="text-sm text-gray-400">
                        Score Change:
                      </span>
                      <div className="ml-2 flex items-center">
                        {company.change > 0 ? <TrendingUpIcon size={16} className="text-green-500" /> : company.change < 0 ? <TrendingDownIcon size={16} className="text-red-500" /> : null}
                        <span className={`ml-1 ${company.change > 0 ? 'text-green-500' : company.change < 0 ? 'text-red-500' : 'text-gray-400'}`}>
                          {company.change > 0 ? `+${company.change}` : company.change}
                        </span>
                      </div>
                    </div>
                    <Link to={`/company/${company.id}`} className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-md flex items-center">
                      View Details
                      <ExternalLinkIcon size={14} className="ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>)}
        </div>}
      {/* No results */}
      {sortedCompanies.length === 0 && <div className="text-center py-12 bg-gray-800 rounded-xl border border-gray-700">
          <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <SearchIcon size={24} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-medium mb-1 text-white">
            No companies found
          </h3>
          <p className="text-gray-400">
            Try adjusting your search criteria or filters
          </p>
        </div>}
    </div>;
}