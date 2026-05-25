import React from "react";
import { motion } from "framer-motion";
import Button from "../../components/Button";
import TextType from '../../components/TypeText';
import { Link } from "react-router-dom";
import ShinyText from '../../components/ShinyText';
import SimpleImageSlider from "react-simple-image-slider";
import { useState, useEffect } from "react";
import img1 from '../../Assests/1.jpg';
import img2 from '../../Assests/2.jpg';
import img8 from '../../Assests/8.jpg';
import img14 from '../../Assests/14.jpg';
import img15 from '../../Assests/15.jpg';
import img16 from '../../Assests/16.jpg';

const images = [
    { url: img1 },
    { url: img2 },
    { url: img8 },
    { url: img14 },
    { url: img15 },
    { url: img16 },
];




const HeroSection = () => {
    const [showNavs, setShowNavs] = useState(window.innerWidth >= 1024);

    useEffect(() => {

        const handleResize = () => {
            setShowNavs(window.innerWidth >= 1024);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };

    }, []);

    return (
        <>
            <section className="relative h-screen flex items-center overflow-hidden ">
                <div className="absolute inset-0 opacity-50">
                    <div className="w-full h-full object-cover">
                        <SimpleImageSlider
                            width="100%"
                            height="100%"
                            images={images}
                            showBullets={false}
                            showNavs={showNavs}
                            autoPlay={true}
                            autoPlayDelay={2}
                            navStyle={2}
                        />
                    </div>
                </div>
                <div className="relative w-full px-margin-desktop max-w-container-max mx-auto z-10">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="max-w-3xl"
                    >
                        <h1 className="font-display-lg text-display-lg text-on-secondary mb-6 leading-tight">
                            <ShinyText
                                text="Enterprise-Grade Solutions for Your Business"
                                speed={2}
                                delay={0}
                                color="#38c8fcff"
                                shineColor="#ffffff"
                                spread={120}
                                direction="left"
                                yoyo={false}
                                pauseOnHover={false}
                                disabled={false}
                            />
                        </h1>
                        <TextType
                            className="font-body-lg text-body-lg text-white mb-10 max-w-lg text-[20px] "
                            text={['Scale your infrastructure with precision-engineered hardware and software designed for the demands of modern industry leaders.']}
                            typingSpeed={30}
                            pauseDuration={15000000000}
                            showCursor
                            cursorCharacter="_"
                            deletingSpeed={0}
                            variableSpeedEnabled={false}
                            variableSpeedMin={60}
                            variableSpeedMax={120}
                            cursorBlinkDuration={0.5}
                        />
                        <div className="flex flex-wrap gap-6">
                            <Link to='/home'><Button className="bg-secondary text-on-secondary px-8 py-4 font-label-md text-label-md rounded-lg shadow-lg hover:bg-secondary-container transition-all" text="Shop Now" /></Link>
                            <Link to='/home'><Button className="border border-outline-variant    text-on-secondary px-8 py-4 font-label-md text-label-md rounded-lg hover:bg-white/10 transition-all" text="View Solutions" icon="" /></Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </>
    )
}

export default HeroSection;