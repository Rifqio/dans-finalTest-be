const User = require('../../model/UserModel');
const jwt = require('jsonwebtoken');
const transporter = require('./config/index');

exports.sendVerificationEmail = async (user) => {
  try {
    const emailToken = jwt.sign({ id: user.id_user }, process.env.EMAIL_TOKEN_SECRET, {
      expiresIn: '1d',
    });
    await transporter.sendMail({
      from: '"Admin" <admin@example.com>',
      to: `${user.email}`,
      subject: 'Email Verification',
      html: `<b> Please Verify To Continue <a href="${process.env.APP_URL}/confirmation/${emailToken}"> Click </a></b>`,
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.verifyUserEmail = async (req, res) => {
  try {
    // Getting the user's id from jwt
    const { id } = await jwt.verify(req.params.token, process.env.EMAIL_TOKEN_SECRET);
    await User.update({ email_verified_at: Date.now() }, { where: { id_user: id } });
    return res.json({ message: 'Email Verification Successful' });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
