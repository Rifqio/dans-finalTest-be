const { QueryTypes } = require('sequelize');
const { sequelize } = require('../../config/database');

const getUnassignedOvertime = async () => {
  const queryResult = await sequelize.query(
    `SELECT
	request_overtime.request_status_id 
    FROM
        request_overtime 
    WHERE
	request_overtime.request_status_id = 1`,
    { type: QueryTypes.SELECT }
  );
  return queryResult.map((result) => result.request_status_id);
};

module.exports = getUnassignedOvertime;
