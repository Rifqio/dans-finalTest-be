const route = require('express').Router();
const { getProfile } = require('../controller/profile/ProfileController');
const { Protected } = require('../middleware/AuthMiddleware');

route.get('/profile', Protected, getProfile);

module.exports = route;
