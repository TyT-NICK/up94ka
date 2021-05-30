const router = require('express').Router();

const User = require('../models/user');
const messages = require('../messages');

const login = (req, res) => {
  req.session.userRole = req.user.role;
  res.status(200).send(messages.loginSuccess);
};

router.post('/signup', async (req, res, next) => {
  const userInfo = req.body;

  const userCheck = await User.findOne({ email: userInfo.email });

  if (userCheck) return res.status(400).send(messages.emailAlreadyTaken);

  const newUser = new User({ ...userInfo });

  newUser.save((error) => {
    next(error);
  });

  req.user = newUser;
  return login(req, res);
});

router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).send(messages.requestSyntaxError);
  }

  const user = await User.findOne({ email }).exec();
  if (!user) {
    return res.status(400).send(messages.emailNotFound);
  }

  if (user.password !== password) {
    return res.status(400).send(messages.wrongPassword);
  }

  req.user = user;
  return login(req, res);
});

router.get('/signout', (req, res) => {
  req.session.destroy();
  res.send(messages.logoutSuccess);
});

module.exports = router;
