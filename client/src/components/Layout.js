import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

class Layout extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            links: [],
        }
    }

    render(){
        return(
            <div className="layout App">
                <Header title="Tree Stocks"></Header>
                <Sidebar links={[{text: 'Home', href: '/home'}, {text: 'View Stocks', href: '/stocks'}]}></Sidebar>
            </div>
        )
    }
}

export default Layout;