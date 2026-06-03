import React from 'react';

const OrderSummary = ({ checkoutItems, subtotal, tax, total }) => {
    return (
        <div className="lg:col-span-4">
            <div className="bg-surface-container-low border border-outline-variant rounded-xl p-6 shadow-sm sticky top-28">
                <h2 className="font-headline-md text-headline-md text-primary mb-6">Order Summary</h2>

                <div className="space-y-4 max-h-[300px] overflow-y-auto mb-6 pr-2">
                    {checkoutItems.map((item, index) => (
                        <div key={index} className="flex gap-4 items-center">
                            <img src={item.src || item.scr || item.image} alt={item.title || item.name} className="w-16 h-16 object-cover rounded-lg border border-outline-variant" />
                            <div className="flex-1">
                                <h4 className="font-label-md text-label-md text-on-surface line-clamp-1">{item.title || item.name}</h4>
                                <p className="font-body-sm text-body-sm text-on-surface-variant">Qty: {item.quantity}</p>
                            </div>
                            <div className="font-label-md text-label-md text-secondary">
                                {item.price}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="space-y-4 border-t border-outline-variant pt-6 mb-6">
                    <div className="flex justify-between font-body-md text-body-md text-on-surface-variant">
                        <span>Subtotal</span>
                        <span>₹{subtotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>
                    <div className="flex justify-between font-body-md text-body-md text-on-surface-variant">
                        <span>Shipping</span>
                        <span>Free</span>
                    </div>
                    <div className="flex justify-between font-body-md text-body-md text-on-surface-variant">
                        <span>Estimated Tax (8%)</span>
                        <span>₹{tax.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>
                </div>
                <div className="flex justify-between items-center border-t border-outline-variant pt-4">
                    <span className="font-headline-md text-headline-md text-primary font-bold">Total</span>
                    <span className="font-headline-lg text-headline-lg text-primary font-bold tracking-tight">₹{total.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
            </div>
        </div>
    );
};

export default OrderSummary;
