const asyncHanlder = require('../middleware/asyncHandler');
const User = require('../models/user');

const userController = {
  signup: asyncHanlder(async (req, res) => {
    return res.send('signup');
  }),
  signin: asyncHanlder(async (req, res) => {
    return res.send('signin');
  }),
  logout: asyncHanlder(async (req, res) => {
    return res.send('logout');
  }),
};

module.exports = userController;
