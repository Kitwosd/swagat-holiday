const asyncHandler = require('../utils/asyncHandler');
const blogService = require('../services/blogService');

/**
 * @desc    Get all blog posts
 * @route   GET /api/blogs
 * @access  Public
 */
const getAllPosts = asyncHandler(async (req, res) => {
  const posts = await blogService.getAllPosts();

  res.status(200).json({
    success: true,
    count: posts.length,
    data: posts,
  });
});

/**
 * @desc    Get single blog post by ID or slug
 * @route   GET /api/blogs/:idOrSlug
 * @access  Public
 */
const getPostByIdOrSlug = asyncHandler(async (req, res) => {
  const { idOrSlug } = req.params;
  const post = await blogService.getPostByIdOrSlug(idOrSlug);

  if (!post) {
    return res.status(404).json({
      success: false,
      message: `Blog post '${idOrSlug}' not found.`,
    });
  }

  res.status(200).json({
    success: true,
    data: post,
  });
});

/**
 * @desc    Create new blog post
 * @route   POST /api/blogs
 * @access  Private/Admin
 */
const createPost = asyncHandler(async (req, res) => {
  const post = await blogService.createPost(req.body);

  res.status(201).json({
    success: true,
    message: 'Blog post created successfully.',
    data: post,
  });
});

/**
 * @desc    Update blog post
 * @route   PUT /api/blogs/:idOrSlug
 * @access  Private/Admin
 */
const updatePost = asyncHandler(async (req, res) => {
  const { idOrSlug } = req.params;
  const updated = await blogService.updatePost(idOrSlug, req.body);

  if (!updated) {
    return res.status(404).json({
      success: false,
      message: `Blog post '${idOrSlug}' not found.`,
    });
  }

  res.status(200).json({
    success: true,
    message: 'Blog post updated successfully.',
    data: updated,
  });
});

/**
 * @desc    Delete blog post
 * @route   DELETE /api/blogs/:idOrSlug
 * @access  Private/Admin
 */
const deletePost = asyncHandler(async (req, res) => {
  const { idOrSlug } = req.params;
  const success = await blogService.deletePost(idOrSlug);

  if (!success) {
    return res.status(404).json({
      success: false,
      message: `Blog post '${idOrSlug}' not found.`,
    });
  }

  res.status(200).json({
    success: true,
    message: 'Blog post deleted successfully.',
  });
});

module.exports = {
  getAllPosts,
  getPostByIdOrSlug,
  createPost,
  updatePost,
  deletePost,
};
