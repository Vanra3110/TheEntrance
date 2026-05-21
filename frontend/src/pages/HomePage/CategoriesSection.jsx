import React from 'react';
import { motion } from 'framer-motion';
import SpotlightCard from '../../components/SpotlightCard';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { staggerChildren: 0.15 }
    }
};

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const CategoriesSection = () => {
    return (
        <section className="py-18 px-margin-mobile md:px-margin-desktop w-full">
            <div className="font-headline-lg text-headline-lg text-primary mb-12"><motion.h2 className="overflow-hidden whitespace-nowrap"
                initial={{ width: 0 }}
                whileInView={{ width: "100%", transition: { duration: 1, ease: "easeInOut" } }}
                viewport={{ once: true, amount: 0.5 }}>Core Categories</motion.h2></div>
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
                <motion.div variants={cardVariants}>
                    <SpotlightCard className="group relative overflow-hidden bg-white border border-outline-variant rounded-xl p-8 hover:shadow-xl transition-all duration-300 h-full" spotlightColor="rgba(0, 76, 204, 0.15)">
                        <span className="material-symbols-outlined text-4xl text-secondary mb-6">terminal</span>
                        <h3 className="font-headline-md text-headline-md text-primary mb-2">Software</h3>
                        <p className="font-body-sm text-body-sm text-on-surface-variant mb-6">Cloud-native enterprise platforms
                            and licenses.</p>
                        <a className="inline-flex items-center text-secondary font-label-md text-label-md group-hover:gap-2 transition-all"
                            href="#">Explore <span className="material-symbols-outlined">arrow_forward</span></a>
                    </SpotlightCard>
                </motion.div>

                <motion.div variants={cardVariants}>
                    <SpotlightCard className="group relative overflow-hidden bg-white border border-outline-variant rounded-xl p-8 hover:shadow-xl transition-all duration-300 h-full" spotlightColor="rgba(0, 76, 204, 0.15)">
                        <span className="material-symbols-outlined text-4xl text-secondary mb-6">dns</span>
                        <h3 className="font-headline-md text-headline-md text-primary mb-2">Hardware</h3>
                        <p className="font-body-sm text-body-sm text-on-surface-variant mb-6">Robust server racks, networking,
                            and workstations.</p>
                        <a className="inline-flex items-center text-secondary font-label-md text-label-md group-hover:gap-2 transition-all"
                            href="#">Explore <span className="material-symbols-outlined">arrow_forward</span></a>
                    </SpotlightCard>
                </motion.div>

                <motion.div variants={cardVariants}>
                    <SpotlightCard className="group relative overflow-hidden bg-white border border-outline-variant rounded-xl p-8 hover:shadow-xl transition-all duration-300 h-full" spotlightColor="rgba(0, 76, 204, 0.15)">
                        <span className="material-symbols-outlined text-4xl text-secondary mb-6">admin_panel_settings</span>
                        <h3 className="font-headline-md text-headline-md text-primary mb-2">Security</h3>
                        <p className="font-body-sm text-body-sm text-on-surface-variant mb-6">End-to-end encryption and threat
                            detection.</p>
                        <a className="inline-flex items-center text-secondary font-label-md text-label-md group-hover:gap-2 transition-all"
                            href="#">Explore <span className="material-symbols-outlined">arrow_forward</span></a>
                    </SpotlightCard>
                </motion.div>

                <motion.div variants={cardVariants}>
                    <SpotlightCard className="group relative overflow-hidden bg-white border border-outline-variant rounded-xl p-8 hover:shadow-xl transition-all duration-300 h-full" spotlightColor="rgba(0, 76, 204, 0.15)">
                        <span className="material-symbols-outlined text-4xl text-secondary mb-6">lightbulb</span>
                        <h3 className="font-headline-md text-headline-md text-primary mb-2">Consulting</h3>
                        <p className="font-body-sm text-body-sm text-on-surface-variant mb-6">Strategic planning and digital
                            transformation.</p>
                        <a className="inline-flex items-center text-secondary font-label-md text-label-md group-hover:gap-2 transition-all"
                            href="#">Explore <span className="material-symbols-outlined">arrow_forward</span></a>
                    </SpotlightCard>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default CategoriesSection;
