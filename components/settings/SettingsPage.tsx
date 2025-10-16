import React, { useState, useEffect } from 'react';
import { AppSettings } from '../../types';

interface SettingsPageProps {
  settings: AppSettings;
  onSave: (settings: Partial<AppSettings>) => void;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ settings, onSave }) => {
    const [localSettings, setLocalSettings] = useState({
        email: 'manoj.mj@example.com',
        notifications: {
            email: true,
            push: false,
            newClient: true,
            ticketUpdate: true,
            transactionCompleted: false,
        },
        theme: settings.theme,
    });

    useEffect(() => {
        setLocalSettings(prev => ({ ...prev, theme: settings.theme }));
    }, [settings.theme]);

    const handleNotificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setLocalSettings(prev => ({
            ...prev,
            notifications: { ...prev.notifications, [name]: checked }
        }));
    };
    
    const handleThemeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalSettings(prev => ({ ...prev, theme: e.target.value as AppSettings['theme'] }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ theme: localSettings.theme });
        // In a real app, you would also save other settings like email and notifications
        alert('Settings saved successfully!');
    };

    const handleCancel = () => {
        setLocalSettings(prev => ({ ...prev, theme: settings.theme }));
        // Also reset other form fields if they were changed
    };

    const Section: React.FC<{title: string; description: string; children: React.ReactNode}> = ({title, description, children}) => (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
                <h3 className="text-lg font-medium text-gray-900 dark:text-slate-200">{title}</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">{description}</p>
            </div>
            <div className="md:col-span-2">
                <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-6">
                    {children}
                </div>
            </div>
        </div>
    );

    const Toggle: React.FC<{label: string, name: string, checked: boolean, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void}> = ({label, name, checked, onChange}) => (
        <label htmlFor={name} className="flex items-center justify-between cursor-pointer">
            <span className="text-sm font-medium text-gray-700 dark:text-slate-300">{label}</span>
            <div className="relative">
                <input type="checkbox" id={name} name={name} className="sr-only" checked={checked} onChange={onChange} />
                <div className={`block w-10 h-6 rounded-full transition-colors ${checked ? 'bg-blue-600' : 'bg-gray-200 dark:bg-slate-600'}`}></div>
                <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${checked ? 'translate-x-4' : ''}`}></div>
            </div>
        </label>
    );

    const inputClass = "mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-200 border border-gray-300 dark:border-slate-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm";

    return (
        <div className="space-y-8">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-slate-200">Settings</h1>

            <form onSubmit={handleSubmit} className="space-y-12">
                <Section title="Account" description="Update your account and password information.">
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-slate-300">Email Address</label>
                            <input type="email" name="email" id="email" defaultValue={localSettings.email} className={inputClass} />
                        </div>
                        <div className="border-t dark:border-slate-700 pt-4 mt-4">
                            <h4 className="text-md font-medium text-gray-800 dark:text-slate-200 mb-2">Change Password</h4>
                            <div>
                                <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 dark:text-slate-300">Current Password</label>
                                <input type="password" name="currentPassword" id="currentPassword" className={inputClass} />
                            </div>
                            <div className="mt-4">
                                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 dark:text-slate-300">New Password</label>
                                <input type="password" name="newPassword" id="newPassword" className={inputClass} />
                            </div>
                             <div className="mt-4">
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-slate-300">Confirm New Password</label>
                                <input type="password" name="confirmPassword" id="confirmPassword" className={inputClass} />
                            </div>
                        </div>
                    </div>
                </Section>

                <Section title="Notifications" description="Manage how you receive notifications from the system.">
                    <div className="space-y-4">
                        <Toggle label="Email Notifications" name="email" checked={localSettings.notifications.email} onChange={handleNotificationChange} />
                        <Toggle label="Push Notifications" name="push" checked={localSettings.notifications.push} onChange={handleNotificationChange} />
                        <div className="border-t dark:border-slate-700 pt-4 mt-4">
                            <h4 className="text-md font-medium text-gray-800 dark:text-slate-200 mb-2">Activity Notifications</h4>
                             <Toggle label="New Client Added" name="newClient" checked={localSettings.notifications.newClient} onChange={handleNotificationChange} />
                             <div className="mt-4"><Toggle label="Ticket Status Updated" name="ticketUpdate" checked={localSettings.notifications.ticketUpdate} onChange={handleNotificationChange} /></div>
                             <div className="mt-4"><Toggle label="Transaction Completed" name="transactionCompleted" checked={localSettings.notifications.transactionCompleted} onChange={handleNotificationChange} /></div>
                        </div>
                    </div>
                </Section>
                
                 <Section title="Appearance" description="Customize the look and feel of the application.">
                    <div>
                        <h4 className="text-md font-medium text-gray-800 dark:text-slate-200 mb-2">Theme</h4>
                         <fieldset className="mt-2">
                            <legend className="sr-only">Theme</legend>
                            <div className="space-y-2">
                                <div className="flex items-center">
                                    <input id="light" name="theme" type="radio" value="Light" checked={localSettings.theme === 'Light'} onChange={handleThemeChange} className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300" />
                                    <label htmlFor="light" className="ml-3 block text-sm font-medium text-gray-700 dark:text-slate-300">Light</label>
                                </div>
                                <div className="flex items-center">
                                    <input id="dark" name="theme" type="radio" value="Dark" checked={localSettings.theme === 'Dark'} onChange={handleThemeChange} className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300" />
                                    <label htmlFor="dark" className="ml-3 block text-sm font-medium text-gray-700 dark:text-slate-300">Dark</label>
                                </div>
                                 <div className="flex items-center">
                                    <input id="system" name="theme" type="radio" value="System" checked={localSettings.theme === 'System'} onChange={handleThemeChange} className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300" />
                                    <label htmlFor="system" className="ml-3 block text-sm font-medium text-gray-700 dark:text-slate-300">System Default</label>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                </Section>

                <div className="flex justify-end pt-4 border-t dark:border-slate-700">
                    <button type="button" onClick={handleCancel} className="bg-white dark:bg-slate-600 text-gray-700 dark:text-slate-300 px-4 py-2 rounded-lg font-semibold text-sm border border-gray-300 dark:border-slate-500 hover:bg-gray-50 dark:hover:bg-slate-500 mr-2">Cancel</button>
                    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-blue-700">Save Changes</button>
                </div>
            </form>
        </div>
    );
};

export default SettingsPage;
