import React from 'react';
import { Link } from 'gatsby';

export default () => {
    return(
        <div className="navbar">
            <nav>
                <Link to="/user/login">Login</Link>
            </nav>
        </div>
    );
}