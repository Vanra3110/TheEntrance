import React from 'react';
// import { motion } from 'framer-motion';

const SignupVisual = () => {
    return (
        <div className="relative hidden md:flex flex-col justify-end p-12 overflow-hidden">
            <div className="absolute inset-0 ">
                <img
                    alt="Enterprise environment"
                    className="w-full h-full object-cover"
                    data-alt="A sophisticated, high-contrast interior of a modern corporate headquarters featuring clean architectural lines and expansive glass walls. The scene is bathed in cool, professional morning light, highlighting a serene and focused atmosphere. The aesthetic aligns with a premium B2B platform using deep blues and crisp whites. In the background, professional operators collaborate in a spacious, tech-forward lounge area, embodying reliability and precision."
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCRAE9EjTILC5RU9UCaghGHXgZBFWsR1bCfE9XL4un_VF6KGCeoptArTLBEe8_fTLopRRa-CRgSNUUbrxfRX2g9M11HozJX3RYH5_0gbKOskKgdipzWU7UfngnEYUthSXRpmn03YbP3eUHNsnOOzn2KMPjEDqh-pf-Dp4-f6idKUvD_gK7a52unugOJwliWGfHaVdl3ZvyUBR9sTSaEUPwA_ydoTzWYVWtW9QChP9bW6y28kSEgwJvznI-Om3IqaE0A0lRkDEQRzkM"
                />
            </div>
            <div className="relative z-10">
                <h1 className="font-display-lg text-display-lg text-white mb-4">Precision at scale.</h1>
                <p className="font-body-lg text-body-lg text-on-primary-container max-w-md">Join thousands of professional operators who trust Enterprise Core for high-stakes data integrity and secure infrastructure.</p>
                <div className="mt-8 flex gap-4">
                    <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                        <span className="material-symbols-outlined text-white text-[20px]" data-icon="verified_user">verified_user</span>
                        <span className="font-label-md text-label-md text-white">ISO 27001 Certified</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignupVisual;

