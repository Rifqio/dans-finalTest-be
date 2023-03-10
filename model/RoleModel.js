const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Role = sequelize.define(
  'Role',
  {
    id_role: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: 'roles',
    timestamps: false,
  }
);

module.exports = Role;
