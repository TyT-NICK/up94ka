const messages = require('../messages')

module.exports = {
  removeFieldsFromObject: (obj, ...fieldNames) => {
    let newObj = { ...obj }

    fieldNames.forEach((x) => {
      const { [x]: removed, ...rest } = newObj
      newObj = rest
    })

    return newObj
  },
  checkIfUserIsAdmin: (req, res, next) => {
    if (!req.session.user) {
      return res.status(401).send(messages.loginNeeded)
    }

    if (req.session.user.role !== 2) {
      return res.status(403).send(messages.accessDenied)
    }

    return next()
  },
  checkIfUserIsOperator: (req, res, next) => {
    if (!req.session.user) {
      return res.status(401).send(messages.loginNeeded)
    }

    if (req.session.user.role < 1)
      return res.status(403).send(messages.accessDenied)

    return next()
  },
}
