const express = require('express');
const router = express.Router();
const {
  createInquiry,
  getAllInquiries,
  getInquiryById,
  updateStatus,
  deleteInquiry,
} = require('../controllers/inquiryController');
const { protect } = require('../middlewares/authMiddleware');

router.route('/')
  .post(createInquiry) // Public: visitors submitting bookings / contacts / plans
  .get(protect, getAllInquiries); // Admin: viewing list

router.route('/:id')
  .get(protect, getInquiryById)
  .delete(protect, deleteInquiry);

router.route('/:id/status')
  .put(protect, updateStatus);

module.exports = router;
