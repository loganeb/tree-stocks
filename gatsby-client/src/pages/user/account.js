import React from 'react';
import Layout from '../../components/layout';
import SEO from '../../components/seo';
import apiConfig from '../../../api-config';
import { Link, navigate } from 'gatsby';
import axios from 'axios';
import Cookies from 'js-cookie';

const APIURL = apiConfig.APIURL;

class Account extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            auth: false,
            username: ''
        }
        this.loadPortfolio = this.loadPortfolio.bind(this);
    }

    componentDidMount(){
        let user = Cookies.getJSON('user');

        if(user && user.auth === true){
            this.setState({
                username: user.username,
                auth: true
            });
        }else{
            navigate('/user/login');
        }
    }

    loadPortfolio(){

    }

    render(){
        if(this.state.auth === true){
            return(
                <Layout>
                    <SEO title="Account"></SEO>
                    <div className="account">
                        <h3>Username: {this.state.username}</h3>
                        <h3><Link to="/user/watchlist">View Your Watchlist</Link></h3>
                    </div>
                    <style>{`
                        .account {
                            padding-top: 10px;
                        }
                    `}</style>
                </Layout>
            )
        }
        return(
            <Layout>
                <SEO title="Account"/>
                <div></div>
            </Layout>
        )
    }
}

export default Account;