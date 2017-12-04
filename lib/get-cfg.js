'use strict'

const { join } = require('path')

const readPackage = require('read-package')
const { exists } = require('fs-extra')
const readJSON = require('load-json-file')

module.exports = async () => {
  const dotNowDocs = await exists(join(process.cwd(), '.now-docs.json'))
  const { nowDocs } = await readPackage()

  if (dotNowDocs) {
    const nowDocsCfg = await readJSON(join(process.cwd(), '.now-docs.json'))

    return nowDocsCfg
  }

  if (nowDocs) {
    return nowDocs
  }

  return false
}
