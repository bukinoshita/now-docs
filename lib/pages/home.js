'use strict'

const getDocs = require('./../get-docs')

module.exports = async () => {
  const files = await getDocs()
  const dependencies = []
  const depsName = []

  files.filter(file => {
    // eslint-disable-line array-callback-return
    const f = file
      .substring(3)
      .replace('.md', '')
      .replace(/-/g, '')

    depsName.push(f.charAt(0).toUpperCase() + f.slice(1))
    dependencies.push(
      `import ${f.charAt(0).toUpperCase() +
        f.slice(1)} from './../components/${file.replace('.md', '')}'`
    )
  })

  const components = depsName.map(deps => `<${deps} />`)

  return `
  'use strict'

  import React from 'react'

  import Page from './../layouts/page'

  ${dependencies.join('\n')}

  export default () => (<Page>${components.join('\n')}</Page>)
  `
}
