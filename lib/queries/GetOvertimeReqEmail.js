const { sequelize } = require('../../config/database');

const getOvertimeReqEmail = async (user, overtimeId) => {
  const queryResult = await sequelize.query(
    `SELECT
      users.email
        FROM
        users
        INNER JOIN
        request_overtime
        ON 
            users.id_user = request_overtime.user_id
        WHERE
      request_overtime.user_id = ${user} AND
      request_overtime.id_req_overtime = ${overtimeId} 
  `
  );
  return queryResult[0].map((result) => result.email);
};

module.exports = getOvertimeReqEmail;
