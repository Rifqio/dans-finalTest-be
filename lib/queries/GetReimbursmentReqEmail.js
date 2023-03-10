const { sequelize } = require('../../config/database');

const getReimbursmentReqEmail = async (id, reimbursmentId) => {
  const queryResult = await sequelize.query(
    `SELECT
	users.email 
    FROM
        request_reimbursment
        INNER JOIN users ON request_reimbursment.user_id = users.id_user 
    WHERE
	request_reimbursment.user_id = ${id} AND
	request_reimbursment.id_req_reimbursment = ${reimbursmentId}
    `
  );
  return queryResult[0].map((result) => result.email);
};

module.exports = getReimbursmentReqEmail;
