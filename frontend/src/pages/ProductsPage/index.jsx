import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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

    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get('search') || '';

    const [searchInput, setSearchInput] = useState(searchQuery);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchInput.trim()) {
            navigate(`/products?search=${encodeURIComponent(searchInput.trim())}`);
        } else {
            navigate(`/products`);
        }
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const url = searchQuery
                    ? `${process.env.REACT_APP_API_URL || `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}`}/api/products?search=${encodeURIComponent(searchQuery)}`
                    : `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/products`;
                const response = await axios.get(url);
                setProducts(response.data);
                setFilteredProducts(response.data);
            } catch (error) {
                console.error("Failed to fetch products", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [searchQuery]);

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
            <main className="pt-24 pb-16 px-margin-desktop mx-auto min-h-[80vh] max-w-container-max">
                <div className="mb-10 max-w-2xl mx-auto w-full">
                    <form onSubmit={handleSearchSubmit} className="flex items-center bg-surface border border-outline-variant rounded-full px-4 py-3 transition-all focus-within:ring-2 focus-within:ring-primary focus-within:border-primary shadow-sm">
                        <span className="material-symbols-outlined text-on-surface-variant mr-3">search</span>
                        <input
                            type="text"
                            placeholder="Search by product name..."
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            className="bg-transparent border-none outline-none text-base text-on-surface w-full font-body-md"
                        />
                        {searchInput && (
                            <button type="button" onClick={() => { setSearchInput(''); navigate('/products'); }} className="material-symbols-outlined text-on-surface-variant hover:text-error ml-2 rounded-full p-1 transition-colors">close</button>
                        )}
                    </form>
                </div>

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