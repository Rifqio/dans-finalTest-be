const jwt = require('jsonwebtoken');

exports.Protected = async (req, res, next) => {
  let token;
  const authHeader = req.headers.authorization;
  if (authHeader) {
    try {
      token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      console.log(error.message);
      res.status(401).send(error.message);
    }
  }
  if (!token) return res.status(401).send({ message: 'Not Authorized.' });
};

exports.ProtectedHR = async (req, res, next) => {
  let token;
  const authHeader = req.headers.authorization;
  if (authHeader) {
    try {
      token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      req.user = decoded;
      if (req.user.role_id !== 2) return res.status(401).send({ message: 'Sorry HR Only' });
      next();
    } catch (error) {
      console.log(error.message);
      res.status(401).send(error.message);
    }
  }
  if (!token) return res.status(401).send({ message: 'Not Authorized.' });
};
