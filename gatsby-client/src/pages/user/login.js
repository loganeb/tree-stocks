import React from 'react';
import Layout from "../../components/layout";
import SEO from "../../components/seo";
import { Link, navigate } from 'gatsby';
import axios from 'axios';
import apiConfig from '../../../api-config';


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
        let self = this;
        axios.get(apiConfig.APIURL + '/secure/user', { withCredentials: true })
            .then((res) => {
                self.setState({
                    user: res.data
                });
            })
            .catch(err => {});
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
                    <div className="login-form">
                        <h1>Login</h1>
                        <h3 className="error">{this.state.errorMessage}</h3>
                        <input 
                            type="text"
                            name="username" 
                            value={this.state.username} 
                            onChange={this.handleChange}/>
                        <input 
                            type="password"
                            name="password" 
                            value={this.state.password} 
                            onChange={this.handleChange}/>
                        <button onClick={this.handleSubmit}>Login</button>
                    </div>
                </Layout>
            )
        }
        return(
            <Layout>
                <SEO title="login"/>
                <h3>You are already logged in.</h3>
                <Link to="/user/logout">Logout</Link>
            </Layout>
        )
    }
}  

export default Login;