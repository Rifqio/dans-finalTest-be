/* eslint-disable no-undef */
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: process.env.DATABASE_DIALECT,
  username: process.env.DATABASE_USERNAME,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_DB,
});

const DBConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established');
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { DBConnection, sequelize };
