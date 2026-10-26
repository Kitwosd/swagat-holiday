const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Destination = sequelize.define(
  'Destination',
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
    name: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    name_np: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    title_np: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    tag: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },
    tag_np: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },
    elevation: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    elevation_np: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    tripsCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT('long'),
      allowNull: true,
    },
    description_np: {
      type: DataTypes.TEXT('long'),
      allowNull: true,
    },
    popularTreks: {
      type: DataTypes.JSON,
      defaultValue: [],
    },
    highlights: {
      type: DataTypes.JSON,
      defaultValue: [],
    },
  },
  {
    tableName: 'destinations',
    timestamps: true,
  }
);

module.exports = Destination;
