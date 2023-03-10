const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Overtime = sequelize.define(
  'Overtime',
  {
    id_req_overtime: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    keterangan: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    request_status_id: {
      type: DataTypes.INTEGER,
    },
    created_at: {
      type: DataTypes.DATE,
    },
    updated_at: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: 'request_overtime',
    timestamps: false,
  }
);

module.exports = Overtime;
