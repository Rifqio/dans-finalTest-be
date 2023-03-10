const { QueryTypes } = require('sequelize');
const { sequelize } = require('../../config/database');

const getUnassignedReimbursment = async () => {
  const queryResult = await sequelize.query(
    `SELECT
	request_reimbursment.id_req_reimbursment
    FROM
        request_reimbursment
    WHERE
	request_reimbursment.request_status_id = 1`,
    { type: QueryTypes.SELECT }
  );
  return queryResult.map((result) => result.request_status_id);
};

module.exports = getUnassignedReimbursment;
