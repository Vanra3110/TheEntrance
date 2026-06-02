import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { motion } from 'framer-motion';
import EditProfileModal from '../../components/EditProfileModal';
import Alert from '../../components/Alert';

const ProfilePage = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isLoggedin, setIsLoggedin] = useState(true);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const navigate = useNavigate();

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

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/auth/profile/${id}`);
                setUser(response.data);
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
                    <div className="font-headline-md text-error">User not found</div>
                </div>
                <Footer />
            </>
        );
    }

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
            <Header />
            <main className="flex-grow">
                {/* Hero Header */}
                <section className="bg-primary-container mt-20 py-12 relative overflow-hidden">
                    {/* Background Decorative Element */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-secondary-container rounded-full blur-3xl -mr-48 -mt-48"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary rounded-full blur-3xl -ml-32 -mb-32"></div>
                    </div>
                    <div className="mx-auto px-margin-desktop flex flex-col md:flex-row items-center gap-8 relative z-10">
                        <div className="relative">
                            <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden bg-white">
                                <img alt="User Avatar" className="w-full h-full object-cover" src={user.image || "https://lh3.googleusercontent.com/aida-public/AB6AXuBV0paAPRdkCDOr0_wXxwwASnPQGzWGbYzlHSeBzkQU4gAcfgoYRWrwePrUxj5suNzxuV0PnS10sFZ9JKk-poM_20ou99Yo0C0YT4usCK2ikfKVGaSHKHJpfjhbbBs-cLXRHZPGS27OdB1AxpqmfJSHCSGbSBGt_yFm5p5K5OEe21g3Whw4FKrGNS3YMrMzCB_oTSFlVrKgnn9yDg_YB3ZW8UlH1nSUioRzyCi4kIaC4x07fSSkoY9bUNfuhnVVJ4PSNOAK5sNU-18"} />
                            </div>
                            <div className="absolute bottom-1 right-1 bg-secondary text-white p-1 rounded-full border-2 border-white">
                                <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                            </div>
                        </div>
                        <div className="text-center md:text-left">
                            <h1 className="text-primary font-headline-lg text-headline-lg">{user.first_name} {user.last_name}</h1>
                            <p className="text-on-primary-container font-body-lg text-body-lg">{user.email}</p>
                        </div>
                        <div className="md:ml-auto">
                            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-secondary text-white font-label-md text-label-md px-8 py-3 shadow-sm hover:bg-secondary-container rounded-full active:opacity-80 transition-all flex items-center gap-2" onClick={() => setIsEditModalOpen(true)}>
                                <span className="material-symbols-outlined  text-[18px]">edit</span>
                                Edit Profile
                            </motion.button>
                        </div>
                    </div>
                </section>
                {/* <!-- Content Grid --> */}
                <div className="-max mx-auto px-margin-desktop py-12">
                    <div className="grid grid-cols-12 gap-gutter">
                        {/* <!-- Sidebar Navigation --> */}
                        <aside className="col-span-12 md:col-span-3">
                            <nav className="flex flex-col gap-1">
                                <a className="flex items-center gap-3 px-4 py-3 rounded bg-surface-container-high border-l-4 border-secondary text-primary font-bold transition-all" href="#">
                                    <span className="material-symbols-outlined">person</span>
                                    <span className="font-label-md text-label-md">Personal Information</span>
                                </a>
                                <a className="flex items-center gap-3 px-4 py-3 rounded text-on-surface-variant hover:bg-surface-container-low transition-all" href="#">
                                    <span className="material-symbols-outlined">security</span>
                                    <span className="font-label-md text-label-md">Security</span>
                                </a>
                                <a className="flex items-center gap-3 px-4 py-3 rounded text-on-surface-variant hover:bg-surface-container-low transition-all" href="#">
                                    <span className="material-symbols-outlined">notifications</span>
                                    <span className="font-label-md text-label-md">Notifications</span>
                                </a>
                                <a className="flex items-center gap-3 px-4 py-3 rounded text-on-surface-variant hover:bg-surface-container-low transition-all" href="#">
                                    <span className="material-symbols-outlined">history</span>
                                    <span className="font-label-md text-label-md">Order History</span>
                                </a>
                                <a className="flex items-center gap-3 px-4 py-3 rounded text-on-surface-variant hover:bg-surface-container-low transition-all" href="#">
                                    <span className="material-symbols-outlined">payments</span>
                                    <span className="font-label-md text-label-md">Billing &amp; Payments</span>
                                </a>
                                <div className="my-4 border-t border-outline-variant"></div>
                                <button className="flex items-center gap-3 px-4 py-3 rounded-full bg-error-container text-error hover:opacity-80 hover:scale-105 active:scale-90 transition-all" onClick={handleAuthClick}>
                                    <span className="material-symbols-outlined">logout</span>
                                    <span className="font-label-md text-label-md">Sign Out</span>
                                </button>
                            </nav>
                        </aside>
                        {/* <!-- Main Section --> */}
                        <section className="col-span-12 md:col-span-9">
                            <div className="bg-surface-container-lowest border border-outline-variant p-margin-desktop rounded shadow-sm">
                                <div className="flex items-center justify-between mb-8">
                                    <h2 className="font-headline-md text-headline-md text-primary">Personal Information</h2>
                                    <span className="bg-primary-fixed text-on-primary-fixed px-3 py-1 rounded-full text-label-sm font-label-sm">Active Account</span>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
                                    {/* <!-- Field: First Name --> */}
                                    <div className="flex flex-col gap-2">
                                        <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">First Name</label>
                                        <div className="p-3 bg-surface border border-outline-variant rounded font-body-md text-body-md text-on-surface">{user.first_name}</div>
                                    </div>
                                    {/* <!-- Field: Last Name --> */}
                                    <div className="flex flex-col gap-2">
                                        <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Last Name</label>
                                        <div className="p-3 bg-surface border border-outline-variant rounded font-body-md text-body-md text-on-surface">{user.last_name}</div>
                                    </div><div className="flex flex-col gap-2"><label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Phone Number</label><div className="p-3 bg-surface border border-outline-variant rounded font-body-md text-body-md text-on-surface">{user.phone}</div></div>
                                    {/* <!-- Field: Email --> */}
                                    <div className="flex flex-col gap-2 md:col-span-2">
                                        <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Email Address</label>
                                        <div className="flex items-center justify-between p-3 bg-surface border border-outline-variant rounded font-body-md text-body-md text-on-surface">
                                            <span className="">{user.email}</span>
                                            <span className="material-symbols-outlined text-outline text-[18px]">verified_user</span>
                                        </div>
                                    </div>
                                    {/* <!-- Field: Address --> */}
                                    <div className="flex flex-col gap-2 md:col-span-2">
                                        <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Office Address</label>
                                        <div className="p-4 bg-surface border border-outline-variant rounded font-body-md text-body-md text-on-surface leading-relaxed whitespace-pre-wrap">
                                            {user.address || "Address not provided"}
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-12 p-6 bg-surface-container-low border border-outline-variant border-dashed rounded flex items-center gap-4">
                                    <div className="p-3 bg-white rounded-full">
                                        <span className="material-symbols-outlined text-secondary">info</span>
                                    </div>
                                    <div>
                                        <h4 className="font-label-md text-label-md text-primary">Need to change your corporate ID?</h4>
                                        <p className="text-body-sm font-body-sm text-on-surface-variant">Changes to your primary identity must be authorized by your regional administrator.</p>
                                    </div>
                                    <button className="ml-auto text-secondary font-label-md text-label-md hover:underline">Contact Admin</button>
                                </div>
                            </div>
                            {/* <!-- Additional Details / Asymmetric Grid Item --> */}
                            <div className="mt-gutter grid grid-cols-1 md:grid-cols-3 gap-gutter">
                                <div className="bg-surface-container-lowest border border-outline-variant p-6 rounded md:col-span-1">
                                    <h3 className="font-label-md text-label-md text-on-surface-variant mb-4 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-[20px]">language</span>
                                        Language
                                    </h3>
                                    <p className="font-body-md text-body-md text-primary">English (US)</p>
                                </div>
                                <div className="bg-surface-container-lowest border border-outline-variant p-6 rounded md:col-span-1">
                                    <h3 className="font-label-md text-label-md text-on-surface-variant mb-4 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-[20px]">schedule</span>
                                        Time Zone
                                    </h3>
                                    <p className="font-body-md text-body-md text-primary">GMT-5 (Eastern Time)</p>
                                </div>
                                {/* <div className="bg-surface-container-lowest border border-outline-variant p-6 rounded md:col-span-1">
                                    <h3 className="font-label-md text-label-md text-on-surface-variant mb-4 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-[20px]">shield</span>
                                        Security Status
                                    </h3>
                                    <p className="font-body-md text-body-md text-secondary font-bold">Verified Level 4</p>
                                </div> */}
                            </div>
                        </section>
                    </div>
                </div>
            </main>
            <Footer />
            {isEditModalOpen && (
                <EditProfileModal
                    user={user}
                    onClose={() => setIsEditModalOpen(false)}
                    onUpdate={(updatedUser) => {
                        setUser(updatedUser);
                        sessionStorage.setItem('session', JSON.stringify(updatedUser));
                    }}
                />
            )}
        </>
    )
}

export default ProfilePage