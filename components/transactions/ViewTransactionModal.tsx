import React from 'react';
import Modal from '../shared/Modal';
import { Transaction } from '../../types';

interface ViewTransactionModalProps {
  transaction: Transaction;
  onClose: () => void;
}

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

const DetailItem: React.FC<{ label: string; value: React.ReactNode }> = ({ label, value }) => (
    <div>
        <p className="text-sm font-medium text-gray-500 dark:text-slate-400">{label}</p>
        <p className="mt-1 text-sm text-gray-900 dark:text-slate-300">{value}</p>
    </div>
);

const ViewTransactionModal: React.FC<ViewTransactionModalProps> = ({ transaction, onClose }) => {
  return (
    <Modal isOpen={true} onClose={onClose} title={`Transaction Details: TX-${transaction.id.toString().padStart(4, '0')}`}>
      <div className="space-y-4">
        <DetailItem label="Client Name" value={transaction.clientName} />
        <DetailItem label="Amount" value={`₹${transaction.amount.toLocaleString('en-IN')}`} />
        <DetailItem label="Date" value={transaction.date} />
        <DetailItem 
            label="Status" 
            value={<StatusBadge status={transaction.status} />} 
        />
        <div className="flex justify-end pt-4 border-t dark:border-slate-700 mt-6">
          <button type="button" onClick={onClose} className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-blue-700">
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ViewTransactionModal;
