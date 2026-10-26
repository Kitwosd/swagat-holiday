const { sequelize } = require('../config/db');
const User = require('./User');
const Trip = require('./Trip');
const Destination = require('./Destination');
const Activity = require('./Activity');
const Review = require('./Review');
const BlogPost = require('./BlogPost');
const Faq = require('./Faq');
const Inquiry = require('./Inquiry');
const SiteContent = require('./SiteContent');

// Define associations if needed in the future
// (e.g. Inquiries related to Trip, Blogs written by User, etc.)
Trip.hasMany(Inquiry, { foreignKey: 'tripId', sourceKey: 'id', as: 'inquiries', constraints: false });
Inquiry.belongsTo(Trip, { foreignKey: 'tripId', targetKey: 'id', as: 'trip', constraints: false });

module.exports = {
  sequelize,
  User,
  Trip,
  Destination,
  Activity,
  Review,
  BlogPost,
  Faq,
  Inquiry,
  SiteContent,
};
