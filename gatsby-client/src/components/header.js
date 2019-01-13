import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import Searchbar from './searchbar';
import Background from '../images/background-2.jpg';

const Header = ({ siteTitle }) => (
  <div 
    className="header-container"
    style={{backgroundImage:`url(${Background})`, backgroundPosition: 'center',backgroundRepeat:'norepeat'}}>
    <div
      style={{
        background: `rgba(0,0,0, 0.3)`,
      }}
    >
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `1.25rem 1rem`,
          paddingTop: '60px',
          height:150
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
        <h5 style={{color:'#fff', marginTop: 5}}>
          Cannabis industry financial news and stock prices
        </h5>
        <Searchbar suggestions={[{name:'ONE', tags:'ONE'},{name:'TWO', tags:'ONE TWO'}]}/>
      </div>
    </div>
  </div>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
