import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../../components/productCard';
import { motion, AnimatePresence } from 'framer-motion';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } }
};

const ProductGrid = ({ products, sortOption, setSortOption }) => {
    return (
        <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex-grow"
        >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <p className="font-body-md text-body-md text-on-surface-variant">Showing <span className="text-primary font-bold">{products.length}</span> high-performance units</p>
                <div className="flex items-center gap-4">
                    <span className="font-label-md text-label-md text-on-surface-variant">Sort By:</span>
                    <select 
                        className="bg-surface-container-lowest border border-outline-variant font-label-md text-label-md text-primary rounded-lg px-4 py-2 focus:ring-2 focus:ring-secondary/20 outline-none"
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value)}
                    >
                        <option>Relevance</option>
                        <option>Price: Low to High</option>
                        <option>Price: High to Low</option>
                        <option>Newest Arrivals</option>
                    </select>
                </div>
            </div>

            {products.length === 0 ? (
                <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center py-20 text-center"
                >
                    <span className="material-symbols-outlined text-6xl text-outline mb-4">inventory_2</span>
                    <h3 className="font-headline-md text-headline-md text-primary mb-2">No products found</h3>
                    <p className="font-body-md text-body-md text-on-surface-variant">Try adjusting your filters to see more results.</p>
                </motion.div>
            ) : (
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-gutter"
                >
                    <AnimatePresence mode="popLayout">
                        {products.map((product) => (
                            <motion.div 
                                key={product.id}
                                layout
                                variants={itemVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className="h-full"
                            >
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
                    </AnimatePresence>
                </motion.div>
            )}

            {products.length > 0 && (
                <div className="mt-12 flex justify-center items-center gap-2">
                    <button className="w-10 h-10 flex items-center justify-center rounded border border-outline-variant hover:bg-surface-container-low transition-colors text-primary">
                        <span className="material-symbols-outlined">chevron_left</span>
                    </button>
                    <button className="w-10 h-10 flex items-center justify-center rounded bg-secondary text-on-secondary font-label-md text-label-md">1</button>
                    <button className="w-10 h-10 flex items-center justify-center rounded border border-outline-variant hover:bg-surface-container-low font-label-md text-label-md transition-colors text-primary">2</button>
                    <button className="w-10 h-10 flex items-center justify-center rounded border border-outline-variant hover:bg-surface-container-low font-label-md text-label-md transition-colors text-primary">3</button>
                    <span className="px-2 text-on-surface-variant">...</span>
                    <button className="w-10 h-10 flex items-center justify-center rounded border border-outline-variant hover:bg-surface-container-low transition-colors text-primary">
                        <span className="material-symbols-outlined">chevron_right</span>
                    </button>
                </div>
            )}
        </motion.div>
    );
};

export default ProductGrid;
