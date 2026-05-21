import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Input from '../../components/inputs';
import { motion } from 'framer-motion';
import Button from '../../components/Button';
import Alert from '../../components/Alert';

const SignupForm = () => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        password: '',
        confirm_password: '',
        terms: false
    });

    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [alertState, setAlertState] = useState({
        isOpen: false,
        title: '',
        message: '',
        type: 'success',
        onConfirm: () => { }
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
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

    const handleSubmit = (e) => {
        e.preventDefault();

        const regexExpName = /^[a-zA-Z]+$/;
        const regexExpPhoneNo = /^[6-9][0-9]{9}$/;
        const regexExpEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        const regexExpPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

        const { first_name, last_name, phone, email, password, confirm_password } = formData;
        const newErrors = {};
        let isValid = true;

        if ((first_name.length < 3 || !regexExpName.test(first_name)) || first_name === "") {
            newErrors.first_name = "First name must be at least 3 characters long and contain only letters";
            isValid = false;
        }

        if ((last_name.length < 3 || !regexExpName.test(last_name)) || last_name === "") {
            newErrors.last_name = "Last name must be at least 3 characters long and contain only letters";
            isValid = false;
        }

        if (phone.length !== 10 || !regexExpPhoneNo.test(phone)) {
            newErrors.phone = "Phone number must be a valid 10-digit number";
            isValid = false;
        }

        if (email === "" || !regexExpEmail.test(email)) {
            newErrors.email = "Email is not valid";
            isValid = false;
        }

        if (password.length < 8 || !regexExpPassword.test(password) || password === "") {
            newErrors.password = "Must be 8+ chars with uppercase, lowercase, number, and special char";
            isValid = false;
        }

        if (confirm_password !== password || confirm_password === "") {
            newErrors.confirm_password = "Confirm password does not match";
            isValid = false;
        }

        setErrors(newErrors);

        if (!isValid) {
            return;
        }

        const existingUsersStr = localStorage.getItem('users');
        let users = [];
        if (existingUsersStr) {
            users = JSON.parse(existingUsersStr);
            const userExists = users.some(u => u.email === email);
            if (userExists) {
                setErrors({ email: "Email is already registered" });
                return;
            }
        }

        users.push(formData);
        localStorage.setItem('users', JSON.stringify(users));
        sessionStorage.setItem('session', JSON.stringify(formData));
        sessionStorage.setItem('loginAlertShown', 'true');

        setAlertState({
            isOpen: true,
            title: 'Success',
            message: 'Your registration was successful!',
            type: 'success',
            onConfirm: () => {
                // Reset form
                setFormData({
                    first_name: '',
                    last_name: '',
                    email: '',
                    phone: '',
                    password: '',
                    confirm_password: '',
                    terms: false
                });
                setErrors({});
                navigate('/home');
            }
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-6 md:p-10 flex flex-col justify-center">

            <Alert
                isOpen={alertState.isOpen}
                onClose={() => setAlertState(prev => ({ ...prev, isOpen: false }))}
                title={alertState.title}
                message={alertState.message}
                type={alertState.type}
                onConfirm={alertState.onConfirm}
                confirmText="Continue"
                showCancel={false}
            />
            <div className="mb-2">
                <h2 className="font-headline-lg text-headline-lg text-on-surface ">Create Account</h2>
                <p className="font-body-md text-body-md text-on-surface-variant">Complete the form below to set up your professional profile.</p>
            </div>
            <form className="space-y-2" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-gutter items-start">
                    <div className="flex flex-col min-w-0 gap-1">
                        <label className="font-label-md text-label-md text-on-surface-variant" htmlFor="first_name">First Name</label>
                        <Input className={`min-w-0 w-full h-10 px-4 rounded border ${errors.first_name ? 'border-error focus:border-error focus:ring-error/20' : 'border-outline focus:border-secondary focus:ring-secondary/20'} focus:ring-2 bg-surface outline-none transition-all placeholder:text-on-surface-variant/50`} id="first_name" name="first_name" placeholder="John" type="text" value={formData.first_name} onChange={handleChange} />
                        {errors.first_name && <p className="text-error text-xs">{errors.first_name}</p>}
                    </div>
                    <div className="flex flex-col min-w-0 gap-1">
                        <label className="font-label-md text-label-md text-on-surface-variant" htmlFor="last_name">Last Name</label>
                        <Input className={`min-w-0 w-full h-10 px-4 rounded border ${errors.last_name ? 'border-error focus:border-error focus:ring-error/20' : 'border-outline focus:border-secondary focus:ring-secondary/20'} focus:ring-2 bg-surface outline-none transition-all placeholder:text-on-surface-variant/50`} id="last_name" name="last_name" placeholder="Doe" type="text" value={formData.last_name} onChange={handleChange} />
                        {errors.last_name && <p className="text-error text-xs">{errors.last_name}</p>}
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-gutter items-start">
                    <div className="flex flex-col  min-w-0 gap-1">
                        <label className="font-label-md text-label-md text-on-surface-variant" htmlFor="email">Email</label>
                        <div className="relative">
                            <span className="material-symbols-outlined absolute z-10 left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]" data-icon="mail">mail</span>
                            <Input className={`min-w-0 w-full h-10 pl-10 pr-3 rounded border ${errors.email ? 'border-error focus:border-error focus:ring-error/20' : 'border-outline focus:border-secondary focus:ring-secondary/20'} focus:ring-2 bg-surface outline-none transition-all placeholder:text-on-surface-variant/50`} id="email" name="email" placeholder="Enter your email" type="email" value={formData.email} onChange={handleChange} />
                        </div>
                        {errors.email && <p className="text-error text-xs">{errors.email}</p>}
                    </div>

                    <div className="flex flex-col min-w-0 gap-1">
                        <label className="font-label-md text-label-md text-on-surface-variant" htmlFor="phone">Phone</label>
                        <div className="relative">
                            <span className="material-symbols-outlined absolute z-10 left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]" data-icon="call">call</span>
                            <Input className={`min-w-0 w-full h-10 pl-10 pr-3 rounded border ${errors.phone ? 'border-error focus:border-error focus:ring-error/20' : 'border-outline focus:border-secondary focus:ring-secondary/20'} focus:ring-2 bg-surface outline-none transition-all placeholder:text-on-surface-variant/50`} id="phone" name="phone" placeholder="10-digit number" type="tel" maxLength="10" value={formData.phone} onChange={handleChange} />
                        </div>
                        {errors.phone && <p className="text-error text-xs">{errors.phone}</p>}
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-gutter items-start">
                    <div className="flex flex-col min-w-0 gap-1">
                        <label className="font-label-md text-label-md text-on-surface-variant" htmlFor="password">Password</label>
                        <div className="relative">
                            <Input className={`min-w-0 w-full h-10 pl-4 pr-10 rounded border ${errors.password ? 'border-error focus:border-error focus:ring-error/20' : 'border-outline focus:border-secondary focus:ring-secondary/20'} focus:ring-2 bg-surface outline-none transition-all placeholder:text-on-surface-variant/50`} id="password" name="password" placeholder="Enter Password" type={showPassword ? "text" : "password"} value={formData.password} onChange={handleChange} onKeyDown={handleKeyDown} />
                            <span
                                className="material-symbols-outlined absolute z-10 right-3 top-1/2 -translate-y-1/2 text-on-surface-variant cursor-pointer hover:text-on-surface text-[20px]"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? 'visibility' : 'visibility_off'}
                            </span>
                        </div>
                        {errors.password && <p className="text-error text-xs">{errors.password}</p>}
                    </div>
                    <div className="flex flex-col min-w-0 gap-1">
                        <label className="font-label-md text-label-md text-on-surface-variant" htmlFor="confirm_password">Confirm Password</label>
                        <div className="relative">
                            <Input className={`min-w-0 w-full h-10 pl-4 pr-10 rounded border ${errors.confirm_password ? 'border-error focus:border-error focus:ring-error/20' : 'border-outline focus:border-secondary focus:ring-secondary/20'} focus:ring-2 bg-surface outline-none transition-all placeholder:text-on-surface-variant/50`} id="confirm_password" name="confirm_password" placeholder="Confirm Password" type={showConfirmPassword ? "text" : "password"} value={formData.confirm_password} onChange={handleChange} onKeyDown={handleKeyDown} />
                            <span
                                className="material-symbols-outlined absolute z-10 right-3 top-1/2 -translate-y-1/2 text-on-surface-variant cursor-pointer hover:text-on-surface text-[20px]"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? 'visibility' : 'visibility_off'}
                            </span>
                        </div>
                        {errors.confirm_password && <p className="text-error text-xs">{errors.confirm_password}</p>}
                    </div>
                </div>

                <div className="flex items-start gap-3 pt-2">
                    <Input className="mt-1 w-4 h-4 rounded border-outline text-secondary focus:ring-secondary" id="terms" name="terms" type="checkbox" checked={formData.terms} onChange={handleChange} />
                    <label className="font-body-sm text-body-sm text-on-surface-variant" htmlFor="terms">
                        I agree to the <a className="text-secondary hover:underline" href="/">Terms of Service</a> and <a className="text-secondary hover:underline" href="/">Privacy Policy</a>.
                    </label>
                </div>

                <Button className="w-full h-12 bg-secondary text-on-secondary font-label-md text-label-md rounded-lg shadow-[0px_4px_6px_rgba(0,0,0,0.05)] hover:bg-secondary-container transition-colors active:opacity-80 flex items-center justify-center gap-2" text="Create Account" icon="arrow_forward" type="submit" />
            </form>

            {/* Footer Link */}
            <div className="text-center mt-2">
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Already have an account?{' '}
                    <Link to="/" className="text-secondary font-semibold hover:underline">Log In</Link>
                </p>
            </div>
        </motion.div>
    );
};

export default SignupForm;
