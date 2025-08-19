import React from 'react';
import { AlertTriangleIcon, TrendingDownIcon, InfoIcon, ClockIcon } from 'lucide-react';
// Mock alerts data
const alerts = [{
  id: '1',
  type: 'warning',
  company: 'General Electric',
  ticker: 'GE',
  message: 'Credit score dropped by 12 points',
  time: '10 minutes ago'
}, {
  id: '2',
  type: 'danger',
  company: 'Boeing Co.',
  ticker: 'BA',
  message: 'Downgraded by traditional agency',
  time: '2 hours ago'
}, {
  id: '3',
  type: 'info',
  company: 'JPMorgan Chase',
  ticker: 'JPM',
  message: 'New financial statements available',
  time: '4 hours ago'
}];
export default function AlertsWidget() {
  return <div className="space-y-3">
      {alerts.map(alert => <div key={alert.id} className="flex items-start p-3 rounded-lg bg-gray-700 bg-opacity-50 hover:bg-opacity-70 transition-all">
          <div className="mr-3">
            {alert.type === 'warning' && <AlertTriangleIcon size={20} className="text-yellow-500" />}
            {alert.type === 'danger' && <TrendingDownIcon size={20} className="text-red-500" />}
            {alert.type === 'info' && <InfoIcon size={20} className="text-blue-500" />}
          </div>
          <div>
            <div className="flex items-center mb-1">
              <span className="font-medium">{alert.company}</span>
              <span className="ml-2 text-xs bg-gray-600 px-1.5 py-0.5 rounded">
                {alert.ticker}
              </span>
            </div>
            <p className="text-sm text-gray-300">{alert.message}</p>
            <div className="flex items-center mt-1 text-xs text-gray-400">
              <ClockIcon size={12} className="mr-1" />
              {alert.time}
            </div>
          </div>
        </div>)}
      {alerts.length === 0 && <div className="text-center py-4 text-gray-400">
          No alerts at this time
        </div>}
    </div>;
}