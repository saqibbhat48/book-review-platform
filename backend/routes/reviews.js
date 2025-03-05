const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Review = require('../models/Review');

router.get('/', async (req, res) => {
  const { bookId } = req.query;
  try {
    const reviews = await Review.find({ bookId }).populate('userId', 'username');
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/', auth, async (req, res) => {
  const { bookId, reviewText, rating } = req.body;
  try {
    const review = new Review({
      userId: req.user.id,
      bookId,
      reviewText,
      rating,
    });
    await review.save();
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;