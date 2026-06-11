import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageMessages = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:5000/api/contact');
            setMessages(response.data);
            setError(null);
        } catch (err) {
            console.error('Error fetching messages:', err);
            setError('Failed to load messages.');
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (id, newStatus) => {
        try {
            await axios.patch(`http://localhost:5000/api/contact/${id}`, { status: newStatus });
            setMessages(messages.map(msg => msg._id === id ? { ...msg, status: newStatus } : msg));
        } catch (err) {
            console.error('Error updating status:', err);
            alert('Failed to update message status');
        }
    };

    const filteredMessages = filter === 'All' 
        ? messages 
        : messages.filter(msg => msg.status === filter);

    const statusColors = {
        'Unread': 'bg-red-500/10 text-red-500 border-red-500/20',
        'Noted': 'bg-blue-500/10 text-blue-500 border-blue-500/20',
        'View Later': 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
        'Resolved': 'bg-green-500/10 text-green-500 border-green-500/20',
    };

    if (loading) return <div className="p-8 text-center"><span className="material-symbols-outlined animate-spin text-4xl text-primary">progress_activity</span></div>;
    if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

    return (
        <div className="bg-surface-container rounded-2xl border border-outline-variant shadow-sm overflow-hidden flex flex-col">
            <div className="p-6 border-b border-outline-variant flex flex-col sm:flex-row justify-between items-center gap-4 bg-surface-container-low">
                <div>
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">mail</span>
                        Customer Messages
                    </h2>
                    <p className="text-sm text-on-surface-variant mt-1">Manage inquiries from the Contact Us page.</p>
                </div>
                
                {/* Filter Section */}
                <div className="flex gap-2 bg-surface p-1 rounded-lg border border-outline-variant">
                    {['All', 'Unread', 'Noted', 'View Later', 'Resolved'].map((statusOption) => (
                        <button
                            key={statusOption}
                            onClick={() => setFilter(statusOption)}
                            className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                                filter === statusOption 
                                    ? 'bg-primary text-white shadow-sm' 
                                    : 'text-on-surface-variant hover:bg-surface-container-high'
                            }`}
                        >
                            {statusOption}
                        </button>
                    ))}
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-surface-container-low text-on-surface-variant text-sm border-b border-outline-variant">
                            <th className="py-4 px-6 font-medium">Date</th>
                            <th className="py-4 px-6 font-medium">Sender</th>
                            <th className="py-4 px-6 font-medium">Subject & Message</th>
                            <th className="py-4 px-6 font-medium">Status</th>
                            <th className="py-4 px-6 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-outline-variant">
                        {filteredMessages.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="py-12 text-center text-on-surface-variant">
                                    No messages found for this filter.
                                </td>
                            </tr>
                        ) : (
                            filteredMessages.map((msg) => (
                                <tr key={msg._id} className="hover:bg-surface-container-low/50 transition-colors">
                                    <td className="py-4 px-6 align-top whitespace-nowrap text-sm">
                                        {new Date(msg.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="py-4 px-6 align-top">
                                        <p className="font-semibold">{msg.name}</p>
                                        <a href={`mailto:${msg.email}`} className="text-sm text-primary hover:underline">{msg.email}</a>
                                    </td>
                                    <td className="py-4 px-6 align-top max-w-md">
                                        <p className="font-semibold text-sm mb-1">{msg.subject}</p>
                                        <p className="text-sm text-on-surface-variant line-clamp-3">{msg.message}</p>
                                    </td>
                                    <td className="py-4 px-6 align-top">
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusColors[msg.status] || statusColors['Unread']}`}>
                                            {msg.status}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 align-top text-right space-y-2">
                                        <select 
                                            value={msg.status}
                                            onChange={(e) => handleStatusChange(msg._id, e.target.value)}
                                            className="bg-surface border border-outline-variant text-sm rounded-lg px-3 py-2 outline-none focus:border-primary focus:ring-1 focus:ring-primary w-full max-w-[140px]"
                                        >
                                            <option value="Unread">Mark Unread</option>
                                            <option value="Noted">Mark Noted</option>
                                            <option value="View Later">View Later</option>
                                            <option value="Resolved">Mark Resolved</option>
                                        </select>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageMessages;
