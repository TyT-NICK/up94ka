const router = require('express').Router()
const utils = require('../utils/utils')
const Report = require('../models/report')
const messages = require('../messages')

router
  .get('/', utils.checkIfUserIsAdmin, async (req, res) => {
    let reports = await Report.find()
      .populate({ path: 'from', select: '-password' })
      .exec()

    res.send(reports)
  })

  .post('/', async (req, res) => {
    const { user } = req.session
    const reportInfo = req.body

    let report

    if (user) {
      report = new Report({ ...reportInfo, from: user._id })
    } else {
      report = new Report({ ...reportInfo })
    }

    await report.save()

    res.send(messages.thanksForReporting)
  })

module.exports = router
