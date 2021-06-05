const mongoose = require('mongoose')

const punishmentTypeSchema = mongoose.Schema({
  name: String,
  strictness: Number,
  isMainAvailable: { type: Boolean, default: false },
  isAdditionalAvailable: { type: Boolean, default: false },
})

module.exports = mongoose.model('PunishmentType', punishmentTypeSchema)
