import React from 'react';
import { Link } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import Chart from '../components/Charts/Chart';

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`stocks`, `cannabis`, `prices`]} />
    <Chart symbol='ABBV' span='1d'></Chart>
    <Chart symbol='TAP' span='1d'></Chart>
    <Chart symbol='TLRY' span='1y'></Chart>
    <Link to='/search?message=hello'>Search</Link>
  </Layout>
);

export default IndexPage;
