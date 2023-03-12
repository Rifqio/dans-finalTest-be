/* eslint-disable no-undef */
const { rabbitMQ } = require('../../config/rabbitmq');
const { redisClient } = require('../../config/redis');
const Pengumuman = require('../../model/PengumumanModel');

exports.getPengumuman = async (req, res) => {
  try {
    const connection = await rabbitMQ();
    const channel = await connection.createChannel();
    await channel.assertQueue('pengumuman_created')
    
    channel.consume('pengumuman_created', message => {
      if (!message) return;
      redisClient.del('pengumuman')
      channel.ack(message)
    })

    redisClient.get('pengumuman', async (err, result) => {
      // With Redis
      if (err) return res.status(500).send(err.message);
      if (result) return res.json(JSON.parse(result));
      // Without Redis
      const data = await Pengumuman.findAll({ order: [['created_at', 'DESC']] });
      redisClient.setex('pengumuman', 3600, JSON.stringify(data));
      if (data.length <= 0) return res.status(404).send({ message: 'Pengumuman tidak ditemukan' });
      return res.send(data);
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

exports.createPengumuman = async (req, res) => {
  const connection = await rabbitMQ();
  const { content, user_id } = req.body;
  try {
    const data = await Pengumuman.create({
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

exports.editPengumuman = async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  try {
    const getPengumumanById = await Pengumuman.findOne({ where: { id_pengumuman: id } });
    if (!getPengumumanById) return res.status(404).send({ message: 'Pengumuman tidak ditemukan' });
    const data = await getPengumumanById.update({ content });
    return res.send({ message: 'Pengumuman berhasil diubah', data });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

exports.deletePengumuman = async (req, res) => {
  const { id } = req.params;
  try {
    const getPengumumanById = await Pengumuman.findOne({ where: { id_pengumuman: id } });
    if (!getPengumumanById) return res.status(404).send({ message: 'Pengumuman tidak ditemukan' });
    await getPengumumanById.destroy();
    return res.send({ message: 'Pengumuman berhasil dihapus' });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
