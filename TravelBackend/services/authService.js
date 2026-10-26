const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { SECRET_KEY, EXPIRES_IN } = require('../config/jwt');

class AuthService {
  /**
   * Find a user by email address
   */
  async findByEmail(email) {
    return await User.findOne({ where: { email: email.toLowerCase().trim() } });
  }

  /**
   * Find a user by primary key ID
   */
  async findById(id) {
    return await User.findByPk(id, {
      attributes: { exclude: ['password'] },
    });
  }

  /**
   * Create a new user (admin / editor)
   */
  async createUser(userData) {
    return await User.create({
      ...userData,
      email: userData.email.toLowerCase().trim(),
    });
  }

  /**
   * Validate password against hashed password
   */
  async validatePassword(user, candidatePassword) {
    return await user.comparePassword(candidatePassword);
  }

  /**
   * Generate JWT authentication token
   */
  generateToken(user) {
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
    };
    return jwt.sign(payload, SECRET_KEY, { expiresIn: EXPIRES_IN });
  }

  /**
   * Verify JWT token
   */
  verifyToken(token) {
    return jwt.verify(token, SECRET_KEY);
  }
}

module.exports = new AuthService();
