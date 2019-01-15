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
            watchlist: []
        }
    }

    componentDidMount(){
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
        axios.get(APIURL + '/secure/user/watchlist', { withCredentials: true })
            .then(res => {
                this.setState({
                    watchlist: res.data
                });
            })
            .catch(err => {
                console.log('Error getting watchlist.');
            });
    }

    render(){
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
        else if(this.state.auth === true){
            return(
                <Layout>
                    <SEO title="Watchlist"/>
                    <div className="watchlist-header">
                        <h2>{this.state.username}'s Watchlist</h2>
                    </div>
                    <div className="watchlist">
                        {this.state.watchlist.map(symbol => 
                                <h6 key={symbol}>{symbol}</h6>
                        )}
                    </div>
                    <style>
                        {style}
                    </style>
                </Layout>
            )
        }
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
    .watchlist-header{
        margin-top: 10px;
    }
`

export default Watchlist;

