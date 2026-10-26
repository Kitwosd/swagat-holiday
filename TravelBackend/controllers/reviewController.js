const asyncHandler = require('../utils/asyncHandler');
const reviewService = require('../services/reviewService');

/**
 * @desc    Get all reviews
 * @route   GET /api/reviews
 * @access  Public
 */
const getAllReviews = asyncHandler(async (req, res) => {
  const reviews = await reviewService.getAllReviews();

  res.status(200).json({
    success: true,
    count: reviews.length,
    data: reviews,
  });
});

/**
 * @desc    Get review by ID
 * @route   GET /api/reviews/:id
 * @access  Public
 */
const getReviewById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const review = await reviewService.getReviewById(id);

  if (!review) {
    return res.status(404).json({
      success: false,
      message: `Review #${id} not found.`,
    });
  }

  res.status(200).json({
    success: true,
    data: review,
  });
});

/**
 * @desc    Create new review
 * @route   POST /api/reviews
 * @access  Public or Private/Admin
 */
const createReview = asyncHandler(async (req, res) => {
  const newReview = await reviewService.createReview(req.body);

  res.status(201).json({
    success: true,
    message: 'Review created successfully.',
    data: newReview,
  });
});

/**
 * @desc    Update review
 * @route   PUT /api/reviews/:id
 * @access  Private/Admin
 */
const updateReview = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updated = await reviewService.updateReview(id, req.body);

  if (!updated) {
    return res.status(404).json({
      success: false,
      message: `Review #${id} not found.`,
    });
  }

  res.status(200).json({
    success: true,
    message: 'Review updated successfully.',
    data: updated,
  });
});

/**
 * @desc    Delete review
 * @route   DELETE /api/reviews/:id
 * @access  Private/Admin
 */
const deleteReview = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const success = await reviewService.deleteReview(id);

  if (!success) {
    return res.status(404).json({
      success: false,
      message: `Review #${id} not found.`,
    });
  }

  res.status(200).json({
    success: true,
    message: 'Review deleted successfully.',
  });
});

module.exports = {
  getAllReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
};
