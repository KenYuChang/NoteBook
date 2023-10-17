const jwt = require('jsonwebtoken');
const asyncHandler = require('./asyncHandler');
const { User } = require('../models');

// Protect routes

const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Read jwt from cookie
  token = req.cookies.jwt;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findOne({ where: { id: decoded.userId } });
      next();
    } catch (error) {
      res.status(401);
      throw new Error('Not Authorized, token failed');
    }
  } else {
    res.status(401);
    throw new Error('Not Authorized, no token');
  }
});

module.exports = protect;
