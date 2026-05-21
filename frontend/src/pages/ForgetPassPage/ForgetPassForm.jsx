import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/inputs';
import Button from '../../components/Button';
import { motion } from 'framer-motion';
import Alert from '../../components/Alert';

const ForgetPassForm = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [validError, setValidError] = useState('');
    const [success, setSuccess] = useState('');
    const [verificationCode, setVerificationCode] = useState(''); // Verification Code input
    const [generatedCode, setGeneratedCode] = useState(''); // Generated Verification Code
    const [formData, setFormData] = useState({
        password: '',
        confirm_password: ''
    });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [alertState, setAlertState] = useState({
        isOpen: false,
        title: '',
        message: '',
        type: 'info',
        onConfirm: () => { }
    });

    const navigate = useNavigate();
    const usersStr = localStorage.getItem('users');
    const users = usersStr ? JSON.parse(usersStr) : [];
    const user = users.find(user => user.email === email);

    function generateOTP() {
        // Generates a random 6-digit number
        return Math.floor(100000 + Math.random() * 900000).toString();
    }

    // console.log(generateOTP()); // Example: "482931"


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === " ") {
            e.preventDefault();
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!success) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailRegex.test(email) || !user) {
                setError('Please enter a valid registered email address');
                setSuccess('');
                return;
            }

            setError('');
            const code = generateOTP();
            setGeneratedCode(code);
            setAlertState({
                isOpen: true,
                title: 'Verification Code',
                message: `Your verification code is: ${code}`,
                type: 'info',
                onConfirm: () => {
                    setAlertState(prev => ({ ...prev, isOpen: false }));
                }
            });
            // Mock successful email sent
            setSuccess('Reset link sent! Please check your email.');
        } else {
            if (verificationCode.length === 0) {
                setValidError('Please enter the verification code');
                return;
            }

            if (verificationCode !== generatedCode) {
                setValidError('Please enter the correct verification code.');
                return;
            }

            const regexExpPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
            const newErrors = {};

            let isValid = true;

            if (formData.password.length < 8 || !regexExpPassword.test(formData.password) || formData.password === "") {
                newErrors.password = "Must be 8+ chars with uppercase, lowercase, number, and special char";
                isValid = false;
            }

            if (formData.confirm_password !== formData.password || formData.confirm_password === "") {
                newErrors.confirm_password = "Confirm password does not match";
                isValid = false;
            }

            if (!isValid) {
                setErrors(newErrors);
                return;
            }

            // Update user password
            const userIndex = users.findIndex(u => u.email === email);
            if (userIndex !== -1) {
                users[userIndex].password = formData.password;
                localStorage.setItem('users', JSON.stringify(users));
            }

            setAlertState({
                isOpen: true,
                title: 'Success',
                message: 'Password successfully reset!',
                type: 'success',
                onConfirm: () => {
                    setAlertState(prev => ({ ...prev, isOpen: false }));
                    navigate('/');
                }
            });
        }
    };

    return (
        <>
            <Alert
                isOpen={alertState.isOpen}
                onClose={() => setAlertState(prev => ({ ...prev, isOpen: false }))}
                title={alertState.title}
                message={alertState.message}
                type={alertState.type}
                onConfirm={alertState.onConfirm}
                confirmText="OK"
                showCancel={false}
                className="inset-0"
            />
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-surface-container-lowest border border-outline-variant p-8 md:p-10 rounded-lg shadow-sm">
                <div className="mb-8 text-center md:text-left">
                    <h1 className="font-headline-lg text-headline-lg text-primary mb-2">Reset Password</h1>
                    <p className="font-body-md text-body-md text-on-surface-variant">
                        Enter your email address and we'll send you a link to reset your password.
                    </p>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-2">
                        <label className="block font-label-md text-label-md text-on-surface" htmlFor="email">Email</label>
                        <div className="relative">
                            <span className="material-symbols-outlined absolute z-10 left-3 top-1/2 -translate-y-1/2 text-outline">mail</span>
                            <Input
                                className={`w-full h-12 pl-10 pr-4 py-3 bg-white border ${error ? 'border-error focus:border-error focus:ring-error/20' : 'border-outline-variant focus:border-secondary focus:ring-secondary/20'} rounded-lg focus:outline-none focus:ring-2 transition-all font-body-md text-body-md text-on-surface placeholder:text-outline`}
                                id="email"
                                name="email"
                                placeholder="name@company.com"
                                type="email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    if (error) setError('');
                                }}
                            />
                        </div>
                        {error && <p className="text-error text-sm mt-1">{error}</p>}
                        {success && <p className="text-green-600 text-sm mt-1">{success}</p>}
                        {success && <div className="space-y-2">
                            <label className="block font-label-md text-label-md text-on-surface" htmlFor="verification_code">Enter Verification Code</label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute z-10 left-3 top-1/2 -translate-y-1/2 text-outline">verified_user</span>
                                <Input
                                    className={`w-full h-12 pl-10 pr-4 py-3 bg-white border ${validError ? 'border-error focus:border-error focus:ring-error/20' : 'border-outline-variant focus:border-secondary focus:ring-secondary/20'} rounded-lg focus:outline-none focus:ring-2 transition-all font-body-md text-body-md text-on-surface placeholder:text-outline`}
                                    id="verification_code"
                                    name="verification_code"
                                    placeholder="Enter Verification Code"
                                    type="text"
                                    value={verificationCode}
                                    onChange={(e) => {
                                        setVerificationCode(e.target.value);
                                        if (validError) setValidError('');
                                    }}
                                />
                            </div>
                            {validError && <p className="text-error text-sm mt-1">{validError}</p>}
                        </div>}
                        {success && <div className="flex flex-col min-w-0 gap-1">
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
                        </div>}
                        {success && <div className="flex flex-col min-w-0 gap-1">
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
                        </div>}
                    </div>

                    <Button className={`w-full h-12 bg-secondary text-white font-label-md text-label-md rounded-lg hover:bg-primary-container transition-all active:scale-[0.98] shadow-sm flex items-center justify-center gap-2 ${success ? 'hidden' : 'block'}`} text=" Send Reset Link" icon="arrow_forward" type="submit" />
                    <Button className={`w-full h-12 bg-secondary text-white font-label-md text-label-md rounded-lg hover:bg-primary-container transition-all active:scale-[0.98] shadow-sm flex items-center justify-center gap-2 ${success ? 'block' : 'hidden'}`} text="Verify" icon="check" type="submit" />
                </form>

                <div className="mt-8 text-center">
                    <Link className="inline-flex items-center gap-1 font-label-md text-label-md text-secondary hover:underline transition-colors hover:none" to="/">
                        <span>Back to Login</span>
                    </Link>
                </div>
            </motion.div>
        </>
    );
};

export default ForgetPassForm;
