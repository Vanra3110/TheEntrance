import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TechnicalSpecsSection = () => {
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const storedProduct = localStorage.getItem('selectedProduct');
        if (storedProduct) {
            setProduct(JSON.parse(storedProduct));
        }
    }, []);

    const defaultSpecs = [
        { label: "Processor", value: "Dual Intel Xeon Silver 4410Y (12C/24T)" },
        { label: "Memory Slots", value: "16x DIMM Slots (Up to 4TB)" },
        { label: "Memory Included", value: "128GB DDR5 ECC (4800MT/s)" },
        { label: "Networking", value: "2x 10GbE SFP+ / 2x 1GbE RJ45" },
        { label: "Storage Bays", value: "12x 3.5\" Hot-Swap SAS/SATA" },
        { label: "Power Supply", value: "Dual 1100W Redundant (Platinum)" },
        { label: "Form Factor", value: "2U Rackmount (Rails Included)" }
    ];

    const specsToRender = product?.specs || defaultSpecs;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-16"
        >
            <h2 className="font-headline-lg text-headline-lg text-primary mb-8">Technical Specifications</h2>
            <div className="bento-card rounded-xl overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2">
                    {specsToRender.map((spec, index) => {
                        const isLastItem = index === specsToRender.length - 1;
                        const isOddLengthAndLast = specsToRender.length % 2 !== 0 && isLastItem;
                        return (
                            <div
                                key={index}
                                className={`spec-row p-6 flex justify-between ${!isLastItem || isOddLengthAndLast ? 'border-b border-outline-variant' : ''} ${isOddLengthAndLast ? 'md:col-span-2' : ''}`}
                            >
                                <span className="font-label-md text-label-md text-on-surface-variant">{spec.label}</span>
                                <span className="font-body-md text-body-md font-medium text-right">{spec.value}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </motion.div>
    );
};

export default TechnicalSpecsSection;
