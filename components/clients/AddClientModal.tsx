import React, { useState } from 'react';
import Modal from '../shared/Modal';
import { Client } from '../../types';
import { areas } from '../../data/mockData';

interface AddClientModalProps {
  onClose: () => void;
  onAddClient: (client: Omit<Client, 'id' | 'lastActivity'>) => void;
}

const clientStatuses: Client['status'][] = ['Active', 'Inactive', 'Prospect'];

const AddClientModal: React.FC<AddClientModalProps> = ({ onClose, onAddClient }) => {
  const [formData, setFormData] = useState<Omit<Client, 'id' | 'lastActivity'>>({
    name: '',
    company: '',
    email: '',
    phone: '',
    area: 'Central Chennai',
    status: 'Prospect',
    address: '',
    city: 'Chennai',
    state: 'Tamil Nadu',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.company || !formData.email) {
        alert('Please fill in required fields: Name, Company, and Email.');
        return;
    }
    onAddClient(formData);
  };

  const inputClass = "mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-200 border border-gray-300 dark:border-slate-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm";

  return (
    <Modal isOpen={true} onClose={onClose} title="Add New Client">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-slate-300">Full Name <span className="text-red-500">*</span></label>
          <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} className={inputClass} required />
        </div>
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-slate-300">Company <span className="text-red-500">*</span></label>
          <input type="text" name="company" id="company" value={formData.company} onChange={handleChange} className={inputClass} required />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-slate-300">Email <span className="text-red-500">*</span></label>
          <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} className={inputClass} required />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-slate-300">Phone</label>
          <input type="tel" name="phone" id="phone" value={formData.phone} onChange={handleChange} className={inputClass} />
        </div>
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-slate-300">Address</label>
          <input type="text" name="address" id="address" value={formData.address} onChange={handleChange} className={inputClass} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="area" className="block text-sm font-medium text-gray-700 dark:text-slate-300">Area</label>
              <select name="area" id="area" value={formData.area} onChange={handleChange} className={inputClass}>
                {areas.map(area => <option key={area} value={area}>{area}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-slate-300">Status</label>
              <select name="status" id="status" value={formData.status} onChange={handleChange} className={inputClass}>
                {clientStatuses.map(status => <option key={status} value={status}>{status}</option>)}
              </select>
            </div>
        </div>
        <div className="flex justify-end pt-4 border-t dark:border-slate-700 mt-6">
          <button type="button" onClick={onClose} className="bg-white dark:bg-slate-600 text-gray-700 dark:text-slate-300 px-4 py-2 rounded-lg font-semibold text-sm border border-gray-300 dark:border-slate-500 hover:bg-gray-50 dark:hover:bg-slate-500 mr-2">Cancel</button>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-blue-700">Add Client</button>
        </div>
      </form>
    </Modal>
  );
};

export default AddClientModal;
