const router = require('express').Router();
const User = require('../models/user');
const messages = require('../messages');

router.get('/:id', (req, res) => {
  const { id } = req.params;

  const user = User.findById(id);

  if (!user) return res.status(404).send(messages.userNotFound);

  res.json(user)
});

module.exports = router;
