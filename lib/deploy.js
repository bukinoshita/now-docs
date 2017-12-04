'use strict'

const execa = require('execa')

module.exports = ({ alias = false } = {}) => {
  const hasAlias = alias ? '&& now alias' : ''

  return execa
    .shell(`cd .now-docs && now ${hasAlias}`)
    .then(({ stdout }) => stdout)
    .catch(({ stderr }) => stderr)
}
