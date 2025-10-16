import React from 'react';

export interface StatCardData {
  title: string;
  value: string;
  icon: React.ElementType;
}

export interface Client {
  id: number;
  name: string;
  company: string;
  email: string;
  phone: string;
  area: 'North Chennai' | 'South Chennai' | 'East Chennai' | 'West Chennai' | 'Central Chennai' | 'Outskirts';
  status: 'Active' | 'Inactive' | 'Prospect';
  lastActivity: string; // date string e.g. "2023-10-10"
  address: string;
  city: string;
  state: string;
}

export interface Transaction {
  id: number;
  clientName: string;
  amount: number;
  status: 'Completed' | 'Pending' | 'Failed';
  date: string;
}

export interface ServiceTicket {
  id: number;
  clientName: string;
  issue: string;
  status: 'Open' | 'In Progress' | 'Closed';
  dateOpened: string;
}

export interface Equipment {
  id: number;
  clientName: string;
  type: string;
  model: string;
  status: 'Operational' | 'Needs Repair' | 'Decommissioned';
  lastMaintenance: string;
}

export interface RecentActivity {
  id: number;
  type: 'New Client' | 'Transaction' | 'Ticket Update' | 'Deletion';
  description: string;
  timestamp: string; // e.g., "2 hours ago"
}

export interface Reminder {
    id: number;
    type: 'Follow-up' | 'Maintenance' | 'Payment';
    description: string;
    dueDate: string; // e.g., "2023-11-20"
}

export interface User {
  name: string;
  role: string;
}

export interface AppSettings {
  theme: 'Light' | 'Dark' | 'System';
}