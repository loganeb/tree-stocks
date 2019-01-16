import React from 'react';
import Layout from "../../components/layout";
import SEO from "../../components/seo";
import { Link, navigate } from 'gatsby';
import Cookies from 'js-cookie';
import apiConfig from '../../../api-config';
import axios from 'axios';

const APIURL = apiConfig.APIURL;

class Watchlist extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            auth: null,
            _id: '',
            username: '',
            watchlist: [],
            newList: [],
            input: '',
            edit: false,
            errorMessage: ''
        }
        this.handleAdd = this.handleAdd.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.toggleEdit = this.toggleEdit.bind(this);
    }

    componentDidMount(){
        console.log(APIURL);
        let user = Cookies.getJSON('user');
        if(user && user.auth === true){
            this.setState({
                auth: true,
                username: user.username
            });

            this.loadWatchlist();
        }else{
            this.setState({
                auth: false
            })
        }
    }

    loadWatchlist(){
        axios.get(APIURL + '/user/watchlist', { withCredentials: true })
            .then(res => {
                this.setState({
                    watchlist: res.data,
                    newList: res.data
                });
            })
            .catch(err => {
                console.log('Error getting watchlist.');
            });
    }

    handleChange(e){
        this.setState({
            input: e.target.value
        });
    }

    handleAdd(){
        let newList = this.state.newList.slice();
        newList.unshift(this.state.input.toUpperCase());
        this.setState({
            newList: newList,
            input: ''
        });
    }

    handleRemove(e){
        console.log(e.target.name);
        let newList = this.state.newList.filter(symbol => symbol !== e.target.name);
        this.setState({
            newList: newList
        });
    }

    handleSave(){
        let self = this;
        axios.post(APIURL + '/user/watchlist/update', 
            { symbols: this.state.newList },
            { withCredentials: true})
            .then(res => {
                this.setState({
                    watchlist: res.data.watchlist,
                    newList: res.data.watchlist,
                    edit: false,
                    input: ''
                })
            })
            .catch( err => {
                this.setState({
                    errorMessage: 'Error: Watchlist could not be saved'
                })
            })
    }

    toggleEdit(){
        this.setState({
            edit: !this.state.edit,
            newList: this.state.watchlist
        });
    }

    render(){
        //Watchlist not rendered before authentication checked
        if(this.state.auth === null){
            return(
                <Layout>
                    <SEO title="Watchlist"/>
                    <style>
                        {style}
                    </style>
                </Layout>
            )
        }

        //Watchlist page view if user logged in
        else if(this.state.auth === true && !this.state.edit){
            return(
                <Layout>
                    <SEO title="Watchlist"/>
                    <div className="watchlist-header">
                        <h2>{this.state.username}'s Watchlist</h2>
                    </div>
                    <div className="watchlist-form">
                        <button onClick={this.toggleEdit}>Edit Watchlist</button>
                    </div>
                    <div className="watchlist">
                        {this.state.watchlist.map(symbol => 
                            <div className="watchlist-item">
                                <span key={this.state.watchlist.indexOf(symbol)}>
                                    {symbol}
                                </span>
                            </div>
                        )}
                    </div>
                    <style>
                        {style}
                    </style>
                </Layout>
            )
        }

        // Watchlist page view in edit mode
        else if(this.state.auth === true && this.state.edit){
            return(
                <Layout>
                    <SEO title="Watchlist"/>
                    <div className="watchlist-header">
                        <h2>{this.state.username}'s Watchlist</h2>
                    </div>
                    <br/>
                    <span id="error-message">{this.state.errorMessage}</span>
                    <button onClick={this.handleSave}>Save</button>
                    <button onClick={this.toggleEdit}>Cancel</button>
                    <div className="watchlist-form">
                        <h4>Add a symbol to your watchlist: </h4>
                        <input 
                        type="text"
                        value={this.state.input} 
                        onChange={this.handleChange}
                        placeholder="Enter symbol or name"
                        />
                        <button onClick={this.handleAdd}>Add</button>
                    </div>
                    <div className="watchlist">
                        {this.state.newList.map(symbol =>
                            <div className="watchlist-item" 
                            key={this.state.newList.indexOf(symbol)}> 
                                <span>
                                    {symbol}
                                </span>
                                <button 
                                name={symbol}
                                onClick={this.handleRemove}>
                                    Delete
                                </button>
                            </div>
                        )}
                    </div>
                    <style>
                        {style}
                    </style>
                </Layout>
            )
        }

        // Watchlist page if user not logged in
        else{
            return(
                <Layout>
                    <SEO title="Watchlist"/>
                    <div className="watchlist">
                        <h3>Login to view your watchlist: </h3>
                        <Link to="/user/login">Login Page</Link>
                    </div>
                    <style>
                        {style}
                    </style>
                </Layout>
            )
        }
    }
}

const style = `
    .watchlist-header {
        margin-top: 10px;
    }

    .watchlist-form {
        padding-top: 10px;
    }

    .watchlist-item {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        height: 50px;
        width: 400px;
        max-width: 100%;
        margin: 5px;
        padding: 5px;
    }

    .watchlist div:nth-child(odd) {
        background: gray;
    }

    #error-message {
        color: red;
    }
`

export default Watchlist;

