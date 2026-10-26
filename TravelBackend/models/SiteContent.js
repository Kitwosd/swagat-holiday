const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const SiteContent = sequelize.define(
  'SiteContent',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    key: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    data: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: {},
    },
  },
  {
    tableName: 'site_contents',
    timestamps: true,
  }
);

module.exports = SiteContent;
