import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Alert from '../../components/Alert';
import ShippingForm from './ShippingForm';
import OrderSummary from './OrderSummary';

const CheckoutPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
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

            axios.get(`http://localhost:5000/api/auth/profile/${parsedSession._id}`)
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
            await axios.post('http://localhost:5000/api/orders', orderData);

            // If the user bought from the cart, we should ideally clear the cart here.
            // For simplicity, we just trigger the cart clear in sessionStorage if it was a cart checkout
            if (location.state?.fromCart) {
                const session = JSON.parse(sessionStorage.getItem('session'));
                session.cartItems = {};
                session.cartCount = 0;
                sessionStorage.setItem('session', JSON.stringify(session));
                window.dispatchEvent(new Event('cartUpdated'));
            }

            setAlertMessage({
                title: 'Order Placed Successfully!',
                message: 'You can check the status of your order in your Profile dashboard.',
                type: 'success'
            });
            setIsAlertOpen(true);
        } catch (error) {
            console.error("Error placing order", error);
            setAlertMessage({
                title: 'Error',
                message: 'There was a problem placing your order. Please try again.',
                type: 'danger'
            });
            setIsAlertOpen(true);
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
        <main className="flex-grow mx-auto w-full px-margin-mobile md:px-margin-desktop py-24 min-h-screen">
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
