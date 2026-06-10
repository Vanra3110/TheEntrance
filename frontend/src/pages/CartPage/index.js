import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CartItemCard from '../../components/CartItemCard';
import productsData from '../../data/productsData';
import { motion, AnimatePresence } from 'framer-motion';
import SafeBackButton from '../../components/safeBackButton';

function CartPage() {
    const [cartItems, setCartItems] = useState({});
    const navigate = useNavigate();

    const loadCart = () => {
        const session = sessionStorage.getItem('session');
        if (session) {
            const userData = JSON.parse(session);
            setCartItems(userData.cartItems || {});
        } else {
            setCartItems({});
        }
    };

    useEffect(() => {
        loadCart();
        window.addEventListener('cartUpdated', loadCart);
        return () => window.removeEventListener('cartUpdated', loadCart);
    }, []);

    const cartProducts = Object.keys(cartItems).map(id => {
        const product = productsData.find(p => p.id === parseInt(id));
        if (!product) return null;
        return { ...product, quantity: cartItems[id] };
    }).filter(Boolean);

    const subtotal = cartProducts.reduce((sum, p) => {
        const priceVal = parseFloat(p.price.replace(/[^0-9.-]+/g, ""));
        return sum + (priceVal * p.quantity);
    }, 0);

    const tax = subtotal * 0.08;
    const total = subtotal + tax;

    return (
        <main className="flex-grow mx-auto w-full px-margin-desktop py-12 min-h-[80vh] relative">
            <SafeBackButton isHeader={false} />
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-10"
            >
                <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight">Your Cart</h1>
                <p className="font-body-md text-body-md text-on-surface-variant mt-2">Review and manage your professional enterprise hardware selections.</p>
            </motion.div>

            {cartProducts.length === 0 ? (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-20 text-center"
                >
                    <span className="material-symbols-outlined text-6xl text-outline mb-4">shopping_cart</span>
                    <h3 className="font-headline-md text-headline-md text-primary mb-2">Your cart is empty</h3>
                    <p className="font-body-md text-body-md text-on-surface-variant mb-6">Looks like you haven't added anything to your cart yet.</p>
                    <Link to="/products">
                        <button className="bg-primary text-on-primary font-label-md text-label-md py-3 px-6 rounded-lg font-bold shadow-md hover:brightness-110 transition-all">
                            Start Shopping
                        </button>
                    </Link>
                </motion.div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="lg:col-span-8 space-y-6"
                    >
                        <AnimatePresence mode="popLayout">
                            {cartProducts.map(product => (
                                <motion.div
                                    key={product.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <CartItemCard
                                        id={product.id}
                                        title={product.title}
                                        description={product.features && product.features[0] ? product.features[0].description : product.category}
                                        price={product.price}
                                        scr={product.src}
                                        alt={product.alt}
                                        quantity={product.quantity}
                                    />
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        <div className="pt-4">
                            <Link to="/products"><button className="flex items-center gap-2 text-secondary font-label-md text-label-md group">
                                <span className="material-symbols-outlined group-hover:-translate-x-1 transition-transform" data-icon="arrow_back">arrow_back</span>
                                Continue Shopping
                            </button></Link>
                        </div>
                    </motion.div>
                    <motion.aside
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
                        className="lg:col-span-4"
                    >
                        <div className="enterprise-card p-8 bg-surface-container-low rounded-xl">
                            <h2 className="font-headline-md text-headline-md text-primary mb-6">Order Summary</h2>
                            <div className="space-y-4 border-b border-outline-variant pb-6 mb-6">
                                <div className="flex justify-between font-body-md text-body-md text-on-surface-variant">
                                    <span>Subtotal</span>
                                    <span>₹{subtotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                                </div>
                                <div className="flex justify-between font-body-md text-body-md text-on-surface-variant">
                                    <span>Shipping</span>
                                    <span className="text-on-tertiary-container italic">Calculated at checkout</span>
                                </div>
                                <div className="flex justify-between font-body-md text-body-md text-on-surface-variant">
                                    <span>Estimated Tax (8%)</span>
                                    <span>₹{tax.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                                </div>
                            </div>
                            <div className="flex justify-between items-center mb-8">
                                <span className="font-headline-md text-headline-md text-primary font-bold">Total</span>
                                <span className="font-headline-lg text-headline-lg text-primary font-bold tracking-tight">₹{total.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                            </div>
                            <button
                                onClick={() => navigate('/checkout', { state: { checkoutItems: cartProducts, fromCart: true } })}
                                className="w-full bg-secondary text-on-secondary font-label-md text-label-md py-4 rounded-lg font-bold shadow-md hover:brightness-110 active:opacity-90 transition-all flex justify-center items-center gap-2 mb-4">
                                Proceed to Checkout
                                <span className="material-symbols-outlined" data-icon="lock" style={{ "font-variation-settings": "'FILL' 1" }}>lock</span>
                            </button>
                            <div className="flex flex-col gap-3">
                                <div className="flex items-center gap-3 p-3 bg-surface rounded border border-outline-variant">
                                    <span className="material-symbols-outlined text-on-primary-fixed-variant" data-icon="verified_user">verified_user</span>
                                    <span className="font-body-sm text-body-sm text-on-surface-variant">Safe &amp; Secure Payment Processing</span>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-surface rounded border border-outline-variant">
                                    <span className="material-symbols-outlined text-on-primary-fixed-variant" data-icon="local_shipping">local_shipping</span>
                                    <span className="font-body-sm text-body-sm text-on-surface-variant">Enterprise-grade Logistics Tracking</span>
                                </div>
                            </div>
                            <div className="mt-8">
                                <label className="block font-label-sm text-label-sm text-on-surface-variant mb-2" htmlFor="promo">PROMO CODE</label>
                                <div className="flex gap-2">
                                    <input className="flex-grow px-3 py-2 border border-outline-variant rounded bg-surface-container-lowest focus:ring-2 focus:ring-secondary-container focus:outline-none text-body-sm" id="promo" placeholder="Enter code" type="text" />
                                    <button className="px-4 py-2 border border-secondary text-secondary font-label-md text-label-md rounded hover:bg-secondary-fixed transition-colors">Apply</button>
                                </div>
                            </div>
                        </div>
                    </motion.aside>
                </div>
            )}
        </main>
    )
}

export default CartPage;