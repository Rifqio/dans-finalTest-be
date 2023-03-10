const transporter = require('../config/index');
const getHREmail = require('../../../lib/queries/GetAllEmailHR');
const getReimbursmentReqEmail = require('../../../lib/queries/GetReimbursmentReqEmail');

exports.sendReimbursmentNotification = async () => {
  try {
    const emails = await getHREmail();
    await transporter.sendMail({
      from: '"Admin" <admin@example.com>',
      to: emails.join(', '),
      subject: 'Reimbursment Request',
      html: `<b>Hi a new reimbursment request has been added</b>`,
    });
    console.log('Email notification sent');
  } catch (error) {
    console.log(error.message);
  }
};

exports.sendApprovedReimbursmentNotification = async (user, reimbursmentId) => {
  try {
    const emails = await getReimbursmentReqEmail(user, reimbursmentId);
    await transporter.sendMail({
      from: '"Admin" <admin@example.com>',
      to: emails,
      subject: 'Reimbursment Approved',
      html: `<b>Hi your reimbursment has been approved by HR</b>`,
    });
  } catch (error) {
    console.log(error.message);
  }
}

exports.sendRejectedReimbursmentNotification = async (user, reimbursmentId) => {
  try {
    const emails = await getReimbursmentReqEmail(user, reimbursmentId);
    await transporter.sendMail({
      from: '"Admin" <admin@example.com>',
      to: emails,
      subject: 'Reimbursment Rejected',
      html: `<b>Hi sorry your reimbursment has been rejected by HR</b>`,
    });
  } catch (error) {
    console.log(error.message);
  }
}