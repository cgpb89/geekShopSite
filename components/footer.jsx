import React from 'react';
import ReactDOM from 'react-dom';

class Footer extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        return (
            <div id="footer-bottom">
                <div className="container">
                    <div className='cols-md-12'>
                        <p>
                            Desarrollado por: Carlos Pereira B. Tel. 8653 6559
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}



export default Footer;