import React from 'react';

const PromoSection = () => {
    return (
        <section className="rounded-xl overflow-hidden relative h-[400px] mb-16">
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-transparent to-transparent z-10"></div>
            <img alt="Close up of server interior" className="w-full h-full object-cover" data-alt="A professional high-angle macro photograph showing the interior of an enterprise server rack with glowing blue and green LED status lights. The components are meticulously arranged with clean cable management in a darkened, high-tech data center environment. The lighting is moody and precise, highlighting the metallic textures of the heatsinks and the intricate circuitry of the motherboard." src="https://lh3.googleusercontent.com/aida/ADBb0uiQXvUayPTnxd06r8RsRwvl8MQkYtRC9X8-tnD2kM9zf12M8wZTg3-5KHOLmODb49ouArWulgrlj1lMiy0XlsaxtCI72j-QjZOINGA4sb3lYSdcdOaguAhoh5pJqd_o6bkkoMRrH481MZq83xbhGDiMgSYWLbhDT3V0s1XpccvUu-tyXPd5gm4dwblU_yx78WoFt39VMBCUNZXuvK37V4WbdNAvH1qzKzOdnEDyG8-V7f8yvS-SrpZtng" />
            <div className="absolute inset-0 z-20 flex flex-col justify-center px-12 max-w-2xl">
                <h3 className="font-display-lg text-display-lg text-white mb-4">Precision Engineered</h3>
                <p className="font-body-lg text-body-lg text-on-primary-container">Every component is validated through a rigorous 72-hour burn-in process to ensure immediate reliability upon deployment.</p>
            </div>
        </section>
    );
};

export default PromoSection;
