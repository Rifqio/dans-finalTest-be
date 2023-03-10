const route = require('express').Router();
const { register, login } = require('../controller/auth/AuthController');
const { verifyUserEmail } = require('../controller/email/verifyEmailController');

route.post('/register', register);
route.post('/login', login);
route.get('/confirmation/:token', verifyUserEmail);

module.exports = route;
