const asyncHandler = require('../utils/asyncHandler');
const faqService = require('../services/faqService');

/**
 * @desc    Get all FAQs
 * @route   GET /api/faqs
 * @access  Public
 */
const getAllFaqs = asyncHandler(async (req, res) => {
  const faqs = await faqService.getAllFaqs();

  res.status(200).json({
    success: true,
    count: faqs.length,
    data: faqs,
  });
});

/**
 * @desc    Get FAQ by ID
 * @route   GET /api/faqs/:id
 * @access  Public
 */
const getFaqById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const faq = await faqService.getFaqById(id);

  if (!faq) {
    return res.status(404).json({
      success: false,
      message: `FAQ #${id} not found.`,
    });
  }

  res.status(200).json({
    success: true,
    data: faq,
  });
});

/**
 * @desc    Create new FAQ
 * @route   POST /api/faqs
 * @access  Private/Admin
 */
const createFaq = asyncHandler(async (req, res) => {
  const faq = await faqService.createFaq(req.body);

  res.status(201).json({
    success: true,
    message: 'FAQ created successfully.',
    data: faq,
  });
});

/**
 * @desc    Update FAQ
 * @route   PUT /api/faqs/:id
 * @access  Private/Admin
 */
const updateFaq = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updated = await faqService.updateFaq(id, req.body);

  if (!updated) {
    return res.status(404).json({
      success: false,
      message: `FAQ #${id} not found.`,
    });
  }

  res.status(200).json({
    success: true,
    message: 'FAQ updated successfully.',
    data: updated,
  });
});

/**
 * @desc    Delete FAQ
 * @route   DELETE /api/faqs/:id
 * @access  Private/Admin
 */
const deleteFaq = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const success = await faqService.deleteFaq(id);

  if (!success) {
    return res.status(404).json({
      success: false,
      message: `FAQ #${id} not found.`,
    });
  }

  res.status(200).json({
    success: true,
    message: 'FAQ deleted successfully.',
  });
});

module.exports = {
  getAllFaqs,
  getFaqById,
  createFaq,
  updateFaq,
  deleteFaq,
};
