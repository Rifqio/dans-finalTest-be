const Absensi = require('../../model/AbsensiModel');

exports.checkinAbsensi = async (req, res) => {
  const { id_user } = req.body;
  try {
    const data = await Absensi.create({
      user_id: id_user,
      waktu_absen_masuk: new Date().toLocaleTimeString(),
      tanggal: new Date().toLocaleDateString(),
    });
    return res.send({ message: 'Checkin Berhasil', data });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

exports.checkoutAbsensi = async (req, res) => {
  const { id_absensi } = req.body;
  try {
    const getAbsensiById = await Absensi.findOne({ where: { id_absensi } });
    const data = await getAbsensiById.update({
      waktu_absen_keluar: new Date().toLocaleTimeString(),
    });
    return res.send({ message: 'Checkout Berhasil', data });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
