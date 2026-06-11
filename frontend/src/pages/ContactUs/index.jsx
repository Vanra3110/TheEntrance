import React, { useState } from "react";
import axios from "axios";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { motion } from "framer-motion";
import { FiMail, FiPhone, FiMapPin, FiSend, FiLoader } from "react-icons/fi";

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);
        
        try {
            await axios.post("http://localhost:5000/api/contact", formData);
            setSubmitStatus({ type: 'success', message: 'Thank you for reaching out! We will get back to you soon.' });
            setFormData({ name: "", email: "", subject: "", message: "" });
            
            // Clear success message after 5 seconds
            setTimeout(() => setSubmitStatus(null), 5000);
        } catch (error) {
            console.error("Error submitting contact form:", error);
            setSubmitStatus({ type: 'error', message: 'Failed to send message. Please try again later.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    const contactDetails = [
        {
            icon: <FiPhone className="text-3xl text-primary" />,
            title: "Call Us",
            detail: "+1 (555) 123-4567",
            description: "Mon-Fri from 8am to 5pm",
        },
        {
            icon: <FiMail className="text-3xl text-primary" />,
            title: "Email Us",
            detail: "support@theentrance.com",
            description: "We usually reply within 24 hours",
        },
        {
            icon: <FiMapPin className="text-3xl text-primary" />,
            title: "Visit Us",
            detail: "123 Tech Avenue, Silicon Valley",
            description: "CA 94025, United States",
        },
    ];

    return (
        <div className="min-h-screen w-full flex flex-col font-body-md text-body-md text-on-surface bg-surface dark:bg-surface-dim overflow-x-hidden">
            <Header />
            
            <main className="flex-grow w-full pt-24 pb-16 px-4 md:px-8 lg:px-16 mx-auto max-w-7xl">
                {/* Header Section */}
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">Get in Touch</h1>
                    <p className="text-on-surface-variant max-w-2xl mx-auto text-lg">
                        Have questions about our IT hardware products, enterprise solutions, or your recent order? 
                        Our team is here to help you find the right technology.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
                    
                    {/* Contact Details */}
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="space-y-8"
                    >
                        <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                        
                        <div className="space-y-6">
                            {contactDetails.map((item, index) => (
                                <motion.div 
                                    key={index}
                                    whileHover={{ scale: 1.02 }}
                                    className="flex items-start p-6 bg-surface-variant/30 rounded-2xl border border-surface-variant/50 backdrop-blur-sm"
                                >
                                    <div className="p-4 bg-surface rounded-full shadow-sm mr-6">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
                                        <p className="text-primary font-medium text-lg mb-1">{item.detail}</p>
                                        <p className="text-on-surface-variant text-sm">{item.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Interactive Map Placeholder (Optional) */}
                        <div className="mt-8 rounded-2xl overflow-hidden h-64 bg-surface-variant relative shadow-md">
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3681.3660987323865!2d72.87860327437275!3d22.6774115291225!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e5b3560f5416b%3A0x497aabe351858001!2sVIHIL%20INFOTECH%20PRIVATE%20LIMITED!5e0!3m2!1sen!2sin!4v1781175657575!5m2!1sen!2sin" width="100%" height="100%" style={{ border: 0 }} 
                                allowFullScreen="" 
                                loading="lazy"
                                className="grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500"></iframe>
                            {/* <iframe 
                                title="Location Map"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3168.63929062107!2d-122.08374688469247!3d37.4219998798255!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fba02425def45%3A0x83f6a80c3e65e1eb!2sGoogleplex!5e0!3m2!1sen!2sus!4v1621234567890!5m2!1sen!2sus" 
                                width="100%" 
                                height="100%" 
                                style={{ border: 0 }} 
                                allowFullScreen="" 
                                loading="lazy"
                                className="grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                            ></iframe> */}
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div 
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="bg-surface-variant/20 p-8 md:p-10 rounded-3xl border border-surface-variant shadow-lg"
                    >
                        <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold pl-1">Your Name</label>
                                    <input 
                                        type="text" 
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-xl bg-surface border border-surface-variant focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold pl-1">Email Address</label>
                                    <input 
                                        type="email" 
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-xl bg-surface border border-surface-variant focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold pl-1">Subject</label>
                                <input 
                                    type="text" 
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 rounded-xl bg-surface border border-surface-variant focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                    placeholder="How can we help?"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold pl-1">Message</label>
                                <textarea 
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows="6"
                                    className="w-full px-4 py-3 rounded-xl bg-surface border border-surface-variant focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                                    placeholder="Write your message here..."
                                ></textarea>
                            </div>

                            {submitStatus && (
                                <div className={`p-4 rounded-xl text-sm font-medium ${submitStatus.type === 'success' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}>
                                    {submitStatus.message}
                                </div>
                            )}

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full py-4 bg-primary text-surface font-bold text-lg rounded-xl shadow-lg flex items-center justify-center gap-2 transition-colors ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-primary/90 shadow-primary/30'}`}
                            >
                                {isSubmitting ? (
                                    <>
                                        <span>Sending...</span>
                                        <FiLoader className="animate-spin" />
                                    </>
                                ) : (
                                    <>
                                        <span>Send Message</span>
                                        <FiSend />
                                    </>
                                )}
                            </motion.button>
                        </form>
                    </motion.div>

                </div>
            </main>
            
            <Footer />
        </div>
    );
};

export default ContactUs;