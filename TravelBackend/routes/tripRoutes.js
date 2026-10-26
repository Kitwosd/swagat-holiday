const express = require('express');
const router = express.Router();
const {
  getAllTrips,
  getTripByIdOrSlug,
  createTrip,
  updateTrip,
  deleteTrip,
} = require('../controllers/tripController');
const { protect } = require('../middlewares/authMiddleware');

router.route('/')
  .get(getAllTrips)
  .post(protect, createTrip);

router.route('/:idOrSlug')
  .get(getTripByIdOrSlug)
  .put(protect, updateTrip)
  .delete(protect, deleteTrip);

module.exports = router;
