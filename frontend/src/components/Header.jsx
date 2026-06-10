import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Alert from './Alert';
// import Button from './Button';
import Menu from './Menu';
import BurgerMenu from './BurgerMenu';
import MobileDrawer from './Drawer';
import ShoppingCart from './ShoppingCart';
import SafeBackButton from './safeBackButton';

const Header = () => {
    const [isLoggedin, setIsLoggedin] = useState(false);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [cartCount, setCartCount] = useState(0);
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const updateSessionData = () => {
            const session = sessionStorage.getItem('session');
            if (session) {
                setIsLoggedin(true);
                const parsedData = JSON.parse(session);
                setUserData(parsedData);
                setCartCount(parsedData?.cartCount || 0);
            } else {
                setIsLoggedin(false);
                setUserData(null);
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
            navigate('/login');
        }
    };

    const handleConfirmLogout = () => {
        sessionStorage.removeItem('session');
        sessionStorage.removeItem('loginAlertShown');
        setIsLoggedin(false);
        setUserData(null);
        setCartCount(0);
        navigate('/transition', { state: { type: 'logout' } });
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
            <header className="fixed top-0 min-w-[100%] z-50 flex justify-between items-center px-margin-mobile md:px-margin-desktop py-4 max-w-container-max mx-auto bg-primary/90 backdrop-blur-md dark:bg-primary dark:text-surface-dim rounded-b-xl">
                <div className="flex items-center cursor-pointer active:opacity-80">
                    <Link to="/" className="flex items-center gap-1 hover:no-underline">
                        <span className="material-symbols-outlined text-surface dark:text-surface-dim" style={{ fontSize: '24px' }}>shield</span>
                        <span className="font-headline-md text-headline-md font-bold text-surface dark:text-surface-dim !text-[24px]">TheEntrance</span>
                    </Link>
                </div>
                <Menu userData={userData} />
                <div className="flex justify-center items-center gap-3">
                    {isLoggedin && <ShoppingCart badgeContent={cartCount} onClick={() => navigate('/cart')} />}
                    {isLoggedin && <BurgerMenu onLogoutClick={handleAuthClick} />}
                    {isLoggedin && <MobileDrawer userData={userData}/>}
                    {!isLoggedin && <button
                        className="flex px-6 py-2 border border-surface bg-primary dark:bg-primary text-white font-semibold rounded-full shadow-sm hover:scale-105 hover:bg-primary-container hover:text-on-primary-container hover:cursor-pointer active:scale-95 transition-all duration-200 flex items-center justify-center"
                        onClick={handleAuthClick}
                    >
                        Login
                    </button>}
                    <SafeBackButton />
                </div>
            </header>
        </>
    );
};

export default Header;
