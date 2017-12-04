
  'use strict'

  import React from 'react'
  import Head from 'next/head'

  import Header from './../components/header'
  import Sidebar from './../components/sidebar'
  import Footer from './../components/footer'

  import { name, description } from './../package'

  import styles from './../styles/styles'

  const Page = ({ children }) => {
    return (
      <div className="wrapper">
        <Head>
          <title>
            {name} — {description}
          </title>

          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta charSet="utf-8" />
          <meta name="description" content={description} />
        </Head>

        <main className="container">
          <Header title={name} description={description} />


          <div className="content-wrapper">
            <Sidebar items={['about', 'installation', 'usage', 'themes', 'examples', 'links']} />

            <div className="content">
              {children}
            </div>
          </div>

          <Footer />
        </main>

        <style global>{styles}</style>
      </div>
    )
  }

  export default Page
  