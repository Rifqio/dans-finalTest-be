const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const RoleUser = sequelize.define(
  'RoleUser',
  {
    role_id: {
      type: DataTypes.INTEGER,
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: 'role_user',
    timestamps: false,
  }
);
RoleUser.removeAttribute('id');
module.exports = RoleUser;
