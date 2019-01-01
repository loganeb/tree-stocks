import React from 'react';
import Plot from 'react-plotly.js';

class Chart extends React.Component {
    render(){
        if(this.props.data.length > 0){
            let x = [];
            let y = [];
            let data = this.props.data;

            for(let i = 0; i < data.length; i++){
                if(data[i].close > 0){
                    x.push(data[i].date);
                    y.push(data[i].close);
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
                <h2>Chart</h2>
            </div>
        )
    }

}
};

export default Chart;