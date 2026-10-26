const asyncHandler = require('../utils/asyncHandler');
const tripService = require('../services/tripService');

/**
 * @desc    Get all trips (supports filtering by category, region, search, etc.)
 * @route   GET /api/trips
 * @access  Public
 */
const getAllTrips = asyncHandler(async (req, res) => {
  const { category, region, regionSlug, featured, search } = req.query;
  const trips = await tripService.getAllTrips({
    category,
    region,
    regionSlug,
    featured,
    search,
  });

  res.status(200).json({
    success: true,
    count: trips.length,
    data: trips,
  });
});

/**
 * @desc    Get single trip by ID or Slug
 * @route   GET /api/trips/:idOrSlug
 * @access  Public
 */
const getTripByIdOrSlug = asyncHandler(async (req, res) => {
  const { idOrSlug } = req.params;
  const trip = await tripService.getTripByIdOrSlug(idOrSlug);

  if (!trip) {
    return res.status(404).json({
      success: false,
      message: `Trip with ID or slug '${idOrSlug}' not found.`,
    });
  }

  res.status(200).json({
    success: true,
    data: trip,
  });
});

/**
 * @desc    Create a new trip
 * @route   POST /api/trips
 * @access  Private/Admin
 */
const createTrip = asyncHandler(async (req, res) => {
  const newTrip = await tripService.createTrip(req.body);

  res.status(201).json({
    success: true,
    message: 'Trip created successfully.',
    data: newTrip,
  });
});

/**
 * @desc    Update a trip
 * @route   PUT /api/trips/:idOrSlug
 * @access  Private/Admin
 */
const updateTrip = asyncHandler(async (req, res) => {
  const { idOrSlug } = req.params;
  const updatedTrip = await tripService.updateTrip(idOrSlug, req.body);

  if (!updatedTrip) {
    return res.status(404).json({
      success: false,
      message: `Trip with ID or slug '${idOrSlug}' not found.`,
    });
  }

  res.status(200).json({
    success: true,
    message: 'Trip updated successfully.',
    data: updatedTrip,
  });
});

/**
 * @desc    Delete a trip
 * @route   DELETE /api/trips/:idOrSlug
 * @access  Private/Admin
 */
const deleteTrip = asyncHandler(async (req, res) => {
  const { idOrSlug } = req.params;
  const success = await tripService.deleteTrip(idOrSlug);

  if (!success) {
    return res.status(404).json({
      success: false,
      message: `Trip with ID or slug '${idOrSlug}' not found.`,
    });
  }

  res.status(200).json({
    success: true,
    message: 'Trip deleted successfully.',
  });
});

module.exports = {
  getAllTrips,
  getTripByIdOrSlug,
  createTrip,
  updateTrip,
  deleteTrip,
};
