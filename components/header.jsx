import React from 'react';
import ReactDOM from 'react-dom';


class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }


    render() {
        const { putArticlesInCart, returnToHome, shoulShow } = this.props;
        return (
            <div>
                <div className="row">
                    <div className="col-sm-3 col-md-3 col-lg-3">
                        <div id="logo">
                            <h6><img className="imagePeg"  src="https://i.pinimg.com/originals/a9/92/51/a99251cb858fa13d38ad38738ce9aaca.png" alt="Shopping Geek" /></h6>
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-6 col-lg-6">
                        <div>
                            <h3 className="titleShop">Geek Store</h3>
                        </div>
                    </div>
                    <div className="col-sm-3 col-md-3 col-lg-3">
                        <div id="shoppingCartLogo">
                            <h6 className={shoulShow ? 'shown' : 'hidden'}><img className="imagePeg shoppingCartLogoRight" onClick={putArticlesInCart} src="https://image.flaticon.com/icons/png/128/368/368314.png" alt="See Cart" /></h6>
                            <h6 className={!shoulShow ? 'shown' : 'hidden'}><img className="imagePeg shoppingCartLogoRight" onClick={returnToHome} src="http://www.dataspirit.org/snd/media2htmldata/styles/yellow/back.png" alt="See Cart" /></h6>
                        </div>
                    </div>
                </div>

                <section className="row">
                    <div className="container">
                        <div className="cols-md-12">

                        </div>
                    </div>
                </section>

            </div>
        );
    }
}

export default Header;