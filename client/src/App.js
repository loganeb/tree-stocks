import React, { Component } from 'react';
import './App.css';
import Chart from './components/Chart';
import axios from 'axios';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      symbol:'TSLA',
      data: [],
    }
  }

  componentDidMount(){
    var self = this;

    axios.get(`https://api.iextrading.com/1.0/stock/${this.state.symbol}/chart/1m`)
      .then((res) => {
        console.log(res.data.length)
        self.setState({
          data: res.data,
        })
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Cannabis Stocks</h1>
        </header>
        <Chart data={this.state.data} symbol={this.state.symbol}></Chart>
      </div>
    );
  }
}

export default App;
