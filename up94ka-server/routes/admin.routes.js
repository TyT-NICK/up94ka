const router = require('express').Router();
const User = require('../models/user');
const messages = require('../messages');

const checkIfUserIsAdmin = (req, res, next) => {
  if (req.session.role !== 2) return res.status(403).send(messages.accessDenied);

  return next();
};

router.use(checkIfUserIsAdmin);

router.post('/change-user-access/:id', async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;

  const user = await User.findById(id).exec();

  if (!user) return res.status(404).send(messages.userNotFound);

  user.update({ role });

  return res.send(messages.userUpdated);
});

module.exports = router;
