import React, { useState } from 'react';
import Modal from '../shared/Modal';
import { ServiceTicket, Client } from '../../types';

interface AddTicketModalProps {
  clients: Client[];
  onClose: () => void;
  onAddTicket: (ticket: Omit<ServiceTicket, 'id' | 'dateOpened'>) => void;
}

const ticketStatuses: ServiceTicket['status'][] = ['Open', 'In Progress', 'Closed'];

const AddTicketModal: React.FC<AddTicketModalProps> = ({ clients, onClose, onAddTicket }) => {
  const [formData, setFormData] = useState<Omit<ServiceTicket, 'id' | 'dateOpened'>>({
    clientName: clients.length > 0 ? clients[0].name : '',
    issue: '',
    status: 'Open',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.clientName || !formData.issue) {
        alert('Please select a client and describe the issue.');
        return;
    }
    onAddTicket(formData);
  };

  const inputClass = "mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-200 border border-gray-300 dark:border-slate-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm";

  return (
    <Modal isOpen={true} onClose={onClose} title="Create New Ticket">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="clientName" className="block text-sm font-medium text-gray-700 dark:text-slate-300">Client</label>
          <select name="clientName" id="clientName" value={formData.clientName} onChange={handleChange} className={inputClass}>
            {clients.map(client => <option key={client.id} value={client.name}>{client.name}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="issue" className="block text-sm font-medium text-gray-700 dark:text-slate-300">Issue Description</label>
          <textarea name="issue" id="issue" value={formData.issue} onChange={handleChange} className={inputClass} required rows={4} />
        </div>
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-slate-300">Status</label>
          <select name="status" id="status" value={formData.status} onChange={handleChange} className={inputClass}>
            {ticketStatuses.map(status => <option key={status} value={status}>{status}</option>)}
          </select>
        </div>
        <div className="flex justify-end pt-4 border-t dark:border-slate-700 mt-6">
          <button type="button" onClick={onClose} className="bg-white dark:bg-slate-600 text-gray-700 dark:text-slate-300 px-4 py-2 rounded-lg font-semibold text-sm border border-gray-300 dark:border-slate-500 hover:bg-gray-50 dark:hover:bg-slate-500 mr-2">Cancel</button>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-blue-700">Create Ticket</button>
        </div>
      </form>
    </Modal>
  );
};

export default AddTicketModal;
