module.exports = {
  checkFirst: (actVersions) => {
    const acceptableActVersions = [...actVersions]
    let softestVersion = acceptableActVersions.pop()
    let newActVersions = [softestVersion]

    let highestStrictness = 0
    softestVersion.mainPunishments.forEach((x) => {
      if (x.type.strictness > highestStrictness)
        highestStrictness = x.type.strictness
    })

    acceptableActVersions.forEach((version) => {
      let highestVersionStrictness = 0
      version.mainPunishments.forEach((x) => {
        if (x.type.strictness > highestVersionStrictness)
          highestVersionStrictness = x.type.strictness
      })

      if (highestVersionStrictness < highestStrictness) {
        highestStrictness = highestVersionStrictness
        softestVersion = version
        newActVersions = [version]
      } else if (highestVersionStrictness === highestStrictness) {
        newActVersions.push(version)
      }
    })

    return acceptableActVersions
  },

  checkSecond: (actVersions) => {
    const acceptableActVersions = [...actVersions]

    const strictnesses = {}
    acceptableActVersions.forEach((version, i) => {
      strictnesses[i] = []

      version.mainPunishments.forEach((punishment) =>
        strictnesses[i].push(punishment.type.strictness)
      )
    })

    const isEveryHasOneStrictnessLeft = (strs) => {
      ;[...Object.values(strs)].forEach((str) => {
        if (str.length > 1) return false
      })
      return true
    }

    while (!isEveryHasOneStrictnessLeft(strictnesses)) {
      let minStr = 9999

      ;[...Object.values(strictnesses)].forEach((strs) => {
        strs.forEach((str) => {
          if (str < minStr) minStr = str
        })
      })

      const fieldsToRemove = [...Object.keys(strictnesses)].filter(
        (k) => !strictnesses[k].includes(minStr)
      )

      fieldsToRemove.forEach((field) => delete strictnesses[field])
      ;[...Object.values(strictnesses)].forEach((strs) =>
        strs.splice(strs.indexOf(minStr), 1)
      )
    }

    return [...Object.keys(strictnesses)].map((x) => acceptableActVersions[i])
  },

  checkThird: (actVersions) => {
    
  },
}
