import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
// import SsoOptions from './SsoOptions';
import Input from '../../components/inputs';
import { motion } from 'framer-motion';
import Button from '../../components/Button';
import Alert from '../../components/Alert';

const LoginForm = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    const [alertState, setAlertState] = useState({
        isOpen: false,
        title: '',
        message: '',
        type: 'danger',
        autoClose: null,
        showConfirm: true,
        onConfirm: () => { },
        onClose: null
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error when user types
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: undefined
            }));
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === " ") {
            e.preventDefault();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const { email, password } = formData;
        const newErrors = {};
        // let isValid = true;

        setErrors(newErrors);


        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            const { data } = await axios.post(
                `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/auth/login`,
                { email, password },
                config
            );

            const cartItems = data.cartItems || {};
            data.cartCount = Object.values(cartItems).reduce((sum, count) => sum + count, 0);

            sessionStorage.setItem('session', JSON.stringify(data));
            window.dispatchEvent(new Event('cartUpdated'));

            setFormData({
                email: '',
                password: ''
            });
            setErrors({});
            navigate('/transition', { state: { type: 'login' } });
        } catch (error) {
            setAlertState({
                isOpen: true,
                title: 'Login Failed',
                message: error.response && error.response.data.message ? error.response.data.message : 'Invalid login details. Please check your email and password.',
                type: 'danger',
                onConfirm: () => {
                    setFormData({
                        email: '',
                        password: ''
                    });
                    setErrors({});
                }
            });
        }
    };

    return (
        <div className="w-full flex flex-col gap-6">
            <Alert
                isOpen={alertState.isOpen}
                onClose={() => {
                    setAlertState(prev => ({ ...prev, isOpen: false }));
                    if (alertState.onClose) {
                        alertState.onClose();
                    }
                }}
                title={alertState.title}
                message={alertState.message}
                type={alertState.type}
                onConfirm={alertState.onConfirm}
                // confirmText="OK"
                showCancel={false}
                showConfirm={alertState.showConfirm !== false}
                autoClose={alertState.autoClose}
                className="inset-0"
            />
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-surface-container-lowest border border-outline-variant rounded-lg p-2 md:p-6 shadow-sm">
                <div className="text-center mb-6">
                    <h1 className="font-headline-lg text-headline-lg text-primary ">Welcome Back</h1>
                    <p className="font-body-md text-body-md text-on-surface-variant">Access your secure dashboard</p>
                </div>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    {/* Email Field */}
                    <div className="flex flex-col gap-2">
                        <label className="font-label-md text-label-md text-on-surface-variant" htmlFor="email">Email</label>
                        <div className="relative">
                            <span className="material-symbols-outlined absolute z-10 left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]" data-icon="mail">mail</span>
                            <Input
                                className={`w-full h-10 pl-10 pr-3 bg-surface rounded border ${errors.email ? 'border-error focus:border-error focus:ring-error/20' : 'border-outline focus:border-secondary focus:ring-secondary/20'} focus:outline-none focus:ring-2 transition-all font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant/50`}
                                id="email"
                                name="email"
                                placeholder="name@company.com"
                                type="email"
                                onChange={handleChange}
                                value={formData.email}
                            />
                        </div>
                        {errors.email && <p className="text-error text-xs mt-1">{errors.email}</p>}
                    </div>

                    {/* Password Field */}
                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-center">
                            <label className="font-label-md text-label-md text-on-surface-variant" htmlFor="password">Password</label>
                            <Link className="font-label-sm text-label-sm text-secondary hover:underline transition-all" to="/forget-password">Forgot Password?</Link>
                        </div>
                        <div className="relative">
                            <Input
                                className={`w-full h-10 pl-4 pr-10 bg-surface rounded border ${errors.password ? 'border-error focus:border-error focus:ring-error/20' : 'border-outline focus:border-secondary focus:ring-secondary/20'} focus:outline-none focus:ring-2 transition-all font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant/50`}
                                id="password"
                                name="password"
                                placeholder="Enter Password"
                                type={showPassword ? "text" : "password"}
                                onChange={handleChange}
                                value={formData.password}
                                onKeyDown={handleKeyDown}
                            />
                            <span
                                className="material-symbols-outlined absolute z-10 right-3 top-1/2 -translate-y-1/2 text-on-surface-variant cursor-pointer hover:text-on-surface text-[20px]"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? 'visibility' : 'visibility_off'}
                            </span>
                        </div>
                        {errors.password && <p className="text-error text-xs mt-1">{errors.password}</p>}
                    </div>

                    {/* CTA Button */}
                    <div className="pt-2">
                        <Button className="w-full h-12 bg-primary text-white font-label-md text-label-md rounded-lg shadow-[0px_4px_6px_rgba(0,0,0,0.05)] hover:bg-primary-container hover:text-on-primary-container transition-colors active:opacity-80 flex items-center justify-center gap-2" text="Log In" icon="login" type="submit" />
                    </div>
                    <div className="text-center mt-2">
                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                            Don't have an account?
                            <Link to="/signup" className="text-secondary font-semibold hover:underline"> Sign Up</Link>
                        </p>
                    </div>
                    {/* <SsoOptions /> */}
                </form>
            </motion.div>
        </div>
    );
};

export default LoginForm;
