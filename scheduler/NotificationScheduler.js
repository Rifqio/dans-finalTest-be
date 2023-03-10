const schedule = require('node-schedule');
const getUnassignedOvertime = require('../lib/queries/GetUnassignedOvertime');
const {
  sendOvertimeNotification,
} = require('../controller/email/notification/OvertimeNotification');
const getUnassignedReimbursment = require('../lib/queries/GetUnassignedReimbursment');
const {
  sendReimbursmentNotification,
} = require('../controller/email/notification/ReimbursmentNotification');

const unassignedOvertime = async () => {
  try {
    const data = await getUnassignedOvertime();
    if (data) {
      schedule.scheduleJob('0 0 * * *', async () => {
        await sendOvertimeNotification();
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const unassignedReimbursment = async () => {
  try {
    const data = await getUnassignedReimbursment();
    if (data) {
      schedule.scheduleJob('0 0 * * *', async () => {
        await sendReimbursmentNotification();
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { unassignedOvertime, unassignedReimbursment };
