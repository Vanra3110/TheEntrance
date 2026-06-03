import React from 'react';
import { motion } from 'framer-motion';
import SpotlightCard from '../../components/SpotlightCard';

const FeaturesSection = () => {
    return (
        <section className="relative z-20 px-margin-mobile md:px-margin-desktop w-full py-8 bg-surface-container-low">
            <div className="bg-primary border border-outline-variant/50 shadow-md rounded-3xl p-6 md:p-10  mx-auto overflow-hidden">
                <div className="flex flex-col md:flex-row justify-around items-center gap-8">

                    {/* Left Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false, amount: 0.3 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="w-full md:w-auto flex-1"
                    >
                        <SpotlightCard className='flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-4 bg-surface border-none p-4 transition-all duration-300 rounded-2xl'
                            spotlightColor="rgba(109, 40, 217, 0.1)">
                            <div className="bg-primary-container p-4 rounded-full flex items-center justify-center">
                                <span className="material-symbols-outlined text-primary text-3xl">local_shipping</span>
                            </div>
                            <div className="mt-2 md:mt-0">
                                <p className="font-headline-sm text-headline-sm text-on-surface mb-1">Fast Shipping</p>
                                <p className="font-body-sm text-body-sm text-on-surface-variant">Priority logistics for our enterprise partners globally.</p>
                            </div>
                        </SpotlightCard>
                    </motion.div>

                    {/* Middle Card (Top) */}
                    <motion.div
                        initial={{ opacity: 0, y: -100 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.3 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                        className="w-full md:w-auto flex-1 md:border-x border-outline-variant/30 md:px-8"
                    >
                        <SpotlightCard className='flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-4 bg-surface border-none p-4 transition-all duration-300 rounded-2xl'
                            spotlightColor="rgba(109, 40, 217, 0.1)">
                            <div className="bg-secondary-container p-4 rounded-full flex items-center justify-center">
                                <span className="material-symbols-outlined text-secondary text-3xl">support_agent</span>
                            </div>
                            <div className="mt-2 md:mt-0">
                                <p className="font-headline-sm text-headline-sm text-on-surface mb-1">24/7 Support</p>
                                <p className="font-body-sm text-body-sm text-on-surface-variant">Dedicated round-the-clock enterprise assistance.</p>
                            </div>
                        </SpotlightCard>
                    </motion.div>

                    {/* Right Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false, amount: 0.3 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                        className="w-full md:w-auto flex-1"
                    >
                        <SpotlightCard className='flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-4 bg-surface border-none p-4 transition-all duration-300 rounded-2xl'
                            spotlightColor="rgba(109, 40, 217, 0.1)">
                            <div className="bg-tertiary-container p-4 rounded-full flex items-center justify-center">
                                <span className="material-symbols-outlined text-tertiary text-3xl">verified_user</span>
                            </div>
                            <div className="mt-2 md:mt-0">
                                <p className="font-headline-sm text-headline-sm text-on-surface mb-1">Secure Payments</p>
                                <p className="font-body-sm text-body-sm text-on-surface-variant">Tier-1 encrypted transactions for absolute safety.</p>
                            </div>
                        </SpotlightCard>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
