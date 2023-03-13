const getAllReimbursment = require('../../lib/queries/GetAllReimbursment');
const getMyReimbursmentHistoryQuery = require('../../lib/queries/GetMyReimbursmentHistory');
const getReimbursmentByIdQuery = require('../../lib/queries/GetReimbursmentById');
const Reimbursment = require('../../model/ReimbursmentModal');
const {
  sendReimbursmentNotification,
  sendApprovedReimbursmentNotification,
  sendRejectedReimbursmentNotification,
} = require('../email/notification/ReimbursmentNotification');

exports.createReimbursment = async (req, res) => {
  const { keterangan } = req.body;
  const { user_id } = req.user;
  const bukti = req.protocol + '://' + req.get('host') + '/uploads/' + req.file.filename;

  try {
    const data = await Reimbursment.create({
      user_id,
      keterangan,
      bukti,
      request_status_id: 1,
      created_at: Date.now(),
    });
    // await sendReimbursmentNotification();
    return res.status(201).send({ message: 'Reimbursment berhasil dibuat', data });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

exports.getReimbursment = async (req, res) => {
  try {
    const data = await getAllReimbursment();
    if (data.length <= 0) return res.status(404).send({ message: 'Data tidak ditemukan' });
    return res.send(data);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

exports.getReimbursmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await getReimbursmentByIdQuery(id);
    if (!data) return res.status(404).send({ message: 'Data tidak ditemukan' });
    return res.send(data);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

exports.getMyReimbursmentHistory = async (req, res) => {
  const { user_id } = req.user;
  try {
    const data = await getMyReimbursmentHistoryQuery(user_id);
    console.log(data);
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
    // await sendApprovedReimbursmentNotification(
    //   getReimbursment.user_id,
    //   getReimbursment.id_req_reimbursment
    // );
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
