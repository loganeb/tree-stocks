import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'
import Chart from '../components/Charts/Chart';

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`stocks`, `cannabis`, `prices`]} />
    <Chart symbol='AAPL' span='1y'></Chart>
    <Chart symbol='MSFT' span='1d'></Chart>
    <Chart symbol='AMZN' span='1d'></Chart>
    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
)

export default IndexPage
