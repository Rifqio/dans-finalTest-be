const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'mysql',
  username: 'root',
  host: 'localhost',
  database: 'api_dans_final_test',
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
