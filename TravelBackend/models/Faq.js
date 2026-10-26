const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Faq = sequelize.define(
  'Faq',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    question: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    question_np: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    answer: {
      type: DataTypes.TEXT('long'),
      allowNull: false,
    },
    answer_np: {
      type: DataTypes.TEXT('long'),
      allowNull: true,
    },
    category: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: 'General',
    },
    category_np: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    orderIndex: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    tableName: 'faqs',
    timestamps: true,
  }
);

module.exports = Faq;
