import React from 'react';
import { useNavigate } from 'react-router-dom';
import TransitionAlerts from '../../components/minimalAlert';
import { motion } from 'framer-motion';

const ProductInfoSection = () => {
    const navigate = useNavigate();
    const [showAlert, setShowAlert] = React.useState(false);
    const [alertMessage, setAlertMessage] = React.useState("");
    const alertTimeoutRef = React.useRef(null);
    const [itemCount, setItemCount] = React.useState(0);
    const [product, setProduct] = React.useState(null);
    const [mainImage, setMainImage] = React.useState(null);
    const [selectedProcessor, setSelectedProcessor] = React.useState(0);
    const [selectedMemory, setSelectedMemory] = React.useState(0);

    React.useEffect(() => {
        let currentProductId = null;
        const storedProduct = localStorage.getItem('selectedProduct');
        if (storedProduct) {
            const parsedProduct = JSON.parse(storedProduct);
            setProduct(parsedProduct);
            currentProductId = parsedProduct.id;
            setMainImage(parsedProduct.src);
            const procIndex = (parsedProduct.processors || []).findIndex(p => p.selected);
            setSelectedProcessor(procIndex !== -1 ? procIndex : 0);
            const memIndex = (parsedProduct.memoryOptions || []).findIndex(m => m.selected);
            setSelectedMemory(memIndex !== -1 ? memIndex : 0);
        }

        const updateFromSession = () => {
            const session = sessionStorage.getItem('session');
            if (session && currentProductId) {
                const userData = JSON.parse(session);
                if (userData.cartItems && userData.cartItems[currentProductId]) {
                    setItemCount(userData.cartItems[currentProductId]);
                } else {
                    setItemCount(0);
                }
            }
        };

        updateFromSession();
        window.addEventListener('cartUpdated', updateFromSession);
        return () => window.removeEventListener('cartUpdated', updateFromSession);
    }, []);

    const triggerAlert = (msg) => {
        setAlertMessage(msg);
        setShowAlert(true);
        if (alertTimeoutRef.current) {
            clearTimeout(alertTimeoutRef.current);
        }
        alertTimeoutRef.current = setTimeout(() => setShowAlert(false), 3000);
    };

    const updateCart = (change) => {
        if (!product) return;
        const session = sessionStorage.getItem('session');
        if (!session) {
            navigate('/login');
            return;
        }
        
        const userData = JSON.parse(session);
        const cartItems = userData.cartItems || {};
        const currentCount = cartItems[product.id] || 0;
        const newCount = Math.max(0, currentCount + change);
        
        cartItems[product.id] = newCount;
        
        const totalCount = Object.values(cartItems).reduce((sum, count) => sum + count, 0);
        
        sessionStorage.setItem('session', JSON.stringify({
            ...userData,
            cartItems,
            cartCount: totalCount
        }));
        
        setItemCount(newCount);
        window.dispatchEvent(new Event('cartUpdated'));
    };

    const handleAddToCart = (e) => {
        e.preventDefault();
        updateCart(1);
        triggerAlert("Item added successfully");
    };

    const handleIncrement = (e) => {
        e.preventDefault();
        updateCart(1);
        triggerAlert("Item added successfully");
    };

    const handleDecrement = (e) => {
        e.preventDefault();
        updateCart(-1);
        triggerAlert("Item removed successfully");
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
    };

    return (
        <>
            <TransitionAlerts open={showAlert} onClose={() => setShowAlert(false)} message={alertMessage} />
            <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16"
            >
                <motion.div variants={itemVariants} className="space-y-6">
                    <motion.div 
                        layoutId="main-image"
                        className="aspect-square rounded-lg overflow-hidden border border-outline-variant bg-white flex items-center justify-center p-8"
                    >
                        <motion.img 
                            key={mainImage}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3 }}
                            alt={product?.alt || "Nexus-Core V2 Server"} 
                            className="w-full h-full object-contain" 
                            src={mainImage || "https://lh3.googleusercontent.com/aida/ADBb0uiQXvUayPTnxd06r8RsRwvl8MQkYtRC9X8-tnD2kM9zf12M8wZTg3-5KHOLmODb49ouArWulgrlj1lMiy0XlsaxtCI72j-QjZOINGA4sb3lYSdcdOaguAhoh5pJqd_o6bkkoMRrH481MZq83xbhGDiMgSYWLbhDT3V0s1XpccvUu-tyXPd5gm4dwblU_yx78WoFt39VMBCUNZXuvK37V4WbdNAvH1qzKzOdnEDyG8-V7f8yvS-SrpZtng"} 
                        />
                    </motion.div>
                    <div className="grid grid-cols-4 gap-4">
                        {[product?.src, product?.src, product?.src].map((src, idx) => (
                            <motion.div 
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setMainImage(src)}
                                key={idx} 
                                className={`aspect-square border rounded bg-white p-2 cursor-pointer transition-colors ${mainImage === src && idx === 0 ? 'border-secondary ring-2 ring-secondary/20' : 'border-outline-variant'}`}
                            >
                                <img alt={`View ${idx + 1}`} className={`w-full h-full object-contain transition-opacity ${mainImage === src && idx === 0 ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`} src={src || "https://lh3.googleusercontent.com/aida/ADBb0uiQXvUayPTnxd06r8RsRwvl8MQkYtRC9X8-tnD2kM9zf12M8wZTg3-5KHOLmODb49ouArWulgrlj1lMiy0XlsaxtCI72j-QjZOINGA4sb3lYSdcdOaguAhoh5pJqd_o6bkkoMRrH481MZq83xbhGDiMgSYWLbhDT3V0s1XpccvUu-tyXPd5gm4dwblU_yx78WoFt39VMBCUNZXuvK37V4WbdNAvH1qzKzOdnEDyG8-V7f8yvS-SrpZtng"} />
                            </motion.div>
                        ))}
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="aspect-square border border-outline-variant rounded bg-white p-2 flex items-center justify-center cursor-pointer hover:bg-surface-container-low transition-colors">
                            <span className="material-symbols-outlined text-outline">more_horiz</span>
                        </motion.div>
                    </div>
                </motion.div>
                <motion.div variants={itemVariants} className="space-y-8">
                    <div>
                        <span className="font-label-md text-label-md text-secondary uppercase tracking-wider">{product?.category || "Enterprise Performance"}</span>
                        <h1 className="font-display-lg text-display-lg text-primary mt-2">{product?.title || "Nexus-Core V2 Server"}</h1>
                        <div className="flex items-baseline gap-4 mt-4">
                            <span className="font-headline-lg text-headline-lg text-secondary">{product?.price || "$4,299.00"}</span>
                            <span className="font-body-sm text-body-sm text-on-surface-variant">Starting from price</span>
                        </div>
                    </div>
                    <div className="space-y-4">
                        {(product?.features || [
                            { title: "Unrivaled Reliability", description: "Redundant power supplies and mission-critical components built for 99.999% uptime." },
                            { title: "Scalable Architecture", description: "Modular design allowing for rapid expansion of memory and storage as your data grows." }
                        ]).map((feature, idx) => (
                            <motion.div whileHover={{ x: 4 }} key={idx} className="flex items-start gap-3">
                                <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                                <div>
                                    <p className="font-body-md text-body-md font-bold">{feature.title}</p>
                                    <p className="font-body-sm text-body-sm text-on-surface-variant">{feature.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                    <div className="space-y-6 pt-6 border-t border-outline-variant">
                        <div className="space-y-3">
                            <label className="font-label-md text-label-md">Configuration Option</label>
                            <div className="grid grid-cols-2 gap-3">
                                {(product?.processors || [
                                    { name: "Dual Intel Xeon Silver", price: "Included", selected: true },
                                    { name: "Dual Intel Xeon Gold", price: "+$1,450.00", selected: false }
                                ]).map((proc, idx) => (
                                    <motion.button 
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => setSelectedProcessor(idx)}
                                        key={idx} 
                                        className={`p-3 rounded-lg text-left transition-all ${selectedProcessor === idx ? 'border-2 border-secondary bg-surface-container-low shadow-sm' : 'border border-outline-variant hover:border-secondary'}`}
                                    >
                                        <p className="font-label-sm text-label-sm text-primary">{proc.name}</p>
                                        <p className="font-body-sm text-body-sm text-on-surface-variant">{proc.price}</p>
                                    </motion.button>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-3">
                            <label className="font-label-md text-label-md">Memory / Storage</label>
                            <div className="grid grid-cols-3 gap-3">
                                {(product?.memoryOptions || [
                                    { size: "64GB", selected: false },
                                    { size: "128GB", selected: true },
                                    { size: "256GB", selected: false }
                                ]).map((mem, idx) => (
                                    <motion.button 
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => setSelectedMemory(idx)}
                                        key={idx} 
                                        className={`p-3 rounded-lg text-center transition-all ${selectedMemory === idx ? 'border-2 border-secondary bg-surface-container-low shadow-sm' : 'border border-outline-variant hover:border-secondary'}`}
                                    >
                                        <p className="font-label-sm text-label-sm text-primary">{mem.size}</p>
                                    </motion.button>
                                ))}
                            </div>
                        </div>
                        <div className="flex gap-4 pt-4">
                            {itemCount > 0 ? (
                                <div className="flex-1 bg-surface-container border border-outline rounded-lg flex items-center justify-between px-4 transition-all py-4">
                                    <button onClick={handleDecrement} className="text-primary hover:opacity-80 transition-opacity flex items-center justify-center">
                                        <span className="material-symbols-outlined">remove</span>
                                    </button>
                                    <span className="font-label-md text-label-md text-primary">{itemCount}</span>
                                    <button onClick={handleIncrement} className="text-primary hover:opacity-80 transition-opacity flex items-center justify-center">
                                        <span className="material-symbols-outlined">add</span>
                                    </button>
                                </div>
                            ) : (
                                <motion.button 
                                    whileHover={{ scale: 1.02, backgroundColor: "var(--secondary-dark)" }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleAddToCart} 
                                    className="flex-1 bg-secondary text-white py-4 px-8 rounded-lg font-label-md text-label-md hover:bg-opacity-90 transition-all flex items-center justify-center gap-2"
                                >
                                    <span className="material-symbols-outlined">shopping_cart</span>
                                    Add to Cart
                                </motion.button>
                            )}
                            <button className="flex-1 border-2 border-outline text-primary py-4 px-8 rounded-lg font-label-md text-label-md hover:bg-surface-container-high transition-all">
                                Request a Quote
                            </button>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </>
    );
};

export default ProductInfoSection;
