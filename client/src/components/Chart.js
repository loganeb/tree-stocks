import React from 'react';
import Plot from 'react-plotly';

class Chart extends React.Component {
    render(){
        if(this.data.length > 0){
            let x = [];
            let y = [];
            this.data.forEach(element => {
                if(element.marketAverage > 0){
                    x.push(element.minute);
                    y.push(element.marketAverage);
                }
            });

            let toPlot = {
                x: x,
                y: y,
                mode: 'lines',
                type: 'scatter',
                fill: 'tonexty',
                line: {
                    color: 'rgb(0,255,0)',
                    width: 3,
                }
            }

            return(
                <Plot
                    data={toPlot}
                    layout={ {width:200, height: 300, title: 'AAPL' }}
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