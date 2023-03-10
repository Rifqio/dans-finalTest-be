const route = require('express').Router();
const { checkinAbsensi, checkoutAbsensi } = require('../controller/absensi/AbsensiController');
const { Protected } = require('../middleware/AuthMiddleware');

route.post('/checkin', Protected ,checkinAbsensi);
route.post('/checkout', Protected ,checkoutAbsensi);
module.exports = route;