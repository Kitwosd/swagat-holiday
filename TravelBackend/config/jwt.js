const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  SECRET_KEY: process.env.SECRET_KEY || 'default_jwt_secret_key_123456',
  EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
};
