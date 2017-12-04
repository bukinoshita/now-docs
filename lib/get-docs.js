'use strict'

const { join } = require('path')
const { readdir } = require('fs-extra')

module.exports = async () => {
  const files = await readdir(join(process.cwd(), 'docs'))

  return files
}
