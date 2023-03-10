const transporter = require('../config/index');
const getHREmail = require('../../../lib/queries/GetAllEmailHR');
const getOvertimeReqEmail = require('../../../lib/queries/GetOvertimeReqEmail');

exports.sendOvertimeNotification = async () => {
  try {
    const emails = await getHREmail();
    await transporter.sendMail({
      from: '"Admin" <admin@example.com>',
      to: emails.join(', '),
      subject: 'Overtime Request',
      html: `<b>Hi a new overtime request has been added</b>`,
    });
    console.log('Email notification sent');
  } catch (error) {
    console.log(error.message);
  }
};

exports.sendApproveOvertimeNotification = async (user, overtimeId) => {
  try {
    const emails = await getOvertimeReqEmail(user, overtimeId);
    await transporter.sendMail({
      from: '"Admin" <admin@example.com>',
      to: emails,
      subject: 'Overtime Request Approved',
      html: `<b>Hi your overtime request has been added</b>`,
    });
    console.log('Email notification sent');
  } catch (error) {
    console.log(error.message);
  }
};


exports.sendRejectOvertimeNotification = async (user, overtimeId) => {
  try {
    const emails = await getOvertimeReqEmail(user, overtimeId);
    await transporter.sendMail({
      from: '"Admin" <admin@example.com>',
      to: emails,
      subject: 'Overtime Request Rejected',
      html: `<b>Hi sorry but your overtime request has been rejected</b>`,
    });
    console.log('Email notification sent');
  } catch (error) {
    console.log(error.message);
  }
};

