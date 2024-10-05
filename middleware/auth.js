const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const JWT_SECRET = process.env.JWT_SECRET;

dotenv.config();

const authenticateToken = (req, res, next) => {
  // Get token from headers
  const token = req.headers['authorization']?.split(' ')[1];

  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Verify token
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // Invalid token
    req.user = user; // Save user info to request
    next();
  });
};

module.exports = authenticateToken;
