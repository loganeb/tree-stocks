import React from 'react';
import Layout from '../../components/layout';
import apiConfig from '../../../api-config';
import { navigate } from 'gatsby';
import axios from 'axios';

class Account extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            auth: false,
            username: '',
            _id: '',
            joined: ''
        }
    }

    componentDidMount(){
        const self = this;
        axios.get(apiConfig.APIURL + '/secure/user/profile', {withCredentials: true})
            .then((res) => {
                if(res.data.auth === true){
                    let {auth, username, _id} = res.data
                    self.setState({
                        auth: auth,
                        username: username,
                        _id: _id
                    });
                }else{
                    navigate('/user/login');
                }
            })
            .catch((err) => navigate('/user/login'))
    }

    render(){
        if(this.state.auth === true){
            return(
                <Layout>
                    <div className="account">
                        <div>Username: {this.state.username}</div>
                        <div>ID: {this.state._id}</div>
                    </div>
                </Layout>
            )
        }
        return(
            <Layout>
                <div></div>
            </Layout>
        )
    }
}

export default Account;