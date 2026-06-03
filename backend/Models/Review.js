const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    product_id: { type: String, required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    order_id: { type: String }, // Optional, mapped if they have bought it
    rating: { type: Number, required: true, min: 1, max: 5 },
    review_title: { type: String, required: true },
    review_text: { type: String, required: true },
    review_date: { type: Date, default: Date.now },
    verified_purchase: { type: Boolean, default: false },
    is_recommended: { type: Boolean, default: true },
    helpful_votes: { type: Number, default: 0 },
    total_votes: { type: Number, default: 0 },
    sentiment_score: { type: Number, default: 0.0 },
    has_media: { type: Boolean, default: false },
    moderation_status: { type: String, default: 'approved' } // pending, approved, flagged_for_review
}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);
