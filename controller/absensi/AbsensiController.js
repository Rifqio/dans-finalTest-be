const { Op, QueryTypes } = require('sequelize');
const Absensi = require('../../model/AbsensiModel');
const { format } = require('date-fns');
const { sequelize } = require('../../config/database');

exports.checkinAbsensi = async (req, res) => {
  const { id_user } = req.body;
  try {
    const time = new Date().getHours();
    const currentDate = new Date().toLocaleDateString();

    // Smol Validation
    const existingRecord = await Absensi.findOne({ where: { user_id: id_user } });
    // if (time >= 10) return res.status(401).send({ message: "Sorry you're late" });
    if (existingRecord) return res.status(401).send({ message: 'You have already checked in' });

    const data = await Absensi.create({
      user_id: id_user,
      waktu_absen_masuk: new Date().toLocaleTimeString(),
      tanggal: currentDate,
    });

    return res.send({ message: 'Checkin Berhasil', data });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

exports.checkoutAbsensi = async (req, res) => {
  const { id_user } = req.body;
  const time = new Date().getHours();
  const currentDate = format(new Date(), 'yyyy-MM-dd');
  const currentTime = new Date().toLocaleTimeString();

  // Smol validation
  if (time >= 19) return res.status(401).send({ message: "Sorry it's too late" });
  const existingRecord = await Absensi.findOne({
    where: { user_id: id_user, waktu_absen_keluar: { [Op.not]: null }, tanggal: currentDate },
  });
  if (existingRecord) return res.status(401).send({ message: 'You have already checked out' });

  try {
    const getAbsensiById = await sequelize.query(
      `SELECT
      absensi.*
      FROM
        absensi
      WHERE
      absensi.user_id = ${id_user} AND
      absensi.tanggal = "${currentDate}"`,
      { type: QueryTypes.SELECT }
    );
    
    if (!getAbsensiById) return res.status(401).send({ message: 'Please check in first' });

    await sequelize.query(`
        UPDATE absensi SET waktu_absen_keluar = "${currentTime}"
        WHERE absensi.user_id = ${id_user} AND
        absensi.tanggal = "${currentDate}"`);

    return res.send({ message: 'Checkout Berhasil' });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
