import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Alert from '../../components/Alert';
import HeroHeader from './HeroHeader';
import Sidebar from './Sidebar';
import PersonalInformation from './PersonalInformation';
import OrderHistory from './OrderHistory';

const ProfilePage = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isLoggedin, setIsLoggedin] = useState(true);
    const [isAlertOpen, setIsAlertOpen] = useState(false);

    // Edit mode states
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({});
    const [isUpdateAlertOpen, setIsUpdateAlertOpen] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef(null);

    const location = useLocation();
    const [activeTab, setActiveTab] = useState(location.state?.activeTab || 'personal');
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (activeTab === 'orders' && user) {
            axios.get(`http://localhost:5000/api/orders/user/${user._id}`)
                .then(res => setOrders(res.data))
                .catch(err => console.error(err));
        }
    }, [activeTab, user]);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/auth/profile/${id}`);
                setUser(response.data);
                setFormData(response.data);
            } catch (error) {
                console.error("Failed to fetch user profile", error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchUserProfile();
        }
    }, [id]);

    const handleAuthClick = () => {
        if (isLoggedin) {
            setIsAlertOpen(true);
        } else {
            navigate('/login');
        }
    };

    const handleConfirmLogout = () => {
        sessionStorage.removeItem('session');
        sessionStorage.removeItem('loginAlertShown');
        setIsLoggedin(false);
        navigate('/transition', { state: { type: 'logout' } });
    };

    const handleEditToggle = () => {
        setIsEditing(true);
        setTimeout(() => {
            const el = document.getElementById('personal-info-section');
            if (el) {
                const y = el.getBoundingClientRect().top + window.scrollY - 100;
                window.scrollTo({ top: y, behavior: 'smooth' });
            }
        }, 100);
    };

    const handleCancelEdit = () => {
        setFormData(user); // Reset to original
        setIsEditing(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSaveClick = () => {
        setIsUpdateAlertOpen(true);
    };

    const handleConfirmSave = async () => {
        setIsUpdateAlertOpen(false);
        try {
            const response = await axios.put(`http://localhost:5000/api/auth/profile/${user._id}`, formData);
            setUser(response.data);
            setFormData(response.data);
            sessionStorage.setItem('session', JSON.stringify(response.data));
            setIsEditing(false);
        } catch (error) {
            console.error("Failed to update profile", error);
            alert("Failed to update profile. Please try again.");
        }
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const imgData = new FormData();
        imgData.append('image', file);

        setIsUploading(true);
        try {
            const response = await axios.post('http://localhost:5000/api/upload', imgData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setFormData({ ...formData, image: response.data.imageUrl });
        } catch (error) {
            console.error("Failed to upload image", error);
            alert("Failed to upload image.");
        } finally {
            setIsUploading(false);
        }
    };

    if (loading) {
        return (
            <>
                <Header />
                <div className="flex-grow flex items-center justify-center min-h-[60vh]">
                    <div className="font-headline-md text-primary">Loading profile...</div>
                </div>
                <Footer />
            </>
        );
    }

    if (!user) {
        return (
            <>
                <Header />
                <div className="flex-grow flex items-center justify-center min-h-[60vh]">
                    <div className="font-headline-md text-error"><h1>User not found</h1></div>
                </div>
                <Footer />
            </>
        );
    }

    const currentImage = formData.image || user.image || "https://picsum.photos/200/300?random=1";

    return (
        <>
            <Alert
                isOpen={isAlertOpen}
                onClose={() => setIsAlertOpen(false)}
                onConfirm={handleConfirmLogout}
                title="Confirm Logout"
                message="Are you sure you want to logout of your account?"
                type="danger"
                confirmText="Logout"
                cancelText="Cancel"
                className="inset-0"
            />
            <Alert
                isOpen={isUpdateAlertOpen}
                onClose={() => setIsUpdateAlertOpen(false)}
                onConfirm={handleConfirmSave}
                title="Confirm Update"
                message="Are you sure you want to save these changes to your profile?"
                type="info"
                confirmText="Yes, Save"
                cancelText="Cancel"
                className="inset-0"
            />
            <Header />
            <main className="flex-grow">
                <HeroHeader
                    user={user}
                    formData={formData}
                    isEditing={isEditing}
                    isUploading={isUploading}
                    fileInputRef={fileInputRef}
                    handleImageChange={handleImageChange}
                    handleCancelEdit={handleCancelEdit}
                    handleSaveClick={handleSaveClick}
                    handleEditToggle={handleEditToggle}
                    currentImage={currentImage}
                />

                {/* Content Grid */}
                <div className="-max mx-auto px-margin-desktop py-12">
                    <div className="grid grid-cols-12 gap-gutter">
                        <Sidebar
                            activeTab={activeTab}
                            setActiveTab={setActiveTab}
                            handleAuthClick={handleAuthClick}
                        />

                        {/* Main Section */}
                        <section className="col-span-12 md:col-span-9">
                            {activeTab === 'personal' && (
                                <PersonalInformation
                                    user={user}
                                    formData={formData}
                                    isEditing={isEditing}
                                    handleInputChange={handleInputChange}
                                />
                            )}

                            {activeTab === 'orders' && (
                                <OrderHistory orders={orders} />
                            )}
                        </section>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}

export default ProfilePage