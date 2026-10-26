const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Review = sequelize.define(
  'Review',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    country_np: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    trip: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    trip_np: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    avatar: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 5,
      validate: {
        min: 1,
        max: 5,
      },
    },
    quote: {
      type: DataTypes.TEXT('long'),
      allowNull: false,
    },
    quote_np: {
      type: DataTypes.TEXT('long'),
      allowNull: true,
    },
    date: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: 'reviews',
    timestamps: true,
  }
);

module.exports = Review;
