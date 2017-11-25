'use strict'

const execa = require('execa')

module.exports = () => execa.shell(`cd .now-docs && now`)
