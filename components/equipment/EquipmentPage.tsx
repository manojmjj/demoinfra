import React, { useState } from 'react';
import { Equipment, Client } from '../../types';
import { exportToCSV } from '../../utils/export';
import AddEquipmentModal from './AddEquipmentModal';
import EditEquipmentModal from './EditEquipmentModal';

const StatusBadge: React.FC<{ status: Equipment['status'] }> = ({ status }) => {
    const baseClasses = 'px-2 py-1 text-xs font-medium rounded-full inline-block';
    switch (status) {
        case 'Operational':
            return <span className={`${baseClasses} bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-400`}>Operational</span>;
        case 'Needs Repair':
            return <span className={`${baseClasses} bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-400`}>Needs Repair</span>;
        case 'Decommissioned':
            return <span className={`${baseClasses} bg-gray-100 text-gray-800 dark:bg-slate-700 dark:text-slate-300`}>Decommissioned</span>;
        default:
            return null;
    }
};

interface EquipmentPageProps {
  equipment: Equipment[];
  clients: Client[];
  onAddEquipment: (newEquipment: Omit<Equipment, 'id' | 'lastMaintenance'>) => void;
  onUpdateEquipment: (updatedEquipment: Equipment) => void;
  onDeleteEquipment: (id: number) => void;
}

const EquipmentPage: React.FC<EquipmentPageProps> = ({ equipment, clients, onAddEquipment, onUpdateEquipment, onDeleteEquipment }) => {
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [editingEquipment, setEditingEquipment] = useState<Equipment | null>(null);

  const handleAddEquipment = (newEquipmentData: Omit<Equipment, 'id' | 'lastMaintenance'>) => {
    onAddEquipment(newEquipmentData);
    setAddModalOpen(false);
  };
  
  const handleUpdateEquipment = (updatedEquipment: Equipment) => {
    onUpdateEquipment(updatedEquipment);
    setEditingEquipment(null);
  };

  const handleExport = () => {
    exportToCSV(equipment, 'equipment.csv');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-slate-200">Equipment</h1>
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
              Add Equipment
            </button>
        </div>
      </div>
      
      <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-slate-400">
            <thead className="text-xs text-gray-700 dark:text-slate-300 uppercase bg-gray-50 dark:bg-slate-700">
              <tr>
                <th scope="col" className="px-6 py-3">Client Name</th>
                <th scope="col" className="px-6 py-3">Type</th>
                <th scope="col" className="px-6 py-3">Model</th>
                <th scope="col" className="px-6 py-3">Status</th>
                <th scope="col" className="px-6 py-3">Last Maintenance</th>
                <th scope="col" className="px-6 py-3"><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody>
              {equipment.map((item) => (
                <tr key={item.id} className="bg-white dark:bg-slate-800 border-b dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-600">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                    {item.clientName}
                  </th>
                  <td className="px-6 py-4">{item.type}</td>
                  <td className="px-6 py-4">{item.model}</td>
                  <td className="px-6 py-4">
                    <StatusBadge status={item.status} />
                  </td>
                  <td className="px-6 py-4">{item.lastMaintenance}</td>
                  <td className="px-6 py-4 text-right">
                    <a href="#" onClick={(e) => { e.preventDefault(); setEditingEquipment(item); }} className="font-medium text-blue-600 hover:underline">Edit</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {isAddModalOpen && <AddEquipmentModal clients={clients} onClose={() => setAddModalOpen(false)} onAddEquipment={handleAddEquipment} />}
      {editingEquipment && <EditEquipmentModal clients={clients} equipment={editingEquipment} onClose={() => setEditingEquipment(null)} onSave={handleUpdateEquipment} onDelete={onDeleteEquipment} />}
    </div>
  );
};

export default EquipmentPage;