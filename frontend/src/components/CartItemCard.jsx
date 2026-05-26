import React from 'react';

function CartItemCard(props) {
    const updateCart = (change) => {
        const session = sessionStorage.getItem('session');
        if (!session) return;

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

        window.dispatchEvent(new Event('cartUpdated'));
    };

    const handleRemove = () => {
        const session = sessionStorage.getItem('session');
        if (!session) return;

        const userData = JSON.parse(session);
        const cartItems = userData.cartItems || {};

        if (cartItems[props.id]) {
            delete cartItems[props.id];
        }

        const totalCount = Object.values(cartItems).reduce((sum, count) => sum + count, 0);

        sessionStorage.setItem('session', JSON.stringify({
            ...userData,
            cartItems,
            cartCount: totalCount
        }));

        window.dispatchEvent(new Event('cartUpdated'));
    };

    return (
        <div className='enterprise-card bg-surface-container-high rounded-full p-6 flex flex-col md:flex-row gap-6 items-center'>
            <div className="w-full md:w-48 h-36 bg-surface-container-highest rounded-lg overflow-hidden flex-shrink-0">
                <img alt={props.alt} className="w-full h-full object-cover" src={props.scr} />
            </div>
            <div className="flex-grow">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="font-headline-md text-headline-md text-primary">{props.title}</h3>
                        <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 max-w-md">{props.description}</p>
                    </div>
                    <span className="font-headline-md text-headline-md text-primary">{props.price}</span>
                </div>
                <div className="flex items-center justify-between mt-6">
                    <div className="flex items-center border border-outline-variant rounded p-1 bg-surface-container-low">
                        <button className="p-1 hover:bg-surface-container-highest rounded text-on-surface-variant transition-colors" onClick={() => updateCart(-1)}>
                            <span className="material-symbols-outlined text-[20px]" data-icon="remove">remove</span>
                        </button>
                        <input className="w-10 text-center border-none bg-transparent font-label-md text-label-md focus:ring-0" readOnly type="text" value={props.quantity || 1} />
                        <button className="p-1 hover:bg-surface-container-highest rounded text-on-surface-variant transition-colors" onClick={() => updateCart(1)}>
                            <span className="material-symbols-outlined text-[20px]" data-icon="add">add</span>
                        </button>
                    </div>
                    <button className="flex items-center gap-1 text-error font-label-md text-label-md
                    border border-error border-outline-variant
                    p-3
                    rounded-full bg-surface-container hover:bg-error/5 hover:scale-105 active:scale-95 transition-all" onClick={handleRemove}>
                        <span className="material-symbols-outlined text-[18px]" data-icon="delete">delete</span>
                        Remove
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CartItemCard;
