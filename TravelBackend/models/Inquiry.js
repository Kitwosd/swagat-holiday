const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Inquiry = sequelize.define(
  'Inquiry',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    type: {
      type: DataTypes.ENUM('booking', 'contact', 'custom_plan'),
      allowNull: false,
      defaultValue: 'contact',
    },
    name: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    phone: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    country: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    tripId: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    tripTitle: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    travelDate: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    travelers: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1,
    },
    duration: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    budget: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    preferredDestinations: {
      type: DataTypes.JSON,
      defaultValue: [],
    },
    activities: {
      type: DataTypes.JSON,
      defaultValue: [],
    },
    message: {
      type: DataTypes.TEXT('long'),
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('pending', 'contacted', 'confirmed', 'archived'),
      defaultValue: 'pending',
    },
  },
  {
    tableName: 'inquiries',
    timestamps: true,
  }
);

module.exports = Inquiry;
