const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const PermissionRole = sequelize.define(
  'PermissionRole',
  {
    permission_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'permission_role',
    timestamps: false,
  }
);

module.exports = PermissionRole;
