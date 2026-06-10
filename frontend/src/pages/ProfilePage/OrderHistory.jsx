import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateInvoice } from '../../utils/generateInvoice';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const OrderHistory = ({ orders, loading }) => {
    const [selectedOrder, setSelectedOrder] = useState(null);

    const timelineSteps = ['Pending', 'Processing', 'Shipped', 'Delivered'];

    return (
        <div className="bg-surface-container-lowest border border-outline-variant p-margin-desktop rounded shadow-sm relative">
            <h2 className="font-headline-md text-headline-md text-primary mb-6">Order History</h2>
            {loading ? (
                <SkeletonTheme baseColor="rgba(255,255,255,0.1)" highlightColor="rgba(255,255,255,0.2)">
                    <div className="space-y-6">
                        {[1, 2, 3].map((_, idx) => (
                            <div key={idx} className="border border-white/10 rounded-2xl p-6 flex flex-col gap-4 bg-tertiary opacity-80">
                                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 sm:gap-0 border-b border-white/10 pb-4">
                                    <div>
                                        <Skeleton width={120} height={16} className="mb-2" />
                                        <Skeleton width={200} height={12} />
                                    </div>
                                    <div className="flex flex-col items-start sm:items-end gap-1">
                                        <Skeleton width={80} height={24} />
                                        <Skeleton width={70} height={24} borderRadius={12} />
                                    </div>
                                </div>
                                <div className="space-y-3 mt-2">
                                    {[1, 2].map((_, i) => (
                                        <div key={i} className="flex gap-4 items-center">
                                            <Skeleton width={64} height={64} borderRadius={8} />
                                            <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4">
                                                <div className="flex-1 min-w-0">
                                                    <Skeleton width="75%" height={16} className="mb-2" />
                                                    <Skeleton width="25%" height={12} />
                                                </div>
                                                <Skeleton width={60} height={16} className="shrink-0" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </SkeletonTheme>
            ) : orders.length === 0 ? (
                <p className="text-on-surface-variant">You have no past orders.</p>
            ) : (
                <div className="space-y-6">
                    {orders.map((order) => (
                        <div
                            key={order._id}
                            onClick={() => setSelectedOrder(order)}
                            className="group relative border border-white/10 rounded-2xl p-6 flex flex-col gap-4 bg-tertiary overflow-hidden cursor-pointer shadow-sm hover:shadow-xl hover:shadow-black/20 hover:border-white/30 hover:bg-on-tertiary-container
                            hover:scale-105  transition-all duration-300 active:scale-[0.98]"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                            <div className="relative z-10 flex flex-col sm:flex-row justify-between sm:items-center gap-4 sm:gap-0 border-b border-white/10 pb-4">
                                <div>
                                    <p className="font-label-sm text-label-sm text-white/70 uppercase tracking-wider">Order #{order._id.substring(0, 8)}</p>
                                    <p className="font-body-sm text-body-sm text-white/70">Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
                                </div>
                                <div className="text-left sm:text-right flex flex-col items-start sm:items-end gap-1">
                                    <p className="font-headline-sm text-headline-sm text-white">₹{order.totalAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                                    <span className={`inline-block px-3 py-1 rounded-full text-label-sm font-label-sm ${order.status === 'Delivered' ? 'bg-tertiary-container text-on-tertiary-container' : 'bg-white/20 text-white'}`}>{order.status}</span>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            generateInvoice(order);
                                        }}
                                        className="mt-1 text-tertiary-fixed hover:text-white font-label-sm text-label-sm flex items-center gap-1 transition-colors"
                                    >
                                        <span className="material-symbols-outlined text-[18px]">download</span>
                                        Download Invoice
                                    </button>
                                </div>
                            </div>
                            <div className="relative z-10 space-y-3">
                                {order.items.map((item, idx) => (
                                    <div key={idx} className="flex gap-4 items-start sm:items-center">
                                        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded border border-white/10 shrink-0" />
                                        <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4">
                                            <div className="flex-1 min-w-0">
                                                <p className="font-label-md text-label-md text-white line-clamp-2 sm:line-clamp-1">{item.name}</p>
                                                <p className="font-body-sm text-body-sm text-white/70">Qty: {item.quantity}</p>
                                            </div>
                                            <div className="font-label-md text-label-md text-white shrink-0">{item.price}</div>
                                        </div>
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
                            <div className="p-6 border-b border-outline-variant flex justify-between items-center bg-surface sticky top-0 z-10">
                                <div>
                                    <h3 className="font-headline-sm text-headline-sm text-primary">Track Order</h3>
                                    <p className="text-sm text-on-surface-variant font-mono mt-1">#{selectedOrder._id}</p>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => generateInvoice(selectedOrder)}
                                        className="material-symbols-outlined text-primary hover:text-primary/80 transition-colors p-2 rounded-full hover:bg-primary-container/20"
                                        title="Download Invoice"
                                    >
                                        download
                                    </button>
                                    <button
                                        onClick={() => setSelectedOrder(null)}
                                        className="material-symbols-outlined text-on-surface-variant hover:text-error transition-colors p-2 rounded-full hover:bg-error-container/20"
                                        title="Close"
                                    >
                                        close
                                    </button>
                                </div>
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
                                            <div key={idx} className="flex gap-4 items-start sm:items-center">
                                                <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded border border-outline-variant shrink-0" />
                                                <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4">
                                                    <div className="flex-1 min-w-0">
                                                        <p className="font-label-sm text-label-sm text-on-surface line-clamp-2 sm:line-clamp-1">{item.name}</p>
                                                        <p className="font-body-sm text-xs text-on-surface-variant">Qty: {item.quantity}</p>
                                                    </div>
                                                    <div className="font-label-sm text-label-sm font-medium text-secondary shrink-0">
                                                        {item.price}
                                                    </div>
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
