import React, { useState, useEffect } from 'react';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import Dashboard from './components/dashboard/Dashboard';
import ClientsPage from './components/clients/ClientsPage';
import EquipmentPage from './components/equipment/EquipmentPage';
import TransactionsPage from './components/transactions/TransactionsPage';
import ServiceTicketsPage from './components/tickets/ServiceTicketsPage';
import ReportsPage from './components/reports/ReportsPage';
import SettingsPage from './components/settings/SettingsPage';
import HelpPage from './components/help/HelpPage';
import ProfilePage from './components/profile/ProfilePage';
import { User, Client, Equipment, Transaction, ServiceTicket, RecentActivity, AppSettings } from './types';

import { 
  clients as initialClients, 
  equipment as initialEquipment, 
  transactions as initialTransactions, 
  serviceTickets as initialServiceTickets,
  recentActivity as initialRecentActivity
} from './data/mockData';

// Helper function to get initial state from localStorage or use mock data
const getInitialState = <T,>(key: string, fallback: T[]): T[] => {
  try {
    const storedValue = localStorage.getItem(key);
    if (storedValue) {
      return JSON.parse(storedValue);
    }
  } catch (error) {
    console.error(`Error parsing localStorage key "${key}":`, error);
  }
  return fallback;
};


const App: React.FC = () => {
  const [activePage, setActivePage] = useState('Dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState<User>({ name: 'Manoj Mj', role: 'Administrator' });

  // Centralized state management with localStorage persistence
  const [clients, setClients] = useState<Client[]>(() => getInitialState('clients', initialClients));
  const [equipment, setEquipment] = useState<Equipment[]>(() => getInitialState('equipment', initialEquipment));
  const [transactions, setTransactions] = useState<Transaction[]>(() => getInitialState('transactions', initialTransactions));
  const [serviceTickets, setServiceTickets] = useState<ServiceTicket[]>(() => getInitialState('serviceTickets', initialServiceTickets));
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>(() => getInitialState('recentActivity', initialRecentActivity));

  // Effect to save all data to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('clients', JSON.stringify(clients));
      localStorage.setItem('equipment', JSON.stringify(equipment));
      localStorage.setItem('transactions', JSON.stringify(transactions));
      localStorage.setItem('serviceTickets', JSON.stringify(serviceTickets));
      localStorage.setItem('recentActivity', JSON.stringify(recentActivity));
    } catch (error) {
      console.error("Failed to save state to localStorage:", error);
    }
  }, [clients, equipment, transactions, serviceTickets, recentActivity]);


  // Settings state including theme
  const [appSettings, setAppSettings] = useState<AppSettings>(() => {
    const storedTheme = localStorage.getItem('theme') as AppSettings['theme'] | null;
    return {
      theme: storedTheme || 'System',
    };
  });

  // Effect to apply theme class and save to localStorage
  useEffect(() => {
    const root = window.document.documentElement;
    const isDark =
      appSettings.theme === 'Dark' ||
      (appSettings.theme === 'System' &&
        window.matchMedia('(prefers-color-scheme: dark)').matches);

    root.classList.toggle('dark', isDark);
    localStorage.setItem('theme', appSettings.theme);

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      if (appSettings.theme === 'System') {
        root.classList.toggle('dark', e.matches);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [appSettings.theme]);

  const addActivity = (type: RecentActivity['type'], description: string) => {
    const newActivity: RecentActivity = {
      id: Math.random(),
      type,
      description,
      timestamp: 'Just now',
    };
    setRecentActivity(prev => [newActivity, ...prev]);
  };

  const handleAddClient = (newClientData: Omit<Client, 'id' | 'lastActivity'>) => {
    const newClient: Client = {
      ...newClientData,
      id: clients.length > 0 ? Math.max(...clients.map(c => c.id)) + 1 : 1,
      lastActivity: new Date().toISOString().split('T')[0],
    };
    setClients(prevClients => [newClient, ...prevClients]);
    addActivity('New Client', `${newClient.name} was added as a new client.`);
  };

  const handleBulkAddClients = (newClientsData: Omit<Client, 'id' | 'lastActivity'>[]) => {
    let nextId = clients.length > 0 ? Math.max(...clients.map(c => c.id)) + 1 : 1;
    const newClients: Client[] = newClientsData.map(clientData => ({
      ...clientData,
      id: nextId++,
      lastActivity: new Date().toISOString().split('T')[0],
    }));

    setClients(prevClients => [...newClients, ...prevClients]);
    
    addActivity('New Client', `${newClients.length} clients were imported successfully.`);
  };
  
  const handleUpdateClient = (updatedClient: Client) => {
    setClients(prevClients => 
        prevClients.map(client => client.id === updatedClient.id ? updatedClient : client)
    );
  };

  const handleDeleteClient = (clientId: number) => {
    const clientToDelete = clients.find(c => c.id === clientId);
    if (clientToDelete) {
        setClients(prevClients => prevClients.filter(client => client.id !== clientId));
        addActivity('Deletion', `Client "${clientToDelete.name}" was deleted.`);
    }
  };
  
  const handleAddEquipment = (newEquipmentData: Omit<Equipment, 'id' | 'lastMaintenance'>) => {
    const newEquipment: Equipment = {
      ...newEquipmentData,
      id: equipment.length > 0 ? Math.max(...equipment.map(e => e.id)) + 1 : 1,
      lastMaintenance: new Date().toISOString().split('T')[0],
    };
    setEquipment(prevEquipment => [newEquipment, ...prevEquipment]);
  };
  
  const handleUpdateEquipment = (updatedEquipment: Equipment) => {
    setEquipment(prev => 
        prev.map(item => item.id === updatedEquipment.id ? updatedEquipment : item)
    );
  };

  const handleDeleteEquipment = (equipmentId: number) => {
    const equipmentToDelete = equipment.find(e => e.id === equipmentId);
    if (equipmentToDelete) {
        setEquipment(prev => prev.filter(item => item.id !== equipmentId));
        addActivity('Deletion', `Equipment "${equipmentToDelete.model}" for ${equipmentToDelete.clientName} was deleted.`);
    }
  };
  
  const handleAddTransaction = (newTransactionData: Omit<Transaction, 'id' | 'date'>) => {
    const newTransaction: Transaction = {
      ...newTransactionData,
      id: transactions.length > 0 ? Math.max(...transactions.map(t => t.id)) + 1 : 1,
      date: new Date().toISOString().split('T')[0],
    };
    setTransactions(prev => [newTransaction, ...prev]);
    addActivity('Transaction', `New transaction of ₹${newTransactionData.amount} for ${newTransactionData.clientName}.`);
  };

  const handleAddTicket = (newTicketData: Omit<ServiceTicket, 'id' | 'dateOpened'>) => {
    const newTicket: ServiceTicket = {
      ...newTicketData,
      id: serviceTickets.length > 0 ? Math.max(...serviceTickets.map(t => t.id)) + 1 : 1,
      dateOpened: new Date().toISOString().split('T')[0],
    };
    setServiceTickets(prev => [newTicket, ...prev]);
    addActivity('Ticket Update', `New ticket opened for ${newTicket.clientName}.`);
  };
  
  const handleUpdateTicket = (updatedTicket: ServiceTicket) => {
    setServiceTickets(prev => 
        prev.map(ticket => ticket.id === updatedTicket.id ? updatedTicket : ticket)
    );
    addActivity('Ticket Update', `Ticket #${updatedTicket.id} for ${updatedTicket.clientName} status changed to ${updatedTicket.status}.`);
  };

  const handleDeleteTicket = (ticketId: number) => {
    const ticketToDelete = serviceTickets.find(t => t.id === ticketId);
    if (ticketToDelete) {
        setServiceTickets(prev => prev.filter(ticket => ticket.id !== ticketId));
        addActivity('Deletion', `Ticket #${ticketToDelete.id} for ${ticketToDelete.clientName} was deleted.`);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query) {
      setActivePage('Clients');
    }
  };

  const handleProfileUpdate = (updatedUser: User) => {
    setUser(updatedUser);
  };
  
  const handleSettingsSave = (newSettings: Partial<AppSettings>) => {
    setAppSettings(prev => ({ ...prev, ...newSettings }));
  };

  const renderPage = () => {
    switch (activePage) {
      case 'Dashboard':
        return <Dashboard 
          clients={clients} 
          transactions={transactions} 
          serviceTickets={serviceTickets} 
          recentActivity={recentActivity} 
        />;
      case 'Clients':
        return <ClientsPage 
          clients={clients} 
          onAddClient={handleAddClient} 
          onUpdateClient={handleUpdateClient}
          onDeleteClient={handleDeleteClient}
          onBulkAddClients={handleBulkAddClients}
          searchQuery={searchQuery} 
        />;
      case 'Equipment':
        return <EquipmentPage 
          equipment={equipment} 
          clients={clients} 
          onAddEquipment={handleAddEquipment} 
          onUpdateEquipment={handleUpdateEquipment}
          onDeleteEquipment={handleDeleteEquipment}
        />;
      case 'Transactions':
        return <TransactionsPage 
          transactions={transactions} 
          clients={clients}
          onAddTransaction={handleAddTransaction} 
        />;
      case 'Service Tickets':
        return <ServiceTicketsPage 
          serviceTickets={serviceTickets}
          clients={clients}
          onAddTicket={handleAddTicket}
          onUpdateTicket={handleUpdateTicket}
          onDeleteTicket={handleDeleteTicket}
        />;
      case 'Reports':
        return <ReportsPage />;
      case 'Settings':
        return <SettingsPage settings={appSettings} onSave={handleSettingsSave} />;
      case 'Help':
        return <HelpPage />;
      case 'Profile':
        return <ProfilePage user={user} onUpdate={handleProfileUpdate} />;
      default:
        return <Dashboard 
          clients={clients} 
          transactions={transactions} 
          serviceTickets={serviceTickets} 
          recentActivity={recentActivity} 
        />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-slate-800 font-sans text-gray-900 dark:text-slate-200">
      <Sidebar activeItem={activePage} onNavigate={setActivePage} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header user={user} onSearch={handleSearch} onNavigate={setActivePage} />
        <main className="flex-1 overflow-y-auto overflow-x-hidden bg-white dark:bg-slate-900 p-6">
          {renderPage()}
        </main>
      </div>
    </div>
  );
};

export default App;
