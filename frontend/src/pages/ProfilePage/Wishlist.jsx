import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../../components/productCard';

const Wishlist = ({ user }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWishlistProducts = async () => {
            const session = sessionStorage.getItem('session');
            let currentWishlist = [];
            if (session) {
                const userData = JSON.parse(session);
                currentWishlist = userData.wishlist || [];
            } else if (user && user.wishlist) {
                currentWishlist = user.wishlist;
            }

            if (currentWishlist.length === 0) {
                setLoading(false);
                setProducts([]);
                return;
            }

            try {
                // Fetch all products and filter by wishlist IDs
                const response = await axios.get(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/products`);
                const allProducts = response.data;
                const filtered = allProducts.filter(p => currentWishlist.includes(String(p.id)) || currentWishlist.includes(p.id));
                setProducts(filtered);
            } catch (error) {
                console.error("Error fetching wishlist products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchWishlistProducts();

        // Listen to updates from other tabs/cards
        const handleWishlistUpdate = () => {
            fetchWishlistProducts();
        };
        window.addEventListener('wishlistUpdated', handleWishlistUpdate);
        return () => window.removeEventListener('wishlistUpdated', handleWishlistUpdate);
    }, [user]);

    if (loading) {
        return <div className="text-center py-12"><span className="material-symbols-outlined animate-spin text-4xl text-primary">sync</span></div>;
    }

    return (
        <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold font-headline text-primary mb-2">My Wishlist</h2>

            {products.length === 0 ? (
                <div className="bg-surface-container-low rounded-xl p-12 text-center border border-outline-variant flex flex-col items-center gap-4">
                    <span className="material-symbols-outlined text-[64px] text-on-surface-variant opacity-50">heart_broken</span>
                    <div>
                        <h3 className="text-xl font-bold text-on-surface">Your wishlist is empty</h3>
                        <p className="text-on-surface-variant mt-2 max-w-md mx-auto">Looks like you haven't saved any items yet. Browse our products and click the heart icon to save them for later.</p>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {products.map((product, index) => (
                        <div key={index}>
                            <ProductCard
                                id={product.id}
                                title={product.title}
                                price={product.price}
                                src={product.src}
                                alt={product.alt || product.title}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Wishlist;
