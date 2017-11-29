'use strict'

const execa = require('execa')

module.exports = () =>
  execa
    .shell(`cd .now-docs && yarn add next react react-dom`)
    .catch(err => {
      throw new Error(err.stderr.replace('fatal: ', ''))
    })
