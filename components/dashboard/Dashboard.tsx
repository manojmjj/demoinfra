import React from 'react';
import StatCard from './StatCard';
import { 
    reminders,
} from '../../data/mockData';
import { RecentActivity, Reminder, Client, Transaction, ServiceTicket } from '../../types';
import { CustomerIcon, TicketIcon, TransactionsIcon, InboxIcon } from '../icons';
import TotalRevenueChart from './TotalRevenueChart';
import TicketChart from './TicketChart';

const ActivityIcon: React.FC<{type: RecentActivity['type']}> = ({ type }) => {
    const baseClasses = "w-10 h-10 rounded-full flex items-center justify-center";
    switch(type) {
        case 'New Client':
            return <div className={`${baseClasses} bg-blue-100 text-blue-600`}><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg></div>;
        case 'Transaction':
            return <div className={`${baseClasses} bg-green-100 text-green-600`}><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg></div>;
        case 'Ticket Update':
            return <div className={`${baseClasses} bg-yellow-100 text-yellow-600`}><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 002 2h3m2-9H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V7a2 2 0 00-2-2h-5.586a1 1 0 01-.707-.293L13.414 4a1 1 0 00-.707-.293H9.293a1 1 0 00-.707.293L6.172 6.172a1 1 0 01-.707.293H5z" /></svg></div>;
        case 'Deletion':
            return <div className={`${baseClasses} bg-red-100 text-red-600`}><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></div>;
        default:
            return null;
    }
}

const ReminderIcon: React.FC<{type: Reminder['type']}> = ({ type }) => {
    const baseClasses = "w-10 h-10 rounded-lg flex items-center justify-center";
     switch(type) {
        case 'Follow-up':
            return <div className={`${baseClasses} bg-purple-100 text-purple-600`}><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg></div>;
        case 'Payment':
            return <div className={`${baseClasses} bg-red-100 text-red-600`}><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 12v-1m-4-6H7m10 0h1M7 12a5 5 0 005 5m5-5a5 5 0 01-5 5m0-10a5 5 0 015 5" /></svg></div>;
        case 'Maintenance':
            return <div className={`${baseClasses} bg-indigo-100 text-indigo-600`}><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg></div>;
        default:
            return null;
    }
}

const RecentActivityFeed: React.FC<{ activities: RecentActivity[] }> = ({ activities }) => (
  <div className="bg-white dark:bg-slate-800 p-6 rounded-lg border border-gray-200 dark:border-slate-700">
    <h2 className="text-lg font-semibold text-gray-800 dark:text-slate-200 mb-4">Recent Activity</h2>
    <ul className="space-y-4">
      {activities.slice(0, 4).map(activity => (
        <li key={activity.id} className="flex items-start">
          <ActivityIcon type={activity.type} />
          <div className="ml-4">
            <p className="text-sm text-gray-700 dark:text-slate-300">{activity.description}</p>
            <p className="text-xs text-gray-400 dark:text-slate-500">{activity.timestamp}</p>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

const UpcomingReminders: React.FC = () => (
  <div className="bg-white dark:bg-slate-800 p-6 rounded-lg border border-gray-200 dark:border-slate-700">
     <h2 className="text-lg font-semibold text-gray-800 dark:text-slate-200 mb-4">Upcoming Reminders</h2>
    <ul className="space-y-4">
        {reminders.map(reminder => (
            <li key={reminder.id} className="flex items-start">
                <ReminderIcon type={reminder.type} />
                <div className="ml-4">
                    <p className="text-sm text-gray-700 dark:text-slate-300">{reminder.description}</p>
                    <p className="text-xs text-gray-500 dark:text-slate-400 font-medium">Due: {reminder.dueDate}</p>
                </div>
            </li>
        ))}
    </ul>
  </div>
);

interface DashboardProps {
  clients: Client[];
  transactions: Transaction[];
  serviceTickets: ServiceTicket[];
  recentActivity: RecentActivity[];
}

const Dashboard: React.FC<DashboardProps> = ({ clients, transactions, serviceTickets, recentActivity }) => {
    const totalClients = clients.length;
    const newClientsThisMonth = recentActivity.filter(activity => activity.type === 'New Client' && activity.timestamp !== '3 days ago' && activity.timestamp !== 'Yesterday').length;
    const pendingTransactions = transactions.filter(t => t.status === 'Pending').length;
    const openServiceTickets = serviceTickets.filter(t => t.status === 'Open').length;

    const dynamicStatCardsData = [
      {
        title: 'Total Clients',
        value: totalClients.toString(),
        icon: CustomerIcon,
      },
      {
        title: 'New Clients (This Month)',
        value: newClientsThisMonth.toString(),
        icon: InboxIcon,
      },
      {
        title: 'Pending Transactions',
        value: pendingTransactions.toString(),
        icon: TransactionsIcon,
      },
      {
        title: 'Open Service Tickets',
        value: openServiceTickets.toString(),
        icon: TicketIcon,
      },
    ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-slate-200">Welcome, Manoj!</h1>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {dynamicStatCardsData.map((card) => (
          <StatCard key={card.title} {...card} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg border border-gray-200 dark:border-slate-700">
          <TotalRevenueChart />
        </div>
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg border border-gray-200 dark:border-slate-700">
           <TicketChart />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentActivityFeed activities={recentActivity} />
          <UpcomingReminders />
      </div>
    </div>
  );
};

export default Dashboard;