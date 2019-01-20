import React from 'react';
import axios from 'axios';
import apiConfig from '../../../api-config';
import { Link } from 'gatsby';

class Ticker extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            symbols:[],
        }
    }

    componentDidMount(){
        var self = this;

        axios.get(apiConfig.APIURL + '/stock/ticker')
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
                            <li key={symbol.symbol}>
                                <a href={'/search?q=' + symbol.symbol}>
                                    <strong>{symbol.symbol}</strong>
                                    <span>
                                        ${(symbol.price).toFixed(2)}(
                                        <span style={{color: symbol.change < 0 ? 'red' : 'green'}}>
                                            {symbol.change < 0 ? '' : '+'}
                                            {Math.round(symbol.change * 10000)/100}%
                                        </span>
                                        )
                                    </span>
                                </a>
                            </li>  
                        )}
                    </ul>
                </div>
                <style>
                    {`
                        .ticker-container {
                            width: 100%;
                            overflow: hidden;
                            box-sizing: border-box;
                            font-family: serif;
                            box-shadow: 3px 3px 5px 0 rgba(0,0,0,0.5);
                          }
                          
                          .ticker-wrap {
                            width: 100%;
                            padding: 0;
                            padding-left: 100%;
                            box-sizing: content-box;
                            overflow: hidden;
                            background: rgba(0,0,0,0.1);
                          }
                          
                          .ticker {
                            list-style: none;
                            font-size: 0.8em;
                            padding: 3px;
                            padding-bottom: 0;
                            padding-right: 100%;
                            margin: 0;
                            display:inline-block;
                            text-align: center;
                            -webkit-animation: ticker 45s infinite linear;
                            animation: ticker 45s infinite linear;
                            box-sizing: border-box;
                            overflow: hidden;
                            white-space: nowrap;
                            z-index: 1;
                          }

                          .ticker li > a {
                              color: #333;
                              text-decoration: none;
                          }
                          
                          .ticker > li {
                            display: inline;
                            padding: 5px;
                            border-right: 1px solid rgba(0,0,0,0.5);
                            font-size: 1.1em;
                          }
                          
                          .ticker > :nth-last-child(1) {
                            border: none;
                          }
                          
                          .ticker > li > a >span {
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