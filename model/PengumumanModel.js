const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Pengumuman = sequelize.define(
  'Pengumuman',
  {
    id_pengumuman: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
    created_at: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: 'pengumuman',
    timestamps: false,
  }
);

module.exports = Pengumuman;
