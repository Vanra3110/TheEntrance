import React from 'react';
import { motion } from 'framer-motion';

const HeroHeader = ({
    user,
    formData,
    isEditing,
    isUploading,
    fileInputRef,
    handleImageChange,
    handleCancelEdit,
    handleSaveClick,
    handleEditToggle,
    currentImage
}) => {
    return (
        <section className="bg-primary-container mt-20 py-12 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-0 right-0 w-96 h-96 bg-secondary-container rounded-full blur-3xl -mr-48 -mt-48"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary rounded-full blur-3xl -ml-32 -mb-32"></div>
            </div>
            <div className="mx-auto px-margin-desktop flex flex-col md:flex-row items-center gap-8 relative z-10">
                <div className="relative group">
                    <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden bg-white relative">
                        <img alt="User Avatar" className={`w-full h-full object-cover ${isUploading ? 'opacity-50' : ''}`} src={currentImage} />
                        {isUploading && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                                <span className="material-symbols-outlined animate-spin text-white">sync</span>
                            </div>
                        )}
                    </div>
                    {isEditing && (
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="absolute bottom-1 right-1 bg-secondary text-white p-2 rounded-full border-2 border-white hover:bg-secondary-container transition-colors shadow-sm z-10"
                            title="Change Avatar"
                        >
                            <span className="material-symbols-outlined text-[18px]">edit</span>
                        </button>
                    )}
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                    />
                </div>
                <div className="text-center md:text-left">
                    <h1 className="text-primary font-headline-lg text-headline-lg">{formData.first_name} {formData.last_name}</h1>
                    <p className="text-on-primary-container font-body-lg text-body-lg">{formData.email}</p>
                </div>
                <div className="md:ml-auto flex gap-3">
                    {isEditing ? (
                        <>
                            <button onClick={handleCancelEdit} className="bg-surface text-on-surface font-label-md text-label-md px-6 py-3 border border-outline hover:bg-surface-container-low hover:text-error hover:scale-105 active:scale-95 rounded-full transition-all flex items-center gap-2">
                                <span className="material-symbols-outlined text-[18px]">close</span>
                                Cancel
                            </button>
                            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-secondary text-white font-label-md text-label-md px-6 py-3 shadow-sm hover:bg-secondary-container hover:text-primary rounded-full active:opacity-80 transition-all flex items-center gap-2" onClick={handleSaveClick}>
                                <span className="material-symbols-outlined text-[18px]">save</span>
                                Save Changes
                            </motion.button>
                        </>
                    ) : (
                        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-secondary text-white font-label-md text-label-md px-8 py-3 shadow-sm hover:bg-secondary-container hover:text-primary rounded-full active:opacity-80 transition-all flex items-center gap-2" onClick={handleEditToggle}>
                            <span className="material-symbols-outlined text-[18px]">edit</span>
                            Edit Profile
                        </motion.button>
                    )}
                </div>
            </div>
        </section>
    );
};

export default HeroHeader;
