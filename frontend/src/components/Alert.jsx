import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Alert = ({ isOpen, onClose, title, message, onConfirm, confirmText = "Yes", cancelText = "No", showCancel = true, showConfirm = true, type = "warning", autoClose, className }) => {

    useEffect(() => {
        if (isOpen && autoClose) {
            const timer = setTimeout(() => {
                onClose();
            }, autoClose);
            return () => clearTimeout(timer);
        }
    }, [isOpen, autoClose, onClose]);

    if (!isOpen) return null;

    const iconMap = {
        warning: 'warning',
        danger: 'error',
        success: 'check_circle',
        info: 'info'
    };

    const colorMap = {
        warning: {
            iconColor: 'text-amber-500 bg-amber-50 dark:bg-amber-950/20',
            buttonColor: 'bg-amber-600 hover:bg-amber-700'
        },
        danger: {
            iconColor: 'text-error bg-error-container/40 dark:bg-error-container/20',
            buttonColor: 'bg-error text-white hover:opacity-90'
        },
        success: {
            iconColor: 'text-green-600 bg-green-50 dark:bg-green-950/20',
            buttonColor: 'bg-green-600 hover:bg-green-700'
        },
        info: {
            iconColor: 'text-secondary bg-secondary-fixed dark:bg-secondary-fixed-dim/20',
            buttonColor: 'bg-secondary text-white hover:opacity-90'
        }
    };

    const currentColors = colorMap[type] || colorMap.warning;

    return (
        <AnimatePresence>
            <div className={`fixed ${className} z-[100] flex items-center justify-center p-4 `}>
                {/* Backdrop Overlay */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className={`fixed inset-0 bg-black/60 ${type === 'success' ? '' : 'backdrop-blur-sm'}`}
                />

                {/* Modal Container */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 15 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                    className="relative bg-surface dark:bg-inverse-surface border border-outline-variant dark:border-outline rounded-full !rounded-[24px] shadow-2xl w-full max-w-[380px] p-6 z-10 overflow-hidden"
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface transition-colors"
                    >
                        <span className="material-symbols-outlined">close</span>
                    </button>

                    <div className="flex flex-col items-center text-center">
                        {/* Status Icon */}
                        <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 ${currentColors.iconColor}`}>
                            <span className="material-symbols-outlined text-[32px]">{iconMap[type] || 'warning'}</span>
                        </div>

                        {/* Title */}
                        <h3 className="font-headline-md text-headline-md text-on-surface dark:text-inverse-on-surface mb-2">
                            {title}
                        </h3>

                        {/* Message */}
                        <p className="font-body-md text-body-md text-on-surface-variant dark:text-outline mb-6">
                            {message}
                        </p>

                        {/* Actions */}
                        {(showConfirm || showCancel) && (
                            <div className="flex items-center gap-3 w-full justify-center">
                                {showConfirm && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            if (onConfirm) onConfirm();
                                            onClose();
                                        }}
                                        className={`${showCancel ? 'flex-1' : 'w-full'} h-11 text-white font-label-md text-label-md rounded-full transition-all active:scale-[0.98] shadow-sm ${currentColors.buttonColor}`}
                                    >
                                        {confirmText}
                                    </button>
                                )}
                                {showCancel && (
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className={`${showConfirm ? 'flex-1' : 'w-full'} h-11 border border-outline dark:border-outline-variant hover:bg-surface-container-high rounded-full font-label-md text-label-md text-on-surface dark:text-inverse-on-surface transition-all active:scale-[0.98]`}
                                    >
                                        {cancelText}
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default Alert;
