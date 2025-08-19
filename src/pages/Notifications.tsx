import React, { useState } from 'react';
import { BellIcon, CheckCircleIcon, AlertTriangleIcon, TrendingUpIcon, TrendingDownIcon, ClockIcon, FilterIcon } from 'lucide-react';

interface NotificationItem {
  id: string;
  type: 'score' | 'news' | 'system' | 'alert';
  title: string;
  message: string;
  time: string;
  severity?: 'info' | 'warning' | 'critical';
}

const mockNotifications: NotificationItem[] = [
  {
    id: '1',
    type: 'score',
    title: 'Score Increased: AAPL',
    message: 'Apple Inc. credit score improved from 89 to 91.',
    time: '8 minutes ago',
    severity: 'info'
  },
  {
    id: '2',
    type: 'news',
    title: 'Regulatory Update: AMZN',
    message: 'Amazon faces new EU regulation proposal. Potential medium-term impact.',
    time: '25 minutes ago',
    severity: 'warning'
  },
  {
    id: '3',
    type: 'alert',
    title: 'Threshold Breach: TSLA',
    message: 'Tesla score fell below your alert threshold of 80.',
    time: '1 hour ago',
    severity: 'critical'
  },
  {
    id: '4',
    type: 'system',
    title: 'Weekly Digest Ready',
    message: 'Your weekly watchlist summary is available to view.',
    time: 'Yesterday',
    severity: 'info'
  }
];

export default function Notifications() {
  const [filter, setFilter] = useState<'all' | 'score' | 'news' | 'system' | 'alert'>('all');

  const filtered = mockNotifications.filter(n => filter === 'all' ? true : n.type === filter);

  const typeBadge = (type: NotificationItem['type']) => {
    const map: Record<NotificationItem['type'], string> = {
      score: 'bg-blue-500 bg-opacity-20 text-blue-600 dark:text-blue-400',
      news: 'bg-purple-500 bg-opacity-20 text-purple-600 dark:text-purple-400',
      system: 'bg-gray-500 bg-opacity-20 text-gray-700 dark:text-gray-300',
      alert: 'bg-red-500 bg-opacity-20 text-red-600 dark:text-red-400'
    };
    return map[type];
  };

  const severityIcon = (severity?: NotificationItem['severity']) => {
    if (severity === 'critical') return <AlertTriangleIcon size={16} className="text-red-500" />;
    if (severity === 'warning') return <AlertTriangleIcon size={16} className="text-yellow-500" />;
    return <CheckCircleIcon size={16} className="text-green-500" />;
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
          <BellIcon size={24} className="mr-2 text-blue-500" />
          Notifications
        </h1>
        <p className="text-gray-600 dark:text-gray-400">Review score changes, news alerts, and system updates.</p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 mb-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-gray-600 dark:text-gray-400 flex items-center mr-2"><FilterIcon size={16} className="mr-1" /> Filter:</span>
          {(['all','score','news','system','alert'] as const).map(t => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`px-3 py-1 text-sm rounded-md border ${filter === t ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'}`}
            >
              {t === 'all' ? 'All' : t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {filtered.map(n => (
          <div key={n.id} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-start">
                <div className="h-9 w-9 rounded-md bg-gray-100 dark:bg-gray-700 flex items-center justify-center mr-3">
                  {n.type === 'score' && <TrendingUpIcon size={18} className="text-blue-500" />}
                  {n.type === 'news' && <TrendingDownIcon size={18} className="text-purple-500" />}
                  {n.type === 'system' && <CheckCircleIcon size={18} className="text-gray-400" />}
                  {n.type === 'alert' && <AlertTriangleIcon size={18} className="text-red-500" />}
                </div>
                <div>
                  <div className="flex items-center mb-1">
                    <span className={`text-xs px-2 py-0.5 rounded mr-2 ${typeBadge(n.type)}`}>{n.type.toUpperCase()}</span>
                    <h3 className="font-medium text-gray-900 dark:text-white">{n.title}</h3>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{n.message}</p>
                  <div className="flex items-center text-xs text-gray-600 dark:text-gray-400 mt-2">
                    <ClockIcon size={12} className="mr-1" /> {n.time}
                  </div>
                </div>
              </div>
              <div>
                {severityIcon(n.severity)}
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <BellIcon size={24} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium mb-1 text-gray-900 dark:text-white">No notifications</h3>
            <p className="text-gray-600 dark:text-gray-400">You’re all caught up.</p>
          </div>
        )}
      </div>
    </div>
  );
}


