import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProductReviewSection = () => {
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [stats, setStats] = useState({ totalReviews: 0, averageRating: 0, ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 } });
    const [loading, setLoading] = useState(true);

    // Form state
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [formData, setFormData] = useState({ rating: 5, review_title: '', review_text: '', is_recommended: true });
    const [submitting, setSubmitting] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    // Vote state
    const [votedReviews, setVotedReviews] = useState({});

    useEffect(() => {
        const storedProduct = localStorage.getItem('selectedProduct');
        if (storedProduct) {
            const parsedProduct = JSON.parse(storedProduct);
            setProduct(parsedProduct);
            fetchReviews(parsedProduct.id);
        } else {
            setLoading(false);
        }
    }, []);

    const fetchReviews = async (productId) => {
        try {
            const res = await axios.get(`http://localhost:5000/api/reviews/product/${productId}`);
            setReviews(res.data.reviews);
            setStats(res.data.stats);
        } catch (error) {
            console.error("Failed to fetch reviews", error);
        } finally {
            setLoading(false);
        }
    };

    const handleWriteReviewClick = () => {
        const session = sessionStorage.getItem('session');
        if (!session) {
            if (window.confirm("You need to be logged in to write a review. Go to login?")) {
                navigate('/login');
            }
            return;
        }
        setIsFormOpen(true);
    };

    const handleFormChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleStarClick = (rating) => {
        setFormData(prev => ({ ...prev, rating }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg('');
        const session = sessionStorage.getItem('session');
        if (!session) return;
        const user = JSON.parse(session);

        setSubmitting(true);
        try {
            await axios.post('http://localhost:5000/api/reviews', {
                product_id: product.id.toString(),
                user_id: user._id,
                ...formData
            });
            setIsFormOpen(false);
            setFormData({ rating: 5, review_title: '', review_text: '', is_recommended: true });
            fetchReviews(product.id);
        } catch (error) {
            console.error("Submit review error:", error);
            setErrorMsg(error.response?.data?.message || 'Failed to submit review. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    const handleVote = async (reviewId, clickedType) => {
        const currentVote = votedReviews[reviewId];
        let action = '';

        if (currentVote === clickedType) {
            // Remove vote
            action = clickedType === 'up' ? 'remove_upvote' : 'remove_downvote';
        } else if (currentVote) {
            // Change vote
            action = clickedType === 'up' ? 'change_to_up' : 'change_to_down';
        } else {
            // New vote
            action = clickedType === 'up' ? 'upvote' : 'downvote';
        }

        try {
            await axios.put(`http://localhost:5000/api/reviews/${reviewId}/vote`, { action });

            // Optimistic update
            setReviews(reviews.map(review => {
                if (review._id === reviewId) {
                    let newHelpful = review.helpful_votes;
                    let newTotal = review.total_votes;

                    if (action === 'upvote') {
                        newHelpful += 1; newTotal += 1;
                    } else if (action === 'downvote') {
                        newTotal += 1;
                    } else if (action === 'remove_upvote') {
                        newHelpful -= 1; newTotal -= 1;
                    } else if (action === 'remove_downvote') {
                        newTotal -= 1;
                    } else if (action === 'change_to_up') {
                        newHelpful += 1;
                    } else if (action === 'change_to_down') {
                        newHelpful -= 1;
                    }

                    return {
                        ...review,
                        helpful_votes: Math.max(0, newHelpful),
                        total_votes: Math.max(0, newTotal)
                    };
                }
                return review;
            }));

            // Update local state
            if (currentVote === clickedType) {
                // Removing vote
                const updatedVotes = { ...votedReviews };
                delete updatedVotes[reviewId];
                setVotedReviews(updatedVotes);
            } else {
                setVotedReviews(prev => ({ ...prev, [reviewId]: clickedType }));
            }
        } catch (error) {
            console.error('Failed to vote:', error);
        }
    };

    // Helper to render stars
    const renderStars = (ratingValue) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= Math.floor(ratingValue)) {
                stars.push(<span key={i} className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>);
            } else if (i === Math.ceil(ratingValue) && !Number.isInteger(ratingValue)) {
                stars.push(<span key={i} className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>star_half</span>);
            } else {
                stars.push(<span key={i} className="material-symbols-outlined text-lg">star</span>);
            }
        }
        return stars;
    };

    if (loading) return <div className="py-8 text-center text-on-surface-variant">Loading reviews...</div>;

    const distribution = stats.ratingDistribution;
    const total = stats.totalReviews > 0 ? stats.totalReviews : 1; // Prevent division by zero

    const sessionData = sessionStorage.getItem('session');
    const currentUser = sessionData ? JSON.parse(sessionData) : null;
    const hasReviewed = currentUser && reviews.some(r => r.user_id?._id === currentUser._id);

    return (
        <section className="mb-16">
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-8">
                <div>
                    <h2 className="font-headline-md text-headline-md text-primary mb-2">Customer Reviews</h2>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1 text-secondary">
                            {renderStars(Number(stats.averageRating))}
                        </div>
                        <span className="font-headline-md text-primary">{stats.averageRating}/5</span>
                        <span className="text-body-sm text-on-surface-variant">Based on {stats.totalReviews} reviews</span>
                    </div>
                </div>
                {!hasReviewed && (
                    <button
                        onClick={handleWriteReviewClick}
                        className="border border-secondary text-secondary py-2 px-6 rounded font-label-md hover:bg-secondary/5 transition-colors shadow-sm"
                    >
                        Write a Review
                    </button>
                )}
            </div>

            {/* Write Review Form */}
            {isFormOpen && (
                <div className="bg-surface-container-lowest border border-outline-variant p-6 rounded-lg shadow-sm mb-8">
                    <h3 className="font-headline-sm text-primary mb-4">Write a Review</h3>
                    {errorMsg && <div className="text-error mb-4 font-body-sm">{errorMsg}</div>}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-label-md mb-2">Your Rating</label>
                            <div className="flex items-center gap-1 cursor-pointer text-secondary">
                                {[1, 2, 3, 4, 5].map(star => (
                                    <span
                                        key={star}
                                        onClick={() => handleStarClick(star)}
                                        className="material-symbols-outlined text-3xl"
                                        style={{ fontVariationSettings: formData.rating >= star ? "'FILL' 1" : "'FILL' 0" }}
                                    >
                                        star
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label className="block text-label-md mb-2">Review Title</label>
                            <input

                                name="review_title"
                                value={formData.review_title}
                                onChange={handleFormChange}
                                className="w-full p-3 bg-surface border border-outline-variant rounded font-body-md focus:border-secondary outline-none"
                                placeholder="Summarize your experience..."
                            />
                        </div>
                        <div>
                            <label className="block text-label-md mb-2">Review Details</label>
                            <textarea

                                name="review_text"
                                value={formData.review_text}
                                onChange={handleFormChange}
                                className="w-full p-3 bg-surface border border-outline-variant rounded font-body-md focus:border-secondary outline-none min-h-[120px]"
                                placeholder="What did you like or dislike?"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="is_recommended"
                                name="is_recommended"
                                checked={formData.is_recommended}
                                onChange={handleFormChange}
                                className="w-4 h-4"
                            />
                            <label htmlFor="is_recommended" className="text-body-sm text-on-surface">I recommend this product</label>
                        </div>
                        <div className="flex gap-4 pt-4">
                            <button
                                type="button"
                                onClick={() => setIsFormOpen(false)}
                                className="px-6 py-2 border border-outline-variant rounded font-label-md hover:bg-surface-container"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={submitting}
                                className="px-6 py-2 bg-secondary text-white rounded font-label-md hover:bg-secondary/90 disabled:opacity-50"
                            >
                                {submitting ? 'Submitting...' : 'Submit Review'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* <!-- Rating Breakdown --> */}
                <div className="lg:col-span-4 space-y-3">
                    {[5, 4, 3, 2, 1].map(star => {
                        const count = distribution[star] || 0;
                        const percentage = stats.totalReviews === 0 ? 0 : Math.round((count / total) * 100);
                        return (
                            <div key={star} className="flex items-center gap-4">
                                <span className="w-12 text-label-sm text-on-surface-variant">{star} star</span>
                                <div className="flex-grow h-2 bg-surface-container rounded-full overflow-hidden">
                                    <div className="h-full bg-secondary transition-all duration-500" style={{ width: `${percentage}%` }}></div>
                                </div>
                                <span className="w-8 text-label-sm text-on-surface-variant text-right">{percentage}%</span>
                            </div>
                        );
                    })}
                </div>
                {/* <!-- Review Cards --> */}
                <div className="lg:col-span-8 space-y-6">
                    {reviews.length === 0 ? (
                        <div className="text-center py-8 text-on-surface-variant">No reviews yet. Be the first to write one!</div>
                    ) : (
                        reviews.map((review) => (
                            <div key={review._id} className="bg-surface-container-lowest border border-outline-variant p-6 rounded-lg shadow-sm">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-1 text-secondary mb-2">
                                            {renderStars(review.rating)}
                                        </div>
                                        <h4 className="font-label-md text-primary font-bold">{review.review_title}</h4>
                                        <div className="flex items-center gap-2">
                                            <span className="font-label-sm text-primary font-semibold">
                                                {review.user_id ? `${review.user_id.first_name} ${review.user_id.last_name}` : 'Unknown User'}
                                            </span>
                                            {review.verified_purchase && (
                                                <span className="flex items-center gap-1 text-secondary text-[10px] uppercase tracking-wider font-bold">
                                                    <span className="material-symbols-outlined text-sm">verified_user</span> Verified Purchase
                                                </span>
                                            )}
                                            <span className="text-label-sm text-on-surface-variant">• {new Date(review.review_date).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-body-sm text-on-surface-variant mb-4 whitespace-pre-wrap">{review.review_text}</p>

                                {review.is_recommended && (
                                    <div className="flex items-center gap-2 mb-4 text-secondary text-label-sm font-semibold">
                                        <span className="material-symbols-outlined text-lg">thumb_up</span> Recommends this product
                                    </div>
                                )}

                                <div className="flex items-center gap-4 pt-4 border-t border-outline-variant/50">
                                    <span className="text-label-sm text-on-surface-variant">Was this helpful?</span>
                                    <button
                                        onClick={() => handleVote(review._id, 'up')}
                                        className={`flex items-center gap-1 text-label-sm transition-colors ${votedReviews[review._id] === 'up' ? 'text-primary' : 'text-on-surface hover:text-primary'}`}
                                    >
                                        <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: votedReviews[review._id] === 'up' ? "'FILL' 1" : "'FILL' 0" }}>thumb_up</span> {review.helpful_votes}
                                    </button>
                                    <button
                                        onClick={() => handleVote(review._id, 'down')}
                                        className={`flex items-center gap-1 text-label-sm transition-colors ${votedReviews[review._id] === 'down' ? 'text-error' : 'text-on-surface hover:text-error'}`}
                                    >
                                        <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: votedReviews[review._id] === 'down' ? "'FILL' 1" : "'FILL' 0" }}>thumb_down</span> {review.total_votes - review.helpful_votes}
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
};

export default ProductReviewSection;