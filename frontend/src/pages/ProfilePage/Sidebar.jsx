import React from 'react';

const Sidebar = ({ activeTab, setActiveTab, handleAuthClick }) => {
    return (
        <aside className="col-span-12 md:col-span-3">
            <nav className="flex flex-col gap-1">
                <button onClick={() => setActiveTab('personal')} className={`flex w-full items-center gap-3 px-4 py-3 rounded transition-all ${activeTab === 'personal' ? 'bg-surface-container-high border-l-4 border-secondary text-primary font-bold' : 'text-on-surface-variant hover:bg-surface-container-low'}`}>
                    <span className="material-symbols-outlined">person</span>
                    <span className="font-label-md text-label-md">Personal Information</span>
                </button>
                <button onClick={() => setActiveTab('orders')} className={`flex w-full items-center gap-3 px-4 py-3 rounded transition-all ${activeTab === 'orders' ? 'bg-surface-container-high border-l-4 border-secondary text-primary font-bold' : 'text-on-surface-variant hover:bg-surface-container-low'}`}>
                    <span className="material-symbols-outlined">history</span>
                    <span className="font-label-md text-label-md">Order History</span>
                </button>
                <div className="my-4 border-t border-outline-variant"></div>
                <button className="flex items-center gap-3 px-4 py-3 rounded-full bg-error-container text-error hover:opacity-80 hover:scale-105 active:scale-90 transition-all" onClick={handleAuthClick}>
                    <span className="material-symbols-outlined">logout</span>
                    <span className="font-label-md text-label-md">Sign Out</span>
                </button>
            </nav>
        </aside>
    );
};

export default Sidebar;
