'use strict'

const execa = require('execa')

module.exports = () =>
  execa
    .shell(`cd .now-docs && yarn add next react react-dom`)
    .catch(error => {
      throw new Error(error.stderr.replace('fatal: ', ''))
    })
