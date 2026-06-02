import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const TransitionPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const type = location.state?.type || 'login'; // 'login' or 'logout'

    useEffect(() => {
        const timer = setTimeout(() => {
            if (type === 'login') {
                navigate('/');
            } else {
                navigate('/login');
            }
        }, 2500); // 2.5 seconds animation

        return () => clearTimeout(timer);
    }, [navigate, type]);

    const isLogin = type === 'login';

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-surface-container-lowest overflow-hidden">
            <motion.div
                className="flex flex-col items-center justify-center gap-6"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                {/* Logo or Icon Animation */}
                <motion.div
                    animate={{
                        rotate: isLogin ? [0, 360] : [0, -360],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: 2,
                        ease: "easeInOut",
                        repeat: Infinity,
                    }}
                    className="w-24 h-24 bg-primary text-white rounded-full flex items-center justify-center shadow-lg"
                >
                    <span className="material-symbols-outlined text-[48px]">
                        {isLogin ? 'shield_person' : 'logout'}
                    </span>
                </motion.div>

                {/* Text Animation */}
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="font-headline-lg text-primary text-center"
                >
                    {isLogin ? 'Authenticating Securely...' : 'Logging Out...'}
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="font-body-md text-on-surface-variant text-center"
                >
                    {isLogin ? 'Preparing your dashboard.' : 'Clearing your session data securely.'}
                </motion.p>

                {/* Loading Bar */}
                <div className="w-64 h-1.5 bg-surface-container mt-4 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 2.2, ease: "easeInOut" }}
                        className="h-full bg-secondary"
                    />
                </div>
            </motion.div>
        </div>
    );
};

export default TransitionPage;
