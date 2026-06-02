import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { Link } from 'react-router-dom';
import FilterSidebar from './FilterSidebar';
import ProductGrid from './ProductGrid';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import axios from 'axios';

function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    // Filters state
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [priceRange, setPriceRange] = useState(1000000);
    const [inStockOnly, setInStockOnly] = useState(true);
    const [sortOption, setSortOption] = useState('Relevance');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/products');
                setProducts(response.data);
                setFilteredProducts(response.data);
            } catch (error) {
                console.error("Failed to fetch products", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        let result = [...products];

        // Filter by category
        if (selectedCategories.length > 0) {
            result = result.filter(p => {
                return selectedCategories.some(cat => {
                    if (cat === 'Servers' && p.category.includes('Server')) return true;
                    if (cat === 'Workstations' && p.category.includes('Workstation')) return true;
                    if (cat === 'Storage' && p.category.includes('Storage')) return true;
                    if (cat === 'Laptops' && p.category.includes('Mobile')) return true;
                    if (cat === 'Gaming' && p.category.includes('Gaming')) return true;
                    if (cat === 'Monitors' && p.category.includes('Display')) return true;
                    return false;
                });
            });
        }

        // Filter by price
        result = result.filter(p => {
            const priceVal = parseFloat(p.price.replace(/[^0-9.-]+/g, ""));
            return priceVal <= priceRange;
        });

        // Sort
        if (sortOption === 'Price: Low to High') {
            result.sort((a, b) => parseFloat(a.price.replace(/[^0-9.-]+/g, "")) - parseFloat(b.price.replace(/[^0-9.-]+/g, "")));
        } else if (sortOption === 'Price: High to Low') {
            result.sort((a, b) => parseFloat(b.price.replace(/[^0-9.-]+/g, "")) - parseFloat(a.price.replace(/[^0-9.-]+/g, "")));
        }

        setFilteredProducts(result);
    }, [products, selectedCategories, priceRange, inStockOnly, sortOption]);

    return (
        <>
            <Header />
            <main className="pt-24 pb-16 px-margin-desktop mx-auto min-h-[80vh]">
                <div className="flex flex-col lg:flex-row gap-gutter">
                    <FilterSidebar
                        selectedCategories={selectedCategories}
                        setSelectedCategories={setSelectedCategories}
                        priceRange={priceRange}
                        setPriceRange={setPriceRange}
                        inStockOnly={inStockOnly}
                        setInStockOnly={setInStockOnly}
                    />
                    <ProductGrid
                        products={filteredProducts}
                        sortOption={sortOption}
                        setSortOption={setSortOption}
                        loading={loading}
                    />
                </div>
            </main>
            <Footer />
        </>
    );
}

export default ProductsPage;