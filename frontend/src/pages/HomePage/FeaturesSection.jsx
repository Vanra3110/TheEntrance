import React from 'react';
import { motion } from 'framer-motion';
import SpotlightCard from '../../components/SpotlightCard';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        scale: 1.05,
        transition: { staggerChildren: 0.2 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
};

const FeaturesSection = () => {
    return (
        <section className="py-8 mb-20 bg-surface-container-low">
            <div className="px-margin-mobile md:px-margin-desktop w-full">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.3 }}
                    className="flex justify-around items-center flex-wrap gap-8 py-8 border-y border-outline-variant/30"
                >
                    <motion.div variants={itemVariants}>
                        <SpotlightCard className='flex items-center gap-3 border-outline-variant rounded-xl p-4 hover:shadow-xl transition-all duration-300'
                            spotlightColor="rgba(0, 76, 204, 0.15)">
                            <span className="material-symbols-outlined text-secondary text-3xl">local_shipping</span>
                            <div>
                                <p className="font-label-md text-label-md text-primary">Fast Shipping</p>
                                <p className="font-body-sm text-body-sm text-on-surface-variant">Priority logistics for partners
                                </p>
                            </div>
                        </SpotlightCard>
                    </motion.div>
                    <motion.div variants={itemVariants} className="flex items-center gap-3">
                        <SpotlightCard className='flex items-center gap-3 border-outline-variant rounded-xl p-4 hover:shadow-xl transition-all duration-300'
                            spotlightColor="rgba(0, 76, 204, 0.15)">
                            <span className="material-symbols-outlined text-secondary text-3xl">support_agent</span>
                            <div>
                                <p className="font-label-md text-label-md text-primary">24/7 Support</p>
                                <p className="font-body-sm text-body-sm text-on-surface-variant">Dedicated enterprise assistance
                                </p>
                            </div>
                        </SpotlightCard>
                    </motion.div>
                    <motion.div variants={itemVariants} className="flex items-center gap-3">
                        <SpotlightCard className='flex items-center gap-3 border-outline-variant rounded-xl p-4 hover:shadow-xl transition-all duration-300'
                            spotlightColor="rgba(0, 76, 204, 0.15)">
                            <span className="material-symbols-outlined text-secondary text-3xl">verified_user</span>
                            <div>
                                <p className="font-label-md text-label-md text-primary">Secure Payments</p>
                                <p className="font-body-sm text-body-sm text-on-surface-variant">Tier-1 encrypted transactions
                                </p>
                            </div>
                        </SpotlightCard>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default FeaturesSection;
