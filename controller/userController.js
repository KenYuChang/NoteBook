const asyncHanlder = require('../middleware/asyncHandler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
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
    // generate jwt
    const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });

    res.cookie('jwt', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    const loginUser = {
      id: user.id,
      name: user.name,
      email: user.email,
    };
    res.status(200).json({ message: 'Success login', user: loginUser });
  }),
  logout: asyncHanlder(async (req, res) => {
    return res.send('logout');
  }),
};

module.exports = userController;
