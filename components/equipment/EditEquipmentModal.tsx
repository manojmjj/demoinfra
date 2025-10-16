import React, { useState, useEffect } from 'react';
import Modal from '../shared/Modal';
import { Equipment, Client } from '../../types';

interface EditEquipmentModalProps {
  equipment: Equipment;
  clients: Client[];
  onClose: () => void;
  onSave: (equipment: Equipment) => void;
  onDelete: (id: number) => void;
}

const equipmentStatuses: Equipment['status'][] = ['Operational', 'Needs Repair', 'Decommissioned'];

const EditEquipmentModal: React.FC<EditEquipmentModalProps> = ({ equipment, clients, onClose, onSave, onDelete }) => {
  const [formData, setFormData] = useState<Equipment>(equipment);
  const [isConfirmingDelete, setConfirmingDelete] = useState(false);

  useEffect(() => {
    setFormData(equipment);
    setConfirmingDelete(false);
  }, [equipment]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.clientName || !formData.type || !formData.model) {
        alert('Please fill in all fields.');
        return;
    }
    onSave(formData);
  };

  const handleDelete = () => {
    onDelete(equipment.id);
    onClose();
  };

  const inputClass = "mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-200 border border-gray-300 dark:border-slate-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm";

  return (
    <Modal isOpen={true} onClose={onClose} title="Edit Equipment">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="clientName" className="block text-sm font-medium text-gray-700 dark:text-slate-300">Client</label>
          <select name="clientName" id="clientName" value={formData.clientName} onChange={handleChange} className={inputClass}>
            {clients.map(client => <option key={client.id} value={client.name}>{client.name}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-slate-300">Equipment Type</label>
          <input type="text" name="type" id="type" value={formData.type} onChange={handleChange} className={inputClass} required />
        </div>
        <div>
          <label htmlFor="model" className="block text-sm font-medium text-gray-700 dark:text-slate-300">Model</label>
          <input type="text" name="model" id="model" value={formData.model} onChange={handleChange} className={inputClass} required />
        </div>
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-slate-300">Status</label>
          <select name="status" id="status" value={formData.status} onChange={handleChange} className={inputClass}>
            {equipmentStatuses.map(status => <option key={status} value={status}>{status}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="lastMaintenance" className="block text-sm font-medium text-gray-700 dark:text-slate-300">Last Maintenance Date</label>
          <input type="date" name="lastMaintenance" id="lastMaintenance" value={formData.lastMaintenance} onChange={handleChange} className={inputClass} required />
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
              <button type="button" onClick={() => setConfirmingDelete(true)} className="bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400 px-4 py-2 rounded-lg font-semibold text-sm hover:bg-red-200 dark:hover:bg-red-900">Delete Equipment</button>
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

export default EditEquipmentModal;