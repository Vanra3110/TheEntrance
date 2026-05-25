import React from 'react';

const Footer = () => {
    return (
        <footer className="w-full bg-surface dark:bg-surface-dim border-t border-outline-variant dark:border-outline text-on-surface-variant">
            <div className="w-full py-2 px-margin-mobile md:px-margin-desktop flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex flex-col gap-2 items-center md:items-start text-center md:text-left">
                    <span className="font-headline-md text-headline-md font-bold text-on-primary dark:text-primary-fixed !text-[24px]">TheEntrance</span>
                    <p className="font-body-sm text-body-sm text-on-surface-variant max-w-xs">Leading the charge in enterprise-grade server technology and global supply chain solutions.</p>
                </div>
                <div className="flex flex-wrap justify-center md:justify-end gap-6 md:gap-8">
                    <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors cursor-pointer" href="/">Privacy Policy</a>
                    <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors cursor-pointer" href="/">Terms of Service</a>
                    <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors cursor-pointer" href="/">Security</a>
                    <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors cursor-pointer" href="/">Compliance</a>
                    <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors cursor-pointer" href="/">Sitemap</a>
                </div>
            </div>
            <div className="w-full border-t border-outline-variant/30 pb-2 px-margin-mobile md:px-margin-desktop text-center">
                <p className="font-body-sm text-body-sm text-on-surface-variant">© 2026 The Entrance Solutions. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
