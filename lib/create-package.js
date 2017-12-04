'use strict'

const readPackage = require('read-package')
const writePkg = require('write-pkg')

const getCfg = require('./../lib/get-cfg')

module.exports = async () => {
  const pkg = await readPackage()
  const nowDocsCfg = await getCfg()
  const newPkg = {
    name: nowDocsCfg.name || `${pkg.name}-docs`,
    version: '0.0.0',
    description: pkg.description,
    scripts: {
      dev: 'next',
      start: 'next start',
      build: 'next build'
    },
    dependencies: {
      next: '^4.2.0-canary.1',
      react: '^16.2.0',
      'react-dom': '^16.2.0'
    },
    now: {
      name: nowDocsCfg.name || `${pkg.name}-docs`,
      alias: nowDocsCfg.alias
    }
  }

  return writePkg('.now-docs', newPkg)
}
