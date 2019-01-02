import React from 'react';

class Searchbar extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            matches: [],
        }
        this.mapSuggestions = this.mapSuggestions.bind(this);
    }

    mapSuggestions = (event) => {
        let search = event.target.value;
        let matches = [];
        const suggestions = this.props.suggestions;

        if(search.length > 0){
            suggestions.forEach(sgst => {
                if(sgst.tags.includes(search.toUpperCase())){
                    matches.push(sgst.name);
                }
            });

        }

        const matchMap = matches.map(match => 
            <li key={match}>{match}</li>    
        );
        
        this.setState({
            matches: matchMap,
        });
    }

    render(){
        return(
            <div className="searchbar">
                <input type="text" placeholder="Search symbols" onChange={this.mapSuggestions}/>
                <ul className="suggestions">{this.state.matches}</ul>
            </div>
        )
    }
    
}

export default Searchbar;