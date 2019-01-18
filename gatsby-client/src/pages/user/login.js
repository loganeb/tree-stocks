import React from 'react';
import Layout from "../../components/layout";
import SEO from "../../components/seo";
import { Link, navigate } from 'gatsby';
import axios from 'axios';
import apiConfig from '../../../api-config';
import Cookies from 'js-cookie';


class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            user: {
                auth: false
            },
            username: '',
            password: '',
            errorMessage: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        let user = Cookies.getJSON('user');
        if(user && user["auth"] === true){
            this.setState({
                user:{
                    auth: true
                }
            });
        }
    }

    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value,
            errorMessage: ''
        });
    }

    handleSubmit(){
        let {username, password} = this.state;
        if(username.length > 0  && password.length > 7){
            var self = this;

            axios.post(apiConfig.APIURL + '/user/login', {
                username: username,
                password: password
            }, {
                withCredentials: true,
            })
                .then((res) => {
                    if(res.data.success === true){
                        self.setState({
                            errorMessage: 'Login successful. Redirecting...'
                        })

                        let username = self.state.username;
                        username = username.charAt(0).toUpperCase() + username.slice(1);

                        Cookies.set('user', 
                            { auth: true, username: username },
                            { expires: 3} 
                        );

                        setTimeout(() => { navigate('/')}, 3000);
                    }
                    else{
                        self.setState({
                            errorMessage: 'Incorrect username or password'
                        })
                    }
                })
                .catch((err) => {
                    self.setState({
                        errorMessage: 'Login error occured. Please try again.'
                    })
                })
        }else{
            this.setState({
                errorMessage: 'Invalid username or password.'
            })
        }
    }

    render(){
        if(!this.state.user.auth){
            return(
                <Layout>
                    <SEO title="Login"/>
                    <h1>Login</h1>
                    <div className="login-form">
                        <h3 className="error">{this.state.errorMessage}</h3>
                        <div className="login-form">
                            <label htmlFor="username">Username</label>
                            <input 
                                type="text"
                                name="username" 
                                value={this.state.username}
                                placeholder="username" 
                                onChange={this.handleChange}/>
                            <label htmlFor="password">Password</label>
                            <input 
                                type="password"
                                name="password"
                                placeholder="password" 
                                value={this.state.password} 
                                onChange={this.handleChange}/>
                            <button onClick={this.handleSubmit}>Login</button>
                        </div>
                        <style>
                            {style}
                        </style>
                    </div>
                </Layout>
            )
        }
        return(
            <Layout>
                <SEO title="Login"/>
                <h3>You are already logged in.</h3>
                <Link to="/user/logout">Logout</Link>
            </Layout>
        )
    }
} 

const style = `
    h1 {
        margin-top: 10px;
    }

    .login-form {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        max-width: 100%;
        margin-top: 5px;
        text-align: center;
    }

    .login-form input {
        max-width: 300px;
        margin: 5px 0 5px 0;
    }

    .login-form button {
        margin: 5px;
    }
`

export default Login;