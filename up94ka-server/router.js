const router = require('express').Router()

router
  .use('/auth', require('./routes/auth.routes'))
  .use('/users', require('./routes/user.routes'))
  .use('/acts', require('./routes/act.routes'))
  .use('/notificatrions', require('./routes/notification.routes'))
  .use('/reports', require('./routes/report.routes'))
  .use('/punishments', require('./routes/punishment.routes'))
  .use('/', (req, res) => {
    res.status(404).send()
  })

module.exports = router
