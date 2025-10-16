import React, { useState } from 'react';
import { ServiceTicket, Client } from '../../types';
import AddTicketModal from './AddTicketModal';
import EditTicketModal from './EditTicketModal';

const StatusBadge: React.FC<{ status: ServiceTicket['status'] }> = ({ status }) => {
    const baseClasses = 'px-2 py-1 text-xs font-medium rounded-full inline-block';
    switch (status) {
        case 'Open':
            return <span className={`${baseClasses} bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-400`}>Open</span>;
        case 'In Progress':
            return <span className={`${baseClasses} bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-400`}>In Progress</span>;
        case 'Closed':
            return <span className={`${baseClasses} bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-400`}>Closed</span>;
        default:
            return null;
    }
};

interface ServiceTicketsPageProps {
  serviceTickets: ServiceTicket[];
  clients: Client[];
  onAddTicket: (newTicket: Omit<ServiceTicket, 'id' | 'dateOpened'>) => void;
  onUpdateTicket: (updatedTicket: ServiceTicket) => void;
  onDeleteTicket: (id: number) => void;
}

const ServiceTicketsPage: React.FC<ServiceTicketsPageProps> = ({ serviceTickets, clients, onAddTicket, onUpdateTicket, onDeleteTicket }) => {
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [editingTicket, setEditingTicket] = useState<ServiceTicket | null>(null);

  const handleAddTicket = (newTicketData: Omit<ServiceTicket, 'id' | 'dateOpened'>) => {
    onAddTicket(newTicketData);
    setAddModalOpen(false);
  };
  
  const handleUpdateTicket = (updatedTicket: ServiceTicket) => {
    onUpdateTicket(updatedTicket);
    setEditingTicket(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-slate-200">Service Tickets</h1>
        <button 
          onClick={() => setAddModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-blue-700 transition-colors flex items-center"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
          New Ticket
        </button>
      </div>
      
      <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-slate-400">
            <thead className="text-xs text-gray-700 dark:text-slate-300 uppercase bg-gray-50 dark:bg-slate-700">
              <tr>
                <th scope="col" className="px-6 py-3">Ticket ID</th>
                <th scope="col" className="px-6 py-3">Client Name</th>
                <th scope="col" className="px-6 py-3">Issue</th>
                <th scope="col" className="px-6 py-3">Status</th>
                <th scope="col" className="px-6 py-3">Date Opened</th>
                <th scope="col" className="px-6 py-3"><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody>
              {serviceTickets.map((ticket) => (
                <tr key={ticket.id} className="bg-white dark:bg-slate-800 border-b dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-600">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                    TICKET-{ticket.id.toString().padStart(4, '0')}
                  </th>
                  <td className="px-6 py-4">{ticket.clientName}</td>
                  <td className="px-6 py-4 max-w-sm truncate">{ticket.issue}</td>
                  <td className="px-6 py-4">
                    <StatusBadge status={ticket.status} />
                  </td>
                  <td className="px-6 py-4">{ticket.dateOpened}</td>
                  <td className="px-6 py-4 text-right">
                    <a href="#" onClick={(e) => { e.preventDefault(); setEditingTicket(ticket); }} className="font-medium text-blue-600 hover:underline">Edit</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {isAddModalOpen && <AddTicketModal clients={clients} onClose={() => setAddModalOpen(false)} onAddTicket={handleAddTicket} />}
      {editingTicket && <EditTicketModal clients={clients} ticket={editingTicket} onClose={() => setEditingTicket(null)} onSave={handleUpdateTicket} onDelete={onDeleteTicket} />}
    </div>
  );
};

export default ServiceTicketsPage;