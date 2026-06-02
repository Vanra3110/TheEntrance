import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/users');
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id, email) => {
        if (email === 'my111tab.mt@gmail.com') {
            alert("You cannot remove the super admin.");
            return;
        }

        if (window.confirm(`Are you sure you want to remove the user ${email}?`)) {
            try {
                await axios.delete(`http://localhost:5000/api/users/${id}`);
                setUsers(users.filter(u => u._id !== id));
            } catch (error) {
                console.error("Error deleting user:", error);
                alert("Failed to delete user.");
            }
        }
    };

    if (loading) {
        return <div className="text-center py-12"><span className="material-symbols-outlined animate-spin text-4xl text-primary">sync</span></div>;
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold font-headline text-primary">Manage Users</h2>
            </div>

            <div className="bg-surface-container rounded-xl border border-outline-variant shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-surface border-b border-outline-variant text-on-surface-variant text-sm uppercase tracking-wider">
                                <th className="p-4 font-semibold">Name</th>
                                <th className="p-4 font-semibold">Email</th>
                                <th className="p-4 font-semibold">Role</th>
                                <th className="p-4 font-semibold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <motion.tr
                                    key={user._id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="border-b border-outline-variant last:border-0 hover:bg-surface/50 transition-colors"
                                >
                                    <td className="p-4 text-on-surface font-medium">
                                        {user.first_name} {user.last_name}
                                    </td>
                                    <td className="p-4 text-on-surface-variant">
                                        {user.email}
                                    </td>
                                    <td className="p-4">
                                        {user.isAdmin ? (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                                                Admin
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary/10 text-secondary">
                                                User
                                            </span>
                                        )}
                                    </td>
                                    <td className="p-4 text-right">
                                        <button
                                            onClick={() => handleDelete(user._id, user.email)}
                                            className={`px-3 py-1.5 rounded-full font-medium transition-colors flex items-center justify-end gap-1 ml-auto
                                                ${user.email === 'my111tab.mt@gmail.com'
                                                    ? 'text-outline opacity-50 cursor-not-allowed'
                                                    : 'text-error bg-error/10 hover:bg-error/20'}`}
                                            disabled={user.email === 'my111tab.mt@gmail.com'}
                                        >
                                            <span className="material-symbols-outlined text-[18px]">person_remove</span>
                                            Remove
                                        </button>
                                    </td>
                                </motion.tr>
                            ))}
                            {users.length === 0 && (
                                <tr>
                                    <td colSpan="4" className="p-8 text-center text-on-surface-variant">
                                        No users found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminUsers;
