exports.getProfile = async (req, res) => {
  try {
    const { user_id, name, email, role_id } = req.user;
    return res.send({ user_id, name, email, role_id });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
