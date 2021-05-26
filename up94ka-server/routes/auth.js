const router = require('express').Router();

const User = require('../models/user');
const messages = require('../messages');

// FIXME insecure login
const login = (req, res) => {
  const options = {
    maxAge: 12 * 60 * 60 * 1000, /* 12 hours */
    signed: true,
  };

  res.status(200).cookie('UID', req.UID, options).send(messages.loginSuccess);
};

router.post('/signup', async (req, res, next) => {
  const userInfo = req.body;

  const userCheck = await User.findOne({ email: userInfo.email });

  if (userCheck) {
    return res.status(400).send(messages.emailAlreadyTaken);
  }

  const newUser = new User({ ...userInfo });

  newUser.save((error) => {
    res.status(500).send('user not created');
    next(error);
  });

  req.UID = newUser._id;
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

  req.UID = user._id;
  return login(req, res);
});

router.get('/signout', (req, res) => {
  res.clearCookie('UID').send(messages.logoutSuccess);
});

module.exports = router;
