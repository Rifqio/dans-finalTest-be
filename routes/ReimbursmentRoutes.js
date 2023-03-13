const route = require('express').Router();
const multer = require('multer');
const { storage } = require('../config/multer');
const {
  getReimbursment,
  createReimbursment,
  approveReimbursment,
  rejectReimbursment,
  getMyReimbursmentHistory,
  getReimbursmentById,
} = require('../controller/reimbursment/ReimbursmentController');
const { ProtectedHR, Protected } = require('../middleware/AuthMiddleware');
const upload = multer({ storage });

route.get('/', Protected, getReimbursment);
route.get('/history', Protected, getMyReimbursmentHistory);
route.post('/', Protected, upload.single('bukti'), createReimbursment);
route.get('/:id', Protected, getReimbursmentById)
route.put('/approve/:id', ProtectedHR, approveReimbursment);
route.put('/reject/:id', ProtectedHR, rejectReimbursment);

module.exports = route;
