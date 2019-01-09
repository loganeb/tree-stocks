import React from 'react';
import Layout from "../../components/layout";
import { navigate } from 'gatsby';
import axios from 'axios';

const URL = process.env.APIURL || 'http://localhost:8080/api';

class Signup extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username:'',
            email:'',
            password: '',
            passwordConfirm: '',
            errorMessage: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value,
            errorMessage: ''
        });
    }

    handleSubmit(){
        let password = this.state.password;

        if(password.length > 7 && password === this.state.passwordConfirm){
            var self = this; 
            axios.post( URL + '/user/signup', 
            {
                username: this.state.username,
                email: this.state.email,
                password: password,
                errorMessage: '',
                success: false,
            })
            .then(function(res) {
                self.setState({
                    success: true
                });
                setTimeout(function(){navigate('/user/login')}, 3000);
            })
            .catch(function(error) {
                this.setState({
                    errorMessage: 'Error: Signup could not be completed.'
                })
            });
            return;
        }
        else if(password !== this.state.passwordConfirm){
            this.setState({
                errorMessage: 'Passwords must match.'
            });
            return;
        }
        else if(password.length < 7){
            this.setState({
                errorMessage: 'Password must be at least 8 characters.'
            });
            return;
        }
    }

    render(){
        if(this.state.success){
            return(
                <Layout>
                    <h3>Signup Successful. Redirecting to Login...</h3>
                </Layout>
            )
        }

        return(
            <Layout>
                <div className="signup-form">
                    <h1 className="signup-header">Signup</h1>
                    <h3 className="error">{this.state.errorMessage}</h3>
                    <input 
                        type="text" 
                        name="username" 
                        value={this.state.username} 
                        placeholder="Username"
                        onChange={this.handleChange}/>
                    <input 
                        type="text" 
                        name="email" 
                        value={this.state.email} 
                        placeholder="Email" 
                        onChange={this.handleChange}/>
                    <input 
                        type="password" 
                        name="password" 
                        value={this.state.password} 
                        placeholder="Password"
                        onChange={this.handleChange}/>
                    <input 
                        type="password" 
                        name="passwordConfirm" 
                        value={this.state.confirmPassword} 
                        placeholder="Confirm password"
                        onChange={this.handleChange}/>
                    <button onClick={this.handleSubmit}>Submit</button>
                </div>
                <style >{`
                    .error{
                        color: red;
                    }

                    .signup-form{
                        width: 100%;
                        max-width: 500px;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        margin: auto;
                        text-align: center;
                    }

                    .signup-form > input{
                        max-width: 300px;
                        min-width: 150px;
                        padding: 5px;
                        margin-top: 5px;
                        margin-bottom: 5px;
                    }
                `}</style>
            </Layout>
        )
    }
}

export default Signup;