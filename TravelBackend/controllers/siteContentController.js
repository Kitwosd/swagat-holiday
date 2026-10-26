const asyncHandler = require('../utils/asyncHandler');
const siteContentService = require('../services/siteContentService');

/**
 * @desc    Get all dynamic site content sections
 * @route   GET /api/content
 * @access  Public
 */
const getAllContent = asyncHandler(async (req, res) => {
  const content = await siteContentService.getAllContent();

  res.status(200).json({
    success: true,
    data: content,
  });
});

/**
 * @desc    Get content for specific section key
 * @route   GET /api/content/:key
 * @access  Public
 */
const getContentByKey = asyncHandler(async (req, res) => {
  const { key } = req.params;
  const content = await siteContentService.getContentByKey(key);

  if (!content) {
    return res.status(404).json({
      success: false,
      message: `Content for key '${key}' not found.`,
    });
  }

  res.status(200).json({
    success: true,
    data: content,
  });
});

/**
 * @desc    Create or update dynamic content for a section key
 * @route   POST /api/content/:key
 * @access  Private/Admin
 */
const updateContent = asyncHandler(async (req, res) => {
  const { key } = req.params;
  const updated = await siteContentService.upsertContent(key, req.body);

  res.status(200).json({
    success: true,
    message: `Content for section '${key}' updated successfully.`,
    data: updated,
  });
});

module.exports = {
  getAllContent,
  getContentByKey,
  updateContent,
};
