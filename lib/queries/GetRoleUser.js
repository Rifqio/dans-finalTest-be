const { sequelize } = require('../../config/database');

const getRoleUser = async (user) => {
  const queryResult = await sequelize.query(
    `SELECT
    roles.id_role
      FROM
          users
          INNER JOIN
          role_user
          ON 
              users.id_user = role_user.user_id
          INNER JOIN
          roles
          ON 
              role_user.role_id = roles.id_role
      WHERE
	  users.id_user = ${user}`
  );
  return queryResult[0].map((result) => result.id_role);
};

module.exports = getRoleUser;
