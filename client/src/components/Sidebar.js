import React from 'react';

const Sidebar = props => {
    const links = props.links.map(link => 
        <li key={link.text}><a href={link.href}>{link.text}</a></li>
    );

    return(
        <div className="sidebar">
            <ul>{ links }</ul>
        </div>
    )
};

export default Sidebar;