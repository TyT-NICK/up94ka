const mongoose = require('mongoose')

const additionalPunishmentSchema = mongoose.Schema({
  type: { type: mongoose.Types.ObjectId, ref: 'PunishmentType' },
  rates: [{ from: Number, to: Number, mean: String }],
  optional: { type: Boolean, default: false },
})

module.exports = mongoose.model(
  'AdditionalPunishment',
  additionalPunishmentSchema
)
