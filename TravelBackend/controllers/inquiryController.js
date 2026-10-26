const asyncHandler = require('../utils/asyncHandler');
const inquiryService = require('../services/inquiryService');

/**
 * @desc    Submit a new inquiry (booking, custom trip plan, or contact message)
 * @route   POST /api/inquiries
 * @access  Public
 */
const createInquiry = asyncHandler(async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({
      success: false,
      message: 'Name and email are required to submit an inquiry.',
    });
  }

  const inquiry = await inquiryService.createInquiry(req.body);

  res.status(201).json({
    success: true,
    message: 'Your inquiry has been submitted successfully! Our Himalayan specialist will reach out shortly.',
    data: inquiry,
  });
});

/**
 * @desc    Get all inquiries (with optional filter by type or status)
 * @route   GET /api/inquiries
 * @access  Private/Admin
 */
const getAllInquiries = asyncHandler(async (req, res) => {
  const { type, status } = req.query;
  const inquiries = await inquiryService.getAllInquiries({ type, status });

  res.status(200).json({
    success: true,
    count: inquiries.length,
    data: inquiries,
  });
});

/**
 * @desc    Get single inquiry by ID
 * @route   GET /api/inquiries/:id
 * @access  Private/Admin
 */
const getInquiryById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const inquiry = await inquiryService.getInquiryById(id);

  if (!inquiry) {
    return res.status(404).json({
      success: false,
      message: `Inquiry #${id} not found.`,
    });
  }

  res.status(200).json({
    success: true,
    data: inquiry,
  });
});

/**
 * @desc    Update inquiry status ('pending', 'contacted', 'confirmed', 'archived')
 * @route   PUT /api/inquiries/:id/status
 * @access  Private/Admin
 */
const updateStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({
      success: false,
      message: 'Status is required.',
    });
  }

  const updated = await inquiryService.updateInquiryStatus(id, status);

  if (!updated) {
    return res.status(404).json({
      success: false,
      message: `Inquiry #${id} not found.`,
    });
  }

  res.status(200).json({
    success: true,
    message: `Inquiry #${id} status updated to ${status}.`,
    data: updated,
  });
});

/**
 * @desc    Delete inquiry
 * @route   DELETE /api/inquiries/:id
 * @access  Private/Admin
 */
const deleteInquiry = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const success = await inquiryService.deleteInquiry(id);

  if (!success) {
    return res.status(404).json({
      success: false,
      message: `Inquiry #${id} not found.`,
    });
  }

  res.status(200).json({
    success: true,
    message: 'Inquiry deleted successfully.',
  });
});

module.exports = {
  createInquiry,
  getAllInquiries,
  getInquiryById,
  updateStatus,
  deleteInquiry,
};
