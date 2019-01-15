import React from 'react';
import Layout from '../../components/layout';
import SEO from '../../components/seo';
import apiConfig from '../../../api-config';
import { navigate } from 'gatsby';
import axios from 'axios';
import Cookies from 'js-cookie';

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
                        <div>Username: {this.state.username}</div>
                    </div>
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