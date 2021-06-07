const strictnessChecks = require('./strictnessChecks')

module.exports = {
  punishmentUtils: {
    actVersionsComparer: (a, b) => {
      if (a.basedOn.publishDate < b.basedOn.publishDate) return -1
      if (a.basedOn.publishDate > b.basedOn.publishDate) return 1
      return 0
    },

    filterByDate: (actVersions, crimeDate, decisionDate) => {
      const appliableActVersions = []

      let isStillAppliable = true
      for (let i = actVersions.length - 1; isStillAppliable && i >= 0; --i) {
        const publishDate = actVersions[i].basedOn.publishDate
        // console.log(1)
        if (publishDate > decisionDate) {
          // console.log(publishDate, decisionDate)
          continue
        }

        appliableActVersions.push(actVersions[i])

        if (publishDate < crimeDate) isStillAppliable = false
      }

      return appliableActVersions
    },

    findSoftestActVersion: (actVersions) => {
      if (actVersions.length === 1) return actVersions[0]

      /* First Check: The softest type of the most strict punishment */
      let acceptableActVersions = strictnessChecks.checkFirst(actVersions)
      if (acceptableActVersions.length === 1) return acceptableActVersions[0]

      /* Second Check: The softest type of the least strict punishment */
      currentActVersions = [...acceptableActVersions]
      softestVersion = currentActVersions.pop()
      acceptableActVersions = [softestVersion]

      let lowestStrictness = 9999
      softestVersion.mainPunishments.forEach((x) => {
        if (x.type.strictness < lowestStrictness)
          lowestStrictness = x.type.strictness
      })

      currentActVersions.forEach((version) => {
        let lowestVersionStrictness = 0
        version.mainPunishments.forEach((x) => {
          if (x.type.strictness < lowestVersionStrictness)
            lowestVersionStrictness = x.type.strictness
        })

        if (lowestVersionStrictness < lowestStrictness) {
          lowestStrictness = lowestVersionStrictness
          softestVersion = version
          acceptableActVersions = [version]
        } else if (lowestVersionStrictness === lowestStrictness) {
          acceptableActVersions.push(version)
        }
      })

      if (acceptableActVersions.length === 1) return acceptableActVersions[0]

      /* Third Check: */
      currentActVersions = [...acceptableActVersions]
      const strictnesses = {}
      currentActVersions.forEach((version, i) => {
        strictnesses[i] = []

        version.mainPunishments.forEach((punishment) =>
          strictnesses[i].push(punishment.type.strictness)
        )
      })
    },
  },
}
