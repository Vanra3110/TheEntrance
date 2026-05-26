import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ProductCard from '../../components/productCard';

import { initProducts } from '../../data/productsData';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { staggerChildren: 0.15 }
    }
};

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const FeaturedProductsSection = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        initProducts(); // Ensures products are initialized
        const storedProducts = localStorage.getItem("products");
        if (storedProducts) {
            setProducts(JSON.parse(storedProducts));
        }
    }, []);

    return (
        <section className="pt-24 pb-20 bg-surface-container">
            <div className="px-margin-mobile md:px-margin-desktop w-full">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <motion.h2
                            className="font-headline-lg text-headline-lg text-primary mb-2 overflow-hidden whitespace-nowrap"
                            initial={{ width: 0 }}
                            whileInView={{ width: "100%", transition: { duration: 1, ease: "easeInOut" } }}
                            viewport={{ once: true, amount: 0.5 }}
                        >Featured Products</motion.h2>
                        <motion.p className="font-body-md text-body-md text-on-surface-variant overflow-hidden whitespace-nowrap"
                            initial={{ width: 0 }}
                            whileInView={{ width: "100%", transition: { duration: 1, delay: 0.2, ease: "easeInOut" } }}
                            viewport={{ once: true, amount: 0.5 }}>Top-performing assets for Q4 scaling.</motion.p>
                    </div>
                    <Link to="/home" className="text-secondary font-label-md text-label-md underline" >View All Products</Link>
                </div>
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter"
                >
                    {products.map((product, index) => (
                        <motion.div key={index} variants={cardVariants} className="h-full">
                            <Link
                                to={`/details/${product.id}`}
                                style={{ textDecoration: 'none' }}
                                onClick={() => localStorage.setItem('selectedProduct', JSON.stringify(product))}
                            >
                                <ProductCard
                                    id={product.id}
                                    title={product.title}
                                    price={product.price}
                                    src={product.src}
                                    alt={product.alt}
                                />
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default FeaturedProductsSection;
