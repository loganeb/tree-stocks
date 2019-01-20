import React from 'react';
import { Link } from 'gatsby';
import axios from 'axios';
import apiConfig from '../../api-config';

class Searchbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            matches: [],
            suggestions:[],
            input: ''
        }
        this.mapSuggestions = this.mapSuggestions.bind(this);
    }

    componentDidMount(){
        let self = this;

        axios.get(apiConfig.APIURL + '/stock/symbols')
            .then(res => {
                self.setState({
                    suggestions: res.data
                })
            })
            .catch(err => {})
    }

    mapSuggestions = (event) => {
        let search = event.target.value;
        let matches = [];
        const suggestions = this.state.suggestions;

        if (search.length > 0) {
            matches = suggestions.filter(element => 
                    element.includes(search.toUpperCase())
                );

        }

        const matchMap = matches.map(match =>
            <li key={match}><a href={`/stock/?symbol=${match}`}>{match}</a></li>
        );

        this.setState({
            matches: matchMap,
            input: event.target.value
        });
    }

    render() {
        return (
            <div className="searchbar"
                style={{
                    margin: 5,
                    display: 'inline-block',
                    right: 20,
                    top: 60,
                    position: "absolute",
                }}>
                <input 
                type="text" 
                placeholder="Search symbols" 
                value={this.state.input}
                onChange={this.mapSuggestions} />
                <ul className="suggestions">{this.state.matches}</ul>
                <style>
                    {style}
                </style>
            </div>
            
        )
    }

}

const style = `
    .searchbar {
        margin: 5px;
        margin-right: 50px;
        display: inline-block;
        right: 0;
        top: 60;
        position: absolute;
        z-index: 10;
    }

    .suggestions {
        background: #fff;
        font-size: 0.9em;
        list-style: none;
        width: 250px;
        max-width: 100%;
        margin: 0;
    }

    .suggestions li > a {
        color: #333;
        text-decoration: none;
        font-weight: bold;
        padding: 5px;
    }

    .suggestions li > a:hover {
        color: #555;
    }
`

export default Searchbar;