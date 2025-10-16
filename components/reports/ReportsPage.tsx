import React from 'react';
import { clients, serviceTickets } from '../../data/mockData';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ClientsByAreaChart: React.FC = () => {
    const areaData = React.useMemo(() => {
        const counts: { [key: string]: number } = {};
        clients.forEach(client => {
            counts[client.area] = (counts[client.area] || 0) + 1;
        });
        return Object.entries(counts).map(([name, value]) => ({ name, value }));
    }, []);

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

    return (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg border border-gray-200 dark:border-slate-700">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-slate-200 mb-4">Clients by Area</h2>
            <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                    <PieChart>
                        <Pie
                            data={areaData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                            nameKey="name"
                            // FIX: Ensure `percent` is treated as a number before performing arithmetic operations to prevent TypeScript errors.
                            label={({ name, percent }) => `${name} ${(Number(percent || 0) * 100).toFixed(0)}%`}
                        >
                            {areaData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

const TicketsByStatusChart: React.FC = () => {
    const statusData = React.useMemo(() => {
        const counts: { [key: string]: number } = {};
        serviceTickets.forEach(ticket => {
            counts[ticket.status] = (counts[ticket.status] || 0) + 1;
        });
        return Object.entries(counts).map(([name, tickets]) => ({ name, tickets }));
    }, []);
    
    return (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg border border-gray-200 dark:border-slate-700">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-slate-200 mb-4">Tickets by Status</h2>
            <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                    <BarChart data={statusData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                        <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#6B7280' }} />
                        <YAxis tick={{ fontSize: 12, fill: '#6B7280' }} allowDecimals={false} />
                        <Tooltip />
                        <Bar dataKey="tickets" fill="#3B82F6" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};


const ReportsPage: React.FC = () => {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-slate-200">Reports</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ClientsByAreaChart />
                <TicketsByStatusChart />
            </div>
        </div>
    );
};

export default ReportsPage;
