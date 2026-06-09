import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Alert from '../../components/Alert';
import ShippingForm from './ShippingForm';
import OrderSummary from './OrderSummary';

const loadScript = (src) => {
    return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });
};

const CheckoutPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [alertMessage, setAlertMessage] = useState({ title: '', message: '', type: 'info' });

    // Products passed via Link state
    const checkoutItems = location.state?.checkoutItems || [];

    const [shippingForm, setShippingForm] = useState({
        fullName: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        postalCode: '',
        country: '',
        phone: ''
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        const session = sessionStorage.getItem('session');
        if (session) {
            const parsedSession = JSON.parse(session);
            setUserData(parsedSession);

            axios.get(`${process.env.REACT_APP_API_URL || `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}`}/api/auth/profile/${parsedSession._id}`)
                .then(res => {
                    const profile = res.data;
                    setShippingForm(prev => ({
                        ...prev,
                        fullName: `${profile.first_name || ''} ${profile.last_name || ''}`.trim(),
                        phone: profile.phone || '',
                        addressLine1: profile.address || '',
                        city: profile.city || '',
                        state: profile.state || '',
                        postalCode: profile.postalCode || '',
                        country: profile.country || ''
                    }));
                })
                .catch(err => console.error('Failed to fetch user profile for checkout', err));

        } else {
            navigate('/login');
        }

        if (!location.state?.checkoutItems || location.state.checkoutItems.length === 0) {
            navigate('/cart');
        }
    }, [navigate, location.state]);

    const subtotal = checkoutItems.reduce((sum, item) => {
        const priceVal = parseFloat(item.price.replace(/[^0-9.-]+/g, ""));
        return sum + (priceVal * item.quantity);
    }, 0);

    const tax = subtotal * 0.08;
    const total = subtotal + tax;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setShippingForm({ ...shippingForm, [name]: value });

        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: undefined
            }));
        }
    };

    const handlePlaceOrder = async (e) => {
        e.preventDefault();

        const newErrors = {};
        if (!shippingForm.fullName.trim()) newErrors.fullName = 'Full Name is required';
        if (!shippingForm.phone.trim()) newErrors.phone = 'Phone Number is required';
        if (!shippingForm.addressLine1.trim()) newErrors.addressLine1 = 'Address Line 1 is required';
        if (!shippingForm.city.trim()) newErrors.city = 'City is required';
        if (!shippingForm.state.trim()) newErrors.state = 'State / Province is required';
        if (!shippingForm.postalCode.trim()) newErrors.postalCode = 'Postal Code is required';
        if (!shippingForm.country.trim()) newErrors.country = 'Country is required';

        if (shippingForm.country.trim().toLowerCase() !== 'india') {
            newErrors.country = 'Service available only in India';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        if (!userData) return;

        const orderData = {
            userId: userData._id,
            items: checkoutItems.map(item => ({
                productId: item.id || item._id,
                name: item.title || item.name,
                quantity: item.quantity,
                price: item.price,
                image: item.src || item.scr || item.image
            })),
            totalAmount: total,
            shippingAddress: shippingForm
        };

        try {
            setIsLoading(true);
            // 1. Load Razorpay script
            const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
            if (!res) {
                setAlertMessage({ title: 'Error', message: 'Razorpay SDK failed to load. Are you online?', type: 'danger' });
                setIsAlertOpen(true);
                setIsLoading(false);
                return;
            }

            // 2. Create Razorpay order
            const result = await axios.post(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/orders/create-razorpay-order`, {
                totalAmount: total
            });

            if (!result || !result.data) {
                setAlertMessage({ title: 'Error', message: 'Server error. Please try again.', type: 'danger' });
                setIsAlertOpen(true);
                setIsLoading(false);
                return;
            }

            const { amount, id: order_id, currency } = result.data;

            // 3. Initialize Razorpay popup
            const options = {
                key: 'rzp_test_Sz0lpbsBabsX9m', // The test key from the backend .env
                amount: amount.toString(),
                currency: currency,
                name: 'The Entrance',
                description: 'Order Payment',
                order_id: order_id,
                handler: async function (response) {
                    try {
                        setIsLoading(true);
                        const data = {
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_signature: response.razorpay_signature,
                            orderData: orderData
                        };

                        // 4. Verify payment
                        const verifyResult = await axios.post(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/orders/verify-payment`, data);

                        if (verifyResult.status === 200) {
                            if (location.state?.fromCart) {
                                const session = JSON.parse(sessionStorage.getItem('session'));
                                session.cartItems = {};
                                session.cartCount = 0;
                                sessionStorage.setItem('session', JSON.stringify(session));
                                window.dispatchEvent(new Event('cartUpdated'));
                            }

                            setAlertMessage({
                                title: 'Payment Successful!',
                                message: 'Your order has been placed successfully.',
                                type: 'success'
                            });
                            setIsAlertOpen(true);
                        }
                    } catch (error) {
                        console.error("Error verifying payment", error);
                        setAlertMessage({ title: 'Error', message: 'Payment verification failed.', type: 'danger' });
                        setIsAlertOpen(true);
                    } finally {
                        setIsLoading(false);
                    }
                },
                prefill: {
                    name: shippingForm.fullName,
                    email: userData.email,
                    contact: shippingForm.phone
                },
                theme: {
                    color: '#6366f1' // Primary color matching standard theme
                },
                modal: {
                    ondismiss: function () {
                        setIsLoading(false);
                    }
                }
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.on('payment.failed', function (response) {
                console.error(response.error);
                setAlertMessage({ title: 'Payment Failed', message: response.error.description, type: 'danger' });
                setIsAlertOpen(true);
                setIsLoading(false);
            });
            paymentObject.open();

        } catch (error) {
            console.error("Error initiating payment", error);
            setAlertMessage({
                title: 'Error',
                message: 'There was a problem initiating payment. Please try again.',
                type: 'danger'
            });
            setIsAlertOpen(true);
            setIsLoading(false);
        }
    };

    const handleAlertClose = () => {
        setIsAlertOpen(false);
        if (alertMessage.type === 'success') {
            navigate(`/profile/${userData?._id}`, { state: { activeTab: 'orders' } });
        }
    };

    if (checkoutItems.length === 0) return null;

    return (
        <main className="flex-grow mx-auto w-full px-margin-mobile md:px-margin-desktop py-24 min-h-screen relative">
            {isLoading && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30 backdrop-blur-sm">
                    <div className="bg-surface p-6 rounded-2xl shadow-xl flex flex-col items-center gap-4">
                        <span className="material-symbols-outlined animate-spin text-5xl text-primary">sync</span>
                        <p className="text-on-surface font-medium">Processing...</p>
                    </div>
                </div>
            )}

            <Alert
                isOpen={isAlertOpen}
                onClose={handleAlertClose}
                onConfirm={handleAlertClose}
                title={alertMessage.title}
                message={alertMessage.message}
                type={alertMessage.type}
                confirmText="OK"
                showCancel={false}
                className='inset-0'
            />

            <div className="max-w-container-max mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
                <ShippingForm 
                    handlePlaceOrder={handlePlaceOrder}
                    shippingForm={shippingForm}
                    handleInputChange={handleInputChange}
                    errors={errors}
                />
                <OrderSummary 
                    checkoutItems={checkoutItems}
                    subtotal={subtotal}
                    tax={tax}
                    total={total}
                />
            </div>
        </main>
    );
};

export default CheckoutPage;
