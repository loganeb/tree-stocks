import React from 'react';
import { Link } from 'gatsby';
import axios from 'axios';
import apiConfig from '../../api-config';

class Navbar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            user: {
                username: '',
                auth: false
            }
        }
    }

    componentDidMount(){
        var self = this;

        axios.get(apiConfig.APIURL + '/secure/user', { withCredentials: true})
            .then((res) => {
                let username = res.data.username;
                username = username.charAt(0).toUpperCase() + username.slice(1);
                self.setState({
                    user: {
                        auth: res.data.auth,
                        username: username
                    }
                });
            })
            .catch(err => {})
    }

    render(){
        if(this.state.user.auth === true){
            return(
                <div className="navbar">
                    <nav>
                        <Link to="/user/account">{this.state.user.username}</Link>
                        <Link to="/user/logout">Logout</Link>
                    </nav>
                    
                </div>
            )
        }
        else{
            return(
                <div className="navbar">
                    <nav>
                        <Link to="/user/login">Login</Link>
                        <Link to="/user/signup">Signup</Link>
                    </nav>
                </div>
            );
        }
    }
}

export default Navbar;