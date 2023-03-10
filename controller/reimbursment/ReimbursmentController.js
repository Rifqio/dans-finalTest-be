const Reimbursment = require('../../model/ReimbursmentModal');
const {
  sendReimbursmentNotification,
  sendApprovedReimbursmentNotification,
  sendRejectedReimbursmentNotification,
} = require('../email/notification/ReimbursmentNotification');

exports.createReimbursment = async (req, res) => {
  const { user_id, keterangan } = req.body;
  try {
    const data = await Reimbursment.create({
      user_id,
      keterangan,
      request_status_id: 1,
      created_at: Date.now(),
    });
    await sendReimbursmentNotification();
    return res.status(201).send({ message: 'Reimbursment berhasil dibuat', data });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

exports.getReimbursment = async (req, res) => {
  try {
    const data = await Reimbursment.findAll();
    if (data.length <= 0) return res.status(404).send({ message: 'Data tidak ditemukan' });
    return res.send(data);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

exports.approveReimbursment = async (req, res) => {
  const { id } = req.params;
  try {
    const getReimbursment = await Reimbursment.findOne({ where: { id_req_reimbursment: id } });
    if (!getReimbursment) return res.status(404).send({ message: 'Reimbursment tidak ditemukan' });
    await getReimbursment.update({ request_status_id: 2, updated_at: Date.now() });
    await sendApprovedReimbursmentNotification(
      getReimbursment.user_id,
      getReimbursment.id_req_reimbursment
    );
    return res.send({ message: 'Reimbursment berhasil diapprove' });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

exports.rejectReimbursment = async (req, res) => {
  const { id } = req.params;
  try {
    const getReimbursment = await Reimbursment.findOne({ where: { id_req_reimbursment: id } });
    if (!getReimbursment) return res.status(404).send({ message: 'Reimbursment tidak ditemukan' });
    await getReimbursment.update({ request_status_id: 3, updated_at: Date.now() });
    await sendRejectedReimbursmentNotification(
      getReimbursment.user_id,
      getReimbursment.id_req_reimbursment
    );
    return res.send({ message: 'Reimbursment berhasil direject' });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
