'use strict'

const fs = require('fs-extra')
const writePkg = require('write-pkg')
const readPackage = require('read-package')
const isExtname = require('is-extname')
const showdown = require('showdown')

const getFiles = async sPath => {
  const files = await fs.readdir(sPath)
  const p = []

  files.forEach(f => {
    if (isExtname(f, 'md')) {
      return p.push(f)
    }

    return false
  })

  return p
}

const createHelpers = async () => {
  const ctx = `
  'use strict'

  import React from 'react'

  export default ({ menu }) => {

    return (
      <aside>
        <ul>
          {
            menu.map(item => {
              const id = '#' + item.toLowerCase()

              return <li key={item}><a href={id}>{item}</a></li>
            })
          }
        </ul>

        <style jsx>{\`
          aside {
            flex: 1 1 auto;
          }

          ul {
            position: sticky;
            top: 50px;
            color: #212529;
          }

          li {
            list-style: none;
            padding-bottom: 15px;
          }

          a {
            position: relative;
            user-select: none;
            font-weight: 400;
            transition: color 200ms;
            color: #868E96;
            text-decoration: none;
          }

          a:before {
            content: '';
            position: absolute;
            width: 100%;
            height: 1px;
            bottom: -5px;
            left: 0;
            background-color: #212529;
            visibility: hidden;
            transform: scaleX(0);
            transform-origin: left center;
            transition: all 250ms cubic-bezier(.82, 0, .12, 1);
          }

          a:hover {
            color: #212529
          }

          a:hover:before {
            visibility: visible;
            transform: scaleX(1);
          }

          @media screen and (max-width: 850px) {
            aside {
                margin-bottom: 30px;
            }
          }
        \`}</style>
      </aside>
    )
  }
  `

  await fs.writeFile('./.now-docs/components/menu.js', ctx)
}

const createPage = async files => {
  const pkg = await readPackage()
  const dependencies = []
  const depsName = []
  await createHelpers()
  const menu = []

  files.filter(file => { // eslint-disable-line array-callback-return
    const f = file
      .substring(3)
      .replace('.md', '')
      .replace(/-/g, '')

    menu.push(f.charAt(0).toUpperCase() + f.slice(1))
    depsName.push(f.charAt(0).toUpperCase() + f.slice(1))
    dependencies.push(
      `import ${f.charAt(0).toUpperCase() +
        f.slice(1)} from './../components/${file.replace('.md', '')}'`
    )
  })

  const components = depsName.map(deps => `<${deps} />`)
  const ctx = `
    'use strict'

    import React from 'react'
    import Head from 'next/head'

    import Menu from './../components/menu'

    ${dependencies.join('\n')}

    export default () => (
      <div>
        <Head>
          <title>${pkg.name}</title>
          <meta name="description" content="${pkg.description}"/>
        </Head>

        <header>
          <div>
            <h1>${pkg.name}</h1>

            <h2>${pkg.description}</h2>
          </div>
        </header>

        <div className="content-wrapper">
          <Menu menu={[${"'" + menu.join("', '") + "'"}]}/>
          <section className="content">${components.join('\n')}</section>
        </div>

        <footer>
          <span>powered by <a href="https://github.com/bukinoshita/now-docs">now-docs</a></span>
        </footer>

        <style jsx global>{\`
          * {
            padding: 0;
            margin: 0;
            -webkit-font-smoothing: antialiased;
            box-sizing: border-box;
          }

          h1, h2, h3, h4 {
            margin-top: 75px;
            margin-bottom: 0;
            font-size: 1.2rem;
            font-weight: 600;
            line-height: 1.5rem;
            color: color: #212529;
          }

          body, html {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
            font-size: 16px;
            font-weight: 300;
          }


          .content h2 + p {
            font-size: 1.5rem;
            line-height: 1.6;
          }

          hr {
            display: none;
          }

          .content h2 {
            margin-top: 0;
            font-size: 1.5rem;
          }

          .content p {
            margin: 25px 0;
            line-height: 1.6;
            color: #212529;
          }

          .content a {
            color: #212529;
            font-weight: 400;
            padding-bottom: 3px;
            border-bottom: 1px dotted #ddd;
            text-decoration: none;
            margin-left: 5px;
          }

          .content p > code {
            border: 1px solid #DEE2E6;
            font-size: 0.75rem;
            padding: 3px 10px;
            border-radius: 3px;
            white-space: nowrap;
            font-weight: 600;
            font-family: inherit;
          }

          .content pre {
            background: #fafafa;
            color: #000;
            padding: 30px;
            border-radius: 2px;
            overflow-x: scroll;
            font: "Source Code Pro", Menlo, monospace;
            font-size: .8em;
            line-height: 1.5em;
          }

          .content ul {
            margin: 50px 0 50px 30px;
            padding: 0;
          }

          .content li {
            margin: 5px 0;
            color: #212529;
            line-height: 1.5em;
          }

          .content li a:hover,
          .content p a:hover {
            color: #33A9FF;
            border-bottom: none;
          }

          .page {
            margin-top: 100px;
            padding-top: 50px;
          }

          .page:first-child {
            margin-top: 0;
            padding-top: 0;
          }
        \`}
      </style>

      <style jsx>{\`
        header {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 400px;
        }

        header div {
          margin-left: auto;
          margin-right: auto;
          text-align: center;
          line-height: 2.2em;
          max-width: 500px;
        }

        h1 {
          letter-spacing: 0.05rem;
          text-transform: uppercase;
          font-weight: bold;
          font-size: 16px;
          margin: 0;
        }

        h2 {
          color: #212529;
          font-size: 0.8rem;
          text-transform: uppercase;
          font-weight: 300;
          margin: 0;
        }

        .content-wrapper {
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
          display: flex;
        }

        .content {
          width: 75%;
        }

        footer {
          text-align: center;
          margin-top: 20px;
          margin-bottom: 50px;
          margin-right: 5px;
          padding-right: 5px;
        }

        footer span {
          font-size: 14px;
          font-weight: 400;
        }


        footer a {
          color: #868E96;
          transition: color 200ms;
          position: relative;
          user-select: none;
          font-weight: 400;
          text-decoration: none;
        }

        footer a:before {
          content: '';
          position: absolute;
          width: 100%;
          height: 1px;
          bottom: -5px;
          left: 0;
          background-color: #212529;
          visibility: hidden;
          transform: scaleX(0);
          transform-origin: left center;
          transition: all 250ms cubic-bezier(.82,0,.12,1);
        }

        footer a:hover {
          color: #212529;
        }

        footer a:hover:before {
          visibility: visible;
          transform: scaleX(1);
        }

        @media screen and (max-width: 850px) {
          .content {
              width: 100%;
          }

          .content-wrapper {
            display: flex;
            flex-direction: column;
            max-width: 80%;
          }
        }
        \`}
      </style>
    </div>
  )`

  await fs.writeFile('./.now-docs/pages/index.js', ctx)
}

const createPkg = async () => {
  const pkg = await readPackage()
  const newPkg = {
    name: `${pkg.name}-docs`,
    version: '0.0.1',
    description: pkg.description,
    scripts: {
      dev: 'next',
      start: 'next start',
      build: 'next build'
    }
  }

  await writePkg('.now-docs', newPkg)
}

const createComponents = async files => {
  return files.map(async file => {
    const newFilename = file.replace('.md', '.js')
    const md = await fs.readFile(`./docs/${file}`, 'utf-8')
    const converter = new showdown.Converter()
    let html = converter.makeHtml(md)

    const f = file.substring(3).replace('.md', '')
    const index = html.substring(0, html.indexOf(`id="${f}"`) + 6 + f.length)

    const ctx = `<a href="#${f}">
     <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
       <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
       <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
     </svg>
    </a>`

    html = html.replace(index, index + ctx)
    html = html.replace(/<pre><code>/g, '<pre><code>{`')
    html = html.replace(/<\/code><\/pre>/g, '`}</code></pre>')

    const b = `import React from 'react'\nexport default () => (<div className="page">`
    const c = `<style jsx>{\`
      h2 a {
        position: relative;
        margin-left: -14px !important;
        opacity: 0.15;
        display: inline-block;
        width: 14px;
        height: 14px;
      }

      h2 a svg {
        position: absolute;
        right: 5px;
        top: 0;
      }

      h2 a:before {
        display: none;
      }

      h2 a:hover {
        opacity: 1;
      }

      pre {
        margin: 1em auto;
      }
    \`}</style></div>)`

    await fs.writeFile(
      `./.now-docs/components/${newFilename}`,
      `${b}${html}${c}`
    )
  })
}

module.exports = async () => {
  const files = await getFiles('./docs')

  return Promise.all([
    await createPkg(),
    await createPage(files),
    await createComponents(files)
  ])
}
