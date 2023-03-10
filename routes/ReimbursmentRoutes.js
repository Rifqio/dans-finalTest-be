const route = require('express').Router();
const {
  getReimbursment,
  createReimbursment,
  approveReimbursment,
  rejectReimbursment,
} = require('../controller/reimbursment/ReimbursmentController');
const { ProtectedHR, Protected } = require('../middleware/AuthMiddleware');

route.get('/', Protected, getReimbursment);
route.post('/', Protected, createReimbursment);
route.put('/approve/:id', ProtectedHR, approveReimbursment);
route.put('/reject/:id', ProtectedHR, rejectReimbursment);

module.exports = route;
