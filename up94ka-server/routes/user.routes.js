const router = require('express').Router()
const User = require('../models/user')
const messages = require('../messages')
const utils = require('../utils/utils')

router
  .get('/:id/set-role/:roleId', utils.checkIfUserIsAdmin, async (req, res) => {
    const { id, roleId } = req.params

    let user = await User.findById(id).exec()

    // if (!user) user = await User.findOne({ email }).exec()
    if (!user) return res.status(404).send(messages.userNotFound)

    await user.updateOne({ role: roleId })

    return res.send(messages.userUpdated)
  })

  .get('/:id', async (req, res) => {
    const { id } = req.params

    const user = await User.findById(id).select('-password -role').exec()

    if (!user) return res.status(404).send(messages.userNotFound)

    return res.send(user)
  })

  .get('/', async (req, res) => {
    const users = await User.find().select('-password -role').exec()

    res.send(users)
  })

module.exports = router
