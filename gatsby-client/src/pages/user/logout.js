import Layout from '../../components/layout';
import React from 'react';
import { navigate } from 'gatsby';
import axios from 'axios';
import apiConfig from '../../../api-config';

export default (props) => {
    if(props.location.state && props.location.state.loggedOut){
        return(
            <Layout>
                <div>
                    <h3>You are now logged out.</h3>
                </div>
            </Layout>
        );
    }
    return(
        <Layout>
            <div>
                <h3>Log out?</h3>
                <div>
                    <button onClick={
                        () => {
                            axios.get(apiConfig.APIURL + '/user/logout', { withCredentials: true})
                                .then(() => navigate('/') )
                                .catch((err) => navigate('/'));
                        }
                    }>Yes</button>
                    <button onClick={
                        () => {
                            navigate('/');
                        }
                    }>No</button>
                </div>
            </div>
        </Layout>
    );
};