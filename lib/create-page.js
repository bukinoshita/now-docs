'use strict'

const { join } = require('path')
const { writeFile, mkdir } = require('fs-extra')

const page = require('./pages/home')

module.exports = async () => {
  const path = join(process.cwd(), '.now-docs/pages')

  try {
    Promise.all([
      await mkdir(path),
      await writeFile(`${path}/index.js`, await page())
    ])
  } catch (err) {}
}
