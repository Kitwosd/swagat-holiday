const asyncHandler = require('../utils/asyncHandler');
const authService = require('../services/authService');

/**
 * @desc    Authenticate user & get JWT token
 * @route   POST /api/auth/login
 * @access  Public
 */
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Please provide both email and password.',
    });
  }

  const user = await authService.findByEmail(email);
  if (!user) {
    return res.status(401).json({
      success: false,
      message: 'Invalid email or password credentials.',
    });
  }

  const isMatch = await authService.validatePassword(user, password);
  if (!isMatch) {
    return res.status(401).json({
      success: false,
      message: 'Invalid email or password credentials.',
    });
  }

  const token = authService.generateToken(user);

  res.status(200).json({
    success: true,
    message: 'Login successful.',
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

/**
 * @desc    Register a new admin/user
 * @route   POST /api/auth/register
 * @access  Public / Restricted
 */
const register = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Email and password are required.',
    });
  }

  const existing = await authService.findByEmail(email);
  if (existing) {
    return res.status(400).json({
      success: false,
      message: 'User already exists with this email.',
    });
  }

  const user = await authService.createUser({
    name: name || 'Admin',
    email,
    password,
    role: role || 'admin',
  });

  const token = authService.generateToken(user);

  res.status(201).json({
    success: true,
    message: 'User registered successfully.',
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

/**
 * @desc    Get currently logged in user profile
 * @route   GET /api/auth/me
 * @access  Private
 */
const getMe = asyncHandler(async (req, res) => {
  const user = await authService.findById(req.user.id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found.',
    });
  }

  res.status(200).json({
    success: true,
    user,
  });
});

module.exports = {
  login,
  register,
  getMe,
};
