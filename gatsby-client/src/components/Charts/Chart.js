import React from 'react';
import Plot from 'react-plotly.js';
import axios from 'axios';
import apiConfig from '../../../api-config';

const APIROOT = apiConfig.APIURL;

class Chart extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data: [],
            toPlot: {},
            layout: {},
            span: this.props.span,
            symbol: this.props.symbol
        }
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){
        axios.get(APIROOT + `/stock/chart/${this.state.span}/${this.state.symbol}`)
            .then((res) => {
                this.setState({
                    data: res.data,
                })
            })
            .catch(err => {
                console.log(err)
            });
    }

    handleChange(e){
        let value = e.target.value;
        let self = this;
        axios.get(APIROOT + `/stock/chart/${e.target.value}/${this.state.symbol}`)
            .then((res) => {
                self.setState({
                    data: res.data,
                    span: value
                })
            })
            .catch(err => {
                console.log(err)
            });
    }

    render(){
        if(this.state.data.length > 0){
            let x = [];
            let y = [];
            let data = this.state.data;

            for(let i = 0; i < data.length; i++){
                if(data[i].high > 0){
                    this.state.span === '1d' ? x.push(data[i].minute) : x.push(data[i].date);
                    this.state.span === '1d' ? y.push(data[i].high) : y.push(data[i].close);
                }
            };

            let color = y[0] > y[y.length - 1] ? `rgb(255,0,0)` : `rgb(0, 255, 0)`;

            let range = Math.max(...y) - Math.min(...y);
            let min = Math.min(...y) - range*0.1;
            let max = Math.max(...y) + range*0.1;

            let toPlot = [
                    {
                    x: x,
                    y: y,
                    mode: 'lines',
                    type: 'scatter',
                    fill: 'tonexty',
                    line: {
                        color: color,
                        width: 3,
                    }
                }
            ];

            return(
                <div>
                    <Plot
                        data={toPlot}
                        layout={{
                            width:600, 
                            height: 300, 
                            title: `${this.state.symbol} Prices`,
                            yaxis: {
                                range: [min, max],
                            } 
                        }}
                    >
                    </Plot>
                    <select onChange={this.handleChange}>
                        <option value="1d">1 Day</option>
                        <option value="1m">1 Month</option>
                        <option value="1y">1 Year</option>
                    </select>
                </div>
            )
        }
    

        else{
            return(
                <div>
                </div>
            )
        }

}
};

export default Chart;