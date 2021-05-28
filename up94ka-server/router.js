const router = require('express').Router();

router.use('/auth', require('./routes/auth.routes'));
router.use('/user', require('./routes/user.routes'));

module.exports = router;
