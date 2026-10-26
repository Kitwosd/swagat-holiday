const express = require('express');
const router = express.Router();
const {
  getAllFaqs,
  getFaqById,
  createFaq,
  updateFaq,
  deleteFaq,
} = require('../controllers/faqController');
const { protect } = require('../middlewares/authMiddleware');

router.route('/')
  .get(getAllFaqs)
  .post(protect, createFaq);

router.route('/:id')
  .get(getFaqById)
  .put(protect, updateFaq)
  .delete(protect, deleteFaq);

module.exports = router;
