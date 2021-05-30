const router = require('express').Router();
const User = require('../models/user');
const messages = require('../messages');
const utils = require('../utils/utils');
const Notifications = require('../models/notifications');

router.get('/get-notifications', async (req, res) => {
  const { user } = req.session;
  if (!user) return res.status(403).send(messages.loginNeeded);

  const { role } = user;

  const notifications = await Notifications.find({ to: 0 });
  if (role >= 1) notifications.push(...await Notifications.find({ to: 1 }));
  if (role === 2) notifications.push(...await Notifications.find({ to: 2 }));

  return res.json(notifications);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id).exec();

  if (!user) return res.status(404).send(messages.userNotFound);

  return res.send(utils.removeFieldsFromObject(user._doc, 'password', 'role'));
});

module.exports = router;
