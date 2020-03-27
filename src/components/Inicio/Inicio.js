import React from 'react';
import axios from 'axios';


import Productos from '../../components/Productos/Productos';


import { Row, Col, Container, Image, Jumbotron, Button, Modal } from 'react-bootstrap';
import {  NavLink } from 'react-router-dom';

import './Inicio.css';



class Inicio extends React.Component {

    state = {
        selectedPostId: null,
        productos: [],
        error: false,
        cantidadbolsos: [0, 0, 0],
        totalcarrito: 0,
        setShow: false,
        titulos: ['', '', ''],
        pedidos: [],
        numeropedido: null,
        t: false


    }

    componentDidMount() {
        //PRODUCTOS
        axios.get('https://bolsosreact.firebaseio.com/Bolsos.json')
            .then(response => {
                let productos = [];
                for (let key in response.data) {
                    productos.push({
                        ...response.data[key],
                        idb: key
                    });
                }
                productos = productos.slice(1);
                //console.log(productos);
                this.setState({ productos: productos });
            })

        //PEDIDOS
        axios.get('https://bolsosreact.firebaseio.com/Pedidos.json')
            .then(response => {
                let pedidos = [];
                for (let key in response.data) {
                    pedidos.push({
                        ...response.data[key],
                        idb: key
                    });
                }
                pedidos = pedidos.slice(1);
               // console.log(pedidos);
                this.setState({ pedidos: pedidos });
            })
    }

    sumarSelectedHandler = (id, precio, nom) => {
        this.setState({ selectedPostId: id });
        let cantidad = this.state.cantidadbolsos;
        let newid = id - 1;
        cantidad[newid] = cantidad[newid] + 1;
        this.setState({ cantidadbolsos: cantidad });

        let totaldirus = this.state.totalcarrito;
        totaldirus = totaldirus + 1 * precio;
        this.setState({ totalcarrito: totaldirus });

        let ttl = this.state.titulos;
        ttl[newid] = nom;
        this.setState({ titulos: ttl });

    }

    restarSelectedHandler = (id, precio) => {
        this.setState({ selectedPostId: id });
        let cantidad = this.state.cantidadbolsos;
        let newid = id - 1;
        let totaldirus = this.state.totalcarrito;
        if (cantidad[newid] > 0) {
            cantidad[newid] = cantidad[newid] - 1;
            totaldirus = totaldirus - 1 * precio;
        }
        this.setState({ cantidadbolsos: cantidad });
        this.setState({ totalcarrito: totaldirus });
    }


    //Handles para el modal
    handleClose = () => this.setState({ setShow: false });
    handleShow = () => this.setState({ setShow: true });
    handleSavePedido = () => {
        //Creamos data con los primeros datos que meteremos del pedido 
        const data = {
            Cantidad1: this.state.cantidadbolsos[0],
            Cantidad2: this.state.cantidadbolsos[1],
            Cantidad3: this.state.cantidadbolsos[2],
            Desembolso: this.state.totalcarrito

        };
        //Calculamos cuantos pedidos hay para poner el id que le corresponda
        let numeropedido = this.state.pedidos.length;
        numeropedido = numeropedido + 1;
        this.setState({ numeropedido: numeropedido });
        console.log(numeropedido);
        //Introducimos los primeros datos del pedido
        axios.put('https://bolsosreact.firebaseio.com/Pedidos/' + numeropedido + '.json', data)

        //Cerramos el modal
        this.setState({ setShow: false });

    }



    render() {

        //console.log(this.state.cantidadbolsos);
        let productos = this.state.productos.map(producto => {
            return <Productos
                key={producto.idb}
                Nombre={producto.Nombre}
                Precio={producto.Precio}
                Imagen={producto.Imagen}
                Descripcion={producto.Descripcion}
                Cantidad={this.state.cantidadbolsos[producto.idb - 1]}
                sumar={() => this.sumarSelectedHandler(producto.idb, producto.Precio, producto.Nombre)}
                restar={() => this.restarSelectedHandler(producto.idb, producto.Precio)}
            />;
        });
        
        if(this.state.productos[0] !== undefined && this.state.t===false){
            let tit=this.state.titulos;
            tit[0]=this.state.productos[0].Nombre;
            tit[1]=this.state.productos[1].Nombre;
            tit[2]=this.state.productos[2].Nombre;
            this.setState({titulos : tit});
            this.setState({t : true});
        }
     

        return (
            <Container>
                <div>
                    <section className="Comentarios">
                        <Row className="justify-content-md-center">
                            {productos}
                        </Row>
                    </section>

                    <br />

                </div>

                <Row className="justify-content-md-center">
                    <Jumbotron className="w-50 p-3">
                        <Row className="justify-content-md-center">
                            <Col md={2}>
                                <Image width="100" height="100" fluid rounded alt="Responsive image" src="https://firebasestorage.googleapis.com/v0/b/bolsosreact.appspot.com/o/supermarket.png?alt=media&token=4a47b144-cd7c-4815-b1d8-71e7ba0b0fdf" />
                            </Col>
                            <Col className="align-baseline" md={1}>
                                <h1>x</h1>
                            </Col>
                            <Col className="align-baseline" md={2}>
                                <Image width="60" height="60" fluid rounded alt="Responsive image" src="https://firebasestorage.googleapis.com/v0/b/bolsosreact.appspot.com/o/euro.png?alt=media&token=326664f9-1d86-41a4-a863-456fafa75015" />
                            </Col>
                            <Col className="align-baseline" md={1}>
                                <h1>=</h1>
                            </Col>
                            <Col className="align-baseline" md={2}>
                               
                                    <h1>{this.state.totalcarrito}€</h1>
                              
                            </Col>
                        </Row >
                        <br />

                        <Row className="justify-content-md-center">

                            <Button variant="outline-dark" onClick={this.handleShow}>Realizar pedido</Button>
                            <Modal show={this.state.setShow} onHide={this.handleClose} animation={true}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Resumen de la compra</Modal.Title>
                                </Modal.Header>
                                <Modal.Body >
                                    <Container >
                                   
                                        <Row className="justify-content-md-center">
                                            <p className="font-italic"> Bolso {this.state.titulos[0]} x {this.state.cantidadbolsos[0]}</p>
                                        </Row>
                                        <Row className="justify-content-md-center">
                                            <p className="font-italic"> Bolso {this.state.titulos[1]} x {this.state.cantidadbolsos[1]}</p>
                                        </Row>
                                        <Row className="justify-content-md-center">
                                            <p className="font-italic"> Neceser {this.state.titulos[2]} x {this.state.cantidadbolsos[2]}</p>
                                        </Row>
                                        <Row className="justify-content-md-center">
                                            <p className="font-weight-bold">Total del pedido: {this.state.totalcarrito} €</p>
                                        </Row>
                                    </Container>

                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="outline-danger" onClick={this.handleClose}>
                                        Volver
                                    </Button>
                                    <Button variant="outline-dark" onClick={this.handleSavePedido} >
                                        <NavLink
                                            to="/Formulario/"
                                            exact
                                            activeclassname="my-active"
                                            activestyle={{
                                                color: 'black'
                                            }}>Continuar</NavLink>
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </Row>
                    </Jumbotron>
                </Row>
            </Container>

        );
    }

}

export default Inicio;