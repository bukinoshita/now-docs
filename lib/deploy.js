'use strict'

const execa = require('execa')

module.exports = () =>
  execa
    .shell(`cd .now-docs && now`)
    .catch(err => {
      throw new Error(err.stderr.replace('fatal: ', ''))
    })
