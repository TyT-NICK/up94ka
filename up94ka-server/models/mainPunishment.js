const mongoose = require('mongoose')

const mainPunishmentSchema = mongoose.Schema({
  type: { type: mongoose.Types.ObjectId, ref: 'PunishmentType' },
  rates: [{ from: Number, to: Number, mean: String }],
  additionalPunishments: [{ type: mongoose.Types.ObjectId, ref: 'AdditionalPunishment' }],
})

module.exports = mongoose.model('MainPunishment', mainPunishmentSchema)
