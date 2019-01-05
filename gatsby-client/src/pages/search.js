import React from 'react';
import Layout from '../components/layout';

const SearchPage = ({ location }) => {
    let query = location.search;
    let searchTerm = query.substr(query.lastIndexOf('=') + 1);

    return(
        <Layout>
            <h1>Search</h1>
            <h2>{`"${searchTerm}"`}</h2>
        </Layout>
    );
}

export default SearchPage;