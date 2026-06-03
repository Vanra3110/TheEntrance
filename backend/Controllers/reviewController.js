const Review = require('../Models/Review');
const Order = require('../Models/Order');

// Create a review
exports.createReview = async (req, res) => {
    try {
        const { product_id, user_id, rating, review_title, review_text, is_recommended } = req.body;

        if (!product_id || !user_id || !rating || !review_title || !review_text) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Check if user has already reviewed this product
        const existingReview = await Review.findOne({ product_id, user_id });
        if (existingReview) {
            return res.status(400).json({ message: 'You have already reviewed this product' });
        }

        // Check if user has bought the product
        const orders = await Order.find({ userId: user_id });
        let verified_purchase = false;
        let order_id = null;

        for (const order of orders) {
            // order.items contains productId (Number). product_id from frontend might be String or Number.
            const hasProduct = order.items.some(item => item.productId.toString() === product_id.toString());
            if (hasProduct) {
                verified_purchase = true;
                order_id = order._id.toString();
                break;
            }
        }

        const newReview = new Review({
            product_id,
            user_id,
            order_id,
            rating,
            review_title,
            review_text,
            verified_purchase,
            is_recommended,
            sentiment_score: 0.0 // Defaulting to 0.0 as discussed
        });

        const savedReview = await newReview.save();

        // Populate user details for the response
        await savedReview.populate('user_id', 'first_name last_name email image');

        res.status(201).json(savedReview);
    } catch (error) {
        console.error('Error creating review:', error);
        res.status(500).json({ message: 'Failed to create review', error: error.message });
    }
};

// Get reviews by product ID
exports.getReviewsByProduct = async (req, res) => {
    try {
        const { productId } = req.params;

        // Find all approved reviews for this product
        const reviews = await Review.find({
            product_id: productId,
            moderation_status: 'approved'
        }).populate('user_id', 'first_name last_name email image').sort({ createdAt: -1 });

        // Calculate aggregated data
        const totalReviews = reviews.length;
        let averageRating = 0;
        const ratingDistribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };

        if (totalReviews > 0) {
            let sumRating = 0;
            reviews.forEach(r => {
                sumRating += r.rating;
                ratingDistribution[r.rating] = (ratingDistribution[r.rating] || 0) + 1;
            });
            averageRating = (sumRating / totalReviews).toFixed(1);
        }

        res.status(200).json({
            reviews,
            stats: {
                totalReviews,
                averageRating,
                ratingDistribution
            }
        });
    } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).json({ message: 'Failed to fetch reviews', error: error.message });
    }
};

// Vote on a review
exports.voteReview = async (req, res) => {
    try {
        const { reviewId } = req.params;
        const { action } = req.body; // e.g., 'upvote', 'change_to_down'

        const review = await Review.findById(reviewId);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        if (action === 'upvote') {
            review.helpful_votes += 1;
            review.total_votes += 1;
        } else if (action === 'downvote') {
            review.total_votes += 1;
        } else if (action === 'remove_upvote') {
            review.helpful_votes = Math.max(0, review.helpful_votes - 1);
            review.total_votes = Math.max(0, review.total_votes - 1);
        } else if (action === 'remove_downvote') {
            review.total_votes = Math.max(0, review.total_votes - 1);
        } else if (action === 'change_to_down') {
            review.helpful_votes = Math.max(0, review.helpful_votes - 1);
        } else if (action === 'change_to_up') {
            review.helpful_votes += 1;
        }

        await review.save();
        res.status(200).json(review);
    } catch (error) {
        console.error('Error voting on review:', error);
        res.status(500).json({ message: 'Failed to vote on review', error: error.message });
    }
};
