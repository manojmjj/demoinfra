import React, { useState, useRef } from 'react';
import { Client } from '../../types';
import { exportToCSV } from '../../utils/export';
import AddClientModal from './AddClientModal';
import EditClientModal from './EditClientModal';
import ImportClientsModal from './ImportClientsModal';

const StatusBadge: React.FC<{ status: Client['status'] }> = ({ status }) => {
    const baseClasses = 'px-2 py-1 text-xs font-medium rounded-full inline-block';
    switch (status) {
        case 'Active':
            return <span className={`${baseClasses} bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-400`}>Active</span>;
        case 'Inactive':
            return <span className={`${baseClasses} bg-gray-100 text-gray-800 dark:bg-slate-700 dark:text-slate-300`}>Inactive</span>;
        case 'Prospect':
            return <span className={`${baseClasses} bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-400`}>Prospect</span>;
        default:
            return null;
    }
};

interface ClientsPageProps {
  clients: Client[];
  onAddClient: (newClient: Omit<Client, 'id' | 'lastActivity'>) => void;
  onUpdateClient: (updatedClient: Client) => void;
  onDeleteClient: (id: number) => void;
  onBulkAddClients: (newClients: Omit<Client, 'id' | 'lastActivity'>[]) => void;
  searchQuery: string;
}

const ClientsPage: React.FC<ClientsPageProps> = ({ clients, onAddClient, onUpdateClient, onDeleteClient, onBulkAddClients, searchQuery }) => {
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [isImportModalOpen, setImportModalOpen] = useState(false);
  const [importFile, setImportFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAddClient = (newClientData: Omit<Client, 'id' | 'lastActivity'>) => {
    onAddClient(newClientData);
    setAddModalOpen(false);
  };
  
  const handleUpdateClient = (updatedClient: Client) => {
    onUpdateClient(updatedClient);
    setEditingClient(null);
  };

  const handleBulkImport = (newClients: Omit<Client, 'id' | 'lastActivity'>[]) => {
    onBulkAddClients(newClients);
    setImportModalOpen(false);
    setImportFile(null);
  };

  const filteredClients = clients.filter(client => {
    const query = searchQuery.toLowerCase();
    return (
      client.name.toLowerCase().includes(query) ||
      client.company.toLowerCase().includes(query) ||
      client.email.toLowerCase().includes(query) ||
      client.area.toLowerCase().includes(query)
    );
  });

  const handleExport = () => {
    exportToCSV(filteredClients, 'clients.csv');
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setImportFile(file);
      setImportModalOpen(true);
      event.target.value = ''; 
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-slate-200">Clients</h1>
        <div className="flex items-center space-x-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept=".xlsx, .xls, .csv"
            />
            <button
                onClick={handleImportClick}
                className="bg-white dark:bg-slate-800 text-gray-700 dark:text-slate-300 px-4 py-2 rounded-lg font-semibold text-sm border border-gray-300 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors flex items-center"
            >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                Import
            </button>
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
              Add New Client
            </button>
        </div>
      </div>
      
      <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700">
        <div className="overflow-x-auto">
          {filteredClients.length > 0 ? (
            <table className="w-full text-sm text-left text-gray-500 dark:text-slate-400">
              <thead className="text-xs text-gray-700 dark:text-slate-300 uppercase bg-gray-50 dark:bg-slate-700">
                <tr>
                  <th scope="col" className="px-6 py-3">Name</th>
                  <th scope="col" className="px-6 py-3">Company</th>
                  <th scope="col" className="px-6 py-3">Email</th>
                  <th scope="col" className="px-6 py-3">Phone</th>
                  <th scope="col" className="px-6 py-3">Area</th>
                  <th scope="col" className="px-6 py-3">Status</th>
                  <th scope="col" className="px-6 py-3"><span className="sr-only">Actions</span></th>
                </tr>
              </thead>
              <tbody>
                {filteredClients.map((client) => (
                  <tr key={client.id} className="bg-white dark:bg-slate-800 border-b dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-600">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                      {client.name}
                    </th>
                    <td className="px-6 py-4">{client.company}</td>
                    <td className="px-6 py-4">{client.email}</td>
                    <td className="px-6 py-4">{client.phone}</td>
                    <td className="px-6 py-4">{client.area}</td>
                    <td className="px-6 py-4">
                      <StatusBadge status={client.status} />
                    </td>
                    <td className="px-6 py-4 text-right">
                      <a href="#" onClick={(e) => { e.preventDefault(); setEditingClient(client); }} className="font-medium text-blue-600 hover:underline">Edit</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center p-8 text-gray-500 dark:text-slate-400">
              No clients found matching your search.
            </div>
          )}
        </div>
      </div>
      {isAddModalOpen && <AddClientModal onClose={() => setAddModalOpen(false)} onAddClient={handleAddClient} />}
      {editingClient && <EditClientModal client={editingClient} onClose={() => setEditingClient(null)} onSave={handleUpdateClient} onDelete={onDeleteClient} />}
      {isImportModalOpen && importFile && (
        <ImportClientsModal
          file={importFile}
          onClose={() => {
            setImportModalOpen(false);
            setImportFile(null);
          }}
          onImport={handleBulkImport}
        />
      )}
    </div>
  );
};

export default ClientsPage;