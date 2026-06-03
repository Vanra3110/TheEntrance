import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
// import Footer from '../../components/Footer';
import AdminProducts from './AdminProducts';
import AdminUsers from './AdminUsers';
import AdminOrders from './AdminOrders';
import AdminAnalytics from './AdminAnalytics';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');

    useEffect(() => {
        const session = sessionStorage.getItem('session');
        const userData = session ? JSON.parse(session) : null;

        if (!userData || !userData.isAdmin) {
            navigate('/');
        } else {
            setIsLoading(false);
        }
    }, [navigate]);

    if (isLoading) return null;

    return (
        <div className="min-h-screen bg-surface dark:bg-surface-dim text-on-surface flex flex-col">
            <Header />
            <main className="flex-grow mt-20">
                {/* Hero Header equivalent for Admin Dashboard */}
                <section className="bg-primary-container py-12 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10 pointer-events-none">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-secondary-container rounded-full blur-3xl -mr-48 -mt-48"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary rounded-full blur-3xl -ml-32 -mb-32"></div>
                    </div>
                    <div className="mx-auto px-margin-desktop relative z-10">
                        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary dark:text-primary-fixed">
                            Admin Dashboard
                        </h1>
                        <p className="text-on-primary-container font-body-lg text-body-lg mt-2">Manage your platform operations, users, and products.</p>
                    </div>
                </section>

                <div className="-max mx-auto px-margin-desktop py-12">
                    <div className="grid grid-cols-12 gap-gutter">
                        {/* Sidebar Navigation */}
                        <aside className="col-span-12 md:col-span-3">
                            <nav className="flex flex-col gap-1">
                                <a
                                    className={`flex items-center gap-3 px-4 py-3 rounded transition-all cursor-pointer ${activeTab === 'overview' ? 'bg-surface-container-high border-l-4 border-secondary text-primary font-bold' : 'text-on-surface-variant hover:bg-surface-container-low'}`}
                                    onClick={() => setActiveTab('overview')}
                                >
                                    <span className="material-symbols-outlined">dashboard</span>
                                    <span className="font-label-md text-label-md">Overview</span>
                                </a>
                                <a
                                    className={`flex items-center gap-3 px-4 py-3 rounded transition-all cursor-pointer ${activeTab === 'products' ? 'bg-surface-container-high border-l-4 border-secondary text-primary font-bold' : 'text-on-surface-variant hover:bg-surface-container-low'}`}
                                    onClick={() => setActiveTab('products')}
                                >
                                    <span className="material-symbols-outlined">inventory_2</span>
                                    <span className="font-label-md text-label-md">Products</span>
                                </a>
                                <a
                                    className={`flex items-center gap-3 px-4 py-3 rounded transition-all cursor-pointer ${activeTab === 'users' ? 'bg-surface-container-high border-l-4 border-secondary text-primary font-bold' : 'text-on-surface-variant hover:bg-surface-container-low'}`}
                                    onClick={() => setActiveTab('users')}
                                >
                                    <span className="material-symbols-outlined">group</span>
                                    <span className="font-label-md text-label-md">Users</span>
                                </a>
                                <a
                                    className={`flex items-center gap-3 px-4 py-3 rounded transition-all cursor-pointer ${activeTab === 'orders' ? 'bg-surface-container-high border-l-4 border-secondary text-primary font-bold' : 'text-on-surface-variant hover:bg-surface-container-low'}`}
                                    onClick={() => setActiveTab('orders')}
                                >
                                    <span className="material-symbols-outlined">shopping_cart</span>
                                    <span className="font-label-md text-label-md">Orders</span>
                                </a>
                                <a
                                    className={`flex items-center gap-3 px-4 py-3 rounded transition-all cursor-pointer ${activeTab === 'analytics' ? 'bg-surface-container-high border-l-4 border-secondary text-primary font-bold' : 'text-on-surface-variant hover:bg-surface-container-low'}`}
                                    onClick={() => setActiveTab('analytics')}
                                >
                                    <span className="material-symbols-outlined">analytics</span>
                                    <span className="font-label-md text-label-md">Analytics</span>
                                </a>
                                <div className="flex items-center gap-3 px-4 py-3 rounded text-on-surface-variant hover:bg-surface-container-low transition-all cursor-pointer">
                                    <span className="material-symbols-outlined">settings</span>
                                    <span className="font-label-md text-label-md">Settings</span>
                                </div>
                            </nav>
                        </aside>

                        {/* Main Section */}
                        <section className="col-span-12 md:col-span-9">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                {activeTab === 'overview' && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                                        {/* Placeholder Card 1 */}
                                        <motion.div
                                            whileHover={{ scale: 1.02 }}
                                            className="p-6 bg-surface-container rounded-2xl border border-outline-variant shadow-sm flex flex-col gap-4"
                                        >
                                            <div className="flex items-center gap-3">
                                                <span className="material-symbols-outlined text-primary text-3xl">inventory_2</span>
                                                <h2 className="text-xl font-semibold">Manage Products</h2>
                                            </div>
                                            <p className="text-on-surface-variant">Add, edit, or remove high-end hardware products from your store inventory.</p>
                                            <button
                                                onClick={() => setActiveTab('products')}
                                                className="mt-auto self-start px-4 py-2 bg-primary text-white rounded-full font-medium hover:bg-primary/90 transition-colors"
                                            >
                                                View Products
                                            </button>
                                        </motion.div>

                                        {/* Placeholder Card 2 */}
                                        <motion.div
                                            whileHover={{ scale: 1.02 }}
                                            className="p-6 bg-surface-container rounded-2xl border border-outline-variant shadow-sm flex flex-col gap-4"
                                        >
                                            <div className="flex items-center gap-3">
                                                <span className="material-symbols-outlined text-primary text-3xl">group</span>
                                                <h2 className="text-xl font-semibold">User Management</h2>
                                            </div>
                                            <p className="text-on-surface-variant">View customer accounts, manage permissions, and handle user inquiries.</p>
                                            <button
                                                onClick={() => setActiveTab('users')}
                                                className="mt-auto self-start px-4 py-2 bg-primary text-white rounded-full font-medium hover:bg-primary/90 transition-colors"
                                            >
                                                View Users
                                            </button>
                                        </motion.div>

                                        {/* Placeholder Card 3 */}
                                        <motion.div
                                            whileHover={{ scale: 1.02 }}
                                            className="p-6 bg-surface-container rounded-2xl border border-outline-variant shadow-sm flex flex-col gap-4 md:col-span-2"
                                        >
                                            <div className="flex items-center gap-3">
                                                <span className="material-symbols-outlined text-primary text-3xl">shopping_cart</span>
                                                <h2 className="text-xl font-semibold">Sales & Orders</h2>
                                            </div>
                                            <p className="text-on-surface-variant">Track new sales, update order fulfillment status, and monitor revenue.</p>
                                            <button 
                                                onClick={() => setActiveTab('orders')}
                                                className="mt-auto self-start px-4 py-2 bg-primary text-white rounded-full font-medium hover:bg-primary/90 transition-colors"
                                            >
                                                Manage Orders
                                            </button>
                                        </motion.div>
                                    </div>
                                )}
                                {activeTab === 'products' && (
                                    <AdminProducts />
                                )}
                                {activeTab === 'users' && (
                                    <AdminUsers />
                                )}
                                {activeTab === 'orders' && (
                                    <AdminOrders />
                                )}
                                {activeTab === 'analytics' && (
                                    <AdminAnalytics />
                                )}
                            </motion.div>
                        </section>
                    </div>
                </div>
            </main>
            {/* <Footer /> */}
        </div>
    );
};

export default AdminDashboard;
