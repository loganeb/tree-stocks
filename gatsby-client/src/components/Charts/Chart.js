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
            ...this.props
        }
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){
        axios.get(APIROOT + `/stock/chart/${this.state.span}/${this.state.symbol}`)
            .then((res) => {
                this.loadData(res.data, this.state.span);
            })
            .catch(err => {
                console.log(err)
            });
    }

    loadData(data, span){
        if(data.length > 0){
            let x = [];
            let y = [];

            for(let i = 0; i < data.length; i++){
                if(data[i].high > 0){
                    span === '1d' ? x.push(data[i].minute) : x.push(data[i].date);
                    span === '1d' ? y.push(data[i].high) : y.push(data[i].close);
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

            let layout = {
                width:600, 
                height: 300, 
                title: `${this.state.symbol} Prices (USD)`,
                yaxis: {
                    range: [min, max],
                } 
            }

            this.setState({
                toPlot: toPlot,
                layout: layout,
                data: data,
                span: span
            })
        }else{
            console.log('No data.')
            this.setState({
                toPlot:{
                    x: [0, 1],
                    y: [0, 30],
                    mode: 'lines',
                    type: 'scatter',
                },
                layout: {
                    width:600, 
                    height: 300, 
                    title: `${this.state.symbol} Prices (USD)`,
                }
            })
        }
    }

    handleChange(e){
        let span = e.target.value;
        let self = this;
        axios.get(APIROOT + `/stock/chart/${e.target.value}/${this.state.symbol}`)
            .then((res) => {
                self.loadData(res.data, span);
            })
            .catch(err => {
                console.log(err)
            });
    }

    render(){
        if(this.state.data.length > 0){
            return(
                <div className="chart">
                    <label htmlFor="span">Time Span</label>
                    <select 
                        onChange={this.handleChange} 
                        name="span"
                        value={this.state.span}
                    >
                        <option value="1d">1 Day</option>
                        <option value="1m">1 Month</option>
                        <option value="1y">1 Year</option>
                    </select>
                    <Plot
                        data={this.state.toPlot}
                        layout={this.state.layout}
                    >
                    </Plot>

                    <style>
                        {style}
                    </style>
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

const style = `
    .chart{
        display: flex;
        flex-direction: column;
        align-items: center;
        border: 2px solid #333;
        border-radius: 5px;
    }

    select {
        height: 25px;
    }

    .js-plotly-plot {
        padding: 0;
        margin: 0;
    }
`

export default Chart;