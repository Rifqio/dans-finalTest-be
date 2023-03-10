const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Absensi = sequelize.define(
  'Absensi',
  {
    id_absensi: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    waktu_absen_masuk: {
      type: DataTypes.TIME,
    },
    waktu_absen_keluar: {
      type: DataTypes.TIME,
    },
    tanggal: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: 'absensi',
    timestamps: false,
  }
);

module.exports = Absensi;
