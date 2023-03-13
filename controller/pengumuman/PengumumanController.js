/* eslint-disable no-undef */
const { rabbitMQ } = require('../../config/rabbitmq');
const { redisClient } = require('../../config/redis');
const Pengumuman = require('../../model/PengumumanModel');

exports.getPengumuman = async (req, res) => {
  try {
    const connection = await rabbitMQ();
    const channel = await connection.createChannel();
    await channel.assertQueue('pengumuman_created');

    channel.consume('pengumuman_created', (message) => {
      if (!message) return;
      redisClient.del('pengumuman');
      channel.ack(message);
    });

    channel.consume('pengumuman_edited', (message) => {
      if (!message) return;
      redisClient.del('pengumuman');
      channel.ack(message);
    });

    channel.consume('pengumuman_deleted', (message) => {
      if (!message) return;
      redisClient.del('pengumuman');
      channel.ack(message);
    });

    redisClient.get('pengumuman', async (err, result) => {
      // With Redis
      if (err) return res.status(500).send(err.message);
      if (result) return res.json(JSON.parse(result));
      // Without Redis
      const data = await Pengumuman.findAll({ order: [['updated_at', 'DESC']] });
      redisClient.setex('pengumuman', 3600, JSON.stringify(data));
      if (data.length <= 0) return res.status(404).send({ message: 'Pengumuman tidak ditemukan' });
      return res.send(data);
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

exports.getPengumumanById = async (req, res) => {
  const { id } = req.params;
  try {
    redisClient.get(`pengumuman/${id}`, async (err, result) => {
      // With Redis
      if (err) return res.status(500).send(err.message);
      if (result) return res.json(JSON.parse(result));
      // Without Redis
      const getPengumumanById = await Pengumuman.findOne({ where: { id_pengumuman: id } });
      if (!getPengumumanById)
        return res.status(404).send({ message: 'Pengumuman tidak ditemukan' });
      redisClient.setex(`pengumuman/${id}`, 3600, JSON.stringify(getPengumumanById));
      return res.send(getPengumumanById);
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

exports.createPengumuman = async (req, res) => {
  const connection = await rabbitMQ();
  const { title, content, user_id } = req.body;
  try {
    const data = await Pengumuman.create({
      title,
      content,
      user_id,
      created_at: Date.now(),
    });

    const channel = await connection.createChannel();
    await channel.assertQueue('pengumuman_created');
    channel.sendToQueue('pengumuman_created', Buffer.from(JSON.stringify(data)));

    return res.send({ message: 'Pengumuman berhasil dibuat', data });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

exports.createPengumumanBulk = async (req, res) => {
  const connection = await rabbitMQ();
  try {
    const data = await Pengumuman.bulkCreate(req.body);

    const channel = await connection.createChannel();
    await channel.assertQueue('pengumuman_created');
    channel.sendToQueue('pengumuman_created', Buffer.from(JSON.stringify(data)));

    return res.send({ message: 'Pengumuman Bulk berhasil dibuat', data });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

exports.editPengumuman = async (req, res) => {
  const connection = await rabbitMQ();
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    const getPengumumanById = await Pengumuman.findOne({ where: { id_pengumuman: id } });
    if (!getPengumumanById) return res.status(404).send({ message: 'Pengumuman tidak ditemukan' });

    const data = await getPengumumanById.update({ title, content });

    const channel = await connection.createChannel();
    await channel.assertQueue('pengumuman_edited');
    channel.sendToQueue('pengumuman_edited', Buffer.from(JSON.stringify(data)));

    return res.send({ message: 'Pengumuman berhasil diubah', data });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

exports.deletePengumuman = async (req, res) => {
  const { id } = req.params;
  const connection = await rabbitMQ();
  try {
    const getPengumumanById = await Pengumuman.findOne({ where: { id_pengumuman: id } });
    if (!getPengumumanById) return res.status(404).send({ message: 'Pengumuman tidak ditemukan' });

    await getPengumumanById.destroy();

    const channel = await connection.createChannel();
    await channel.assertQueue('pengumuman_deleted');
    const message = { message: `Pengumuman with id ${id} has been deleted` };
    channel.sendToQueue('pengumuman_deleted', Buffer.from(JSON.stringify(message)));

    return res.send({ message: 'Pengumuman berhasil dihapus' });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
