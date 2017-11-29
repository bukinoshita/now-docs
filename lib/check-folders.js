'use strict'

const fs = require('fs-extra')

module.exports = async () => {
  const pathExist = await fs.exists(`${process.cwd()}/docs`)

  if (!pathExist) {
    throw new Error(`\nYou must create the "docs" folder.`)
    return
  }

  return
}
