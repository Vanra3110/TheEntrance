import React from 'react';

const Footer = () => {
    return (
        <footer className="w-full py-4 px-margin-mobile md:px-margin-desktop flex flex-col md:flex-row justify-between items-center gap-4 bg-surface-container-low dark:bg-surface-container-lowest border-t border-outline-variant dark:border-outline">
            <div className="flex flex-col items-center md:items-start">
                <span className="font-label-md text-label-md font-bold text-primary dark:text-primary-fixed">TheEntrance</span>
                <p className="font-body-sm text-body-sm text-on-surface-variant">© 2026 The Entrance Solutions. All rights reserved.</p>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
                <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary dark:hover:text-secondary-fixed transition-colors cursor-pointer" href="/">Privacy Policy</a>
                <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary dark:hover:text-secondary-fixed transition-colors cursor-pointer" href="/">Terms of Service</a>
                <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary dark:hover:text-secondary-fixed transition-colors cursor-pointer" href="/">Security</a>
                <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary dark:hover:text-secondary-fixed transition-colors cursor-pointer" href="/">Help Center</a>
            </div>
        </footer>
    );
};

export default Footer;
