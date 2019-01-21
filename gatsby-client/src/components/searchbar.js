import React from 'react';
import axios from 'axios';
import apiConfig from '../../api-config';
import SearchIcon from '../images/search.svg';
import { navigate } from 'gatsby';

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

        document.getElementById('searchbar-input').onkeypress = function(e){
            let event = e || window.event;
            var charCode = event.keyCode;
            if(charCode == '13'){
                navigate('/search?q=' + self.state.input);
            }
        }
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
            <li key={match}><a href={`/search/?q=${match}`}>{match}</a></li>
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
                id="searchbar-input"
                type="text" 
                placeholder="Search symbols" 
                value={this.state.input}
                onChange={this.mapSuggestions} />
                <button 
                    onClick={() => navigate('/search?q=' + this.state.input)}
                    className="searchbar-button"
                    alt="search">
                    <i className="fa fa-search"></i>
                </button>
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
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        padding-bottom: 5px;
        right: 0;
        top: 60;
        position: absolute;
        z-index: 10;
    }

    .searchbar input {
        height: 40px;
        border-radius: 5px;
    }

    .searchbar-button {
        height: 40px;
        width: 40px;
        border: none;
        margin: 0;
        padding-top: 2px;
        margin-left: 5px;
        border-radius: 40px;
        background: #eee;
    }

    .searchbar-button:hover {
        opacity: 0.8;
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

    @media only screen and (max-width: 650px){
       .searchbar {
           visibility: hidden;
       }
    }
`

export default Searchbar;