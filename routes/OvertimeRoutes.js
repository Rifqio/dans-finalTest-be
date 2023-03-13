const route = require('express').Router();
const {
  getOvertime,
  createOvertime,
  getOvertimeById,
  approveStatusOvertime,
  rejectStatusOvertime,
  getMyOvertimeHistory,
} = require('../controller/overtime/OvertimeController');
const { ProtectedHR, Protected } = require('../middleware/AuthMiddleware');

route.get('/', Protected, getOvertime);
route.post('/', Protected, createOvertime);
route.get('/history', Protected, getMyOvertimeHistory)
route.get('/:id', Protected, getOvertimeById);
route.put('/approve', ProtectedHR, approveStatusOvertime);
route.put('/reject', ProtectedHR, rejectStatusOvertime);

module.exports = route;
