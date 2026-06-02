import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import HeroSection from './heroSection';
import FeaturesSection from './FeaturesSection';
import CategoriesSection from './CategoriesSection';
import FeaturedProductsSection from './FeaturedProductsSection';
import ImageTrail from '../../components/ImageTrail';
import img1 from '../../Assests/1.jpg';
import img2 from '../../Assests/2.jpg';
import img3 from '../../Assests/3.jpg';
import img4 from '../../Assests/4.jpg';
import img5 from '../../Assests/5.jpg';
import img6 from '../../Assests/6.jpg';
import img7 from '../../Assests/7.jpg';
import img8 from '../../Assests/8.jpg';
import LogoLoop from '../../components/LogoLoop';
import { motion } from 'framer-motion';

const imageLogos = [
    { src: "https://cdn.simpleicons.org/dell/007DB8", alt: "Dell", href: "https://www.dell.com", title: "Dell" },
    { src: "https://cdn.simpleicons.org/cisco/1BA0D7", alt: "Cisco", href: "https://www.cisco.com", title: "Cisco" },
    { src: "https://cdn.simpleicons.org/lenovo/E2231A", alt: "Lenovo", href: "https://www.lenovo.com", title: "Lenovo" },
    { src: "https://cdn.simpleicons.org/intel/0068B5", alt: "Intel", href: "https://www.intel.com", title: "Intel" },
    { src: "https://cdn.simpleicons.org/amd/ED1C24", alt: "AMD", href: "https://www.amd.com", title: "AMD" },
    { src: "https://cdn.simpleicons.org/nvidia/76B900", alt: "NVIDIA", href: "https://www.nvidia.com", title: "NVIDIA" },
    { src: "https://cdn.simpleicons.org/hp/0096D6", alt: "HP", href: "https://www.hp.com", title: "HP" },
];


const Home = () => {
    return (
        <div className="h-full w-full flex flex-col font-body-md text-body-md text-on-surface bg-surface dark:bg-surface-dim overflow-x-hidden">
            <Header />
            <main className="flex-grow h-full w-full">
                <HeroSection />
                <FeaturesSection />
                <div className='mt-20 mb-20 ' style={{ position: 'relative', overflow: 'hidden' }}>
                    {/* Basic horizontal loop */}
                    <LogoLoop
                        logos={imageLogos}
                        speed={100}
                        direction="left"
                        logoHeight={60}
                        gap={60}
                        hoverSpeed={0}
                        scaleOnHover
                        fadeOut
                        fadeOutColor="#ffffff"
                        ariaLabel="Hardware Partners"
                    />
                </div>
                <CategoriesSection />


                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="h-[500px] mb-12 mx-margin-desktop md:mx-margin-mobile bg-primary-container relative rounded-full overflow-hidden shadow-2xl">
                    <div className="absolute mx-10 inset-0 flex items-center justify-center opacity-50 text-6xl font-bold"><i>Hover Here To Have a Glimpse! Of Our Gallery</i></div>
                    <ImageTrail
                        items={[
                            img1,
                            img2,
                            img3,
                            img4,
                            img5,
                            img6,
                            img7,
                            img8,
                        ]}
                        variant="3"
                    />
                </motion.div>
                <FeaturedProductsSection />
            </main>
            <Footer />
        </div>
    );
};

export default Home;
