#!/usr/bin/env node

'use strict'

const { join } = require('path')
const meow = require('meow')
const updateNotifier = require('update-notifier')
const { existsSync } = require('fs-extra')
const shoutSuccess = require('shout-success')
const shoutError = require('shout-error')
const del = require('del')
const ora = require('ora')

const createPackage = require('./../lib/create-package')
const createLayout = require('./../lib/create-layout')
const createPage = require('./../lib/create-page')
const createComponents = require('./../lib/create-components')
const createDocs = require('./../lib/create-docs')
const createStyles = require('./../lib/create-styles')
const deploy = require('./../lib/deploy')
const getCfg = require('./../lib/get-cfg')

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

const run = async () => {
  const hasDocs = existsSync(join(process.cwd(), 'docs'))
  const { alias } = await getCfg()
  const spinner = ora('Deploying with `now-docs`')
  const theme = 'apex'

  if (!hasDocs) {
    return shoutError("Couldn't find `docs` folder.")
  }

  spinner.start()

  Promise.all([
    await del(join(process.cwd(), '.now-docs')),
    await createPackage(),
    await createLayout(),
    await createPage(),
    await createComponents(),
    await createDocs(),
    await createStyles(theme),
    await deploy({ alias })
  ])
    .then(res => {
      const domain = alias ? `https://${alias}` : res[7]
      shoutSuccess(`\`now-docs\` created! ${domain}`)
    })
    .catch(() => shoutError('Ops! something happened!'))

  spinner.stop()
}

run()
