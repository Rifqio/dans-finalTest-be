/* eslint-disable no-undef */
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'mysql',
  username: 'root',
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_DB,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT
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
