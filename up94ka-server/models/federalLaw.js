const mongoose = require('mongoose')

const federalLawSchema = mongoose.Schema({
  name: String,
  publishDate: Date,
  actVersions: [{ type: mongoose.Types.ObjectId, ref: 'ActVersion' }],
})

module.exports = mongoose.model('FederalLaw', federalLawSchema)
