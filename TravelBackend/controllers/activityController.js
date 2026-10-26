const asyncHandler = require('../utils/asyncHandler');
const activityService = require('../services/activityService');

/**
 * @desc    Get all activities
 * @route   GET /api/activities
 * @access  Public
 */
const getAllActivities = asyncHandler(async (req, res) => {
  const activities = await activityService.getAllActivities();

  res.status(200).json({
    success: true,
    count: activities.length,
    data: activities,
  });
});

/**
 * @desc    Get activity by ID or slug
 * @route   GET /api/activities/:idOrSlug
 * @access  Public
 */
const getActivityByIdOrSlug = asyncHandler(async (req, res) => {
  const { idOrSlug } = req.params;
  const activity = await activityService.getActivityByIdOrSlug(idOrSlug);

  if (!activity) {
    return res.status(404).json({
      success: false,
      message: `Activity '${idOrSlug}' not found.`,
    });
  }

  res.status(200).json({
    success: true,
    data: activity,
  });
});

/**
 * @desc    Create new activity
 * @route   POST /api/activities
 * @access  Private/Admin
 */
const createActivity = asyncHandler(async (req, res) => {
  const newActivity = await activityService.createActivity(req.body);

  res.status(201).json({
    success: true,
    message: 'Activity created successfully.',
    data: newActivity,
  });
});

/**
 * @desc    Update activity
 * @route   PUT /api/activities/:idOrSlug
 * @access  Private/Admin
 */
const updateActivity = asyncHandler(async (req, res) => {
  const { idOrSlug } = req.params;
  const updated = await activityService.updateActivity(idOrSlug, req.body);

  if (!updated) {
    return res.status(404).json({
      success: false,
      message: `Activity '${idOrSlug}' not found.`,
    });
  }

  res.status(200).json({
    success: true,
    message: 'Activity updated successfully.',
    data: updated,
  });
});

/**
 * @desc    Delete activity
 * @route   DELETE /api/activities/:idOrSlug
 * @access  Private/Admin
 */
const deleteActivity = asyncHandler(async (req, res) => {
  const { idOrSlug } = req.params;
  const success = await activityService.deleteActivity(idOrSlug);

  if (!success) {
    return res.status(404).json({
      success: false,
      message: `Activity '${idOrSlug}' not found.`,
    });
  }

  res.status(200).json({
    success: true,
    message: 'Activity deleted successfully.',
  });
});

module.exports = {
  getAllActivities,
  getActivityByIdOrSlug,
  createActivity,
  updateActivity,
  deleteActivity,
};
