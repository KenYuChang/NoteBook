const asyncHanlder = require('../middleware/asyncHandler');
const bcrypt = require('bcryptjs');
const { User } = require('../models');

const userController = {
  signup: asyncHanlder(async (req, res) => {
    const { name, email, password } = req.body;
    const user = await User.findOne({
      where: { email },
    });
    if (user) {
      res.status(400);
      throw new Error('Email is registed');
    }

    const hashPassword = bcrypt.hashSync(password, 10);
    const newUser = await User.create({ name, email, password: hashPassword });
    const userWithoutPassword = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    };

    res.status(201).json({ message: 'Success registed', user: userWithoutPassword });
  }),
  signin: asyncHanlder(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      res.status(401);
      throw new Error('User not found');
    }
    if (!bcrypt.compareSync(password, user.password)) {
      res.status(401);
      throw new Error('Email or password is incorrect');
    }
    res.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  }),
  logout: asyncHanlder(async (req, res) => {
    return res.send('logout');
  }),
};

module.exports = userController;
