const router = require('express').Router()

router
  .use('/auth', require('./routes/auth.routes'))
  .use('/user', require('./routes/user.routes'))
  .use('/admin', require('./routes/admin.routes'))
  .use('/act', require('./routes/act.routes'))

// .use('/', require('./routes/not-found.routes'));

module.exports = router
