import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ForgetPassForm from './ForgetPassForm';

const ForgetPass = () => {
    return (
        <div className="bg-background text-on-background min-h-screen flex flex-col">
            <Header />

            {/* Main Content */}
            <main className="flex-grow flex items-center justify-center px-margin-mobile md:px-margin-desktop pt-20 pb-1">
                <div className="flex flex-col max-w-[440px]">
                    <ForgetPassForm />

                    {/* Bottom Security Icons */}
                    <div className="mt-2 grid grid-cols-3 gap-1 opacity-40 grayscale pointer-events-none">
                        <div className=" bg-surface-container-high rounded flex items-center justify-center">
                            <span className="material-symbols-outlined">security</span>
                        </div>
                        <div className=" bg-surface-container-high rounded flex items-center justify-center">
                            <span className="material-symbols-outlined">verified_user</span>
                        </div>
                        <div className=" bg-surface-container-high rounded flex items-center justify-center">
                            <span className="material-symbols-outlined">encrypted</span>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default ForgetPass;
