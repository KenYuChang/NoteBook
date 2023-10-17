const userController = {
  signup: (req, res) => {
    return res.send('signup');
  },
  signin: (req, res) => {
    return res.send('signin');
  },
  logout: (req, res) => {
    return res.send('logout');
  },
};

module.exports = userController;
