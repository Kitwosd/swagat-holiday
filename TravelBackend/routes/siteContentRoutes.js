const express = require('express');
const router = express.Router();
const {
  getAllContent,
  getContentByKey,
  updateContent,
} = require('../controllers/siteContentController');
const { protect } = require('../middlewares/authMiddleware');

router.route('/')
  .get(getAllContent);

router.route('/:key')
  .get(getContentByKey)
  .post(protect, updateContent)
  .put(protect, updateContent);

module.exports = router;
