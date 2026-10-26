const express = require('express');
const router = express.Router();
const {
  getAllActivities,
  getActivityByIdOrSlug,
  createActivity,
  updateActivity,
  deleteActivity,
} = require('../controllers/activityController');
const { protect } = require('../middlewares/authMiddleware');

router.route('/')
  .get(getAllActivities)
  .post(protect, createActivity);

router.route('/:idOrSlug')
  .get(getActivityByIdOrSlug)
  .put(protect, updateActivity)
  .delete(protect, deleteActivity);

module.exports = router;
