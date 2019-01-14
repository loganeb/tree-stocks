import React from 'react';
import axios from 'axios';
import apiConfig from '../../api-config';

import Layout from '../components/layout';
import SEO from '../components/seo';
import News from '../components/news';

class IndexPage extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      newsArticles: []
    }
  }

  componentDidMount(){
    let self = this;

    axios.get(apiConfig.APIURL + '/stock/news')
      .then((res) => {
        self.setState({
          newsArticles: res.data.slice(0, 5)
        })
      })
      .catch(err => {})
  }
  
  render(){
    return(
      <Layout>
        <SEO title="Home" keywords={[`stocks`, `cannabis`, `prices`, 'finance']} />
        <h2 style={{paddingTop: 10}}>Latest News</h2>
        {this.state.newsArticles.map(article => 
          <News article={article} key={article.datetime}/>
        )}
      </Layout>
    );
  }
}

export default IndexPage;
