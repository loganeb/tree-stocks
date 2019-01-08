import React from 'react';
import axios from 'axios';

class Ticker extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            symbols:[],
        }
    }

    componentDidMount(){
        var self = this;

        axios.get('http://localhost:8080/api/stock/symbols')
        .then(function(res){
            self.setState({
                symbols: res.data,
            });
        })
        .catch((err) => console.log(err));
    }
    
    render(){
        return(
            <div className="ticker-container">
                <div className="ticker-wrap">
                    <ul className="ticker">
                        {this.state.symbols.map(symbol => 
                            <li key={symbol}>{symbol}</li>    
                        )}
                    </ul>
                </div>
                <style jsx>
                {`
                    .ticker-container {
                        width: 100%;
                        overflow: hidden;
                        box-sizing: border-box;
                      }
                      
                      .ticker-wrap {
                        width: 100%;
                        padding-left: 100%;
                        box-sizing: content-box;
                        overflow: hidden;
                        background: #ddd;
                      }
                      
                      .ticker {
                        list-style: none;
                        font-size: 0.8em;
                        padding: 0;
                        padding-right: 100%;
                        margin: 0;
                        display:inline-block;
                        text-align: center;
                        -webkit-animation: ticker 30s infinite linear;
                        animation: ticker 30s infinite linear;
                        box-sizing: border-box;
                        overflow: hidden;
                      }
                      
                      .ticker > li {
                        display: inline;
                        padding: 5px;
                      }
                      
                      @-webkit-keyframes ticker {
                        0% {
                          -webkit-transform: translate3d(0,0,0);
                          transform: translate3d(0,0,0);
                        }
                      
                        100% {
                          -webkit-transform: translate3d(-100%,0,0);
                          transform: translate3d(-100%,0,0);
                        }
                      }
                      
                      @keyframes ticker {
                        0% {
                          -webkit-transform: translate3d(0,0,0);
                          transform: translate3d(0,0,0);
                        }
                      
                        100% {
                          -webkit-transform: translate3d(-100%,0,0);
                          transform: translate3d(-100%,0,0);
                        }
                      }
                `}
                </style>
            </div>
        )
    }
    
};

export default Ticker;