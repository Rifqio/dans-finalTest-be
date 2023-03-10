const yup = require('yup');

const registerSchema = yup.object().shape({
  name: yup.string().required().max(255),
  email: yup.string().email().required(),
  password: yup.string().required().min(8),
  password_confirmation: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
});

const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

module.exports = { registerSchema, loginSchema };
