const router = require('express').Router();
const User = require('../models/user');
const messages = require('../messages');
const utils = require('../utils/utils');

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id).exec();

  if (!user) return res.status(404).send(messages.userNotFound);

  return res.json(utils.removeFieldsFromObject(user._doc, 'password', 'role'));
});

module.exports = router;
