const express = require('express');
const router = express.Router();
const reviewController = require('../Controllers/reviewController');

// POST a new review
router.post('/', reviewController.createReview);

// GET all reviews for a product
router.get('/product/:productId', reviewController.getReviewsByProduct);

// PUT vote on a review
router.put('/:reviewId/vote', reviewController.voteReview);

module.exports = router;
