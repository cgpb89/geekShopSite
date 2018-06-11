import React, { Component } from 'react';

const ListArticulos = ({ lista, onInputChange, changeDeleteItem }) => {
    let totalCarrito = 0;
    lista.map((item, index) => {
        totalCarrito += (parseFloat(item.cantidad) * parseFloat(item.price));
    })
    return (
        <div class="table-responsive">
            <table class="table">
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {lista.map((item, index) => {
                        return (
                            <tr key={`tbl-${item.name}`} id={`tblItem-${item._id}`}>
                                <td>
                                    <img id={item._id} className="imageCardCart" src={`${item.image}`} alt={`${item.name}`} />
                                </td>
                                <td>
                                    <h4><b>{item.name}</b></h4>
                                </td>
                                <td>
                                    <h4><b>{item.price}</b></h4>
                                </td>
                                <td>
                                    <span className="inLineCart">{item.cantidad}</span>
                                </td>
                                <td>
                                    <h4><b>{item.total}</b></h4>
                                </td>
                                <td>
                                    <button type="button" id={`btn-${item._id}`} className="btn btn-success inLineCart" onClick={changeDeleteItem} ><i className="glyphicon glyphicon-trash"></i></button>
                                </td>
                            </tr>
                        )
                    })}
                    <tr>
                        <td></td><td></td><td></td><td></td>
                        <td>
                            <strong>{totalCarrito}</strong>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )

}
export default class Cart extends Component {
    constructor() {
        super();
        this.state = {
            listArticulos: [],
            cart: [],
        }
    }

    componentWillMount = async () => {

    }
    goHome = (e) => {
        e.preventDefault();
        //window.location.href = '/Cart';
        this.props.history.push(`/Home`)
    }


    render() {
        const { arrayArticulosToCart, shoulShow, onInputChange, changeDeleteItem, proceedToCheckOut } = this.props;
        console.log('Render Cart', )
        return (
            <div className={!shoulShow ? 'shown' : 'hidden'}>
                <ListArticulos lista={arrayArticulosToCart} onInputChange={onInputChange} changeDeleteItem={changeDeleteItem} />
                <div className="col-sm-12 col-md-12 col-lg-12 ">
                    <button type="button" className="btn btn-success textFloatRight" onClick={proceedToCheckOut} >
                        <i className="glyphicon glyphicon-piggy-bank"> Proceed to Check out</i>
                    </button>
                </div>
            </div>
        )

    }
}