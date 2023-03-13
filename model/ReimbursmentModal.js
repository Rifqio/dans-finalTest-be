const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Reimbursment = sequelize.define(
  'Reimbursment',
  {
    id_req_reimbursment: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    keterangan: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    bukti: {
      type: DataTypes.STRING,
    },
    request_status_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
    },
    updated_at: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: 'request_reimbursment',
    timestamps: false,
  }
);

module.exports = Reimbursment;
