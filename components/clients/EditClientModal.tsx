import React, { useState, useEffect } from 'react';
import Modal from '../shared/Modal';
import { Client } from '../../types';
import { areas } from '../../data/mockData';

interface EditClientModalProps {
  client: Client;
  onClose: () => void;
  onSave: (client: Client) => void;
  onDelete: (id: number) => void;
}

const clientStatuses: Client['status'][] = ['Active', 'Inactive', 'Prospect'];

const EditClientModal: React.FC<EditClientModalProps> = ({ client, onClose, onSave, onDelete }) => {
  const [formData, setFormData] = useState<Client>(client);
  const [isConfirmingDelete, setConfirmingDelete] = useState(false);

  useEffect(() => {
    setFormData(client);
    setConfirmingDelete(false); // Reset confirmation on client change
  }, [client]);

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
    onSave(formData);
  };

  const handleDelete = () => {
    onDelete(client.id);
    onClose();
  };

  const inputClass = "mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-200 border border-gray-300 dark:border-slate-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm";

  return (
    <Modal isOpen={true} onClose={onClose} title="Edit Client">
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
        <div className="flex justify-between items-center pt-4 border-t dark:border-slate-700 mt-6">
          {isConfirmingDelete ? (
            <div className="flex items-center w-full">
              <p className="text-sm text-red-600 dark:text-red-400">Are you sure? This cannot be undone.</p>
              <div className="ml-auto flex items-center space-x-2">
                <button type="button" onClick={() => setConfirmingDelete(false)} className="bg-white dark:bg-slate-600 text-gray-700 dark:text-slate-300 px-4 py-2 rounded-lg font-semibold text-sm border border-gray-300 dark:border-slate-500 hover:bg-gray-50 dark:hover:bg-slate-500">Cancel</button>
                <button type="button" onClick={handleDelete} className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-red-700">Confirm Delete</button>
              </div>
            </div>
          ) : (
            <>
              <button type="button" onClick={() => setConfirmingDelete(true)} className="bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400 px-4 py-2 rounded-lg font-semibold text-sm hover:bg-red-200 dark:hover:bg-red-900">Delete Client</button>
              <div className="flex items-center space-x-2">
                <button type="button" onClick={onClose} className="bg-white dark:bg-slate-600 text-gray-700 dark:text-slate-300 px-4 py-2 rounded-lg font-semibold text-sm border border-gray-300 dark:border-slate-500 hover:bg-gray-50 dark:hover:bg-slate-500">Cancel</button>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-blue-700">Save Changes</button>
              </div>
            </>
          )}
        </div>
      </form>
    </Modal>
  );
};

export default EditClientModal;