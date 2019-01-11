import React from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';

const SearchPage = ({ location }) => {
    let query = location.search;
    let searchTerm = query.substr(query.lastIndexOf('=') + 1);

    return(
        <Layout>
            <SEO title="Search" keywords={[`stocks`, `cannabis`, `prices`]} />
            <h1>Search</h1>
            <h2>{`"${searchTerm}"`}</h2>
        </Layout>
    );
}

export default SearchPage;