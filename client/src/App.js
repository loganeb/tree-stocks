import React, { Component } from 'react';
import './App.css';
import Chart from './components/Chart';
import axios from 'axios';
import Layout from './components/Layout';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      symbol:'TSLA',
      data: [],
    }
  }

  componentDidMount(){

  }

  render() {
    return (
      <Layout></Layout>
    );
  }
}

export default App;
