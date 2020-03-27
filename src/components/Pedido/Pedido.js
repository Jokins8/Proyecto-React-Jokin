import React from 'react';

import './Pedido.css';
import { NavLink } from 'react-router-dom';
import { Col, Row, Modal, Button, Container } from 'react-bootstrap';


const Pedido = (props) => (

    <article className="Pedido" onClick={props.clicked}>
        <h3>{props.Nombre} {props.Apellidos}</h3>


        <Row className="justify-content-md-center">
            <Col md="10">
                <div className="Price">{props.Desembolso}€</div>
            </Col>
            <Col md="2">
                <Button variant="btn btn-outline-danger" onClick={props.modalopen} >X</Button>
                <Modal show={props.setShow} onHide={props.modalclose} animation={true}>
                    <Modal.Header closeButton>
                        <Modal.Title>Aviso!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body >
                        <Container >
                            <Row className="justify-content-md-center">
                                <p className="font-weight-bold">Estas segur@ de querer eliminar el pedido? Esta acción no tiene vuelta atras!</p>
                            </Row>
                        </Container>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="outline-danger" onClick={props.modalclose}>
                            Volver
                        </Button>
                        <Button variant="outline-dark" onClick={props.eliminar} >
                            <NavLink
                                to="/Pedidos/"
                                exact
                                activeclassname="my-active"
                                activestyle={{
                                    color: 'black'
                                }}>Eliminar</NavLink>
                        </Button>
                    </Modal.Footer>
                </Modal>

            </Col>
        </Row>


    </article>




);
export default Pedido;