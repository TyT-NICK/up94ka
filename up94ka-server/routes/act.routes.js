const router = require('express').Router()
const messages = require('../messages')
const utils = require('../utils/utils')

const Act = require('../models/act')
const ActVersion = require('../models/actVersion')
const AdditionalPunishment = require('../models/additionalPunishment')
const FederalLaw = require('../models/federalLaw')
const MainPunishment = require('../models/mainPunishment')
const PunishmentType = require('../models/punishmentType')

const disable = (req, res) => {
  res.status(404).send(messages.notFound)
}

router
  .post(
    '/add-punishment-type',
    disable,
    utils.checkIfUserIsAdmin,
    (req, res) => {
      // .post('/add-punishment-type', utils.checkIfUserIsAdmin, (req, res) => {
      const punishmentType = { ...req.body }

      const type = new PunishmentType(punishmentType)
      type.save()

      res.send(messages.punishmentTypeAdded)
    }
  )

  // Adding act version
  .post('/', utils.checkIfUserIsOperator, async (req, res) => {
    const user = req.session.user

    const actData = req.body.act
    let act = await Act.findOne({
      number: actData.number,
      part: actData.part,
    }).exec()

    if (!act) {
      act = new Act(actData)
    }

    const federalLawData = req.body.federalLaw
    let federalLaw = await FederalLaw.findOne(federalLawData).exec()

    if (!federalLaw) {
      federalLaw = new FederalLaw(federalLawData)
    }

    if (!act.isNew && !federalLaw.isNew) {
      return res.status(400).send(messages.actVersionAlreadyExists)
    }

    const actVersion = new ActVersion({
      act,
      basedOn: federalLaw,
      addedBy: req.session.user._id,
      modifiedBy: req.session.user._id,
    })
    await actVersion.save()
    const mainPunishments = req.body.mainPunishments

    mainPunishments.forEach(async (mPunishment, i) => {
      const mType = await PunishmentType.findOne({
        name: mPunishment.name,
      }).exec()

      const mainPunishment = new MainPunishment({
        type: mType,
        rates: mPunishment.rates,
      })
      await mainPunishment.save()

      mPunishment.additionalPunishments.forEach(async (aPunishment) => {
        const aType = await PunishmentType.findOne({
          name: aPunishment.name,
        }).exec()

        const additionalPunishment = new AdditionalPunishment({
          type: aType,
          rates: aPunishment.rates,
          optional: aPunishment.optional,
        })
        await additionalPunishment.save()

        mainPunishment.additionalPunishments.push(additionalPunishment._id)
        await MainPunishment.findByIdAndUpdate(mainPunishment._id, {
          additionalPunishments: mainPunishment.additionalPunishments,
        })
      })

      actVersion.mainPunishments.push(mainPunishment._id)
      await ActVersion.findByIdAndUpdate(actVersion._id, {
        mainPunishments: actVersion.mainPunishments,
      })
    })

    act.actVersions.push(actVersion._id)
    await act.save()

    federalLaw.actVersions.push(actVersion._id)
    await federalLaw.save()

    return res.send(messages.actVersionAdded)
  })

  .put('/:id', utils.checkIfUserIsAdmin, async (req, res) => {
    const id = req.params.id

    const actVersion = await ActVersion.findById(id, {
      approved: true,
    }).exec()

    actVersion.approved = true
    await actVersion.save()

    res.send(messages.actVersionApproved)
  })

  .delete('/:id', utils.checkIfUserIsAdmin, async (req, res) => {
    const actVersionId = req.params.id

    const actVersion = await ActVersion.findById(actVersionId).exec()
    if (!actVersion) {
      return res.status(400).send(messages.actVersionAlreadyDeleted)
    }

    const act = await Act.findById(actVersion.act).exec()
    act.actVersions = act.actVersions.filter((version) => {
      version !== actVersionId
    })
    await act.save()

    const federalLaw = await FederalLaw.findById(actVersion.basedOn)
    federalLaw.actVersions = federalLaw.actVersions.filter((version) => {
      version !== actVersionId
    })
    await federalLaw.save()

    if (federalLaw.actVersions.length === 0) {
      await FederalLaw.findByIdAndDelete(federalLaw._id).exec()
    }

    await ActVersion.findByIdAndDelete(actVersionId).exec()

    return res.send(messages.actVersionDeleted)
  })

module.exports = router
