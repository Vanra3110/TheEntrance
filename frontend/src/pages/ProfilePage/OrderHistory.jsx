import React from 'react';

const OrderHistory = ({ orders }) => {
    return (
        <div className="bg-surface-container-lowest border border-outline-variant p-margin-desktop rounded shadow-sm">
            <h2 className="font-headline-md text-headline-md text-primary mb-6">Order History</h2>
            {orders.length === 0 ? (
                <p className="text-on-surface-variant">You have no past orders.</p>
            ) : (
                <div className="space-y-6">
                    {orders.map((order) => (
                        <div key={order._id} className="border border-outline-variant rounded-lg p-6 flex flex-col gap-4 bg-surface">
                            <div className="flex justify-between items-center border-b border-outline-variant pb-4">
                                <div>
                                    <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Order #{order._id.substring(0, 8)}</p>
                                    <p className="font-body-sm text-body-sm text-on-surface-variant">Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-headline-sm text-headline-sm text-primary">₹{order.totalAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                                    <span className={`inline-block px-3 py-1 rounded-full text-label-sm font-label-sm mt-1 ${order.status === 'Delivered' ? 'bg-primary-container text-on-primary-container' : 'bg-surface-container-high text-on-surface'}`}>{order.status}</span>
                                </div>
                            </div>
                            <div className="space-y-3">
                                {order.items.map((item, idx) => (
                                    <div key={idx} className="flex gap-4 items-center">
                                        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded border border-outline-variant" />
                                        <div className="flex-1">
                                            <p className="font-label-md text-label-md text-on-surface line-clamp-1">{item.name}</p>
                                            <p className="font-body-sm text-body-sm text-on-surface-variant">Qty: {item.quantity}</p>
                                        </div>
                                        <div className="font-label-md text-label-md text-secondary">{item.price}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OrderHistory;
