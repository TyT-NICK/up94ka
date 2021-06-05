const router = require('express').Router()
const utils = require('../utils/utils')

router
  .get('/', async (req, res) => {
    const { user } = req.session
    if (!user) return res.status(403).send(messages.loginNeeded)

    const { role } = user

    const notifications = await Notification.find({ to: 0 })
    if (role >= 1) notifications.push(...(await Notification.find({ to: 1 })))
    if (role === 2) notifications.push(...(await Notification.find({ to: 2 })))

    return res.json(notifications)
  })

  .post('/', utils.checkIfUserIsAdmin, async (req, res) => {
    const notificationInfo = req.body
    const from = req.session.user._id

    const notification = new Notification({ ...notificationInfo, from })
    notification.save()

    res.send(messages.notificationCreated)
  })

module.exports = router
