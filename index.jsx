import 'babel-polyfill';
import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
const urls = {
    baseUrl: '/',
    home:'/Home',
    cart:'/Cart'
};

// Routes
import Login from './containers/login.jsx';
import App from './containers/app.jsx';
import Cart from './containers/cart.jsx';

ReactDom.render(
    <BrowserRouter>
        <div>
            <Route path={urls.baseUrl} exact component={Login} />
            <Route path={urls.home} exact component={App} />
            <Route path={urls.cart} exact component={Cart} />
        </div>
    </BrowserRouter>,
    document.getElementById('app')
);
