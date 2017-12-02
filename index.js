#!/usr/bin/env node
'use strict'

const Listr = require('listr')
const meow = require('meow')
const updateNotifier = require('update-notifier')

const createFolders = require('./lib/create-folders')
const createFiles = require('./lib/create-files')
const deploy = require('./lib/deploy')

const cli = meow(
  `
  Usage:
    $ now-docs                  Deploy \`now-docs\`

  Options:
    -h, --help                  Show help options
    -v, --version               Show version
`,
  {
    alias: {
      h: 'help',
      v: 'version'
    }
  }
)

updateNotifier({ pkg: cli.pkg }).notify()

const tasks = new Listr([
  {
    title: 'Create `.now-docs` folders',
    task: () => createFolders()
  },
  {
    title: 'Create `.now-docs` files',
    task: () => createFiles()
  },
  {
    title: 'Deploy docs',
    task: () => deploy()
  }
])

tasks
  .run()
  .then(() => console.log(`\ncreated!`))
  .catch(err => console.log(err.stderr.replace('fatal: ', '')))
