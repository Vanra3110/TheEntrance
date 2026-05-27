import React from 'react';
import Header from '../../components/Header';
// import Footer from '../../components/Footer';
import LoginForm from '../Loginpage/LoginForm';
import SignupVisual from '../SignupPage/SignupVisual';

const Login = () => {
    return (
        <div className="bg-background text-on-background min-h-screen flex flex-col">
            <Header />

            {/* Main Content */}
            <main className="flex-grow flex items-center justify-center pt-20 pb-4 px-margin-mobile md:px-margin-desktop">
                <div className="max-w-[1100px] w-full grid grid-cols-1 md:grid-cols-2 bg-surface-container-lowest rounded-lg overflow-hidden shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]">
                    <SignupVisual />
                    <LoginForm />
                </div>
            </main>

            {/* <Footer /> */}
        </div>
    );
};

export default Login;

// border border-outline-variant
