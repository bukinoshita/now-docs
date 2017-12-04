'use strict'

const { join } = require('path')
const { copy, mkdir } = require('fs-extra')

module.exports = async theme => {
  const path = join(process.cwd(), '.now-docs/styles')

  try {
    Promise.all([
      await mkdir(path),
      await copy(
        join(process.cwd(), `lib/styles/${theme}.js`),
        `${path}/styles.js`
      )
    ])
  } catch (err) {}
}
