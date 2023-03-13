const { QueryTypes } = require('sequelize');
const { sequelize } = require('../../config/database');
const getMyReimbursmentHistoryQuery = async (id) => {
  const queryResult = await sequelize.query(
    `SELECT
    request_reimbursment.*,
    users.name,
    status_request.type 
  FROM
    request_reimbursment
    INNER JOIN users ON request_reimbursment.user_id = users.id_user
    INNER JOIN status_request ON request_reimbursment.request_status_id = status_request.id_request_status 
  WHERE
    request_reimbursment.user_id = ${id}`,
    { type: QueryTypes.SELECT }
  );
  return queryResult;
};

module.exports = getMyReimbursmentHistoryQuery;
