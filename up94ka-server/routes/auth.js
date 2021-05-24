const router = require('express').Router();

router.post('/signup', (req, res) => {
  const { email, password } = req.body;
});

module.exports = router;
