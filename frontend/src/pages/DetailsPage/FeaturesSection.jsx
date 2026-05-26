import React from 'react';
import { motion } from 'framer-motion';

const FeaturesSection = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter mb-16">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="md:col-span-2 bento-card p-12 rounded-xl flex flex-col justify-center"
            >
                <h2 className="font-headline-lg text-headline-lg text-primary mb-6">Built for the Modern Enterprise</h2>
                <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed mb-8">
                    The Nexus-Core V2 isn't just a server; it's the backbone of your digital infrastructure. Engineered for high-density computing environments, it delivers exceptional performance-per-watt and industry-leading thermal management. Whether you're running complex AI simulations or hosting high-traffic databases, the V2 ensures consistent throughput with zero bottlenecks.
                </p>
                <div className="grid grid-cols-2 gap-8">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary-container rounded-full flex items-center justify-center">
                            <span className="material-symbols-outlined text-secondary-fixed">bolt</span>
                        </div>
                        <span className="font-label-md text-label-md">Next-Gen Speed</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary-container rounded-full flex items-center justify-center">
                            <span className="material-symbols-outlined text-secondary-fixed">security</span>
                        </div>
                        <span className="font-label-md text-label-md">Hardware Root-of-Trust</span>
                    </div>
                </div>
            </motion.div>
            <div className="space-y-gutter">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="bento-card p-8 rounded-xl bg-tertiary text-on-tertiary"
                >
                    <span className="material-symbols-outlined text-4xl mb-4">support_agent</span>
                    <h3 className="font-headline-md text-headline-md mb-2">Expert Support</h3>
                    <p className="font-body-sm text-body-sm text-on-tertiary-container">24/7 dedicated engineering support for all enterprise clients. Guaranteed 4-hour on-site response time.</p>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                    className="bento-card p-8 rounded-xl"
                >
                    <span className="material-symbols-outlined text-secondary text-4xl mb-4">local_shipping</span>
                    <h3 className="font-headline-md text-headline-md mb-2">Express Deployment</h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">Pre-configured and tested hardware shipped globally within 3-5 business days.</p>
                </motion.div>
            </div>
        </div>
    );
};

export default FeaturesSection;
