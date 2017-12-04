'use strict'

const { join } = require('path')
const { copy, mkdir } = require('fs-extra')

module.exports = async () => {
  const path = join(process.cwd(), '.now-docs/components')

  try {
    Promise.all([
      await mkdir(path),
      await copy(
        join(process.cwd(), `lib/components/header.js`),
        `${path}/header.js`
      ),
      await copy(
        join(process.cwd(), `lib/components/sidebar.js`),
        `${path}/sidebar.js`
      ),
      await copy(
        join(process.cwd(), `lib/components/footer.js`),
        `${path}/footer.js`
      )
    ])
  } catch (err) {}
}
