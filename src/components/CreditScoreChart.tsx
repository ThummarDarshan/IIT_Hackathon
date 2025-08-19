import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
// Mock data for the chart
const data = [{
  date: 'Jan',
  score: 72,
  agency: 68
}, {
  date: 'Feb',
  score: 75,
  agency: 68
}, {
  date: 'Mar',
  score: 73,
  agency: 67
}, {
  date: 'Apr',
  score: 80,
  agency: 70
}, {
  date: 'May',
  score: 78,
  agency: 70
}, {
  date: 'Jun',
  score: 82,
  agency: 72
}, {
  date: 'Jul',
  score: 80,
  agency: 72
}, {
  date: 'Aug',
  score: 85,
  agency: 75
}, {
  date: 'Sep',
  score: 82,
  agency: 75
}, {
  date: 'Oct',
  score: 89,
  agency: 78
}, {
  date: 'Nov',
  score: 91,
  agency: 80
}, {
  date: 'Dec',
  score: 85,
  agency: 80
}];
// Custom tooltip component
const CustomTooltip = ({
  active,
  payload,
  label
}: any) => {
  if (active && payload && payload.length) {
    return <div className="bg-white dark:bg-gray-900 p-3 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg">
        <p className="text-gray-700 dark:text-gray-300 font-medium">{label}</p>
        <p className="text-blue-600 dark:text-blue-400">
          <span className="font-medium">Our Score: </span>
          {payload[0].value}
        </p>
        <p className="text-green-600 dark:text-green-400">
          <span className="font-medium">Agency Rating: </span>
          {payload[1].value}
        </p>
      </div>;
  }
  return null;
};
export default function CreditScoreChart() {
  return <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis dataKey="date" tick={{
          fill: '#4B5563'
        }} axisLine={{
          stroke: '#D1D5DB'
        }} />
          <YAxis domain={[50, 100]} tick={{
          fill: '#4B5563'
        }} axisLine={{
          stroke: '#D1D5DB'
        }} />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine y={70} stroke="#F59E0B" strokeDasharray="3 3" />
          <Line type="monotone" dataKey="score" stroke="#3B82F6" strokeWidth={3} dot={{
          r: 4,
          fill: '#3B82F6'
        }} activeDot={{
          r: 6
        }} />
          <Line type="monotone" dataKey="agency" stroke="#10B981" strokeWidth={2} dot={{
          r: 3,
          fill: '#10B981'
        }} />
        </LineChart>
      </ResponsiveContainer>
      <div className="flex justify-center mt-2 space-x-6">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
          <span className="text-sm text-gray-300">Our Score</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
          <span className="text-sm text-gray-300">Agency Rating</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-0.5 bg-yellow-500 mr-2"></div>
          <span className="text-sm text-gray-300">Risk Threshold</span>
        </div>
      </div>
    </div>;
}