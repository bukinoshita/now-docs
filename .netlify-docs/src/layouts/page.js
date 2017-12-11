
  'use strict'

  import React from 'react'
  import { Helmet } from 'react-helmet'

  import Header from './../components/header'
  import Sidebar from './../components/sidebar'
  import Footer from './../components/footer'
  import { name, description } from './../../package.json'

  const Page = ({ children }) => {
    return (
      <div className="wrapper">
        <Helmet>
          <title>{name}</title>
          <meta name="description" content={description} />
        </Helmet>

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
      </div>
    )
  }
  export default Page
  