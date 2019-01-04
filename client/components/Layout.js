import Header from './Header';
import './Layout.css';

export default class Layout extends React.Component {
    render(){
        return(
            <div className="layout">
                <Header/>
                {this.props.children}
                <style jsx>{`
                    body{

                    }
                `}
                </style>
            </div>
        )
    }
}