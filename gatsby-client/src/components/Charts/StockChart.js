import React from "react";
import { Chart } from "react-charts";
import axios from 'axios';
import apiConfig from '../../../api-config';

class StockChart extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data: [],
            ...this.props
        }
    }

    componentDidMount(){
        axios.get(apiConfig.APIURL + `/stock/chart/${this.state.span}/${this.state.symbol}`)
            .then(res => {
                let data = [];
                for(let i = 0; i < res.data.length; i += 10 ){
                    if(res.data[i].high > 0){
                        this.state.span === '1d' ? data.push({ x: res.data[i].minute, y: res.data[i].high }) 
                                                : data.push({ x: res.data[i].date, y: res.data[i].close });
                    }
                }
                console.log(data.slice(0,10));
                this.setState({
                    data: data
                })
            })
    }

    render(){
        return(
            <div className="stock-chart">
                <Chart
                    data={[
                        {
                            data: this.state.data,
                            label: `${this.state.symbol} Prices (${this.state.span})`
                        }   
                    ]}
                    series={{ showPoints: true }}
                    axes={[
                        { primary: true, type: "ordinal", position: "bottom"},
                        { type: "linear", position: "left"}
                    ]}
                />
                
                <style>{`
                    .stock-chart{
                        width: 600px;
                        height: 400px;
                        max-width: 100%;
                    }
                `}</style>
            </div>
        );
    }
}

export default StockChart;