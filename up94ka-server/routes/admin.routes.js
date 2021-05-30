const router = require('express').Router();
const User = require('../models/user');
const messages = require('../messages');

const checkIfUserIsAdmin = (req, res, next) => {
  if (req.session.role !== 2) return res.status(403).send(messages.accessDenied);

  return next();
};

router.use(checkIfUserIsAdmin);

router.post('/set-user-role', async (req, res) => {
  const { id, email, role } = req.body;

  let user = await User.findById(id).exec();

  if (!user) user = await User.findOne({ email }).exec();
  if (!user) return res.status(404).send(messages.userNotFound);

  await user.updateOne({ role });

  return res.send(messages.userUpdated);
});

module.exports = router;
