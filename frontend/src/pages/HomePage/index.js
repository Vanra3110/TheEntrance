import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
// import { motion } from 'framer-motion';
// import Alert from '../../components/Alert';
import HeroSection from './heroSection';
import FeaturesSection from './FeaturesSection';
import CategoriesSection from './CategoriesSection';
import FeaturedProductsSection from './FeaturedProductsSection';

const Home = () => {
    const session = sessionStorage.getItem('session');
    // const navigate = useNavigate();

    // const [alertState, setAlertState] = useState({
    //     isOpen: false,
    //     title: '',  
    //     message: '',
    //     type: 'danger',
    //     autoClose: null,
    //     showConfirm: true,
    //     onConfirm: () => { },
    //     onClose: null
    // });

    // useEffect(() => {
    //     if (!session) {
    //         navigate('/');
    //     } else {
    //         const alertShown = sessionStorage.getItem('loginAlertShown');
    //         if (!alertShown) {
    //             setAlertState({
    //                 isOpen: true,
    //                 title: 'Login Successful',
    //                 message: 'Welcome to your dashboard',
    //                 type: 'success',
    //                 autoClose: 1500,
    //                 showConfirm: false,
    //                 onClose: () => {
    //                     setAlertState(prev => ({ ...prev, isOpen: false }));
    //                 }
    //             });
    //             sessionStorage.setItem('loginAlertShown', 'true');
    //         }
    //     }
    // }, [session, navigate]);

    if (!session) {
        return null;
    }

    // const userData = JSON.parse(session);
    return (
        <div className="min-h-screen flex flex-col font-body-md text-body-md text-on-surface bg-surface dark:bg-surface-dim overflow-x-hidden">
            {/* <Alert
                isOpen={alertState.isOpen}
                onClose={() => {
                    setAlertState(prev => ({ ...prev, isOpen: false }));
                    if (alertState.onClose) {
                        alertState.onClose();
                    }
                }}
                title={alertState.title}
                message={alertState.message}
                type={alertState.type}
                onConfirm={alertState.onConfirm}
                // confirmText="OK"
                showCancel={false}
                showConfirm={alertState.showConfirm !== false}
                autoClose={alertState.autoClose}
                className="top-0 left-0 right-0"
            /> */}
            <Header />
            <main className="flex-grow">
                {/* <div className="w-full flex flex-col gap-8 px-margin-mobile py-12 bg-surface-container-lowest border-b border-outline-variant/30">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-center">
                        <h1 className="font-headline-lg text-headline-lg text-primary">
                            Welcome back, <span className='text-secondary font-bold dark:text-primary-fixed-container'> {userData.first_name} {userData.last_name} </span>!
                        </h1>
                    </motion.div>
                </div> */}
                <HeroSection />
                <FeaturesSection />
                <CategoriesSection />
                <FeaturedProductsSection />
            </main>
            <Footer />
        </div>
    );
};

export default Home;
