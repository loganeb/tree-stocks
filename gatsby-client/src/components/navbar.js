import React from 'react';
import { Link } from 'gatsby';
import Cookies from 'js-cookie';
import './CSS/navbar.css';

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
        let user = Cookies.getJSON('user');
        if(user && user["auth"] === true){
            this.setState({
                user:{
                    auth: true,
                    username: user["username"]
                }
            });
        }
    }

    render(){
        if(this.state.user.auth === true){
            return(
                <div className="navbar">
                    <nav>
                        <Link to="/user/account">Hi, {this.state.user.username}!</Link>
                        <Link to="/user/watchlist">Watchlist</Link>
                        <Link to="/user/account">Account</Link>
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