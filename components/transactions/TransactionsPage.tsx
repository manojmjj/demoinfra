import React, { useState } from 'react';
import { Transaction, Client } from '../../types';
import { exportToCSV } from '../../utils/export';
import AddTransactionModal from './AddTransactionModal';
import ViewTransactionModal from './ViewTransactionModal';

const StatusBadge: React.FC<{ status: Transaction['status'] }> = ({ status }) => {
    const baseClasses = 'px-2 py-1 text-xs font-medium rounded-full inline-block';
    switch (status) {
        case 'Completed':
            return <span className={`${baseClasses} bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-400`}>Completed</span>;
        case 'Pending':
            return <span className={`${baseClasses} bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-400`}>Pending</span>;
        case 'Failed':
            return <span className={`${baseClasses} bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-400`}>Failed</span>;
        default:
            return null;
    }
};

interface TransactionsPageProps {
  transactions: Transaction[];
  clients: Client[];
  onAddTransaction: (newTransaction: Omit<Transaction, 'id' | 'date'>) => void;
}

const TransactionsPage: React.FC<TransactionsPageProps> = ({ transactions, clients, onAddTransaction }) => {
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [viewingTransaction, setViewingTransaction] = useState<Transaction | null>(null);

  const handleAddTransaction = (newTransactionData: Omit<Transaction, 'id' | 'date'>) => {
    onAddTransaction(newTransactionData);
    setAddModalOpen(false);
  };

  const handleExport = () => {
    exportToCSV(transactions, 'transactions.csv');
  };
    
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-slate-200">Transactions</h1>
        <div className="flex items-center space-x-2">
            <button
                onClick={handleExport}
                className="bg-white dark:bg-slate-800 text-gray-700 dark:text-slate-300 px-4 py-2 rounded-lg font-semibold text-sm border border-gray-300 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors flex items-center"
            >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                Export
            </button>
            <button 
              onClick={() => setAddModalOpen(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-blue-700 transition-colors flex items-center"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
              Add Transaction
            </button>
        </div>
      </div>
      
      <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-slate-400">
            <thead className="text-xs text-gray-700 dark:text-slate-300 uppercase bg-gray-50 dark:bg-slate-700">
              <tr>
                <th scope="col" className="px-6 py-3">Transaction ID</th>
                <th scope="col" className="px-6 py-3">Client Name</th>
                <th scope="col" className="px-6 py-3">Amount</th>
                <th scope="col" className="px-6 py-3">Status</th>
                <th scope="col" className="px-6 py-3">Date</th>
                <th scope="col" className="px-6 py-3"><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="bg-white dark:bg-slate-800 border-b dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-600">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                    TX-{transaction.id.toString().padStart(4, '0')}
                  </th>
                  <td className="px-6 py-4">{transaction.clientName}</td>
                  <td className="px-6 py-4">₹{transaction.amount.toLocaleString('en-IN')}</td>
                  <td className="px-6 py-4">
                    <StatusBadge status={transaction.status} />
                  </td>
                  <td className="px-6 py-4">{transaction.date}</td>
                  <td className="px-6 py-4 text-right">
                    <a href="#" onClick={(e) => { e.preventDefault(); setViewingTransaction(transaction); }} className="font-medium text-blue-600 hover:underline">View</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {isAddModalOpen && <AddTransactionModal clients={clients} onClose={() => setAddModalOpen(false)} onAddTransaction={handleAddTransaction} />}
      {viewingTransaction && <ViewTransactionModal transaction={viewingTransaction} onClose={() => setViewingTransaction(null)} />}
    </div>
  );
};

export default TransactionsPage;
