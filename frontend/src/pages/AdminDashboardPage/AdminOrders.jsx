import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import TransitionAlerts from '../../components/minimalAlert';

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [alert, setAlert] = useState({ open: false, message: '' });

    const fetchOrders = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/orders');
            setOrders(res.data);
        } catch (error) {
            console.error("Error fetching orders:", error);
            setAlert({ open: true, message: 'Failed to fetch orders' });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const updateStatus = async (orderId, newStatus) => {
        try {
            await axios.put(`http://localhost:5000/api/orders/${orderId}/status`, { status: newStatus });
            setAlert({ open: true, message: 'Order status updated successfully' });
            fetchOrders(); // refresh
        } catch (error) {
            console.error("Error updating status:", error);
            setAlert({ open: true, message: 'Failed to update order status' });
        }
    };

    if (loading) {
        return <div className="p-8 text-center text-primary font-headline-md">Loading Orders...</div>;
    }

    return (
        <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 md:p-10 shadow-sm">
            <TransitionAlerts open={alert.open} onClose={() => setAlert({ ...alert, open: false })} message={alert.message} />
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-primary font-headline-md">Sales & Orders Management</h2>
                    <p className="text-on-surface-variant mt-1">View and manage customer orders across the platform.</p>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b-2 border-outline-variant text-on-surface-variant font-label-md">
                            <th className="py-4 px-4 font-semibold uppercase tracking-wider text-sm">Order ID</th>
                            <th className="py-4 px-4 font-semibold uppercase tracking-wider text-sm">Customer</th>
                            <th className="py-4 px-4 font-semibold uppercase tracking-wider text-sm">Items</th>
                            <th className="py-4 px-4 font-semibold uppercase tracking-wider text-sm">Total</th>
                            <th className="py-4 px-4 font-semibold uppercase tracking-wider text-sm">Date</th>
                            <th className="py-4 px-4 font-semibold uppercase tracking-wider text-sm">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <motion.tr 
                                key={order._id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="border-b border-outline-variant hover:bg-surface-container-low transition-colors"
                            >
                                <td className="py-4 px-4">
                                    <span className="font-mono text-sm text-on-surface-variant">#{order._id.substring(0, 8)}</span>
                                </td>
                                <td className="py-4 px-4">
                                    <p className="font-medium text-primary">{order.userId?.first_name} {order.userId?.last_name}</p>
                                    <p className="text-sm text-on-surface-variant">{order.userId?.email}</p>
                                </td>
                                <td className="py-4 px-4">
                                    <div className="flex flex-col gap-1">
                                        {order.items.map((item, idx) => (
                                            <span key={idx} className="text-sm text-on-surface whitespace-nowrap">
                                                {item.quantity}x {item.name.substring(0, 20)}...
                                            </span>
                                        ))}
                                    </div>
                                </td>
                                <td className="py-4 px-4 font-medium text-secondary">
                                    ₹{order.totalAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                                </td>
                                <td className="py-4 px-4 text-sm text-on-surface-variant">
                                    {new Date(order.createdAt).toLocaleDateString()}
                                </td>
                                <td className="py-4 px-4">
                                    <select 
                                        className={`px-3 py-1 rounded-full text-sm font-medium border border-outline-variant outline-none cursor-pointer
                                            ${order.status === 'Pending' ? 'bg-error-container text-on-error-container' : ''}
                                            ${order.status === 'Processing' ? 'bg-secondary-container text-on-secondary-container' : ''}
                                            ${order.status === 'Shipped' ? 'bg-tertiary-container text-on-tertiary-container' : ''}
                                            ${order.status === 'Delivered' ? 'bg-primary-container text-on-primary-container' : ''}
                                            ${order.status === 'Cancelled' ? 'bg-surface-container-highest text-on-surface' : ''}
                                        `}
                                        value={order.status}
                                        onChange={(e) => updateStatus(order._id, e.target.value)}
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Processing">Processing</option>
                                        <option value="Shipped">Shipped</option>
                                        <option value="Delivered">Delivered</option>
                                        <option value="Cancelled">Cancelled</option>
                                    </select>
                                </td>
                            </motion.tr>
                        ))}
                        {orders.length === 0 && (
                            <tr>
                                <td colSpan="6" className="py-8 text-center text-on-surface-variant">
                                    No orders found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminOrders;
