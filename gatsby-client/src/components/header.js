import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import Searchbar from './searchbar';

const Header = ({ siteTitle }) => (
  <div
    style={{
      background: `darkgreen`,
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `1.25rem 1rem`,
      }}
    >
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
            display:'inline-block'
          }}
        >
          {siteTitle}
        </Link>
      </h1>
      <nav role="navigation">
          <Link style={navLinkStyle} to="/user/login">Login</Link>
          <Link style={navLinkStyle} to="/user/signup">Signup</Link>
      </nav>
      <Searchbar suggestions={[{name:'ONE', tags:'ONE'},{name:'TWO', tags:'ONE TWO'}]}/>
    </div>
  </div>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

let navLinkStyle = {
  color: 'white',
  padding: 5
}

export default Header
