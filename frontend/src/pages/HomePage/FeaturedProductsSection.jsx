import React from 'react';
import { motion } from 'framer-motion';
import BorderGlow from '../../components/BorderGlow';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import TransitionAlerts from '../../components/minimalAlert';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { staggerChildren: 0.15 }
    }
};

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};



const FeaturedProductsSection = () => {
    const navigate = useNavigate();
    const [showAlert, setShowAlert] = React.useState(false);

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('Add to cart');
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);

        const session = sessionStorage.getItem('session');
        if (!session) {
            navigate('/');
            return;
        }

        const userData = JSON.parse(session);
        const newCount = (userData.cartCount || 0) + 1;

        sessionStorage.setItem('session', JSON.stringify({ ...userData, cartCount: newCount }));
        window.dispatchEvent(new Event('cartUpdated'));
    };

    const handleBuyNow = (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('Buy now');
        navigate('/checkout');

    };

    return (
        <>
            <TransitionAlerts open={showAlert} onClose={() => setShowAlert(false)} />
            <section className="py-24 bg-surface-container">
                <div className="px-margin-mobile md:px-margin-desktop w-full">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <motion.h2
                                className="font-headline-lg text-headline-lg text-primary mb-2 overflow-hidden whitespace-nowrap"
                                initial={{ width: 0 }}
                                whileInView={{ width: "100%", transition: { duration: 1, ease: "easeInOut" } }}
                                viewport={{ once: true, amount: 0.5 }}
                            >Featured Products</motion.h2>
                            <motion.p className="font-body-md text-body-md text-on-surface-variant overflow-hidden whitespace-nowrap"
                                initial={{ width: 0 }}
                                whileInView={{ width: "100%", transition: { duration: 1, delay: 0.2, ease: "easeInOut" } }}
                                viewport={{ once: true, amount: 0.5 }}>Top-performing assets for Q4 scaling.</motion.p>
                        </div>
                        <Link to="/home" className="text-secondary font-label-md text-label-md underline" >View All Products</Link>
                    </div>
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter"
                    >
                        <motion.div variants={cardVariants} className="h-full">
                            <Link to="/details" style={{ textDecoration: 'none' }}><BorderGlow
                                className="bg-surface-container-low border border-outline-variant rounded-xl overflow-hidden hover:shadow-md transition-shadow h-full"
                                edgeSensitivity={30}
                                glowColor="217 100 60"
                                // backgroundColor="#000000ff"
                                borderRadius={12}
                                glowRadius={40}
                                glowIntensity={1}
                                coneSpread={25}
                                animated={false}
                            // colors={['#ef32d6ff', '#004ccc', '#b0c8eb']}
                            >
                                <div className="h-56 p-4 bg-surface-container-low overflow-hidden">
                                    <img className="w-full h-full border border-none rounded-xl object-cover"
                                        alt="Close up photography of professional rack-mounted server units in a data center. The hardware is sleek, featuring status LEDs in soft blue, brushed aluminum finishes, and precision-engineered cooling vents. The lighting is cool and clinical, reinforcing a brand aesthetic of reliability and enterprise-level power."
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCtfZujjCbXR1FlpM_7x3M8g0lKaOZYY5yzsGokOA6mF7-bG12N9IOqlcFx_bsXuEKIxNrsgmyIj9_JKVdA-i-ahyaino7rqAV9gZB3lHnmwAsMO6HHWNsCb3ank-T1fY5tY0FDVOUJdw6gEt8z7Kbh9tj1rq0vHzxWn76MwpP7x5Hfc4zdciERC9dYrWLQvPxWfIGOIsQVP5PH5JYyZk5iLCUWHijNzwAeFtj8g-0WeFLXxzxPrjwwxe7ujRSpdA9N-5TnqagOeHo" />
                                </div>
                                <div className="p-6 bg-surface-container-low">
                                    <h4 className="font-label-md text-label-md text-primary mb-1">Nexus-Core V2 Server</h4>
                                    <p className="font-body-sm text-body-sm text-primary mb-4">$4,299.00</p>
                                    <div className='flex flex-row justify-center items-center gap-4'>
                                        <button
                                            className="w-full py-3 bg-primary text-on-primary rounded-lg font-label-md text-label-md hover:opacity-90 hover:scale-105 transition-all flex items-center justify-center gap-2"

                                            onClick={handleAddToCart}>
                                            <span className="material-symbols-outlined text-sm text-on-primary">add_shopping_cart</span> Add to Cart
                                        </button>
                                        <button
                                            className="w-full py-3 bg-primary text-on-primary rounded-lg font-label-md text-label-md hover:opacity-90 hover:scale-105 transition-all flex items-center justify-center gap-2" onClick={handleBuyNow}>
                                            <span className="material-symbols-outlined text-sm text-on-primary">shopping_bag</span> Buy Now
                                        </button>
                                    </div>
                                </div>
                            </BorderGlow></Link>
                        </motion.div>

                        <motion.div variants={cardVariants} className="h-full">
                            <Link to="/details"><BorderGlow
                                className="border border-outline-variant rounded-xl overflow-hidden hover:shadow-md transition-shadow h-full"
                                edgeSensitivity={30}
                                glowColor="217 100 60"
                                // backgroundColor="#ffffff"
                                borderRadius={12}
                                glowRadius={40}
                                glowIntensity={1}
                                coneSpread={25}
                                animated={false}
                            // colors={['#000f22', '#004ccc', '#b0c8eb']}
                            >
                                <div className="h-56 p-4 bg-surface-container-low overflow-hidden">
                                    <img className="w-full h-full border border-none rounded-xl object-cover"
                                        alt="A high-end network security appliance shown in a professional studio setting. The device is matte black with minimal branding, featuring glowing green and blue indicator lights that signify active data protection. The background is a gradient of soft grey and navy, maintaining a clean corporate aesthetic."
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBzN8F2-N9ZrMZOLtcNVuf-tPAiYqS37ZX6HpMCKzDR6K68LuZazr94c-4dr3gb6vZyGfH3wgc-rGoGKXgf89T1O6WhcAhL4LR5_AJnn3iC6B-PYGRN-SNj8WtSrCY_GjwgvX3cKV8rZxA2VL_1GyIGq47jqHPTisEmjA9fKQYks0iJYj8ZbwYyhghiMB0LgPoF2V2xDZzoKV80RyYJBhHNA-qCvI6Fh6GKey48c5aec9klxTE14aeMJhStSZJM1cUd4fIlRV5ieeQ" />
                                </div>
                                <div className="p-6 bg-surface-container-low">
                                    <h4 className="font-label-md text-label-md text-primary mb-1">RenderPro Workstation</h4>
                                    <p className="font-body-sm text-body-sm text-primary mb-4">$3,850.00</p>
                                    <div className='flex flex-row justify-center items-center gap-4'>
                                        <button
                                            className="w-full py-3 bg-primary text-on-primary rounded-lg font-label-md text-label-md hover:opacity-90 hover:scale-105 transition-all flex items-center justify-center gap-2"

                                            onClick={handleAddToCart}>
                                            <span className="material-symbols-outlined text-sm text-on-primary">add_shopping_cart</span> Add to Cart
                                        </button>
                                        <button
                                            className="w-full py-3 bg-primary text-on-primary rounded-lg font-label-md text-label-md hover:opacity-90 hover:scale-105 transition-all flex items-center justify-center gap-2" onClick={handleBuyNow}>
                                            <span className="material-symbols-outlined text-sm text-on-primary">shopping_bag</span> Buy Now
                                        </button>
                                    </div>
                                </div>
                            </BorderGlow></Link>
                        </motion.div>

                        <motion.div variants={cardVariants} className="h-full">
                            <Link to="/details"><BorderGlow
                                className="bg-surface-container-low border border-outline-variant rounded-xl overflow-hidden hover:shadow-md transition-shadow h-full"
                                // edgeSensitivity={30}
                                // glowColor="217 100 60"
                                // backgroundColor="#ffffff"
                                borderRadius={12}
                            // glowRadius={40}
                            // glowIntensity={1}
                            // coneSpread={25}
                            // animated={false}
                            // colors={['#000f22', '#004ccc', '#b0c8eb']}
                            >
                                <div className="h-56 p-4 bg-surface-container-low overflow-hidden">
                                    <img className="w-full h-full border border-none rounded-xl object-cover"
                                        alt="An industrial-grade network switch with multiple ethernet ports illuminated by high-speed data activity lights. The composition is angled to show the depth and complexity of the hardware, styled with a professional corporate look using shades of navy blue and metallic silver in a high-key lighting environment."
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAaCQY1WoIhO1O4mnrEZ4FZS_OyHcWXOB_9_EcZNLHVzeqyiU5bdleKEWPU-44Zv44lokyBVtGR1yAfoMa_H3tUQubDX_6LxV1tOC8nMUmDPpMjfExCCRqLhUTi2TeIBCQnqC_IKFYydxAReAhEhrjxgPxsrOpL56L-zK3y632rrBZQKBRIuKka5L63n-7uPaYLBnNUeUFyVZyi6sY68sk0rMJJveqFA45F-ry5Y52v9dHzxLaj0CGW8J15HkL1wqe1iuMZ2i9ScSE" />
                                </div>
                                <div className="p-6 bg-surface-container-low">
                                    <h4 className="font-label-md text-label-md text-primary mb-1">Precision Book Pro</h4>
                                    <p className="font-body-sm text-body-sm text-primary mb-4">$2,499.00</p>
                                    <div className='flex flex-row justify-center items-center gap-4'>
                                        <button
                                            className="w-full py-3 bg-primary text-on-primary rounded-lg font-label-md text-label-md hover:opacity-90 hover:scale-105 transition-all flex items-center justify-center gap-2"

                                            onClick={handleAddToCart}>
                                            <span className="material-symbols-outlined text-sm text-on-primary">add_shopping_cart</span> Add to Cart
                                        </button>
                                        <button
                                            className="w-full py-3 bg-primary text-on-primary rounded-lg font-label-md text-label-md hover:opacity-90 hover:scale-105 transition-all flex items-center justify-center gap-2" onClick={handleBuyNow}>
                                            <span className="material-symbols-outlined text-sm text-on-primary">shopping_bag</span> Buy Now
                                        </button>
                                    </div>
                                </div>
                            </BorderGlow></Link>
                        </motion.div>

                        <motion.div variants={cardVariants} className="h-full">
                            <Link to="/details"><BorderGlow
                                className="bg-surface-container border border-outline-variant rounded-xl overflow-hidden hover:shadow-md transform transition-all duration-300 hover:scale-105 h-full"
                                edgeSensitivity={30}
                                glowColor="217 100 60"
                                // backgroundColor="#ffffff"
                                borderRadius={12}
                                glowRadius={40}
                                glowIntensity={1}
                                coneSpread={25}
                                animated={false}
                            // colors={['#000f22', '#004ccc', '#b0c8eb']}
                            >
                                <div className="h-56 p-4 bg-surface-container-low overflow-hidden">
                                    <img className="w-full h-full border border-none rounded-xl object-cover"
                                        alt="A premium executive workstation laptop sitting on a minimalist wooden desk. The screen displays a complex data visualization dashboard in navy and teal. The surrounding environment is a bright, airy office with floor-to-ceiling windows, reflecting a modern, high-performance professional lifestyle."
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuA5umdlj0a3zltxPIrEbWgUFsN25Ni4sAupFtBJWGpewMi0uuVj6pdqDayBQXDvV-32U78zfNF5j5s0fta-eO8c814d4z0ul2N26mIPgMAMZuxMTMp27b4wMFlaYVwEVAOP9ft0cqr_nbHm5lAEa_VypF57axl-q64KIk5ewQsvhPuMhDy2FvIV-tqKoCOnFTpXALFPZuMRAfDJ2FlnYTF5ckf4YFt921Kkbu6-AsmSNllFc5kd4Ix28qV7Pl3ZE9WTTSrDEKohmuc" />
                                </div>
                                <div className="p-6 bg-surface-container-low">
                                    <h4 className="font-label-md text-label-md text-primary mb-1">DataStack SSD Array</h4>
                                    <p className="font-body-sm text-body-sm text-primary mb-4">$1,200.00</p>
                                    <div className='flex flex-row justify-center items-center gap-4'>
                                        <button
                                            className="w-full py-3 bg-primary text-on-primary rounded-lg font-label-md text-label-md hover:opacity-90 hover:scale-105 transition-all flex items-center justify-center gap-2"

                                            onClick={handleAddToCart}>
                                            <span className="material-symbols-outlined text-sm text-on-primary">add_shopping_cart</span> Add to Cart
                                        </button>
                                        <button
                                            className="w-full py-3 bg-primary text-on-primary rounded-lg font-label-md text-label-md hover:opacity-90 hover:scale-105 transition-all flex items-center justify-center gap-2"
                                            onClick={handleBuyNow}>
                                            <span className="material-symbols-outlined text-sm text-on-primary">shopping_bag</span> Buy Now
                                        </button>
                                    </div>
                                </div>
                            </BorderGlow></Link>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </>
    );
};

export default FeaturedProductsSection;
