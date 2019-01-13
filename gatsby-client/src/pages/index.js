import React from 'react';
import axios from 'axios';
import apiConfig from '../../api-config';

import Layout from '../components/layout';
import SEO from '../components/seo';

class IndexPage extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      newsStories: []
    }
  }

  componentDidMount(){
    let self = this;

    axios.get(apiConfig.APIURL + '/stock/news')
      .then((res) => {
        self.setState({
          newsStories: res.data.slice(0, 5)
        })
      })
      .catch(err => {})
  }
  
  render(){
    return(
      <Layout>
        <SEO title="Home" keywords={[`stocks`, `cannabis`, `prices`]} />
        <h2 style={{paddingTop: 10}}>Latest News</h2>
        {this.state.newsStories.map(story => 
          <div className="story" key={story.datetime}>
            <h4 className="story-headline">
              <a href={story.url} style={{color: '#333'}}>
                {story.headline}
              </a>
            </h4>
            <p>{story.summary}</p>
          </div>
        )}
      </Layout>
    );
  }
}

export default IndexPage;
