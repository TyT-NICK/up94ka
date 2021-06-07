const router = require('express').Router()
const Act = require('../models/act')
const { punishmentUtils } = require('../utils/punishmentUtils')

router.get('*', async (req, res) => {
  const { actNumber, actPart, crimeDate, decisionDate } = req.query

  const act = await Act.findOne({
    number: actNumber,
    part: actPart,
  })
    .select('-_id -__v')
    .populate({
      path: 'actVersions',
      match: { approved: true },
      select: 'mainPunishments -_id',
      populate: [
        {
          path: 'basedOn',
          select: '-_id -__v',
          // options: { sort: 'publishDate' },
        },
        {
          path: 'mainPunishments',
          select: '-rates._id -_id -__v',
          populate: [
            {
              path: 'type',
              select: 'name strictness -_id',
            },
            {
              path: 'additionalPunishments',
              select: '-rates._id -_id -__v',
              populate: {
                path: 'type',
                select: 'name strictness -_id',
              },
            },
          ],
        },
      ],
    })
    .exec()

  const actVersions = act.actVersions
  actVersions.sort(punishmentUtils.actVersionsComparer)

  const crimeDateParsed = Date.parse(crimeDate)
  const decisionDateParsed = Date.parse(decisionDate)

  const appliableActVersions = punishmentUtils.filterByDate(
    actVersions,
    crimeDateParsed,
    decisionDateParsed
  )

  let softestActVersion = null

  res.send(appliableActVersions)
})

module.exports = router
