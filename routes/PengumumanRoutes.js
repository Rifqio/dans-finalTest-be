const {
  getPengumuman,
  createPengumuman,
  editPengumuman,
  deletePengumuman,
} = require('../controller/pengumuman/PengumumanController');
const { ProtectedHR, Protected } = require('../middleware/AuthMiddleware');

const route = require('express').Router();

route.get('/', Protected ,getPengumuman);
route.post('/', ProtectedHR, createPengumuman);
route.put('/:id', ProtectedHR, editPengumuman);
route.delete('/:id', ProtectedHR, deletePengumuman);

module.exports = route;
