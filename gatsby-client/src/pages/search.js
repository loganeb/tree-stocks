import React from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';
import axios from 'axios';
import { Link } from 'gatsby';
import apiConfig from '../../api-config';

const parseQuery = (query) => {
    if(query.length > 1){
        let searchTerm = query.substr(query.lastIndexOf('=') + 1);
        return searchTerm;
    }
    return '';
}

class Search extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            query: parseQuery(this.props.location.search),
            symbols: [],
            results: [],
            input: parseQuery(this.props.location.search),
            show: 10
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.showMore = this.showMore.bind(this);
    }

    componentDidMount(){
        let self = this;

        //Load data to be searched from API
        //Will be an object i.e. { "SYMBOL":{data}, "SYMBOL":{data}, ... }
        axios.get(apiConfig.APIURL + '/stock/symbols/full')
            .then(res => {
                self.setState({
                    symbols: res.data
                })
                self.handleSearch();
            })
            .catch(err => {
                console.log(err);
            })
        
        // Trigger handleSearch when user presses enter
        document.getElementById('search-input').onkeypress = function(e){
            let event = e || window.event;
            var charCode = event.keyCode;
            if(charCode == '13'){
                self.handleSearch();
            }
        }
    }

    handleChange(e){
        this.setState({
            input: e.target.value
        });
    }

    handleSearch(){
        let search = this.state.input.toLowerCase();

        if(search.length < 1 || search === ' ') return;

        //Filter API symbols by matches
        const filterResults = (symbol) => {
            return symbol.company.symbol.toLowerCase().includes(search) || symbol.company.companyName.toLowerCase().includes(search)
        }

        if(search.length > 0 && search !== ' '){
            //Convert object sent from API to array
            let symbols = Object.values(this.state.symbols);
            let results = symbols.filter(filterResults);
            this.setState({
                results: results
            });
            return;
        }
    }

    //Allows user to increase number of search results shown
    showMore(){
        this.setState({
            show: this.state.show + 20
        });
    }

    render(){
        return(
            <Layout>
                <SEO title="Search"/>
                <input 
                    id="search-input"
                    type="text" 
                    name="search" 
                    placeholder="Search"
                    value={this.state.input}
                    onChange={this.handleChange}
                />
                <button onClick={this.handleSearch}>Search</button>
                <div className="search-header">
                    {this.state.query.length > 0 ? <h2>"{this.state.query}"</h2> : ''}
                    <h4>Results: </h4>
                </div>
                <div className="search-results">
                    {this.state.results.slice(0, this.state.show).map(result => 
                        <div className="result" key={result.company.symbol}>
                            <h4>
                                <Link to={'/stock?symbol=' + result.company.symbol}>
                                    {result.company.symbol}
                                </Link>
                            </h4>
                            <h5>{result.company.companyName}</h5>
                        </div>    
                    )}
                    {this.state.show > this.state.results.length ? '' : 
                        <button onClick={this.showMore}>Show More</button>
                    }
                    {this.state.results.length === 0 ? <h3>No Results</h3> : ''}
                </div>
                <style>
                    {style}
                </style>
            </Layout>
        )
    }
}

const style = `
    #search-input {
        margin-top: 10px;
        width: 700px;
        max-width: 80%;
    }

    .search-header {
        margin-top: 10px;
    }

    .searchbar {
        visibility: hidden;
    }
`

export default Search;