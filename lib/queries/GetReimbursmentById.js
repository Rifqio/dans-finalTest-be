const { QueryTypes } = require('sequelize');
const { sequelize } = require('../../config/database');

const getReimbursmentByIdQuery = async (id) => {
  const queryResult = await sequelize.query(
   `SELECT
	request_reimbursment.*,
	users.name 
    FROM
	request_reimbursment
	INNER JOIN users ON request_reimbursment.user_id = users.id_user 
    WHERE
	request_reimbursment.id_req_reimbursment = ${id}`,
    { type: QueryTypes.SELECT }
  );
  return queryResult;
};

module.exports = getReimbursmentByIdQuery;
