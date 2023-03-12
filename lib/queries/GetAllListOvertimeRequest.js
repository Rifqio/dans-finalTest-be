const { QueryTypes } = require('sequelize');
const { sequelize } = require('../../config/database');

const getAllListOvertimeRequest = async () => {
  const queryResult = await sequelize.query(
    `SELECT
      request_overtime.id_req_overtime, 
      request_overtime.keterangan, 
      request_overtime.created_at, 
      request_overtime.updated_at, 
      users.id_user, 
      users.name,
      status_request.type
      FROM
      request_overtime
      INNER JOIN
      users
      ON 
          request_overtime.user_id = users.id_user
      INNER JOIN
      status_request
      ON 
    request_overtime.request_status_id = status_request.id_request_status`,
    { type: QueryTypes.SELECT }
  );
  return queryResult;
};

module.exports = getAllListOvertimeRequest;
