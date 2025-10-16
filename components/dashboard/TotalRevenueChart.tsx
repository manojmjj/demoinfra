import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  ReferenceDot,
} from 'recharts';
import { totalRevenueData } from '../../data/mockData';

const CustomTooltip: React.FC<any> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const isIncrease = data.revenue > (totalRevenueData.find((d, i) => i > 0 && totalRevenueData[i-1].name === label)?.revenue || 0);

    return (
      <div className="bg-gray-800 text-white p-3 rounded-lg shadow-lg">
        <p className="text-xs text-gray-400">{`18 Nov 21`}</p>
        <p className="text-lg font-bold">{`€${data.revenue.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</p>
        <div className={`flex items-center text-xs font-semibold ${isIncrease ? 'text-green-400' : 'text-red-400'}`}>
            +8%
            <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>
        </div>
      </div>
    );
  }

  return null;
};

const TotalRevenueChart: React.FC = () => {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-slate-200">Total Revenue</h2>
        <div className="flex items-center space-x-4">
          <button onClick={() => alert('Filter clicked!')} className="flex items-center text-sm text-gray-600 dark:text-slate-400 hover:text-gray-800 dark:hover:text-slate-200">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v10a1 1 0 01-1 1H4a1 1 0 01-1-1V10zM15 10a1 1 0 011-1h2a1 1 0 011 1v10a1 1 0 01-1 1h-2a1 1 0 01-1-1V10z"></path></svg>
            Filter
          </button>
           <button onClick={() => alert('Manage clicked!')} className="flex items-center text-sm text-gray-600 dark:text-slate-400 hover:text-gray-800 dark:hover:text-slate-200">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
            Manage
          </button>
        </div>
      </div>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <LineChart data={totalRevenueData} margin={{ top: 5, right: 30, left: 20, bottom: 20 }}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 12, fill: '#6B7280' }} 
              axisLine={false} 
              tickLine={false}
              tickFormatter={(value, index) => (index === 0 || value === 'Today' || index === totalRevenueData.length - 1) ? value : ''}
              ticks={['21 Oct', 'Today', '21 Nov']}
              domain={['dataMin', 'dataMax']}
              style={{ fontWeight: 500 }}
              label={{value: 'Today', position: 'insideBottom', offset: -10, fill: '#3B82F6'}}
             />
            <YAxis 
              tickFormatter={(value) => `${value / 1000}k`}
              tick={{ fontSize: 12, fill: '#6B7280' }} 
              axisLine={false} 
              tickLine={false}
              domain={[0, 10000]}
              ticks={[0, 2000, 5000, 10000]}
             />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#9CA3AF', strokeWidth: 1, strokeDasharray: '3 3' }} />
            <Area type="monotone" dataKey="revenue" stroke="transparent" fill="url(#colorRevenue)" />
            <Line type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={2} dot={false} activeDot={{ r: 4, strokeWidth: 2, stroke: '#3B82F6', fill: 'white' }} />
             {/* FIX: Removed the `isFront` prop from ReferenceDot as it was causing a type error. The dot will render on top by default due to its position in the code. */}
             <ReferenceDot 
                x="Today" 
                y={1815.40} 
                r={6} 
                fill="#3B82F6" 
                stroke="white" 
                strokeWidth={2}
             />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TotalRevenueChart;
