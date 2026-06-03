import React from 'react';
import Button from '../../components/Button';

const ShippingForm = ({ handlePlaceOrder, shippingForm, handleInputChange, errors }) => {
    return (
        <div className="lg:col-span-8 bg-surface border border-outline-variant rounded-xl p-6 md:p-10 shadow-sm">
            <h1 className="font-headline-lg text-headline-lg text-primary mb-6">Checkout</h1>

            <form onSubmit={handlePlaceOrder} className="space-y-6">
                <h2 className="font-headline-md text-headline-md text-secondary border-b border-outline-variant pb-2">Shipping Information</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col">
                        <label className="font-label-sm text-label-sm text-on-surface-variant mb-1">Full Name</label>
                        <input type="text" name="fullName" value={shippingForm.fullName} onChange={handleInputChange} className={`px-4 py-3 rounded-lg border ${errors.fullName ? 'border-error focus:border-error focus:ring-error/20' : 'border-outline-variant focus:border-primary focus:ring-primary'} focus:ring-1 outline-none`} />
                        {errors.fullName && <p className="text-error text-xs mt-1">{errors.fullName}</p>}
                    </div>
                    <div className="flex flex-col">
                        <label className="font-label-sm text-label-sm text-on-surface-variant mb-1">Phone Number</label>
                        <input type="text" name="phone" value={shippingForm.phone} onChange={handleInputChange} className={`px-4 py-3 rounded-lg border ${errors.phone ? 'border-error focus:border-error focus:ring-error/20' : 'border-outline-variant focus:border-primary focus:ring-primary'} focus:ring-1 outline-none`} />
                        {errors.phone && <p className="text-error text-xs mt-1">{errors.phone}</p>}
                    </div>
                    <div className="flex flex-col md:col-span-2">
                        <label className="font-label-sm text-label-sm text-on-surface-variant mb-1">Address Line 1</label>
                        <input type="text" name="addressLine1" value={shippingForm.addressLine1} onChange={handleInputChange} className={`px-4 py-3 rounded-lg border ${errors.addressLine1 ? 'border-error focus:border-error focus:ring-error/20' : 'border-outline-variant focus:border-primary focus:ring-primary'} focus:ring-1 outline-none`} />
                        {errors.addressLine1 && <p className="text-error text-xs mt-1">{errors.addressLine1}</p>}
                    </div>
                    <div className="flex flex-col md:col-span-2">
                        <label className="font-label-sm text-label-sm text-on-surface-variant mb-1">Address Line 2 (Optional)</label>
                        <input type="text" name="addressLine2" value={shippingForm.addressLine2} onChange={handleInputChange} className="px-4 py-3 rounded-lg border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none" />
                    </div>
                    <div className="flex flex-col">
                        <label className="font-label-sm text-label-sm text-on-surface-variant mb-1">City</label>
                        <input type="text" name="city" value={shippingForm.city} onChange={handleInputChange} className={`px-4 py-3 rounded-lg border ${errors.city ? 'border-error focus:border-error focus:ring-error/20' : 'border-outline-variant focus:border-primary focus:ring-primary'} focus:ring-1 outline-none`} />
                        {errors.city && <p className="text-error text-xs mt-1">{errors.city}</p>}
                    </div>
                    <div className="flex flex-col">
                        <label className="font-label-sm text-label-sm text-on-surface-variant mb-1">State / Province</label>
                        <input type="text" name="state" value={shippingForm.state} onChange={handleInputChange} className={`px-4 py-3 rounded-lg border ${errors.state ? 'border-error focus:border-error focus:ring-error/20' : 'border-outline-variant focus:border-primary focus:ring-primary'} focus:ring-1 outline-none`} />
                        {errors.state && <p className="text-error text-xs mt-1">{errors.state}</p>}
                    </div>
                    <div className="flex flex-col">
                        <label className="font-label-sm text-label-sm text-on-surface-variant mb-1">Postal Code</label>
                        <input type="text" name="postalCode" value={shippingForm.postalCode} onChange={handleInputChange} className={`px-4 py-3 rounded-lg border ${errors.postalCode ? 'border-error focus:border-error focus:ring-error/20' : 'border-outline-variant focus:border-primary focus:ring-primary'} focus:ring-1 outline-none`} />
                        {errors.postalCode && <p className="text-error text-xs mt-1">{errors.postalCode}</p>}
                    </div>
                    <div className="flex flex-col">
                        <label className="font-label-sm text-label-sm text-on-surface-variant mb-1">Country</label>
                        <input type="text" name="country" value={shippingForm.country} onChange={handleInputChange} className={`px-4 py-3 rounded-lg border ${errors.country ? 'border-error focus:border-error focus:ring-error/20' : 'border-outline-variant focus:border-primary focus:ring-primary'} focus:ring-1 outline-none`} />
                        {errors.country && <p className="text-error text-xs mt-1">{errors.country}</p>}
                    </div>
                </div>

                <h2 className="font-headline-md text-headline-md text-secondary border-b border-outline-variant pb-2 mt-8">Payment Method</h2>
                <div className="p-4 border border-outline-variant rounded-lg bg-surface-container flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary">credit_card</span>
                    <span className="font-body-md text-body-md text-on-surface">Simulated Secure Credit Card Checkout</span>
                </div>

                <div className="pt-6">
                    <Button
                        type="submit"
                        className="w-full h-14 bg-primary text-white font-label-md text-label-md rounded-lg shadow-md hover:bg-primary-container hover:text-on-primary-container transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                        text="Place Order"
                        icon="check_circle"
                    />
                </div>
            </form>
        </div>
    );
};

export default ShippingForm;
