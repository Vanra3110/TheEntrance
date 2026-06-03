import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

const AdminAnalytics = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/orders');
                setOrders(res.data);
            } catch (err) {
                console.error("Error fetching orders for analytics", err);
                setError("Failed to load analytics data.");
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    // Aggregate Data
    const monthlyStats = {};

    orders.forEach(order => {
        const date = new Date(order.createdAt);
        const label = `${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
        
        if (!monthlyStats[label]) {
            // Include a Date object for sorting later
            monthlyStats[label] = { 
                label, 
                dateObj: new Date(date.getFullYear(), date.getMonth(), 1),
                revenue: 0, 
                orders: 0, 
                products: {} 
            };
        }
        
        monthlyStats[label].revenue += order.totalAmount;
        monthlyStats[label].orders += 1;
        
        order.items.forEach(item => {
            if (!monthlyStats[label].products[item.name]) {
                monthlyStats[label].products[item.name] = { quantity: 0, revenue: 0 };
            }
            monthlyStats[label].products[item.name].quantity += item.quantity;
            
            // Parse price robustly
            const priceVal = typeof item.price === 'string' 
                ? parseFloat(item.price.replace(/[^0-9.-]+/g, "")) || 0 
                : (item.price || 0);
                
            monthlyStats[label].products[item.name].revenue += (priceVal * item.quantity);
        });
    });

    // Convert to array and sort chronologically
    const chartData = Object.values(monthlyStats).sort((a, b) => a.dateObj - b.dateObj);

    if (loading) {
        return <div className="text-center py-20 text-on-surface-variant">Loading Analytics...</div>;
    }

    if (error) {
        return <div className="text-center py-20 text-error">{error}</div>;
    }

    if (chartData.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center bg-surface rounded-xl border border-outline-variant">
                <span className="material-symbols-outlined text-5xl text-outline mb-4">analytics</span>
                <h3 className="text-xl font-headline text-on-surface mb-2">No Data Available</h3>
                <p className="text-on-surface-variant">There are no orders to generate analytics from.</p>
            </div>
        );
    }

    // Custom Tooltip for Chart
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-surface border border-outline-variant p-4 rounded shadow-md">
                    <p className="font-bold text-on-surface mb-2">{label}</p>
                    {payload.map((entry, index) => (
                        <p key={`item-${index}`} style={{ color: entry.color }} className="text-sm">
                            {entry.name}: {entry.name === 'Revenue' ? `₹${entry.value.toLocaleString('en-IN')}` : entry.value}
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="space-y-10">
            {/* Header Section */}
            <div>
                <h2 className="text-2xl font-bold font-headline text-primary mb-2">Sales Analytics</h2>
                <p className="text-on-surface-variant">Review monthly revenue and order volume trends.</p>
            </div>

            {/* Chart Section */}
            <div className="bg-surface border border-outline-variant rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-6 text-on-surface">Monthly Sales Overview</h3>
                <div className="w-full h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart data={chartData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" vertical={false} />
                            <XAxis 
                                dataKey="label" 
                                tick={{ fill: '#64748b' }} 
                                axisLine={{ stroke: '#cbd5e1' }} 
                                tickLine={false} 
                            />
                            
                            {/* Left Y Axis for Revenue */}
                            <YAxis 
                                yAxisId="left" 
                                tickFormatter={(val) => `₹${(val / 1000).toFixed(0)}k`} 
                                tick={{ fill: '#64748b' }}
                                axisLine={false}
                                tickLine={false}
                            />
                            
                            {/* Right Y Axis for Orders */}
                            <YAxis 
                                yAxisId="right" 
                                orientation="right" 
                                tick={{ fill: '#64748b' }}
                                axisLine={false}
                                tickLine={false}
                            />
                            
                            <Tooltip content={<CustomTooltip />} />
                            <Legend wrapperStyle={{ paddingTop: '20px' }} />
                            
                            {/* Bar for Revenue */}
                            <Bar 
                                yAxisId="left" 
                                dataKey="revenue" 
                                name="Revenue" 
                                fill="#4f46e5" 
                                radius={[4, 4, 0, 0]} 
                                barSize={40}
                            />
                            
                            {/* Line for Orders */}
                            <Line 
                                yAxisId="right" 
                                type="monotone" 
                                dataKey="orders" 
                                name="Orders" 
                                stroke="#10b981" 
                                strokeWidth={3} 
                                activeDot={{ r: 8 }}
                            />
                        </ComposedChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Breakdown Section */}
            <div>
                <h3 className="text-xl font-bold font-headline text-primary mb-6">Product Sales Breakdown</h3>
                <div className="space-y-6">
                    {chartData.map((monthData, idx) => (
                        <div key={idx} className="bg-surface border border-outline-variant rounded-xl overflow-hidden shadow-sm">
                            <div className="bg-surface-container-low px-6 py-4 border-b border-outline-variant">
                                <h4 className="text-lg font-bold text-on-surface">{monthData.label}</h4>
                                <div className="text-sm text-on-surface-variant flex gap-4 mt-1">
                                    <span>Total Revenue: ₹{monthData.revenue.toLocaleString('en-IN')}</span>
                                    <span>Total Orders: {monthData.orders}</span>
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-surface-container-lowest text-on-surface-variant text-sm border-b border-outline-variant">
                                            <th className="px-6 py-3 font-medium">Product Name</th>
                                            <th className="px-6 py-3 font-medium text-center">Quantity Sold</th>
                                            <th className="px-6 py-3 font-medium text-right">Revenue Generated</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-outline-variant text-on-surface">
                                        {Object.entries(monthData.products).sort((a, b) => b[1].revenue - a[1].revenue).map(([productName, stats], pIdx) => (
                                            <tr key={pIdx} className="hover:bg-surface-container-lowest transition-colors">
                                                <td className="px-6 py-4 font-medium">{productName}</td>
                                                <td className="px-6 py-4 text-center">{stats.quantity}</td>
                                                <td className="px-6 py-4 text-right">₹{stats.revenue.toLocaleString('en-IN')}</td>
                                            </tr>
                                        ))}
                                        {Object.keys(monthData.products).length === 0 && (
                                            <tr>
                                                <td colSpan="3" className="px-6 py-8 text-center text-on-surface-variant">
                                                    No product details found for this month.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminAnalytics;
