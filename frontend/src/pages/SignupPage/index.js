import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import SignupForm from '../SignupPage/SignupForm';
// import { Link } from 'react-router-dom';
// import {motion} from 'framer-motion';

import SignupVisual from '../SignupPage/SignupVisual';

const Signup = () => {
    return (
        <div className="bg-background text-on-background min-h-screen flex flex-col">
            <Header />

            {/* Main Content */}
            <main className="flex-grow flex items-center ml-30px mr-30px justify-center pt-20 pb-5 px-margin-mobile md:px-margin-desktop overflow-x-hidden">
                <div className="max-w-[1100px] w-full grid grid-cols-1 md:grid-cols-2 bg-surface-container-lowest rounded-lg overflow-hidden shadow-[0px_4px_6px_rgba(0,0,0,0.05)]">
                    <SignupVisual />
                    <SignupForm />
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Signup;
