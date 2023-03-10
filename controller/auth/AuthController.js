const User = require('../../model/UserModel');
const RoleUser = require('../../model/RoleUserModel');
const { registerSchema, loginSchema } = require('../../validation/AuthValidation');
const { sendVerificationEmail } = require('../email/verifyEmailController');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const getRoleUser = require('../../lib/queries/GetRoleUser');

exports.register = async (req, res) => {
  const { name, email, password, password_confirmation } = req.body;
  const payload = { name, email, password, password_confirmation };

  try {
    // Register Validation
    await registerSchema.validate(payload);
    const existingEmail = await User.findOne({ where: { email } });
    if (existingEmail) return res.status(400).json({ error: 'Email already exist' });

    // Hashing Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Creating User Data
    const registeredUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const roleRegisteredUser = await RoleUser.create({
      role_id: 1,
      user_id: registeredUser.id_user,
    });
    // sendVerificationEmail(registeredUser);
    return res.status(201).json({ message: 'User successfully created.', user: registeredUser });
  } catch (error) {
    return res.status(400).send({ error: error.errors });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validating Login Form
    await loginSchema.validate({ email, password });

    // Checking if email is already registered
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).send({ error: 'Email not found' });

    // Checking if password is correct
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).send({ error: 'Password incorrect' });

    // Checking if user is already verified the email
    // if (!user.email_verified_at) return res.status(401).send({ error: 'Email not verified' });

    // Create and assign JWT also adding refresh token to user
    const role_id = await getRoleUser(user.id_user);
    const accessToken = jwt.sign(
      { user_id: user.id_user, name: user.name, email: user.email, role_id: role_id[0] },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '1h' }
    );
    return res.json({ accessToken });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
