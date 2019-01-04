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
            console.log(res);
            self.setState({
                symbols: res.data,
            });
        })
        .catch((err) => console.log(err));
    }
    
    render(){
        return(
            <div className="ticker">
                <ul>
                    {this.state.symbols.map(symbol => 
                        <li key={symbol}>{symbol}</li>    
                    )}
                </ul>
            </div>
        )
    }
    
};

export default Ticker;