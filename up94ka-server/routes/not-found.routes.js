const router = require('express').Router();
const messages = require('../messages');

router.use((_, res) => {
  res.status(404).send(messages.notFound);
});

module.exports = router;
