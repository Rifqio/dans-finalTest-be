const { sequelize } = require('../../config/database');

const getHREmail = async () => {
  const queryResult = await sequelize.query(
    `SELECT
      users.email 
      FROM
      role_user
      INNER JOIN users ON role_user.user_id = users.id_user
      INNER JOIN roles ON role_user.role_id = roles.id_role 
      WHERE
      role_user.role_id = 2`
  );
  return queryResult[0].map((result) => result.email);
};

module.exports = getHREmail;
