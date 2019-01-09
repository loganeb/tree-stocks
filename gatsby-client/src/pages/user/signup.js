import React from 'react';
import Layout from "../../components/layout";
import { navigate } from 'gatsby';
import axios from 'axios';

class Signup extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username:'',
            email:'',
            password: '',
            confirmPassword: '',
            errorMessage: '',
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value,
            errorMessage: ''
        });
    }

    handleSubmit(){
        let password = this.state.password;

        if(password.length > 8 && password === this.state.confirmPassword){
            axios.post('http://localhost:8080/api/user/signup', 
            {
                username: this.state.username,
                email: this.state.email,
                password: password
            })
            .then((res) => navigate('/'))
            .catch((error) => {
                this.setState({
                    errorMessage: ''
                })
            });
        }
        else{
            this.setState({
                errorMessage: 'Passwords must match.'
            })
        }
    }

    render(){
        return(
            <Layout>
                <div className="signup">
                    <h1 style={{ textAlign:'center' }}>Signup</h1>
                    <h2>{this.state.errorMessage}</h2>
                    <form className="signup-form">
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
                    </form>
                </div>
                <style jsx>{`
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