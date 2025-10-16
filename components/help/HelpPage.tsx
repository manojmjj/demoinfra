import React, { useState } from 'react';

const faqs = [
    {
        question: 'How do I add a new client?',
        answer: 'Navigate to the "Clients" page from the sidebar. Click the "Add New Client" button in the top right corner. Fill out the required information in the modal that appears and click "Add Client".'
    },
    {
        question: 'How can I export my data?',
        answer: 'On the "Clients" and "Transactions" pages, you will find an "Export" button near the top right. Clicking this will download a CSV file of the current data view.'
    },
    {
        question: 'What do the different ticket statuses mean?',
        answer: '"Open" means the issue has been reported but not yet assigned. "In Progress" means a technician is actively working on the issue. "Closed" means the issue has been resolved.'
    },
    {
        question: 'How do I reset my password?',
        answer: 'You can change your password from the "Settings" page under the "Account" section. If you have forgotten your password, please contact system administration to get it reset.'
    },
    {
        question: 'Can I customize the dashboard view?',
        answer: 'Currently, the dashboard view is not customizable. However, we are working on adding features for widget customization in a future update.'
    }
];

const FaqItem: React.FC<{ faq: { question: string; answer: string }; isOpen: boolean; onClick: () => void }> = ({ faq, isOpen, onClick }) => (
    <div className="border-b dark:border-slate-700">
        <button onClick={onClick} className="w-full flex justify-between items-center text-left py-4 px-2 hover:bg-gray-50 dark:hover:bg-slate-700 focus:outline-none">
            <span className="text-md font-medium text-gray-800 dark:text-slate-200">{faq.question}</span>
            <svg className={`w-5 h-5 text-gray-500 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
        </button>
        {isOpen && (
            <div className="p-4 pt-0 text-gray-600 dark:text-slate-400">
                {faq.answer}
            </div>
        )}
    </div>
);


const HelpPage: React.FC = () => {
    const [openFaq, setOpenFaq] = useState<number | null>(0);
    const [searchQuery, setSearchQuery] = useState('');

    const toggleFaq = (index: number) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    const handleSupportSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Your support request has been submitted. We will get back to you shortly.');
        // You would typically handle form submission to a backend here.
        (e.target as HTMLFormElement).reset();
    };
    
    const filteredFaqs = faqs.filter(faq => 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const inputClass = "mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-200 border border-gray-300 dark:border-slate-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm";

    return (
        <div className="space-y-8">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-slate-200">Help & Support</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-6">
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-slate-200 mb-4">Frequently Asked Questions</h2>
                        <div className="relative mb-6">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none"><path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                            </span>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Search FAQs..."
                            />
                        </div>

                        <div>
                            {filteredFaqs.length > 0 ? filteredFaqs.map((faq, index) => (
                                <FaqItem key={index} faq={faq} isOpen={openFaq === index} onClick={() => toggleFaq(index)} />
                            )) : (
                                <p className="text-gray-500 dark:text-slate-400">No results found for your search.</p>
                            )}
                        </div>
                    </div>
                </div>
                
                <div className="lg:col-span-1">
                    <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-6">
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-slate-200 mb-4">Contact Support</h2>
                        <p className="text-sm text-gray-600 dark:text-slate-400 mb-4">Can't find the answer you're looking for? Contact our support team.</p>
                        <form onSubmit={handleSupportSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-slate-300">Your Name</label>
                                <input type="text" name="name" id="name" required className={inputClass} />
                            </div>
                             <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-slate-300">Email Address</label>
                                <input type="email" name="email" id="email" required className={inputClass} />
                            </div>
                             <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-slate-300">Message</label>
                                <textarea name="message" id="message" required rows={5} className={inputClass}></textarea>
                            </div>
                            <div>
                                <button type="submit" className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-blue-700 transition-colors">Submit Request</button>
                            </div>
                        </form>
                         <div className="mt-6 pt-6 border-t dark:border-slate-700">
                            <h3 className="text-md font-medium text-gray-800 dark:text-slate-200">Support Channels</h3>
                             <p className="mt-2 text-sm text-gray-600 dark:text-slate-400">
                                <span className="font-semibold">Email:</span> support@ieplcms.com
                             </p>
                             <p className="mt-1 text-sm text-gray-600 dark:text-slate-400">
                                <span className="font-semibold">Phone:</span> +91 44 1234 5678
                             </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HelpPage;
