const getAllListOvertimeRequest = require('../../lib/queries/GetAllListOvertimeRequest');
const Overtime = require('../../model/OvertimeModel');
const {
  sendOvertimeNotification,
  sendApproveOvertimeNotification,
  sendRejectOvertimeNotification,
} = require('../email/notification/OvertimeNotification');

exports.createOvertime = async (req, res) => {
  const { keterangan, user_id } = req.body;
  try {
    const data = await Overtime.create({
      keterangan,
      user_id,
      request_status_id: 1,
      created_at: Date.now(),
    });
    await sendOvertimeNotification();
    return res.send({ message: 'Overtime berhasil dibuat', data });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

exports.getOvertime = async (req, res) => {
  try {
    const data = await getAllListOvertimeRequest();
    if (data.length <= 0) return res.status(404).send({ message: 'Overtime not found.' });
    return res.send(data);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

exports.getOvertimeById = async (req, res) => {
  const { id } = req.params;
  try {
    const getOvertimeById = await Overtime.findOne({ where: { id_req_overtime: id } });
    if (!getOvertimeById) return res.status(404).send({ message: 'Overtime not found.' });
    return res.send(getOvertimeById);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

exports.approveStatusOvertime = async (req, res) => {
  const { id } = req.body;
  try {
    const getOvertimeById = await Overtime.findOne({ where: { id_req_overtime: id } });
    if (!getOvertimeById) return res.status(404).send({ message: 'Overtime not found.' });
    await getOvertimeById.update({ request_status_id: 2, updated_at: Date.now() });
    // await sendApproveOvertimeNotification(getOvertimeById.user_id, getOvertimeById.id_req_overtime);
    return res.send({ message: 'Status overtime berhasil diapproved' });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

exports.rejectStatusOvertime = async (req, res) => {
  const { id } = req.body;
  try {
    const getOvertimeById = await Overtime.findOne({ where: { id_req_overtime: id } });
    if (!getOvertimeById) return res.status(404).send({ message: 'Overtime not found.' });
    await getOvertimeById.update({ request_status_id: 3, updated_at: Date.now() });
    await sendRejectOvertimeNotification(getOvertimeById.user_id, getOvertimeById.id_req_overtime)
    return res.send({ message: 'Status overtime berhasil direject' });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
