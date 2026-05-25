import React from 'react'
import TransitionAlerts from '../../components/minimalAlert';

function Details() {
    const [showAlert, setShowAlert] = React.useState(false);

    const handleAddToCart = (e) => {
        e.preventDefault();
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);

        const session = sessionStorage.getItem('session');
        if (session) {
            const userData = JSON.parse(session);
            const newCount = (userData.cartCount || 0) + 1;
            sessionStorage.setItem('session', JSON.stringify({ ...userData, cartCount: newCount }));
            window.dispatchEvent(new Event('cartUpdated'));
        }
    };

    return (
        <>
            <TransitionAlerts open={showAlert} onClose={() => setShowAlert(false)} />
            <main className="w-full mx-auto px-margin-desktop mt-16 pt-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
                    <div className="space-y-6">
                        <div className="aspect-square rounded-lg overflow-hidden border border-outline-variant bg-white flex items-center justify-center p-8">
                            <img alt="Nexus-Core V2 Server" className="w-full h-full object-contain" src="https://lh3.googleusercontent.com/aida/ADBb0uiQXvUayPTnxd06r8RsRwvl8MQkYtRC9X8-tnD2kM9zf12M8wZTg3-5KHOLmODb49ouArWulgrlj1lMiy0XlsaxtCI72j-QjZOINGA4sb3lYSdcdOaguAhoh5pJqd_o6bkkoMRrH481MZq83xbhGDiMgSYWLbhDT3V0s1XpccvUu-tyXPd5gm4dwblU_yx78WoFt39VMBCUNZXuvK37V4WbdNAvH1qzKzOdnEDyG8-V7f8yvS-SrpZtng" />
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                            <div className="aspect-square border border-outline-variant rounded bg-white p-2">
                                <img alt="View 1" className="w-full h-full object-contain opacity-60 hover:opacity-100 cursor-pointer" src="https://lh3.googleusercontent.com/aida/ADBb0uiQXvUayPTnxd06r8RsRwvl8MQkYtRC9X8-tnD2kM9zf12M8wZTg3-5KHOLmODb49ouArWulgrlj1lMiy0XlsaxtCI72j-QjZOINGA4sb3lYSdcdOaguAhoh5pJqd_o6bkkoMRrH481MZq83xbhGDiMgSYWLbhDT3V0s1XpccvUu-tyXPd5gm4dwblU_yx78WoFt39VMBCUNZXuvK37V4WbdNAvH1qzKzOdnEDyG8-V7f8yvS-SrpZtng" />
                            </div>
                            <div className="aspect-square border border-outline-variant rounded bg-white p-2">
                                <img alt="View 2" className="w-full h-full object-contain opacity-60 hover:opacity-100 cursor-pointer" src="https://lh3.googleusercontent.com/aida/ADBb0uiQXvUayPTnxd06r8RsRwvl8MQkYtRC9X8-tnD2kM9zf12M8wZTg3-5KHOLmODb49ouArWulgrlj1lMiy0XlsaxtCI72j-QjZOINGA4sb3lYSdcdOaguAhoh5pJqd_o6bkkoMRrH481MZq83xbhGDiMgSYWLbhDT3V0s1XpccvUu-tyXPd5gm4dwblU_yx78WoFt39VMBCUNZXuvK37V4WbdNAvH1qzKzOdnEDyG8-V7f8yvS-SrpZtng" />
                            </div>
                            <div className="aspect-square border border-outline-variant rounded bg-white p-2">
                                <img alt="View 3" className="w-full h-full object-contain opacity-60 hover:opacity-100 cursor-pointer" src="https://lh3.googleusercontent.com/aida/ADBb0uiQXvUayPTnxd06r8RsRwvl8MQkYtRC9X8-tnD2kM9zf12M8wZTg3-5KHOLmODb49ouArWulgrlj1lMiy0XlsaxtCI72j-QjZOINGA4sb3lYSdcdOaguAhoh5pJqd_o6bkkoMRrH481MZq83xbhGDiMgSYWLbhDT3V0s1XpccvUu-tyXPd5gm4dwblU_yx78WoFt39VMBCUNZXuvK37V4WbdNAvH1qzKzOdnEDyG8-V7f8yvS-SrpZtng" />
                            </div>
                            <div className="aspect-square border border-outline-variant rounded bg-white p-2 flex items-center justify-center">
                                <span className="material-symbols-outlined text-outline">more_horiz</span>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-8">
                        <div>
                            <span className="font-label-md text-label-md text-secondary uppercase tracking-wider">Enterprise Performance</span>
                            <h1 className="font-display-lg text-display-lg text-primary mt-2">Nexus-Core V2 Server</h1>
                            <div className="flex items-baseline gap-4 mt-4">
                                <span className="font-headline-lg text-headline-lg text-secondary">$4,299.00</span>
                                <span className="font-body-sm text-body-sm text-on-surface-variant">Starting from price</span>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                                <div>
                                    <p className="font-body-md text-body-md font-bold">Unrivaled Reliability</p>
                                    <p className="font-body-sm text-body-sm text-on-surface-variant">Redundant power supplies and mission-critical components built for 99.999% uptime.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                                <div>
                                    <p className="font-body-md text-body-md font-bold">Scalable Architecture</p>
                                    <p className="font-body-sm text-body-sm text-on-surface-variant">Modular design allowing for rapid expansion of memory and storage as your data grows.</p>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-6 pt-6 border-t border-outline-variant">
                            <div className="space-y-3">
                                <label className="font-label-md text-label-md">Processor Configuration</label>
                                <div className="grid grid-cols-2 gap-3">
                                    <button className="p-3 border-2 border-secondary bg-surface-container-low rounded-lg text-left">
                                        <p className="font-label-sm text-label-sm">Dual Intel Xeon Silver</p>
                                        <p className="font-body-sm text-body-sm text-on-surface-variant">Included</p>
                                    </button>
                                    <button className="p-3 border border-outline-variant hover:border-secondary transition-colors rounded-lg text-left">
                                        <p className="font-label-sm text-label-sm">Dual Intel Xeon Gold</p>
                                        <p className="font-body-sm text-body-sm text-on-surface-variant">+$1,450.00</p>
                                    </button>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <label className="font-label-md text-label-md">Memory (DDR5 ECC)</label>
                                <div className="grid grid-cols-3 gap-3">
                                    <button className="p-3 border border-outline-variant hover:border-secondary transition-colors rounded-lg text-center">
                                        <p className="font-label-sm text-label-sm">64GB</p>
                                    </button>
                                    <button className="p-3 border-2 border-secondary bg-surface-container-low rounded-lg text-center">
                                        <p className="font-label-sm text-label-sm">128GB</p>
                                    </button>
                                    <button className="p-3 border border-outline-variant hover:border-secondary transition-colors rounded-lg text-center">
                                        <p className="font-label-sm text-label-sm">256GB</p>
                                    </button>
                                </div>
                            </div>
                            <div className="flex gap-4 pt-4">
                                <button onClick={handleAddToCart} className="flex-1 bg-secondary text-white py-4 px-8 rounded-lg font-label-md text-label-md hover:bg-opacity-90 transition-all flex items-center justify-center gap-2">
                                    <span className="material-symbols-outlined">shopping_cart</span>
                                    Add to Cart
                                </button>
                                <button className="flex-1 border-2 border-outline text-primary py-4 px-8 rounded-lg font-label-md text-label-md hover:bg-surface-container-high transition-all">
                                    Request a Quote
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter mb-16">
                    <div className="md:col-span-2 bento-card p-12 rounded-xl flex flex-col justify-center">
                        <h2 className="font-headline-lg text-headline-lg text-primary mb-6">Built for the Modern Enterprise</h2>
                        <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed mb-8">
                            The Nexus-Core V2 isn't just a server; it's the backbone of your digital infrastructure. Engineered for high-density computing environments, it delivers exceptional performance-per-watt and industry-leading thermal management. Whether you're running complex AI simulations or hosting high-traffic databases, the V2 ensures consistent throughput with zero bottlenecks.
                        </p>
                        <div className="grid grid-cols-2 gap-8">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-primary-container rounded-full flex items-center justify-center">
                                    <span className="material-symbols-outlined text-secondary-fixed">bolt</span>
                                </div>
                                <span className="font-label-md text-label-md">Next-Gen Speed</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-primary-container rounded-full flex items-center justify-center">
                                    <span className="material-symbols-outlined text-secondary-fixed">security</span>
                                </div>
                                <span className="font-label-md text-label-md">Hardware Root-of-Trust</span>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-gutter">
                        <div className="bento-card p-8 rounded-xl bg-tertiary text-on-tertiary">
                            <span className="material-symbols-outlined text-4xl mb-4">support_agent</span>
                            <h3 className="font-headline-md text-headline-md mb-2">Expert Support</h3>
                            <p className="font-body-sm text-body-sm text-on-tertiary-container">24/7 dedicated engineering support for all enterprise clients. Guaranteed 4-hour on-site response time.</p>
                        </div>
                        <div className="bento-card p-8 rounded-xl">
                            <span className="material-symbols-outlined text-secondary text-4xl mb-4">local_shipping</span>
                            <h3 className="font-headline-md text-headline-md mb-2">Express Deployment</h3>
                            <p className="font-body-sm text-body-sm text-on-surface-variant">Pre-configured and tested hardware shipped globally within 3-5 business days.</p>
                        </div>
                    </div>
                </div>
                <div className="mb-16">
                    <h2 className="font-headline-lg text-headline-lg text-primary mb-8">Technical Specifications</h2>
                    <div className="bento-card rounded-xl overflow-hidden">
                        <div className="grid grid-cols-1 md:grid-cols-2">
                            <div className="spec-row p-6 border-b border-outline-variant flex justify-between">
                                <span className="font-label-md text-label-md text-on-surface-variant">Processor</span>
                                <span className="font-body-md text-body-md font-medium">Dual Intel Xeon Silver 4410Y (12C/24T)</span>
                            </div>
                            <div className="spec-row p-6 border-b border-outline-variant flex justify-between">
                                <span className="font-label-md text-label-md text-on-surface-variant">Memory Slots</span>
                                <span className="font-body-md text-body-md font-medium">16x DIMM Slots (Up to 4TB)</span>
                            </div>
                            <div className="spec-row p-6 border-b border-outline-variant flex justify-between">
                                <span className="font-label-md text-label-md text-on-surface-variant">Memory Included</span>
                                <span className="font-body-md text-body-md font-medium">128GB DDR5 ECC (4800MT/s)</span>
                            </div>
                            <div className="spec-row p-6 border-b border-outline-variant flex justify-between">
                                <span className="font-label-md text-label-md text-on-surface-variant">Networking</span>
                                <span className="font-body-md text-body-md font-medium">2x 10GbE SFP+ / 2x 1GbE RJ45</span>
                            </div>
                            <div className="spec-row p-6 border-b md:border-b-0 border-outline-variant flex justify-between">
                                <span className="font-label-md text-label-md text-on-surface-variant">Storage Bays</span>
                                <span className="font-body-md text-body-md font-medium">12x 3.5" Hot-Swap SAS/SATA</span>
                            </div>
                            <div className="spec-row p-6 flex justify-between">
                                <span className="font-label-md text-label-md text-on-surface-variant">Power Supply</span>
                                <span className="font-body-md text-body-md font-medium">Dual 1100W Redundant (Platinum)</span>
                            </div>
                            <div className="spec-row p-6 border-t border-outline-variant flex justify-between md:col-span-2">
                                <span className="font-label-md text-label-md text-on-surface-variant">Form Factor</span>
                                <span className="font-body-md text-body-md font-medium">2U Rackmount (Rails Included)</span>
                            </div>
                        </div>
                    </div>
                </div>
                <section className="rounded-xl overflow-hidden relative h-[400px] mb-16">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary via-transparent to-transparent z-10"></div>
                    <img alt="Close up of server interior" className="w-full h-full object-cover" data-alt="A professional high-angle macro photograph showing the interior of an enterprise server rack with glowing blue and green LED status lights. The components are meticulously arranged with clean cable management in a darkened, high-tech data center environment. The lighting is moody and precise, highlighting the metallic textures of the heatsinks and the intricate circuitry of the motherboard." src="https://lh3.googleusercontent.com/aida/ADBb0uiQXvUayPTnxd06r8RsRwvl8MQkYtRC9X8-tnD2kM9zf12M8wZTg3-5KHOLmODb49ouArWulgrlj1lMiy0XlsaxtCI72j-QjZOINGA4sb3lYSdcdOaguAhoh5pJqd_o6bkkoMRrH481MZq83xbhGDiMgSYWLbhDT3V0s1XpccvUu-tyXPd5gm4dwblU_yx78WoFt39VMBCUNZXuvK37V4WbdNAvH1qzKzOdnEDyG8-V7f8yvS-SrpZtng" />
                    <div className="absolute inset-0 z-20 flex flex-col justify-center px-12 max-w-2xl">
                        <h3 className="font-display-lg text-display-lg text-white mb-4">Precision Engineered</h3>
                        <p className="font-body-lg text-body-lg text-on-primary-container">Every component is validated through a rigorous 72-hour burn-in process to ensure immediate reliability upon deployment.</p>
                    </div>
                </section>
            </main>
        </>
    )
}

export default Details;