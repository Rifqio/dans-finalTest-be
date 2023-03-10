const route = require('express').Router();
const {
  getOvertime,
  createOvertime,
  getOvertimeById,
  approveStatusOvertime,
  rejectStatusOvertime,
} = require('../controller/overtime/OvertimeController');
const { ProtectedHR, Protected } = require('../middleware/AuthMiddleware');

route.get('/', Protected, getOvertime);
route.post('/', Protected, createOvertime);
route.get('/:id', Protected, getOvertimeById);
route.put('/approve/:id', ProtectedHR, approveStatusOvertime);
route.put('/reject/:id', ProtectedHR, rejectStatusOvertime);

module.exports = route;
