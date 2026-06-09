import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const OrderHistory = ({ orders }) => {
    const [selectedOrder, setSelectedOrder] = useState(null);

    const timelineSteps = ['Pending', 'Processing', 'Shipped', 'Delivered'];

    return (
        <div className="bg-surface-container-lowest border border-outline-variant p-margin-desktop rounded shadow-sm relative">
            <h2 className="font-headline-md text-headline-md text-primary mb-6">Order History</h2>
            {orders.length === 0 ? (
                <p className="text-on-surface-variant">You have no past orders.</p>
            ) : (
                <div className="space-y-6">
                    {orders.map((order) => (
                        <div
                            key={order._id}
                            onClick={() => setSelectedOrder(order)}
                            className="border border-outline-variant rounded-lg p-6 flex flex-col gap-4 bg-surface cursor-pointer hover:shadow-md hover:border-primary/50 transition-all active:scale-[0.99]"
                        >
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

            <AnimatePresence>
                {selectedOrder && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-lg w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]"
                        >
                            <div className="p-6 border-b border-outline-variant flex justify-between items-center bg-surface sticky top-0">
                                <div>
                                    <h3 className="font-headline-sm text-headline-sm text-primary">Track Order</h3>
                                    <p className="text-sm text-on-surface-variant font-mono mt-1">#{selectedOrder._id}</p>
                                </div>
                                <button
                                    onClick={() => setSelectedOrder(null)}
                                    className="material-symbols-outlined text-on-surface-variant hover:text-error transition-colors p-2 rounded-full hover:bg-error-container/20"
                                >
                                    close
                                </button>
                            </div>

                            <div className="p-6 overflow-y-auto">
                                {selectedOrder.status === 'Cancelled' ? (
                                    <div className="bg-error-container text-on-error-container p-6 rounded-lg text-center border border-error/20">
                                        <span className="material-symbols-outlined text-5xl mb-2 text-error">cancel</span>
                                        <h4 className="font-headline-sm text-headline-sm">Order Cancelled</h4>
                                        <p className="text-sm mt-2">This order has been cancelled and will not be shipped.</p>
                                    </div>
                                ) : (
                                    <div className="py-8 px-2">
                                        <div className="relative flex justify-between">
                                            {/* Line Wrapper */}
                                            <div className="absolute top-[20px] left-[20px] right-[20px] -translate-y-1/2 z-0">
                                                {/* Connecting Line Background (Thin) */}
                                                <div className="absolute inset-0 top-1/2 -translate-y-1/2 h-[2px] bg-surface-container-highest rounded-full"></div>
                                                
                                                {/* Connecting Line Progress (Thick) */}
                                                <div
                                                    className="absolute left-0 top-1/2 -translate-y-1/2 h-[6px] bg-primary rounded-full z-10 transition-all duration-500 ease-in-out"
                                                    style={{
                                                        width: `${(Math.max(0, timelineSteps.indexOf(selectedOrder.status)) / (timelineSteps.length - 1)) * 100}%`
                                                    }}
                                                ></div>
                                            </div>

                                            {/* Steps */}
                                            {timelineSteps.map((step, index) => {
                                                const currentIdx = timelineSteps.indexOf(selectedOrder.status);
                                                const isCompleted = index <= currentIdx;
                                                const isActive = index === currentIdx;

                                                return (
                                                    <div key={step} className="relative z-20 flex flex-col items-center gap-3">
                                                        <div
                                                            className={`w-10 h-10 rounded-full flex items-center justify-center border-4 transition-all duration-300 ${isCompleted
                                                                    ? 'bg-primary border-primary-container text-on-primary shadow-md'
                                                                    : 'bg-surface border-surface-container-highest text-on-surface-variant'
                                                                }`}
                                                        >
                                                            <span className="material-symbols-outlined text-[20px]">
                                                                {step === 'Pending' && 'pending_actions'}
                                                                {step === 'Processing' && 'inventory_2'}
                                                                {step === 'Shipped' && 'local_shipping'}
                                                                {step === 'Delivered' && 'check_circle'}
                                                            </span>
                                                        </div>
                                                        <span className={`text-xs font-semibold uppercase tracking-wider ${isCompleted ? 'text-primary' : 'text-on-surface-variant'}`}>
                                                            {step}
                                                        </span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}

                                <div className="mt-8 border border-outline-variant rounded-lg p-4 bg-surface-container-lowest">
                                    <h4 className="font-label-lg text-label-lg text-on-surface mb-3 pb-2 border-b border-outline-variant">Order Summary</h4>
                                    <div className="space-y-3">
                                        {selectedOrder.items.map((item, idx) => (
                                            <div key={idx} className="flex gap-4 items-center">
                                                <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded border border-outline-variant" />
                                                <div className="flex-1">
                                                    <p className="font-label-sm text-label-sm text-on-surface line-clamp-1">{item.name}</p>
                                                    <p className="font-body-sm text-xs text-on-surface-variant">Qty: {item.quantity}</p>
                                                </div>
                                                <div className="font-label-sm text-label-sm font-medium text-secondary">
                                                    {item.price}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-4 pt-3 border-t border-outline-variant flex justify-between items-center">
                                        <span className="font-label-md text-on-surface-variant">Total</span>
                                        <span className="font-headline-sm text-primary">₹{selectedOrder.totalAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                                    </div>
                                </div>

                                {selectedOrder.shippingAddress && (
                                    <div className="mt-4 border border-outline-variant rounded-lg p-4 bg-surface-container-lowest">
                                        <h4 className="font-label-lg text-label-lg text-on-surface mb-2">Shipping Details</h4>
                                        <p className="text-sm text-on-surface-variant leading-relaxed">
                                            {selectedOrder.shippingAddress.address}, {selectedOrder.shippingAddress.city}<br />
                                            {selectedOrder.shippingAddress.state}, {selectedOrder.shippingAddress.postalCode}<br />
                                            {selectedOrder.shippingAddress.country}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default OrderHistory;
