import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

const EditProfileModal = ({ user, onClose, onUpdate }) => {
    const [formData, setFormData] = useState({
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        phone: user.phone || '',
        email: user.email || '',
        address: user.address || '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (errors[e.target.name]) {
            setErrors(prev => ({ ...prev, [e.target.name]: undefined }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const regexExpName = /^[a-zA-Z]+$/;
        const regexExpPhoneNo = /^[6-9][0-9]{9}$/;
        const regexExpEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

        const { first_name, last_name, phone, email } = formData;
        const newErrors = {};
        let isValid = true;

        if ((first_name.length < 3 || !regexExpName.test(first_name)) || first_name === "") {
            newErrors.first_name = "First name must be at least 3 characters long and contain only letters";
            isValid = false;
        }

        if ((last_name.length < 3 || !regexExpName.test(last_name)) || last_name === "") {
            newErrors.last_name = "Last name must be at least 3 characters long and contain only letters";
            isValid = false;
        }

        if (phone.length !== 10 || !regexExpPhoneNo.test(phone)) {
            newErrors.phone = "Phone number must be a valid 10-digit number";
            isValid = false;
        }

        if (email === "" || !regexExpEmail.test(email)) {
            newErrors.email = "Email is not valid";
            isValid = false;
        }

        setErrors(newErrors);

        if (!isValid) return;

        setLoading(true);
        setError(null);
        try {
            const response = await axios.put(`http://localhost:5000/api/auth/profile/${user._id}`, formData);
            onUpdate(response.data);
            onClose();
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || 'An error occurred while updating.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                ></motion.div>

                {/* Modal */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative w-full max-w-4xl bg-surface-container-lowest border border-outline-variant p-8 rounded shadow-xl overflow-y-auto max-h-[90vh]"
                >
                    <div className="mb-8 flex justify-between items-start">
                        <div>
                            <h2 className="font-headline-lg text-headline-lg text-primary mb-2">Edit Profile</h2>
                            <p className="font-body-md text-body-md text-on-surface-variant">Update your account information and contact details below.</p>
                        </div>
                        <button onClick={onClose} className="text-on-surface-variant hover:text-error transition-colors">
                            <span className="material-symbols-outlined text-[24px]">close</span>
                        </button>
                    </div>

                    {error && (
                        <div className="mb-4 p-4 bg-error-container text-on-error-container rounded">
                            {error}
                        </div>
                    )}

                    <form className="space-y-8" onSubmit={handleSubmit}>
                        {/* Avatar Section */}
                        <div className="flex items-center gap-6 pb-8 border-b border-outline-variant">
                            <div className="relative group">
                                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-outline-variant bg-surface-container">
                                    {formData.image ? (
                                        <img alt="Avatar" className="w-full h-full object-cover" src={formData.image} />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-on-surface-variant font-bold text-2xl">
                                            {formData.first_name?.charAt(0) || "U"}
                                        </div>
                                    )}
                                </div>
                                <button
                                    onClick={() => document.getElementById('avatarUpload').click()}
                                    className="absolute bottom-0 right-0 bg-secondary text-white p-1.5 rounded-full shadow-lg hover:bg-on-secondary-fixed-variant transition-colors"
                                    type="button"
                                >
                                    <span className="material-symbols-outlined text-[18px]">edit</span>
                                </button>
                            </div>
                            <div>
                                <h3 className="font-label-md text-label-md text-primary mb-1">Profile Photo</h3>
                                <p className="font-body-sm text-body-sm text-on-surface-variant mb-3">Update your avatar. JPG or PNG, max size 2MB.</p>
                                <div className="flex gap-3">
                                    <input
                                        type="file"
                                        id="avatarUpload"
                                        className="hidden"
                                        accept="image/png, image/jpeg, image/jpg"
                                        onChange={(e) => {
                                            const file = e.target.files[0];
                                            if (file) {
                                                if (file.size > 2 * 1024 * 1024) {
                                                    setErrors(prev => ({ ...prev, image: 'File size must be less than 2MB' }));
                                                    return;
                                                }
                                                const reader = new FileReader();
                                                reader.onload = (event) => {
                                                    const img = new Image();
                                                    img.onload = () => {
                                                        const canvas = document.createElement('canvas');
                                                        const MAX_WIDTH = 400;
                                                        const MAX_HEIGHT = 400;
                                                        let width = img.width;
                                                        let height = img.height;

                                                        if (width > height) {
                                                            if (width > MAX_WIDTH) {
                                                                height *= MAX_WIDTH / width;
                                                                width = MAX_WIDTH;
                                                            }
                                                        } else {
                                                            if (height > MAX_HEIGHT) {
                                                                width *= MAX_HEIGHT / height;
                                                                height = MAX_HEIGHT;
                                                            }
                                                        }
                                                        canvas.width = width;
                                                        canvas.height = height;
                                                        const ctx = canvas.getContext('2d');
                                                        ctx.drawImage(img, 0, 0, width, height);
                                                        const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
                                                        setFormData(prev => ({ ...prev, image: dataUrl }));
                                                        setErrors(prev => ({ ...prev, image: undefined }));
                                                    };
                                                    img.src = event.target.result;
                                                };
                                                reader.readAsDataURL(file);
                                            }
                                        }}
                                    />
                                    <button
                                        className="px-4 py-1.5 font-label-sm text-label-sm border border-outline text-on-surface-variant rounded hover:bg-surface-container transition-all"
                                        type="button"
                                        onClick={() => document.getElementById('avatarUpload').click()}
                                    >
                                        Upload New
                                    </button>
                                    <button
                                        className="px-4 py-1.5 font-label-sm text-label-sm text-error hover:bg-error-container rounded transition-all"
                                        type="button"
                                        onClick={() => setFormData(prev => ({ ...prev, image: '' }))}
                                    >
                                        Remove
                                    </button>
                                </div>
                                {errors.image && <p className="text-error text-xs mt-2">{errors.image}</p>}
                            </div>
                        </div>

                        {/* Personal Information Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                            <div className="flex flex-col gap-2">
                                <label className="font-label-md text-label-md text-on-surface font-semibold" htmlFor="first_name">First Name</label>
                                <input className={`w-full h-11 px-4 border rounded bg-surface font-body-md text-on-surface transition-all outline-none ${errors.first_name ? 'border-error focus:border-error focus:ring-2 focus:ring-error/20' : 'border-outline-variant focus:border-secondary focus:ring-2 focus:ring-secondary/20'}`} id="first_name" name="first_name" type="text" value={formData.first_name} onChange={handleChange} />
                                {errors.first_name && <p className="text-error text-xs mt-1">{errors.first_name}</p>}
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="font-label-md text-label-md text-on-surface font-semibold" htmlFor="last_name">Last Name</label>
                                <input className={`w-full h-11 px-4 border rounded bg-surface font-body-md text-on-surface transition-all outline-none ${errors.last_name ? 'border-error focus:border-error focus:ring-2 focus:ring-error/20' : 'border-outline-variant focus:border-secondary focus:ring-2 focus:ring-secondary/20'}`} id="last_name" name="last_name" type="text" value={formData.last_name} onChange={handleChange} />
                                {errors.last_name && <p className="text-error text-xs mt-1">{errors.last_name}</p>}
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="font-label-md text-label-md text-on-surface font-semibold" htmlFor="phone">Phone Number</label>
                                <input className={`w-full h-11 px-4 border rounded bg-surface font-body-md text-on-surface transition-all outline-none ${errors.phone ? 'border-error focus:border-error focus:ring-2 focus:ring-error/20' : 'border-outline-variant focus:border-secondary focus:ring-2 focus:ring-secondary/20'}`} id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} />
                                {errors.phone && <p className="text-error text-xs mt-1">{errors.phone}</p>}
                            </div>
                            <div className="flex flex-col gap-2 md:col-span-2">
                                <label className="font-label-md text-label-md text-on-surface font-semibold" htmlFor="email">Corporate Email</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface-variant">mail</span>
                                    <input className={`w-full h-11 pl-12 pr-4 border rounded bg-surface font-body-md text-on-surface transition-all outline-none ${errors.email ? 'border-error focus:border-error focus:ring-2 focus:ring-error/20' : 'border-outline-variant focus:border-secondary focus:ring-2 focus:ring-secondary/20'}`} id="email" name="email" type="email" value={formData.email} onChange={handleChange} />
                                </div>
                                {errors.email && <p className="text-error text-xs">{errors.email}</p>}
                                <p className="font-body-sm text-body-sm text-on-surface-variant">Changing your email will require re-verification.</p>
                            </div>
                            <div className="flex flex-col gap-2 md:col-span-2">
                                <label className="font-label-md text-label-md text-on-surface font-semibold" htmlFor="address">Business Address</label>
                                <input className="w-full h-11 px-4 border border-outline-variant rounded bg-surface font-body-md text-on-surface focus:border-secondary transition-all outline-none" id="address" name="address" type="text" value={formData.address} onChange={handleChange} />
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex justify-end items-center gap-4 pt-6 border-t border-outline-variant mt-8">
                            <button onClick={onClose} className="px-8 h-11 font-label-md text-label-md border border-outline text-on-surface-variant rounded hover:bg-surface-container-high transition-all active:opacity-80" type="button" disabled={loading}>
                                Cancel
                            </button>
                            <button className="px-8 h-11 font-label-md text-label-md bg-secondary text-white rounded hover:shadow-lg hover:bg-on-secondary-fixed-variant transition-all active:opacity-80 flex items-center gap-2" type="submit" disabled={loading}>
                                {loading ? 'Saving...' : (
                                    <>
                                        <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>save</span>
                                        Save Changes
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default EditProfileModal;
