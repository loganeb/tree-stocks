import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'

import Header from './header';
import Ticker from './Charts/Ticker';
import Navbar from './navbar';

import './CSS/layout.css';

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        <Navbar></Navbar>
        <Header siteTitle={data.site.siteMetadata.title} />
        <Ticker></Ticker>
        <div
          style={{
            margin: `0 auto`,
            maxWidth: 960,
            padding: `0px 1.0875rem 1.45rem`,
            paddingTop: 0,
          }}
        >
          {children}
          {/* <footer>
            © {new Date().getFullYear()},
            {` `}
            <a href="http://loganbynes.com">Logan Bynes</a>
          </footer> */}
        </div>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
