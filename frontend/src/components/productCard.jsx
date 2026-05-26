import React from 'react'
import BorderGlow from './BorderGlow'
import { useNavigate } from 'react-router-dom';
import TransitionAlerts from './minimalAlert';

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
            navigate('/');
            return;
        }
        
        const userData = JSON.parse(session);
        const cartItems = userData.cartItems || {};
        const currentCount = cartItems[props.id] || 0;
        const newCount = Math.max(0, currentCount + change);
        
        cartItems[props.id] = newCount;
        
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
            <BorderGlow
                className="bg-surface-container-low border border-outline-variant rounded-xl overflow-hidden hover:shadow-md transition-shadow h-full"
                edgeSensitivity={30}
                glowColor="217 100 60"
                borderRadius={12}
                glowRadius={40}
                glowIntensity={1}
                coneSpread={25}
                animated={false}
            >
                <div className="h-56 p-4 bg-surface-container-low overflow-hidden">
                    <img className="w-full h-full border border-none rounded-xl object-cover"
                        alt={props.alt}
                        src={props.src} />
                </div>
                <div className="p-6 bg-surface-container-low">
                    <h4 className="font-label-md text-label-md text-primary mb-1">{props.title}</h4>
                    <p className="font-body-sm text-body-sm text-primary mb-4">{props.price}</p>
                    <div className='flex flex-row justify-center items-center gap-4'>
                        {itemCount > 0 ? (
                            <div className="w-full py-3 bg-surface-container border border-outline rounded-lg flex items-center justify-between px-4 transition-all">
                                <button onClick={handleDecrement} className="text-primary hover:opacity-80 transition-opacity flex items-center justify-center">
                                    <span className="material-symbols-outlined text-sm">remove</span>
                                </button>
                                <span className="font-label-md text-label-md text-primary">{itemCount}</span>
                                <button onClick={handleIncrement} className="text-primary hover:opacity-80 transition-opacity flex items-center justify-center">
                                    <span className="material-symbols-outlined text-sm">add</span>
                                </button>
                            </div>
                        ) : (
                            <button
                                className="w-full py-3 bg-primary text-on-primary rounded-lg font-label-md text-label-md hover:opacity-90 hover:scale-105 transition-all flex items-center justify-center gap-2"
                                onClick={handleAddToCart}>
                                <span className="material-symbols-outlined text-sm text-on-primary">add_shopping_cart</span> Add to Cart
                            </button>
                        )}
                        <button
                            className="w-full py-3 bg-primary text-on-primary rounded-lg font-label-md text-label-md hover:opacity-90 hover:scale-105 transition-all flex items-center justify-center gap-2" onClick={handleBuyNow}>
                            <span className="material-symbols-outlined text-sm text-on-primary">shopping_bag</span> Buy Now
                        </button>
                    </div>
                </div>
            </BorderGlow>
        </>
    )
}

export default ProductCard