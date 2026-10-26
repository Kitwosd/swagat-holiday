const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Activity = sequelize.define(
  'Activity',
  {
    id: {
      type: DataTypes.STRING(100),
      primaryKey: true,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: true,
    },
    redirectUrl: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    subtitle: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    count: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    tier: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 2,
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT('long'),
      allowNull: true,
    },
    highlights: {
      type: DataTypes.JSON,
      defaultValue: [],
    },
    priceFrom: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    durationAvg: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
  },
  {
    tableName: 'activities',
    timestamps: true,
  }
);

module.exports = Activity;
