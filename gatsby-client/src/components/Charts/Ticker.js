import React from 'react';
import axios from 'axios';
import apiConfig from '../../../api-config';

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
                            <li 
                            key={symbol.symbol}
                            >
                                {symbol.symbol}
                                <span style={{color: symbol.price < 10 ? 'red' : 'green'}}>${symbol.price}</span>
                            </li>    
                        )}
                    </ul>
                </div>
            </div>
        )
    }
    
};

export default Ticker;