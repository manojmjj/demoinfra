import React from 'react';
import { StatCardData } from '../../types';

const StatCard: React.FC<StatCardData> = ({ title, value, icon: Icon }) => {
  return (
    <div className="bg-white dark:bg-slate-800 p-5 rounded-lg border border-gray-200 dark:border-slate-700 flex items-center">
      <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500 dark:text-slate-400">{title}</p>
        <p className="text-2xl font-bold text-gray-800 dark:text-slate-200">{value}</p>
      </div>
    </div>
  );
};

export default StatCard;
