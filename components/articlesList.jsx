import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-responsive-modal';

const ListArticulos = ({ lista, onOpenModal }) => {

    return lista.map((item, index) => {

        return <div key={`img-${item.name}`} className="col-sm-4 col-md-4 col-lg-4">
            <div className="card">
                <img id={item._id} className="imageCard" src={`${item.image}`} alt={`${item.name}`} onClick={onOpenModal} />
                <div className="containerCard">
                    <h4><b>{item.name}</b></h4>
                    <h5 className="carImageShop"> <i className="glyphicon glyphicon-shopping-cart"></i> </h5>
                    <p>Price: {item.price}</p>
                </div>
            </div>

        </div>
    });
}

const SeeArticle = ({ lista, articleId, onAddToCart, onchangeInput }) => {

    let article = {}

    lista.map((item, index) => {
        if (item._id == articleId) {
            article = item;
        }
    });

    return <div key={`img-${article._id}`}>
        <div className="col-sm-6 col-md-6 col-lg-6">

            <div className="card">
                <img id={article._id} className="imageCard" src={`${article.image}`} alt={`${article.name}`} />
                <div className="containerCard">
                    <h4><b>{article.name}</b></h4>
                </div>
            </div>

        </div>
        <div className="col-sm-6 col-md-6 col-lg-6">
            <section>
                <div className="cardTitles">
                    <p> <strong>Brand: </strong> {article.brand}</p>
                </div>
                <div className="cardTitles">
                    <p> <strong>Price: </strong> {article.price} <span className="textFloatRight"> <strong>Items in stock: </strong> {article.stock}</span></p>
                </div>
                <div className="cardTitles">
                    <p> <strong>Description: </strong> {article.description}</p>
                </div>
                <div className="cardTitles">
                    <label for="cantidad">Quantity:</label>
                    <input type="number" data-article={article._id} className="form-control" id="cantidad" aria-describedby="cantidad" placeholder="Cantidad a comprar" onChange={onchangeInput} />
                </div>
                <div className="cardTitles">
                    <label for="addToCart">Add to cart:</label>
                    <button type="button" id="addToCart" className="btn btn-primary btnArtDetailCart" onClick={onAddToCart} ><i className="glyphicon glyphicon-shopping-cart"></i></button>
                </div>
            </section>

        </div>

    </div>
}

class ArticlesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listArticulos: this.props.listArticulos,
            open: false,
            articleIdToSee: 0,
            itemCart: {},
            cart: this.props.cart
        }
    }

    onOpenModal = (e) => {
        e.preventDefault();

        const id = e.target.id;
        this.setState({ articleIdToSee: id });
        this.setState({ open: true });
    };
    onCloseModal = () => {
        this.setState({ open: false });
    };


    render() {
        const { shoulShow, listArticulos, itemCart, cart, onAddToCart, onInputChange } = this.props;
        const { open, articleIdToSee } = this.state;
        debugger;
        return (
            <div className={shoulShow ? 'shown' : 'hidden'}>
                <div className='container'>

                    <ListArticulos lista={listArticulos} onOpenModal={this.onOpenModal} />

                    <Modal open={open} onClose={this.onCloseModal} center>
                        <SeeArticle lista={listArticulos} articleId={articleIdToSee} onAddToCart={onAddToCart} onchangeInput={onInputChange} />
                    </Modal>
                </div>
            </div>
        )
    }
}

export default ArticlesList;