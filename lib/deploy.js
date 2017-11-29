'use strict'

const execa = require('execa')

module.exports = () =>
  execa
    .shell(`cd .now-docs && now`)
    .catch(error => {
      throw new Error(error.stderr.replace('fatal: ', ''))
    })
