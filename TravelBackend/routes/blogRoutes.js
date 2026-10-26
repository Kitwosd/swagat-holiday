const express = require('express');
const router = express.Router();
const {
  getAllPosts,
  getPostByIdOrSlug,
  createPost,
  updatePost,
  deletePost,
} = require('../controllers/blogController');
const { protect } = require('../middlewares/authMiddleware');

router.route('/')
  .get(getAllPosts)
  .post(protect, createPost);

router.route('/:idOrSlug')
  .get(getPostByIdOrSlug)
  .put(protect, updatePost)
  .delete(protect, deletePost);

module.exports = router;
