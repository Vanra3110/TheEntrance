import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Alert from './Alert';
// import Button from './Button';
import Menu from './Menu';
import BurgerMenu from './BurgerMenu';
import MobileDrawer from './Drawer';
import ShoppingCart from './ShoppingCart';

const Header = () => {
    const [isLoggedin, setIsLoggedin] = useState(false);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [cartCount, setCartCount] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const updateSessionData = () => {
            const session = sessionStorage.getItem('session');
            if (session) {
                setIsLoggedin(true);
                const userData = JSON.parse(session);
                setCartCount(userData?.cartCount || 0);
            } else {
                setIsLoggedin(false);
                setCartCount(0);
            }
        };

        updateSessionData();

        window.addEventListener('cartUpdated', updateSessionData);
        window.addEventListener('storage', updateSessionData);

        return () => {
            window.removeEventListener('cartUpdated', updateSessionData);
            window.removeEventListener('storage', updateSessionData);
        };
    }, []);

    const handleAuthClick = () => {
        if (isLoggedin) {
            setIsAlertOpen(true);
        } else {
            navigate('/');
        }
    };

    const handleConfirmLogout = () => {
        sessionStorage.removeItem('session');
        sessionStorage.removeItem('loginAlertShown');
        setIsLoggedin(false);
        setCartCount(0);
        navigate('/');
    };

    return (
        <>
            <Alert
                isOpen={isAlertOpen}
                onClose={() => setIsAlertOpen(false)}
                onConfirm={handleConfirmLogout}
                title="Confirm Logout"
                message="Are you sure you want to logout of your account?"
                type="danger"
                confirmText="Logout"
                cancelText="Cancel"
                className="inset-0"
            />
            <header className="fixed opacity-90 top-0 min-w-[100%] z-50 flex justify-between items-center px-margin-mobile md:px-margin-desktop py-4 max-w-container-max mx-auto bg-surface dark:bg-surface-dim border-b border-outline-variant dark:border-outline">
                <div className="flex items-center cursor-pointer active:opacity-80">
                    <Link to={isLoggedin ? "/home" : "/"} className="flex items-center gap-1 hover:no-underline">
                        <span className="material-symbols-outlined text-primary dark:text-primary-fixed" style={{ fontSize: '24px' }}>shield</span>
                        <span className="font-headline-md text-headline-md font-bold text-primary dark:text-primary-fixed !text-[24px]">TheEntrance</span>
                    </Link>
                </div>
                {isLoggedin && (
                    <>
                        <Menu />
                    </>
                )}
                <div className="flex justify-center items-center gap-3">
                    {isLoggedin && <ShoppingCart badgeContent={cartCount} onClick={() => navigate('/cart')} />}
                    {isLoggedin && <BurgerMenu onLogoutClick={handleAuthClick} />}
                    {isLoggedin && <MobileDrawer />}
                    {!isLoggedin && <button
                        className="hidden md:flex px-6 py-2 bg-primary dark:bg-primary-fixed text-white font-semibold rounded-full shadow-sm hover:scale-105 hover:cursor-pointer  active:scale-95 transition-all duration-200 flex items-center justify-center"
                        onClick={handleAuthClick}
                    >
                        Login
                    </button>}
                </div>
            </header>
        </>
    );
};

export default Header;
