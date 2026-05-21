import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Alert from './Alert';
import Button from './Button';
import Menu from './Menu';

const Header = () => {
    const [isLoggedin, setIsLoggedin] = useState(false);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const session = sessionStorage.getItem('session');
        if (session) {
            setIsLoggedin(true);
        }
    }, []);

    const session = sessionStorage.getItem('session');
    const userData = session ? JSON.parse(session) : null;

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
                {/* {isLoggedin && <nav className="hidden md:flex items-center space-x-8">
                    <Link to="/products"><Button className="text-on-surface-variant hover:text-secondary dark:hover:text-secondary-fixed-container transition-colors hover:scale-105 duration-200 font-body-md text-body-md" text="Products" /></Link><span className='cursor-default'> | </span>
                    <Link to="/solutions"><Button className="text-on-surface-variant hover:text-secondary dark:hover:text-secondary-fixed-container transition-colors hover:scale-105 duration-200 font-body-md text-body-md" text="Solutions" /></Link><span className='cursor-default'> | </span>
                    <Link to="/support"><Button className="text-on-surface-variant hover:text-secondary dark:hover:text-secondary-fixed-container transition-colors hover:scale-105 duration-200 font-body-md text-body-md" text="Support" /></Link><span className='cursor-default'> | </span>
                    <Link to="/enterprise"><Button className="text-on-surface-variant hover:text-secondary dark:hover:text-secondary-fixed-container transition-colors hover:scale-105 duration-200 font-body-md text-body-md" text="Enterprise" /></Link>
                </nav>} */}
                {isLoggedin && <Menu />}
                <div className="flex justify-center items-center gap-3">
                    {isLoggedin && <span className='hidden overflow-hidden md:flex whitespace-nowrap text-secondary font-bold dark:text-primary-fixed-container'>Hey {userData.first_name}!</span>}
                    <button
                        className="px-6 py-2 bg-primary dark:bg-primary-fixed text-white font-semibold rounded-full shadow-sm hover:scale-105 hover:cursor-pointer  active:scale-95 transition-all duration-200 flex items-center justify-center"
                        onClick={handleAuthClick}
                    >
                        {isLoggedin ? "Logout" : "Login"}
                    </button>
                </div>
            </header>
        </>
    );
};

export default Header;
