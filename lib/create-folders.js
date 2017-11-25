'use strict'

const fs = require('fs-extra')
const del = require('del')

module.exports = async () => {
  const folder = `${process.cwd()}/.now-docs`
  const pathExist = fs.exists(`${process.cwd()}/.now-docs`)

  if (pathExist) {
    await del(folder)
  }

  return Promise.all([
    await fs.mkdir('.now-docs'),
    await fs.mkdir('.now-docs/components'),
    await fs.mkdir('.now-docs/pages')
  ])
}
