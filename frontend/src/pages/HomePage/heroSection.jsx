import React from "react";
import { motion } from "framer-motion";
import Button from "../../components/Button";
import TextType from '../../components/TypeText';
import { Link } from "react-router-dom";
import ShinyText from '../../components/ShinyText';
import SimpleImageSlider from "react-simple-image-slider";
// import { useState, useEffect } from "react";
import img2 from '../../Assests/2.jpg';
import img8 from '../../Assests/8.jpg';
import img14 from '../../Assests/14.jpg';
import img15 from '../../Assests/15.jpg';
import img16 from '../../Assests/16.jpg';
import chatGptBg from '../../Assests/ChatGPT Image May 28, 2026, 03_41_03 PM.png';
import ShapeBlur from '../../components/ShapeBlur';


const images = [
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
                    <div
                        className="max-w-1xl"
                    >
                        <motion.h1
                            initial={{ opacity: 0, scale: 1.2 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, ease: "easeInOut" }}
                            className="font-display-lg font-bold md:text[50px] text-[35px] md:text-[70px] text-on-surface mb-10 leading-tight">
                            <ShinyText
                                text="Enterprise-Grade Solutions for Your Business"
                                speed={2}
                                delay={0}
                                color="#6d28d9"
                                shineColor="#ede9fe"
                                spread={120}
                                direction="left"
                                yoyo={false}
                                pauseOnHover={false}
                                disabled={false}
                            />
                        </motion.h1>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, ease: "easeInOut" }}
                            className="h-[200px] sm:h-[80px] md:h-[180px] lg:h-[140px] mb-12 md:mb-20 max-w-2xl block">
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

                                cursorBlinkDuration={0.5}
                                textColors={["#f8fafc", "#f1f5f9",
                                    "#e2e8f0", "#cbd5e1", "#f8fafc"]}
                            />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, ease: "easeInOut", delay: 0.5 }}
                            className="flex flex-wrap gap-6">
                            <Link to='/products'><Button className="bg-primary text-white px-8 py-4 font-label-md text-label-md rounded-lg shadow-lg hover:bg-primary-container hover:text-on-primary-container transition-all" text="Shop Now" /></Link>
                            <Link to='/products'><Button className="border border-outline-variant text-primary px-8 py-4 font-label-md text-label-md rounded-lg hover:bg-transparent hover:text-primary-container transition-all" text="View Solutions" icon="" /></Link>
                        </motion.div>
                    </div>
                    {/* <div style={{ position: 'relative', height: '500px', overflow: 'hidden' }}> */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1, rotate: 180 }}
                        viewport={{ once: true }}
                        transition={{ duration: 3, ease: "easeInOut" }}
                        className="absolute bottom-10 right-10 w-[200px] h-[200px] z-0 pointer-events-none">
                        {[0, 60, 120, 180, 240, 300].map((angle, index) => (
                            <div
                                key={index}
                                className="hidden md:block absolute top-1/2 left-1/2 w-[200px] h-[200px] -mt-[100px] -ml-[100px] overflow-hidden"
                                style={{
                                    transform: `rotate(${angle}deg) translateY(-100px) rotate(-${angle}deg)`
                                }}
                            >
                                <ShapeBlur
                                    variation={0}
                                    pixelRatioProp={window.devicePixelRatio || 1}
                                    shapeSize={1}
                                    roundness={0.5}
                                    borderSize={0.05}
                                    circleSize={0.25}
                                    circleEdge={1}
                                />
                            </div>
                        ))}
                    </motion.div>
                </div>
                <motion.img
                    src={chatGptBg}
                    alt="Hero Background"
                    // initial={{ opacity: 0, y: 100 }}
                    // animate={{ opacity: 0.5, y: 0 }}
                    // transition={{ duration: 0.8, ease: "easeInOut", delay: 0.8 }}
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 0.6, y: 0 }}
                    viewport={{ once: false, amount: 0.7 }}
                    transition={{ duration: 0.8, ease: "easeInOut", delay: 0.2 }}
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0" />
            </section>
        </>
    )
}

export default HeroSection;