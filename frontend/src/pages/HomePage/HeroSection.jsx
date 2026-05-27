import React from "react";
import { motion } from "framer-motion";
import Button from "../../components/Button";
import TextType from '../../components/TypeText';
import { Link } from "react-router-dom";
import ShinyText from '../../components/ShinyText';
import SimpleImageSlider from "react-simple-image-slider";
// import { useState, useEffect } from "react";
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
    return (
        <>
            <section className="relative h-screen flex items-center overflow-hidden ">
                <div className="absolute inset-0 opacity-90">
                    <div className="w-full h-full object-cover">
                        <SimpleImageSlider
                            width="100%"
                            height="100%"
                            images={images}
                            showBullets={false}
                            showNavs={false}
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
                        className="max-w-1xl"
                    >
                        <h1 className="font-display-lg font-bold md:text[50px] text-[35px] md:text-[70px] text-on-surface mb-10 leading-tight">
                            <ShinyText
                                text="Enterprise-Grade Solutions for Your Business"
                                speed={2}
                                delay={0}
                                color="#3b82f6"
                                shineColor="#c3daffff"
                                spread={120}
                                direction="left"
                                yoyo={false}
                                pauseOnHover={false}
                                disabled={false}
                            />
                        </h1>
                        <div className="h-[200px] sm:h-[80px] md:h-[180px] lg:h-[140px] mb-12 md:mb-20 max-w-2xl block">
                            <TextType
                                className="font-body-lg text-body-lg text-[16px] md:text-[32px] "
                                text={[
                                    'Scale your infrastructure with precision-engineered hardware and software designed for the demands of modern industry leaders.',
                                    'Power your next-generation data centers with unparalleled computing performance and 99.999% uptime reliability.',
                                    'Accelerate AI workloads with state-of-the-art GPU clusters and high-bandwidth, ultra-low latency networking.',
                                    'Secure your enterprise assets with hardware root-of-trust, end-to-end encryption, and zero-trust architecture.',
                                    'Deploy mission-critical applications instantly across our globally distributed, high-density edge computing nodes.'
                                ]}
                                typingSpeed={50}
                                pauseDuration={3000}
                                showCursor={true}
                                cursorCharacter="|"
                                cursorColor="white"
                                deletingSpeed={30}
                                variableSpeedEnabled={false}
                                variableSpeedMin={60}
                                variableSpeedMax={120}
                                cursorBlinkDuration={0.5}
                                textColors={["#f8fafc", "#f1f5f9",
                                    "#e2e8f0", "#cbd5e1", "#f8fafc"]}
                            />
                        </div>
                        <div className="flex flex-wrap gap-6">
                            <Link to='/'><Button className="bg-secondary text-on-secondary px-8 py-4 font-label-md text-label-md rounded-lg shadow-lg hover:bg-secondary-container transition-all" text="Shop Now" /></Link>
                            <Link to='/'><Button className="border border-outline-variant text-on-secondary px-8 py-4 font-label-md text-label-md rounded-lg hover:bg-black/5 transition-all" text="View Solutions" icon="" /></Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </>
    )
}

export default HeroSection;