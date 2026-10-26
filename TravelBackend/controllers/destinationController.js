const asyncHandler = require('../utils/asyncHandler');
const destinationService = require('../services/destinationService');

/**
 * @desc    Get all destinations
 * @route   GET /api/destinations
 * @access  Public
 */
const getAllDestinations = asyncHandler(async (req, res) => {
  const destinations = await destinationService.getAllDestinations();

  res.status(200).json({
    success: true,
    count: destinations.length,
    data: destinations,
  });
});

/**
 * @desc    Get destination by ID or slug
 * @route   GET /api/destinations/:idOrSlug
 * @access  Public
 */
const getDestinationByIdOrSlug = asyncHandler(async (req, res) => {
  const { idOrSlug } = req.params;
  const destination = await destinationService.getDestinationByIdOrSlug(idOrSlug);

  if (!destination) {
    return res.status(404).json({
      success: false,
      message: `Destination '${idOrSlug}' not found.`,
    });
  }

  res.status(200).json({
    success: true,
    data: destination,
  });
});

/**
 * @desc    Create new destination
 * @route   POST /api/destinations
 * @access  Private/Admin
 */
const createDestination = asyncHandler(async (req, res) => {
  const newDestination = await destinationService.createDestination(req.body);

  res.status(201).json({
    success: true,
    message: 'Destination created successfully.',
    data: newDestination,
  });
});

/**
 * @desc    Update destination
 * @route   PUT /api/destinations/:idOrSlug
 * @access  Private/Admin
 */
const updateDestination = asyncHandler(async (req, res) => {
  const { idOrSlug } = req.params;
  const updated = await destinationService.updateDestination(idOrSlug, req.body);

  if (!updated) {
    return res.status(404).json({
      success: false,
      message: `Destination '${idOrSlug}' not found.`,
    });
  }

  res.status(200).json({
    success: true,
    message: 'Destination updated successfully.',
    data: updated,
  });
});

/**
 * @desc    Delete destination
 * @route   DELETE /api/destinations/:idOrSlug
 * @access  Private/Admin
 */
const deleteDestination = asyncHandler(async (req, res) => {
  const { idOrSlug } = req.params;
  const success = await destinationService.deleteDestination(idOrSlug);

  if (!success) {
    return res.status(404).json({
      success: false,
      message: `Destination '${idOrSlug}' not found.`,
    });
  }

  res.status(200).json({
    success: true,
    message: 'Destination deleted successfully.',
  });
});

module.exports = {
  getAllDestinations,
  getDestinationByIdOrSlug,
  createDestination,
  updateDestination,
  deleteDestination,
};
