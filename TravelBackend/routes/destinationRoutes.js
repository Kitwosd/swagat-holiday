const express = require('express');
const router = express.Router();
const {
  getAllDestinations,
  getDestinationByIdOrSlug,
  createDestination,
  updateDestination,
  deleteDestination,
} = require('../controllers/destinationController');
const { protect } = require('../middlewares/authMiddleware');

router.route('/')
  .get(getAllDestinations)
  .post(protect, createDestination);

router.route('/:idOrSlug')
  .get(getDestinationByIdOrSlug)
  .put(protect, updateDestination)
  .delete(protect, deleteDestination);

module.exports = router;
