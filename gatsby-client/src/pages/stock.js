import React from 'react';
import Layout from "../components/layout";
import SEO from "../components/seo";
import apiConfig from '../../api-config';
import axios from 'axios';
import Chart from '../components/Charts/Chart';


const APIURL = apiConfig.APIURL;

const getQuery = (search) => {
    let query = search;
    if(query.search('symbol'))
        return query.substr(query.search('symbol') + 7);
    else
        return '';
}

class Stock extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            query: getQuery(this.props.location.search),
            symbols: [],
            plot: '',
            span: '1m'
        }
        this.plotSymbol = this.plotSymbol.bind(this);
    }

    componentDidMount(){
        axios.get(APIURL + '/stock/symbols')
            .then(res => {
                this.setState({
                    symbols: res.data
                })
                if(this.state.query.length > 0)
                    this.plotSymbol();
            })
            .catch(err => {
                console.log('Error retrieving symbols.')
            })
    }


    plotSymbol(){
        if(this.state.symbols.includes(this.state.query.toUpperCase())){
            let {query, span} = this.state;
            this.setState({
                plot: <Chart span={span} symbol={query}/>
            });
        }
    }

    render(){
        return(
            <Layout>
                <SEO title="Stock"/>
                <div className="stock-container">
                    <div className="stock">
                        <h2>{this.state.query}</h2>
                        {this.state.plot}
                    </div>
                    <style>
                        {style}
                    </style>
                </div>

                
            </Layout>
        )
    }
}

const style = `
    .stock {
        padding-top: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
`;

export default Stock;