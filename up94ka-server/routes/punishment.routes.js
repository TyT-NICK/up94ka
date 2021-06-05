const router = require('express').Router()
const Act = require('../models/act')

router.get('*', async (req, res) => {
  const { actNumber, actPart, crimeDate, decisionDate } = req.query

  console.log(req.query)
  const act = await Act.findOne({
    number: actNumber,
    part: actPart,
  })
    .populate({
      path: 'actVersions',
      match: { approved: true },
      select: 'mainPunishments -_id',
      populate: {
        path: 'mainPunishments',
        select: '-rates._id -_id -__v',
        populate: [
          {
            path: 'type',
            select: 'name -_id',
          },
          {
            path: 'additionalPunishments',
            select: '-rates._id -_id -__v',
            populate: {
              path: 'type',
              select: 'name -_id',
            },
          },
        ],
      },
    })
    .populate('actVersion.mainPunishments')
    .exec()

  res.send(act)
})

module.exports = router
