import React from 'react'
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import TransitionAlerts from './minimalAlert';
import axios from 'axios';

function ProductCard(props) {
    const navigate = useNavigate();
    const [showAlert, setShowAlert] = React.useState(false);
    const [alertMessage, setAlertMessage] = React.useState("");
    const alertTimeoutRef = React.useRef(null);
    const [itemCount, setItemCount] = React.useState(0);

    React.useEffect(() => {
        const updateFromSession = () => {
            const session = sessionStorage.getItem('session');
            if (session && props.id) {
                const userData = JSON.parse(session);
                if (userData.cartItems && userData.cartItems[props.id]) {
                    setItemCount(userData.cartItems[props.id]);
                } else {
                    setItemCount(0);
                }
            }
        };
        updateFromSession();
        window.addEventListener('cartUpdated', updateFromSession);
        return () => window.removeEventListener('cartUpdated', updateFromSession);
    }, [props.id]);

    const triggerAlert = (msg) => {
        setAlertMessage(msg);
        setShowAlert(true);
        if (alertTimeoutRef.current) {
            clearTimeout(alertTimeoutRef.current);
        }
        alertTimeoutRef.current = setTimeout(() => setShowAlert(false), 3000);
    };

    const updateCart = (change) => {
        const session = sessionStorage.getItem('session');
        if (!session) {
            navigate('/login');
            return;
        }

        const userData = JSON.parse(session);
        const cartItems = userData.cartItems || {};
        const currentCount = cartItems[props.id] || 0;
        const newCount = Math.max(0, currentCount + change);

        if (newCount === 0) {
            delete cartItems[props.id];
        } else {
            cartItems[props.id] = newCount;
        }

        const totalCount = Object.values(cartItems).reduce((sum, count) => sum + count, 0);

        sessionStorage.setItem('session', JSON.stringify({
            ...userData,
            cartItems,
            cartCount: totalCount
        }));

        setItemCount(newCount);
        window.dispatchEvent(new Event('cartUpdated'));

        // Sync with backend
        try {
            axios.put('http://localhost:5000/api/auth/cart', {
                email: userData.email,
                cartItems
            }).catch(err => console.error("Error syncing cart", err));
        } catch (e) { }
    };

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        updateCart(1);
        triggerAlert("Item added successfully");
    };

    const handleIncrement = (e) => {
        e.preventDefault();
        e.stopPropagation();
        updateCart(1);
        triggerAlert("Item added successfully");
    };

    const handleDecrement = (e) => {
        e.preventDefault();
        e.stopPropagation();
        updateCart(-1);
        triggerAlert("Item removed successfully");
    };

    const handleBuyNow = (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('Buy now');
        navigate('/checkout');
    };

    return (
        <>
            <TransitionAlerts open={showAlert} onClose={() => setShowAlert(false)} message={alertMessage} />
            <motion.div
                className="bg-surface-container-low border border-outline-variant rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-shadow duration-300 h-full cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
            >
                <div className="h-56 p-4 bg-surface-container-low overflow-hidden relative group">
                    <div className="w-full h-full rounded-xl overflow-hidden relative">
                        <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            alt={props.alt}
                            src={props.src} />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300 z-10 backdrop-blur-[2px]">
                            {itemCount === 0 ? (
                                <button
                                    className="px-6 py-2 bg-primary text-on-primary rounded-full font-label-md hover:scale-105 transition-transform flex items-center gap-2 shadow-lg"
                                    onClick={handleAddToCart}>
                                    <span className="material-symbols-outlined text-sm">add_shopping_cart</span> Quick Add
                                </button>
                            ) : (
                                <div className="flex items-center gap-4 bg-surface-container/95 p-2 rounded-full shadow-lg border border-outline-variant">
                                    <button onClick={handleDecrement} className="text-primary bg-surface-container-highest rounded-full w-8 h-8 flex items-center justify-center hover:opacity-80 transition-opacity">
                                        <span className="material-symbols-outlined text-sm">remove</span>
                                    </button>
                                    <span className="font-label-md text-primary font-bold">{itemCount}</span>
                                    <button onClick={handleIncrement} className="text-primary bg-surface-container-highest rounded-full w-8 h-8 flex items-center justify-center hover:opacity-80 transition-opacity">
                                        <span className="material-symbols-outlined text-sm">add</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="p-6 bg-surface-container-low opacity-90">
                    <h4 className="font-label-md text-label-md text-primary mb-1">{props.title}</h4>
                    <p className="font-body-sm text-body-sm text-primary mb-4">{props.price}</p>
                    <div className='flex flex-row justify-center items-center gap-4'>
                        {/* {itemCount > 0 ? (
                            <div className="w-full py-2 bg-surface-container border border-outline-variant rounded-lg flex items-center justify-between px-2">
                                <button onClick={handleDecrement} className="text-primary bg-surface-container-high cursor-pointer px-2 py-1 hover:opacity-80 transition-opacity flex items-center justify-center border-2 border-outline-variant rounded-lg">
                                    <span className="material-symbols-outlined text-sm">remove</span>
                                </button>
                                <span className="font-label-md text-label-md text-primary">{itemCount}</span>
                                <button onClick={handleIncrement} className="text-primary bg-surface-container-high cursor-pointer px-2 py-1 hover:opacity-80 transition-opacity flex items-center justify-center border-2 border-outline-variant rounded-lg">
                                    <span className="material-symbols-outlined text-sm">add</span>
                                </button>
                            </div>
                        ) : (
                            <button
                                className="w-full py-3 bg-primary text-on-primary rounded-lg font-label-md text-label-md hover:opacity-90 hover:scale-105 transition-all flex items-center justify-center gap-2"
                                onClick={handleAddToCart}>
                                <span className="material-symbols-outlined text-sm text-on-primary">add_shopping_cart</span> Add to Cart
                            </button>
                        )} */}
                        <button
                            className="w-full py-3 bg-primary text-on-primary rounded-lg font-label-md text-label-md hover:opacity-90 hover:scale-105 transition-all flex items-center justify-center gap-2" onClick={handleBuyNow}>
                            <span className="material-symbols-outlined text-sm text-on-primary">shopping_bag</span> Buy Now
                        </button>
                    </div>
                </div>
            </motion.div>
        </>
    )
}

export default ProductCard