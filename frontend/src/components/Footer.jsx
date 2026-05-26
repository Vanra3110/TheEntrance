import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="w-full mt-16 md:mt-24">
            {/* Main Footer Links */}
            <div className="w-full py-12 md:py-20 px-margin-mobile md:px-margin-desktop bg-surface-container-lowest rounded-t-[32px] md:rounded-t-[40px] border-t border-x border-outline-variant/30 shadow-[0_-8px_30px_rgb(0,0,0,0.04)]">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
                    {/* Brand & Newsletter Column */}
                    <div className="lg:col-span-5 flex flex-col gap-6 md:gap-8 pr-0 lg:pr-12">
                        <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-secondary text-3xl md:text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>shield</span>
                            <span className="font-display-sm text-display-sm font-bold text-primary tracking-tight">TheEntrance</span>
                        </div>
                        <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                            Pioneering enterprise-grade server infrastructure and high-performance computing solutions. Engineered for scale, built for tomorrow.
                        </p>

                        <div className="flex flex-col gap-3 mt-2 md:mt-4">
                            <label className="font-label-md text-label-md text-primary font-bold">Subscribe to our newsletter</label>
                            <div className="flex w-full max-w-sm rounded-lg overflow-hidden border border-outline-variant focus-within:border-secondary focus-within:ring-1 focus-within:ring-secondary transition-all bg-surface-container-lowest">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="flex-1 bg-transparent px-4 py-3 outline-none font-body-md text-body-md text-on-surface"
                                />
                                <button className="bg-secondary text-on-secondary px-6 font-label-md text-label-md hover:bg-secondary-container transition-colors">
                                    Subscribe
                                </button>
                            </div>
                        </div>

                        <div className="flex gap-4 mt-4 md:mt-6">
                            <a href="#" className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center text-on-surface-variant hover:bg-primary hover:text-on-primary hover:border-primary transition-all group">
                                <span className="material-symbols-outlined text-[20px] group-hover:scale-110 transition-transform">share</span>
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center text-on-surface-variant hover:bg-primary hover:text-on-primary hover:border-primary transition-all group">
                                <span className="material-symbols-outlined text-[20px] group-hover:scale-110 transition-transform">mail</span>
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center text-on-surface-variant hover:bg-primary hover:text-on-primary hover:border-primary transition-all group">
                                <span className="material-symbols-outlined text-[20px] group-hover:scale-110 transition-transform">public</span>
                            </a>
                        </div>
                    </div>

                    {/* Links Columns */}
                    <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-10 lg:pl-8 mt-8 lg:mt-0">
                        <div className="flex flex-col gap-4">
                            <h4 className="font-label-lg text-label-lg font-bold text-primary mb-1 md:mb-2 uppercase tracking-wider">Hardware</h4>
                            <Link to="/products" className="font-body-md text-body-md text-on-surface-variant hover:text-secondary hover:translate-x-1 transition-all w-fit">Enterprise Servers</Link>
                            <Link to="/products" className="font-body-md text-body-md text-on-surface-variant hover:text-secondary hover:translate-x-1 transition-all w-fit">Workstations</Link>
                            <Link to="/products" className="font-body-md text-body-md text-on-surface-variant hover:text-secondary hover:translate-x-1 transition-all w-fit">Storage Arrays</Link>
                            <Link to="/products" className="font-body-md text-body-md text-on-surface-variant hover:text-secondary hover:translate-x-1 transition-all w-fit">Networking Gear</Link>
                        </div>

                        <div className="flex flex-col gap-4">
                            <h4 className="font-label-lg text-label-lg font-bold text-primary mb-1 md:mb-2 uppercase tracking-wider">Solutions</h4>
                            <Link to="/" className="font-body-md text-body-md text-on-surface-variant hover:text-secondary hover:translate-x-1 transition-all w-fit">Cloud Infrastructure</Link>
                            <Link to="/" className="font-body-md text-body-md text-on-surface-variant hover:text-secondary hover:translate-x-1 transition-all w-fit">AI & Deep Learning</Link>
                            <Link to="/" className="font-body-md text-body-md text-on-surface-variant hover:text-secondary hover:translate-x-1 transition-all w-fit">Data Centers</Link>
                            <Link to="/" className="font-body-md text-body-md text-on-surface-variant hover:text-secondary hover:translate-x-1 transition-all w-fit">Edge Computing</Link>
                        </div>

                        <div className="flex flex-col gap-4">
                            <h4 className="font-label-lg text-label-lg font-bold text-primary mb-1 md:mb-2 uppercase tracking-wider">Company</h4>
                            <Link to="/" className="font-body-md text-body-md text-on-surface-variant hover:text-secondary hover:translate-x-1 transition-all w-fit">About Us</Link>
                            <Link to="/" className="font-body-md text-body-md text-on-surface-variant hover:text-secondary hover:translate-x-1 transition-all w-fit">Careers</Link>
                            <Link to="/" className="font-body-md text-body-md text-on-surface-variant hover:text-secondary hover:translate-x-1 transition-all w-fit">Partners</Link>
                            <Link to="/" className="font-body-md text-body-md text-on-surface-variant hover:text-secondary hover:translate-x-1 transition-all w-fit">Contact Engineering</Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="w-full bg-surface-container py-6 px-margin-mobile md:px-margin-desktop border-t border-outline-variant/30">
                <div className="flex flex-col md:flex-row pt-4 pb-4 justify-between items-center gap-4 md:gap-6">
                    <p className="font-body-sm text-body-sm text-on-surface-variant text-center md:text-left">© 2026 The Entrance Solutions. All rights reserved.</p>
                    <div className="flex flex-wrap justify-center gap-x-6 md:gap-x-8 gap-y-3">
                        <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors cursor-pointer" href="/">Privacy Policy</a>
                        <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors cursor-pointer" href="/">Terms of Service</a>
                        <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors cursor-pointer" href="/">Security</a>
                        <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors cursor-pointer" href="/">Compliance</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
