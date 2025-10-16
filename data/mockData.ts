import { Client, Transaction, ServiceTicket, RecentActivity, Reminder, StatCardData, Equipment } from '../types';
import { CustomerIcon, TicketIcon, TransactionsIcon, InboxIcon } from '../components/icons';

export const areas: Client['area'][] = [
    "North Chennai",
    "South Chennai",
    "East Chennai",
    "West Chennai",
    "Central Chennai",
    "Outskirts"
];

export const clients: Client[] = [
  {
    "id": 1,
    "name": "Kumar Metals",
    "company": "Kumar Metals Pvt Ltd",
    "email": "contact@kumarmetals.com",
    "phone": "+91 9876543210",
    "area": "South Chennai",
    "status": "Active",
    "lastActivity": "2025-10-10",
    "address": "123 Industrial Road, Tambaram",
    "city": "Chennai",
    "state": "Tamil Nadu"
  },
  {
    "id": 2,
    "name": "Priya Textiles",
    "company": "Priya Textiles & Associates",
    "email": "info@priyatextiles.com",
    "phone": "+91 9123456789",
    "area": "North Chennai",
    "status": "Prospect",
    "lastActivity": "2025-10-12",
    "address": "456 Weavers Street, Ambattur",
    "city": "Chennai",
    "state": "Tamil Nadu"
  },
  {
      "id": 3,
      "name": "Chennai Foods",
      "company": "Chennai Foods Corporation",
      "email": "support@chennaifoods.com",
      "phone": "+91 9988776655",
      "area": "Central Chennai",
      "status": "Active",
      "lastActivity": "2025-10-09",
      "address": "789 Spice Avenue, T. Nagar",
      "city": "Chennai",
      "state": "Tamil Nadu"
  },
  {
      "id": 4,
      "name": "East Coast Logistics",
      "company": "ECL Pvt Ltd",
      "email": "contact@ecl.com",
      "phone": "+91 9234567890",
      "area": "East Chennai",
      "status": "Inactive",
      "lastActivity": "2025-05-20",
      "address": "101 Port Road, Adyar",
      "city": "Chennai",
      "state": "Tamil Nadu"
  },
  {
      "id": 5,
      "name": "Westgate IT Solutions",
      "company": "Westgate IT",
      "email": "sales@westgateit.com",
      "phone": "+91 9345678901",
      "area": "West Chennai",
      "status": "Active",
      "lastActivity": "2025-10-11",
      "address": "202 Tech Park, Porur",
      "city": "Chennai",
      "state": "Tamil Nadu"
  }
];

export const transactions: Transaction[] = [
    { id: 1, clientName: 'Kumar Metals', amount: 50000, status: 'Completed', date: '2025-10-08' },
    { id: 2, clientName: 'Chennai Foods', amount: 25000, status: 'Pending', date: '2025-10-10' },
    { id: 3, clientName: 'Westgate IT Solutions', amount: 75000, status: 'Completed', date: '2025-10-05' },
];

export const serviceTickets: ServiceTicket[] = [
    { id: 1, clientName: 'Kumar Metals', issue: 'Equipment malfunction', status: 'Open', dateOpened: '2025-10-09' },
    { id: 2, clientName: 'Westgate IT Solutions', issue: 'Software update request', status: 'In Progress', dateOpened: '2025-10-11' },
    { id: 3, clientName: 'Chennai Foods', issue: 'Billing query', status: 'Closed', dateOpened: '2025-10-02' },
    { id: 4, clientName: 'Kumar Metals', issue: 'Maintenance check', status: 'Open', dateOpened: '2025-10-12' },
];

export const equipment: Equipment[] = [
    { id: 1, clientName: 'Kumar Metals', type: 'CNC Machine', model: 'Model X-500', status: 'Operational', lastMaintenance: '2025-09-15' },
    { id: 2, clientName: 'Priya Textiles', type: 'Industrial Loom', model: 'Loominator 3000', status: 'Operational', lastMaintenance: '2025-08-20' },
    { id: 3, clientName: 'Chennai Foods', type: 'Packaging Machine', model: 'PackRight Pro', status: 'Needs Repair', lastMaintenance: '2025-07-01' },
    { id: 4, clientName: 'Westgate IT Solutions', type: 'Server Rack', model: 'DataCenter 100', status: 'Operational', lastMaintenance: '2025-10-01' },
    { id: 5, clientName: 'Kumar Metals', type: 'Welding Robot', model: 'WeldBot 9000', status: 'Decommissioned', lastMaintenance: '2024-01-10' },
];

export const recentActivity: RecentActivity[] = [
    { id: 1, type: 'New Client', description: 'Priya Textiles was added as a new prospect.', timestamp: '2 hours ago' },
    { id: 2, type: 'Ticket Update', description: 'Ticket #2 for Westgate IT Solutions moved to "In Progress".', timestamp: 'Yesterday' },
    { id: 3, type: 'Transaction', description: 'Received payment of ₹50,000 from Kumar Metals.', timestamp: '3 days ago' },
    { id: 4, type: 'New Client', description: 'Westgate IT Solutions was added as a new client.', timestamp: '3 days ago' },
];

export const reminders: Reminder[] = [
    { id: 1, type: 'Follow-up', description: 'Follow up with Priya Textiles about their quote.', dueDate: '2025-10-15' },
    { id: 2, type: 'Payment', description: 'Payment due from Chennai Foods for Invoice #INV-0123.', dueDate: '2025-10-18' },
    { id: 3, type: 'Maintenance', description: 'Scheduled maintenance for Kumar Metals.', dueDate: '2025-10-22' },
];

export const statCardsData: StatCardData[] = [
  {
    title: 'Total Clients',
    value: '1350',
    icon: CustomerIcon,
  },
  {
    title: 'New Clients (This Month)',
    value: '59',
    icon: InboxIcon,
  },
  {
    title: 'Active Transactions',
    value: '28',
    icon: TransactionsIcon,
  },
  {
    title: 'Open Service Tickets',
    value: '10',
    icon: TicketIcon,
  },
];

// FIX: Add totalRevenueData and avgTicketCreatedData to be exported for chart components
export const totalRevenueData = [
    { name: '21 Oct', revenue: 1500 },
    { name: '25 Oct', revenue: 1700 },
    { name: '30 Oct', revenue: 1600 },
    { name: '4 Nov', revenue: 1900 },
    { name: '9 Nov', revenue: 1800 },
    { name: '14 Nov', revenue: 1700 },
    { name: '18 Nov', revenue: 1680.50 },
    { name: 'Today', revenue: 1815.40 },
    { name: '21 Nov', revenue: 2200 },
];

export const avgTicketCreatedData = [
  { name: 'Mon', created: 45, solved: 30 },
  { name: 'Tue', created: 55, solved: 40 },
  { name: 'Wed', created: 60, solved: 55 },
  { name: 'Thu', created: 50, solved: 45 },
  { name: 'Fri', created: 70, solved: 60 },
  { name: 'Sat', created: 30, solved: 25 },
  { name: 'Sun', created: 20, solved: 15 },
];