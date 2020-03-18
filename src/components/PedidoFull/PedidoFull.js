import React from 'react';
import axios from 'axios';


import { Button, Row, Col } from 'react-bootstrap';
import './PedidoFull.css';

class PedidoFull extends React.Component {

    state = {
        loadedPedido: null
    }

    componentDidUpdate() {
        if (this.props.id) {
            if (!this.state.loadedPost || this.state.loadedPost.idb !== this.props.id) {
                axios.get('https://bolsosreact.firebaseio.com//Pedidos.json?orderBy="$key"&equalTo="' + this.props.id + '"')
                    .then(response => {
                        console.log(response);
                        const pedidos = [];
                        for (let key in response.data) {
                            pedidos.push({
                                ...response.data[key],
                                idb: key
                            });
                        }
                        console.log(pedidos);
                        this.setState({ loadedPedido: pedidos[0] });
                    });
            }
        }

    }


    render() {
        let post = <p style={{ textAlign: 'center' }}></p>;
        if (this.props.id) {
            post = <p style={{ textAlign: 'center' }}>Loading...!</p>;
        }
        if (this.state.loadedPedido) {
            post = (
                <div className="PedidoFull">
                    <h4>Datos del cliente:</h4>
                    <Row >
                        <Col>
                            <p class="text-center" >Nombre: {this.state.loadedPedido.Nombre}</p>
                            <p class="text-center" >Apellidos: {this.state.loadedPedido.Apellidos}</p>
                            <p class="text-center" >e-mail: {this.state.loadedPedido.Email}</p>
                            <p class="text-center" >Telefono de contacto: {this.state.loadedPedido.Telefono}</p>

                        </Col>
                        <Col>
                            <p class="text-center" >Dirección: {this.state.loadedPedido.Direccion}</p>
                            <p class="text-center" > Ciudad: {this.state.loadedPedido.Ciudad}</p>
                            <p class="text-center" >País: {this.state.loadedPedido.Pais}</p>
                            <p class="text-center" >CP: {this.state.loadedPedido.CP}</p>
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col>
                            <h4>Datos del pedido:</h4>
                            <p class="text-center" >Cantidad de bolsos Kiruna: {this.state.loadedPedido.Cantidad1} uds.</p>
                            <p class="text-center" >Cantidad de bolsos Sarri: {this.state.loadedPedido.Cantidad2} uds.</p>
                            <p class="text-center" >Cantidad de neceseres Txingor: {this.state.loadedPedido.Cantidad3} uds.</p>
                            <p class="text-center" >Total a pagar: {this.state.loadedPedido.Desembolso}€</p>

                        </Col>

                    </Row>

                </div>

            );
        }
        return post;
    }

}

export default PedidoFull;