import React from 'react';
import Layout from "../../components/layout";
import SEO from "../../components/seo";
import { Link, navigate } from 'gatsby';
import Cookies from 'js-cookie';
import apiConfig from '../../../api-config';

const APIURL = apiConfig.APIURL;

class Watchlist extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            user:{
                auth: null,
                _id: '',
                username: ''
            }
        }
    }

    componentDidMount(){
        let user = Cookies.getJSON('user');
        if(user && user["auth"] === true){
            this.setState({
                user:{
                    auth: true,
                    username: user["username"]
                }
            });
        }else{
            this.setState({
                user:{
                    auth: false
                }
            })
        }
    }

    loadWatchlist(){

    }

    render(){
        if(this.state.user.auth === null){
            return(
                <Layout>
                    <SEO title="Watchlist"/>
                    <style>
                        {style}
                    </style>
                </Layout>
            )
        }
        else if(this.state.user.auth === true){
            return(
                <Layout>
                    <SEO title="Watchlist"/>
                    <div className="watchlist">
                        <h2>{this.state.user.username}'s Watchlist</h2>
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
    .watchlist{
        margin-top: 10px;
    }
`

export default Watchlist;

