import React, { useState } from 'react';
import Modal from '../shared/Modal';
import { Transaction, Client } from '../../types';

interface AddTransactionModalProps {
  clients: Client[];
  onClose: () => void;
  onAddTransaction: (transaction: Omit<Transaction, 'id' | 'date'>) => void;
}

const transactionStatuses: Transaction['status'][] = ['Completed', 'Pending', 'Failed'];

const AddTransactionModal: React.FC<AddTransactionModalProps> = ({ clients, onClose, onAddTransaction }) => {
  const [formData, setFormData] = useState<Omit<Transaction, 'id' | 'date'>>({
    clientName: clients.length > 0 ? clients[0].name : '',
    amount: 0,
    status: 'Pending',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({ 
        ...prev, 
        [name]: type === 'number' ? parseFloat(value) : value 
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.clientName || formData.amount <= 0) {
        alert('Please select a client and enter a valid amount.');
        return;
    }
    onAddTransaction(formData);
  };

  const inputClass = "mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-200 border border-gray-300 dark:border-slate-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm";

  return (
    <Modal isOpen={true} onClose={onClose} title="Add New Transaction">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="clientName" className="block text-sm font-medium text-gray-700 dark:text-slate-300">Client</label>
          <select name="clientName" id="clientName" value={formData.clientName} onChange={handleChange} className={inputClass}>
            {clients.map(client => <option key={client.id} value={client.name}>{client.name}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-slate-300">Amount (₹)</label>
          <input type="number" name="amount" id="amount" value={formData.amount} onChange={handleChange} className={inputClass} required min="0.01" step="0.01" />
        </div>
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-slate-300">Status</label>
          <select name="status" id="status" value={formData.status} onChange={handleChange} className={inputClass}>
            {transactionStatuses.map(status => <option key={status} value={status}>{status}</option>)}
          </select>
        </div>
        <div className="flex justify-end pt-4 border-t dark:border-slate-700 mt-6">
          <button type="button" onClick={onClose} className="bg-white dark:bg-slate-600 text-gray-700 dark:text-slate-300 px-4 py-2 rounded-lg font-semibold text-sm border border-gray-300 dark:border-slate-500 hover:bg-gray-50 dark:hover:bg-slate-500 mr-2">Cancel</button>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-blue-700">Add Transaction</button>
        </div>
      </form>
    </Modal>
  );
};

export default AddTransactionModal;
