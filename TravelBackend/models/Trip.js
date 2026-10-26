const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Trip = sequelize.define(
  'Trip',
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
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    title_np: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    region: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    region_np: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    regionSlug: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: 'trek',
    },
    duration: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    duration_np: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    durationDays: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    maxAltitude: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    maxAltitude_np: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    maxAltitudeNum: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    difficulty: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    difficulty_np: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    difficultyLevel: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: 'moderate',
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 5.0,
    },
    reviewsCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    regularPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    salePrice: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    featured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    badge: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    badge_np: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    gallery: {
      type: DataTypes.JSON,
      defaultValue: [],
    },
    overview: {
      type: DataTypes.TEXT('long'),
      allowNull: true,
    },
    overview_np: {
      type: DataTypes.TEXT('long'),
      allowNull: true,
    },
    bestSeason: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },
    groupSize: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    startEnd: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },
    highlights: {
      type: DataTypes.JSON,
      defaultValue: [],
    },
    itinerary: {
      type: DataTypes.JSON,
      defaultValue: [],
    },
    included: {
      type: DataTypes.JSON,
      defaultValue: [],
    },
    excluded: {
      type: DataTypes.JSON,
      defaultValue: [],
    },
  },
  {
    tableName: 'trips',
    timestamps: true,
  }
);

module.exports = Trip;
