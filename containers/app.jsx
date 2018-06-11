import React, { Component } from 'react';
import Header from '../components/header.jsx';
import Footer from '../components/footer.jsx';
import ArticlesList from '../components/articlesList.jsx';
import Cart from './cart.jsx';
import { artiulosList, artiulosInCart } from '../routes/servicios.jsx'
import toastr from 'toastr';

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            listArticulos: [],
            shoulShow: true,
            cart: [],
            itemCart: {},
            arrayArticulosToCart: []
        }
    }

    componentWillMount = async () => {
        await this.loadArticles()
    }
    loadArticles = async () => {
        const listArticulos = await artiulosList();
        this.setState({ listArticulos });
    }
    putArticlesInCart = async (e) => {
        e.preventDefault();

        const listaArtInCart = this.state.cart;
        const listArticulos = this.state.listArticulos;

        let arrayArticulosToCart = [];
        listaArtInCart.map((itemA, indexA) => {
            listArticulos.map((item, index) => {

                if (itemA.articleId == item._id) {
                    let data = item;
                    data.cantidad = itemA.cantidad;
                    data.total = itemA.cantidad * item.price;
                    arrayArticulosToCart.push(item);
                }
            });
        });
        this.setState({ shoulShow: false });
        this.setState({ arrayArticulosToCart });
    }
    onAddToCart = async (e) => {
        e.preventDefault();
        const itemCart = this.state.itemCart
        let cart = this.state.cart,
            existe = false, index = -1;

        if (typeof itemCart.articleId !== typeof undefined && parseInt(itemCart.articleId) > 0) {

            let inStock = await this.validateStock(itemCart);
            if (inStock == '') {
                cart.map((item, indexA) => {
                    if (item.articleId == itemCart.articleId) {
                        existe = true; index = indexA;
                    }
                });

                if (existe) {
                    cart[index].cantidad = itemCart.cantidad;
                    this.setState({ cart });
                    this.setState({ itemCart: {} });
                    toastr.success('Article add successfully');
                } else {
                    this.setState({ cart: [...this.state.cart, itemCart] });
                    this.setState({ itemCart: {} });
                    toastr.success('Article add successfully');
                }
            } else {
                toastr.clear();
                toastr.error(inStock);
            }
        } else {
            toastr.warning('Cannot add cero items');
        }
    }
    validateStock = async (pItemCart) => {
        const listArticulos = this.state.listArticulos;
        let inStock = '';

        if (parseInt(pItemCart.cantidad) <= 0) {
            return 'Cannot add cero items';
        }

        await listArticulos.map((item, index) => {
            if (item._id === pItemCart.articleId) {

                if (parseInt(item.stock) >= parseInt(pItemCart.cantidad)) {
                    inStock = '';
                } else if (parseInt(item.stock) == 0) {
                    inStock = 'There are not items in stock';
                } else {
                    inStock = 'There are only ' + item.stock + ' items available in stock';
                }
            }
        });
        return inStock;;
    }
    onInputChange = (e) => {
        e.preventDefault();
        const cantidad = e.target.value,
            artId = event.target.attributes.getNamedItem('data-article').value;

        const itemCart = {
            articleId: artId,
            cantidad: cantidad
        }
        this.setState({ itemCart });
    }
    returnToHome = (e) => {
        e.preventDefault();
        const shoulShow = !this.state.shoulShow;
        this.setState({ shoulShow });
    }
    changeDeleteItem = (e) => {
        e.preventDefault();
        let cart = this.state.cart;
        console.log('Antes Cart', cart);

        console.log('e.target.id', e.target.id);
        const pArticleId = e.target.id.split('-')[1];
        console.log('pArticleId', pArticleId);

        cart = cart.filter(function (item, index) {
            return item.articleId != pArticleId;
        });

        console.log('Despues Cart', cart);
        this.setState({ cart });
    }
    proceedToCheckOut = (e)=>{
        e.preventDefault();
    }

    render() {
        debugger;
        const { listArticulos, shoulShow, cart, itemCart, onAddToCart, arrayArticulosToCart, proceedToCheckOut } = this.state;
        return (
            <div>
                <Header putArticlesInCart={this.putArticlesInCart} shoulShow={shoulShow} returnToHome={this.returnToHome} />
                <hr className="line" />
                <ArticlesList listArticulos={listArticulos} onInputChange={this.onInputChange} cart={cart} shoulShow={shoulShow} onAddToCart={this.onAddToCart} />
                <Cart listArticulos={listArticulos} cart={cart} shoulShow={shoulShow} changeDeleteItem={this.changeDeleteItem} arrayArticulosToCart={arrayArticulosToCart} onInputChange={this.onInputChangeCart} />
                <hr className="line" />
                <Footer />
            </div>
        )

    }
}