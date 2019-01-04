import React from 'react';
import Plot from 'react-plotly.js';
import axios from 'axios';

const APIROOT = process.env.APIURL || 'http://localhost:8080/api';

class Chart extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data: [],
        }
    }

    /* componentDidMount(){
        axios.get(APIROOT + `/stock/chart/${this.props.span}/${this.props.symbol}`)
            .then((res) => {
                this.setState({
                    data: res.data,
                })
            })
            .catch(err => {
                console.log(err)
            });
    } */

    render(){
        if(this.state.data.length > 0){
            let x = [];
            let y = [];
            let data = this.state.data;

            for(let i = 0; i < data.length; i++){
                if(data[i].high > 0){
                    this.props.span === '1d' ? x.push(data[i].minute) : x.push(data[i].date);
                    this.props.span === '1d' ? y.push(data[i].high) : y.push(data[i].close);
                }
            };

            let color = y[0] > y[y.length - 1] ? `rgb(255,0,0)` : `rgb(0, 255, 0)`;

            let min = Math.min(...y);
            let max = Math.max(...y);

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
                <Plot
                    data={toPlot}
                    layout={{
                        width:600, 
                        height: 300, 
                        title: `${this.props.symbol} Prices`,
                        yaxis: {
                            range: [min, max],
                        } 
                    }}
                >
                </Plot>
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