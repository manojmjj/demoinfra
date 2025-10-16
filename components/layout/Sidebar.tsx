import React from 'react';
import {
  LogoIcon,
  DashboardIcon,
  CustomerIcon,
  TicketIcon,
  ReportsIcon,
  SettingsIcon,
  HelpIcon,
  TransactionsIcon,
  EquipmentIcon
} from '../icons';

interface SidebarProps {
  activeItem: string;
  onNavigate: (name: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeItem, onNavigate }) => {
    
  const navItems = [
    { icon: DashboardIcon, name: 'Dashboard' },
    { icon: CustomerIcon, name: 'Clients' },
    { icon: EquipmentIcon, name: 'Equipment' },
    { icon: TransactionsIcon, name: 'Transactions' },
    { icon: TicketIcon, name: 'Service Tickets' },
    { icon: ReportsIcon, name: 'Reports' },
  ];

  const bottomNavItems = [
    { icon: SettingsIcon, name: 'Settings' },
    { icon: HelpIcon, name: 'Help' },
  ];
  
  const NavItem: React.FC<{ icon: React.ElementType, name: string, active?: boolean, onClick: (name: string) => void }> = ({ icon: Icon, name, active, onClick }) => (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        onClick(name);
      }}
      className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 ${
        active
          ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400'
          : 'text-gray-600 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-800'
      }`}
    >
        <Icon className="w-5 h-5 mr-3" />
        <span>{name}</span>
    </a>
  );

  return (
    <aside className="w-64 flex-shrink-0 bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-slate-700 flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-gray-200 dark:border-slate-700">
            <LogoIcon className="w-6 h-6"/>
            <span className="ml-3 text-lg font-bold text-gray-800 dark:text-slate-200">IEPL CMS</span>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
            {navItems.map(item => <NavItem key={item.name} {...item} active={activeItem === item.name} onClick={onNavigate} />)}
        </nav>
        
        <div className="px-4 py-6 mt-auto border-t border-gray-200 dark:border-slate-700">
          <div className="space-y-1">
            {bottomNavItems.map(item => (
                <NavItem key={item.name} {...item} active={activeItem === item.name} onClick={onNavigate} />
            ))}
          </div>
        </div>
    </aside>
  );
};

export default Sidebar;
