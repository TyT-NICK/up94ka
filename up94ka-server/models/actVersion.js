const mongoose = require('mongoose')

const actVersionSchema = mongoose.Schema({
  act: { type: mongoose.Types.ObjectId, ref: 'Act' },
  basedOn: { type: mongoose.Types.ObjectId, ref: 'FederalLaw' },
  mainPunishments: [{ type: mongoose.Types.ObjectId, ref: 'MainPunishment' }],
  approved: { type: Boolean, default: false },
  addedAt: { type: Date, default: Date.now() },
  addedBy: { type: mongoose.Types.ObjectId, ref: 'User' },
  modifiedAt: { type: Date, default: Date.now() },
  modifiedBy: { type: mongoose.Types.ObjectId, ref: 'User' },
})

module.exports = mongoose.model('ActVersion', actVersionSchema)
