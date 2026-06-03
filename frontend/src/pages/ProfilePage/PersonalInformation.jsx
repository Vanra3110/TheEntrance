import React from 'react';

const PersonalInformation = ({ user, formData, isEditing, handleInputChange }) => {
    // Shared classes for inputs in editing vs non-editing state
    const inputClasses = isEditing 
        ? "p-3 w-full bg-surface border border-outline-variant rounded font-body-md text-body-md text-on-surface focus:border-secondary outline-none transition-colors" 
        : "p-3 w-full bg-surface-container-lowest border border-outline-variant/30 rounded font-body-md text-body-md text-on-surface-variant cursor-default outline-none transition-colors pointer-events-none";

    const textareaClasses = isEditing
        ? "p-4 w-full bg-surface border border-outline-variant rounded font-body-md text-body-md text-on-surface focus:border-secondary outline-none transition-colors min-h-[100px]" 
        : "p-4 w-full bg-surface-container-lowest border border-outline-variant/30 rounded font-body-md text-body-md text-on-surface-variant cursor-default outline-none transition-colors pointer-events-none min-h-[100px]";

    return (
        <>
            <div id="personal-info-section" className="bg-surface-container-lowest border border-outline-variant p-margin-desktop rounded shadow-sm">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="font-headline-md text-headline-md text-primary">Personal Information</h2>
                    <span className="bg-primary-fixed text-on-primary-fixed px-3 py-1 rounded-full text-label-sm font-label-sm">Active Account</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
                    {/* Field: First Name */}
                    <div className="flex flex-col gap-2">
                        <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">First Name</label>
                        <input name="first_name" readOnly={!isEditing} value={isEditing ? formData.first_name || '' : user.first_name || ''} onChange={handleInputChange} className={inputClasses} />
                    </div>
                    {/* Field: Last Name */}
                    <div className="flex flex-col gap-2">
                        <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Last Name</label>
                        <input name="last_name" readOnly={!isEditing} value={isEditing ? formData.last_name || '' : user.last_name || ''} onChange={handleInputChange} className={inputClasses} />
                    </div>
                    {/* Field: Phone */}
                    <div className="flex flex-col gap-2">
                        <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Phone Number</label>
                        <input name="phone" readOnly={!isEditing} value={isEditing ? formData.phone || '' : user.phone || ''} onChange={handleInputChange} className={inputClasses} />
                    </div>
                    {/* Field: Email */}
                    <div className="flex flex-col gap-2 md:col-span-2">
                        <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Email Address</label>
                        <div className="relative">
                            <input name="email" readOnly={!isEditing} value={isEditing ? formData.email || '' : user.email || ''} onChange={handleInputChange} className={inputClasses} />
                            {!isEditing && (
                                <span className="material-symbols-outlined text-outline text-[18px] absolute right-3 top-3">verified_user</span>
                            )}
                        </div>
                    </div>
                    {/* Field: Address */}
                    <div className="flex flex-col gap-2 md:col-span-2">
                        <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Address Line</label>
                        <textarea name="address" readOnly={!isEditing} value={isEditing ? formData.address || '' : user.address || ''} onChange={handleInputChange} className={textareaClasses} />
                    </div>
                    {/* Field: City */}
                    <div className="flex flex-col gap-2">
                        <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">City</label>
                        <input name="city" readOnly={!isEditing} value={isEditing ? formData.city || '' : user.city || ''} onChange={handleInputChange} className={inputClasses} />
                    </div>
                    {/* Field: State */}
                    <div className="flex flex-col gap-2">
                        <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">State / Province</label>
                        <input name="state" readOnly={!isEditing} value={isEditing ? formData.state || '' : user.state || ''} onChange={handleInputChange} className={inputClasses} />
                    </div>
                    {/* Field: Postal Code */}
                    <div className="flex flex-col gap-2">
                        <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Postal Code</label>
                        <input name="postalCode" readOnly={!isEditing} value={isEditing ? formData.postalCode || '' : user.postalCode || ''} onChange={handleInputChange} className={inputClasses} />
                    </div>
                    {/* Field: Country */}
                    <div className="flex flex-col gap-2">
                        <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Country</label>
                        <input name="country" readOnly={!isEditing} value={isEditing ? formData.country || '' : user.country || ''} onChange={handleInputChange} className={inputClasses} />
                    </div>
                </div>
            </div>
            <div className="mt-gutter grid grid-cols-1 md:grid-cols-3 gap-gutter">
                <div className="bg-surface-container-lowest border border-outline-variant p-6 rounded md:col-span-1">
                    <h3 className="font-label-md text-label-md text-on-surface-variant mb-4 flex items-center gap-2">
                        <span className="material-symbols-outlined text-[20px]">language</span>
                        Language
                    </h3>
                    <p className="font-body-md text-body-md text-primary">English (US)</p>
                </div>
                <div className="bg-surface-container-lowest border border-outline-variant p-6 rounded md:col-span-1">
                    <h3 className="font-label-md text-label-md text-on-surface-variant mb-4 flex items-center gap-2">
                        <span className="material-symbols-outlined text-[20px]">schedule</span>
                        Time Zone
                    </h3>
                    <p className="font-body-md text-body-md text-primary">GMT-5 (Eastern Time)</p>
                </div>
            </div>
        </>
    );
};

export default PersonalInformation;
