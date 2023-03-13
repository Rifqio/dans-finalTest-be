const { QueryTypes } = require('sequelize');
const { sequelize } = require('../../config/database');
const getAllReimbursment = async () => {
  const queryResult = await sequelize.query(
    `SELECT
	users.name,
    users.id_user,
	request_reimbursment.id_req_reimbursment,
	request_reimbursment.keterangan,
	request_reimbursment.bukti,
	request_reimbursment.created_at,
	request_reimbursment.updated_at,
	status_request.type 
    FROM
	request_reimbursment
	INNER JOIN users ON request_reimbursment.user_id = users.id_user
	INNER JOIN status_request ON request_reimbursment.request_status_id = status_request.id_request_status
	ORDER BY
	request_reimbursment.updated_at DESC
	`,
    { type: QueryTypes.SELECT }
  );
  return queryResult;
};

module.exports = getAllReimbursment;
