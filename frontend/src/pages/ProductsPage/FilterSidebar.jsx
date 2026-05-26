import React from 'react';
import { motion } from 'framer-motion';

const FilterSidebar = ({ selectedCategories, setSelectedCategories, priceRange, setPriceRange, inStockOnly, setInStockOnly }) => {

    const handleCategoryChange = (category) => {
        setSelectedCategories(prev =>
            prev.includes(category)
                ? prev.filter(c => c !== category)
                : [...prev, category]
        );
    };

    return (
        <motion.aside
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full lg:w-64 flex-shrink-0"
        >
            <div className="bg-surface-container-lowest border border-outline-variant p-6 rounded-lg sticky top-24">
                <h2 className="font-headline-md text-headline-md text-primary mb-6">Filters</h2>
                <div className="mb-8">
                    <h3 className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-4">Category</h3>
                    <div className="space-y-3">
                        {['Servers', 'Workstations', 'Storage', 'Laptops', 'Gaming', 'Monitors'].map(cat => (
                            <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                                <input
                                    className="w-4 h-4 border-outline rounded text-secondary focus:ring-secondary/20"
                                    type="checkbox"
                                    checked={selectedCategories.includes(cat)}
                                    onChange={() => handleCategoryChange(cat)}
                                />
                                <span className="font-body-sm text-body-sm text-on-surface group-hover:text-secondary transition-colors">{cat}</span>
                            </label>
                        ))}
                    </div>
                </div>
                <div className="mb-8">
                    <h3 className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-4">Price Range</h3>
                    <input
                        className="w-full accent-secondary"
                        max="1000000"
                        min="0"
                        step="5000"
                        type="range"
                        value={priceRange}
                        onChange={(e) => setPriceRange(Number(e.target.value))}
                    />
                    <div className="flex justify-between mt-2 font-label-md text-label-md text-on-surface-variant">
                        <span>₹0</span>
                        <span>₹{priceRange.toLocaleString('en-IN')}{priceRange === 1000000 ? '+' : ''}</span>
                    </div>
                </div>
                <div>
                    <h3 className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-4">Availability</h3>
                    <label className="flex items-center gap-3 cursor-pointer group">
                        <input
                            checked={inStockOnly}
                            onChange={(e) => setInStockOnly(e.target.checked)}
                            className="w-4 h-4 border-outline rounded text-secondary focus:ring-secondary/20"
                            type="checkbox"
                        />
                        <span className="font-body-sm text-body-sm text-on-surface group-hover:text-secondary transition-colors">In Stock</span>
                    </label>
                </div>
            </div>
        </motion.aside>
    );
};

export default FilterSidebar;
