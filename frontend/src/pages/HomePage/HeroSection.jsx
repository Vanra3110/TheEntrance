import React from "react";
import { motion } from "framer-motion";
import Button from "../../components/Button";
import TextType from '../../components/TypeText';
import { Link } from "react-router-dom";
import ShinyText from '../../components/ShinyText';

const HeroSection = () => {
    return (
        <>
            <section className="relative h-screen flex items-center overflow-hidden bg-primary-container">
                <div className="absolute inset-0 opacity-40">
                    <img className="w-full h-full object-cover"
                        alt="A sophisticated corporate high-tech environment with glass partitions and soft atmospheric lighting. The scene features blurred motion of professional executives in a clean, modern architectural space dominated by deep navy blues and metallic greys. The lighting is precise, emphasizing a sense of high-level enterprise security and reliable data processing."
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCqf1kloUczcc7p3WFM4LFAzZxZTa-n2Rk7R8bNr1T5S7hkMl__4MgpuwEF1t7XcxAS5y1-kf83SEOwghekC-oiZ7cyhLS32WduInQzbqjLtMYDukkNccDlOr7ygIeh9qEJx5qBCMxQPBoSisszZh8rHVohtGYQi1WfKNf8B9kO0LsTX83x8WjVLJ6TbBZtprtJTSuWJN1uzZ4bUM7_GkvLa_FY6ZyC87SEg6drpdNE_xjB0UfYUXvqEdifE-JOjucV5HBtMx8nsDc" />
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
                                color="#b0c8eb"
                                shineColor="#ffffff"
                                spread={120}
                                direction="left"
                                yoyo={false}
                                pauseOnHover={false}
                                disabled={false}
                            />
                        </h1>
                        <TextType
                            className="font-body-lg text-body-lg text-on-primary-container mb-10 max-w-lg text-[20px] "
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