import React from 'react';
import { NewspaperIcon, ClockIcon, ExternalLinkIcon } from 'lucide-react';
// Mock news data
const newsItems = [{
  id: '1',
  title: 'Tesla secures new $5B funding for expansion',
  source: 'Financial Times',
  impact: 'positive',
  time: '35 minutes ago'
}, {
  id: '2',
  title: 'Microsoft cloud revenue exceeds expectations in Q3',
  source: 'Wall Street Journal',
  impact: 'positive',
  time: '2 hours ago'
}, {
  id: '3',
  title: 'Amazon faces new regulatory challenges in EU',
  source: 'Bloomberg',
  impact: 'negative',
  time: '4 hours ago'
}];
export default function NewsWidget() {
  return <div className="space-y-3">
      {newsItems.map(item => <div key={item.id} className="flex items-start p-3 rounded-lg bg-gray-700 bg-opacity-50 hover:bg-opacity-70 transition-all cursor-pointer">
          <div className="mr-3">
            <NewspaperIcon size={20} className="text-blue-500" />
          </div>
          <div className="flex-grow">
            <div className="flex justify-between items-start">
              <h4 className="font-medium text-sm">{item.title}</h4>
              <div className={`ml-2 h-2 w-2 rounded-full ${item.impact === 'positive' ? 'bg-green-500' : 'bg-red-500'}`}></div>
            </div>
            <div className="flex items-center justify-between mt-1">
              <span className="text-xs text-gray-400">{item.source}</span>
              <div className="flex items-center text-xs text-gray-400">
                <ClockIcon size={12} className="mr-1" />
                {item.time}
              </div>
            </div>
          </div>
        </div>)}
      <div className="text-center pt-2">
        <button className="text-xs text-blue-400 hover:text-blue-300 flex items-center mx-auto">
          View all news <ExternalLinkIcon size={12} className="ml-1" />
        </button>
      </div>
    </div>;
}