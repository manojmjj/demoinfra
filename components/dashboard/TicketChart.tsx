import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { avgTicketCreatedData } from '../../data/mockData';

const CustomLegend = () => {
    return (
        <div className="flex items-center space-x-4">
            <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-blue-200 mr-2"></div>
                <span className="text-sm text-gray-600 dark:text-slate-400">Created</span>
            </div>
            <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                <span className="text-sm text-gray-600 dark:text-slate-400">Solved</span>
            </div>
        </div>
    );
};


const TicketChart: React.FC = () => {
    const periods = ['Yearly', 'Monthly', 'Weekly'];
    const [currentPeriodIndex, setCurrentPeriodIndex] = useState(0);

    const handlePeriodChange = () => {
        setCurrentPeriodIndex((prevIndex) => (prevIndex + 1) % periods.length);
    };

    return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-slate-200">Avg. Ticket Created</h2>
        <div className="flex items-center space-x-4">
          <CustomLegend />
          <button onClick={handlePeriodChange} className="flex items-center border dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-slate-300">
            {periods[currentPeriodIndex]}
            <svg className="w-4 h-4 ml-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
          </button>
        </div>
      </div>
      <div style={{ width: '100%', height: 250 }}>
        <ResponsiveContainer>
          <BarChart data={avgTicketCreatedData} margin={{ top: 5, right: 0, left: 0, bottom: 5 }} barGap={10} barCategoryGap="35%">
            <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#6B7280' }} axisLine={false} tickLine={false} />
            <YAxis hide={true} domain={[0, 'dataMax + 1000']} />
            <Tooltip cursor={{fill: 'rgba(243, 244, 246, 0.5)'}} contentStyle={{display: 'none'}}/>
            <Bar dataKey="created" stackId="a" fill="#A5B4FC" radius={[4, 4, 0, 0]} />
            <Bar dataKey="solved" stackId="a" fill="#3B82F6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
    );
};

export default TicketChart;
