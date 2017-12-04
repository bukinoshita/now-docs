'use strict'

const { join } = require('path')
const { readFile, writeFile } = require('fs-extra')
const showdown = require('showdown')

const getDocs = require('./get-docs')

module.exports = async () => {
  const files = await getDocs()

  files.map(async file => {
    const markdown = await readFile(
      join(process.cwd(), `/docs/${file}`),
      'utf-8'
    )
    const f = file.substring(3).replace('.md', '')
    const converter = new showdown.Converter()
    let html = converter.makeHtml(markdown)
    const index = html.substring(0, html.indexOf(`id="${f}"`) + 6 + f.length)
    const newFilename = file.replace('.md', '.js')
    const ctx = `<a href="#${f}">
     <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
       <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
       <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
     </svg>
    </a>`

    html = html.replace(index, index + ctx)
    html = html.replace(/<pre><code>/g, '<pre><code>{`')
    html = html.replace(/<\/code><\/pre>/g, '`}</code></pre>')

    const doc = `
    'use strict'

    import React from 'react'

    export default () => <section className="page">${html}</section>
    `

    await writeFile(
      join(process.cwd(), `/.now-docs/components/${newFilename}`),
      doc
    )
  })
}
