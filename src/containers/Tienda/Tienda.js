import React from 'react';

import Inicio from '../../components/Inicio/Inicio';
import Pedidos from '../../components/Pedidos/Pedidos';
import Formulario from '../../components/Formulario/Formulario';
import FinCompra from '../../components/FinCompra/FinCompra';



import './Tienda.css';

import { Route, Switch, Redirect, NavLink } from 'react-router-dom';
import { Navbar, Image, Col, Row } from 'react-bootstrap';


class Tienda extends React.Component {

    render() {
        return (

            <Container-fluid>

                <Navbar bg="light">
                    <Navbar.Collapse className="justify-content-start" id="responsive-navbar-nav">
                        <NavLink
                            to="/"
                            exact
                            activeclassname="my-active"
                            activestyle={{
                                color: 'black'
                            }}>Comprar</NavLink>
                    </Navbar.Collapse>
                    <Navbar.Brand href="/" className="navbar-brand">
                        <img
                            src="https://firebasestorage.googleapis.com/v0/b/bolsosreact.appspot.com/o/logo.png?alt=media&token=6e1a187b-5139-413f-b869-b3447fbc09d5"
                            width="150"
                            height="40"
                            className="d-inline-block align-top"
                            alt="Bananbanan logo"
                        />
                    </Navbar.Brand>
                    <Navbar.Collapse className="justify-content-end" id="responsive-navbar-nav">
                        <NavLink
                            to="/Pedidos/"
                            exact
                            activeclassname="my-active"
                            activestyle={{
                                color: 'black'
                            }}>Pedidos</NavLink>
                    </Navbar.Collapse>
                </Navbar>
                <br />

                <Switch>
                    <Route path="/Inicio" component={Inicio} />
                    <Route path="/Pedidos" component={Pedidos} />
                    <Route path="/Formulario" component={Formulario} />
                    <Route path="/FinCompra" component={FinCompra} />

                    <Redirect from="/" to="/Inicio" />
                </Switch>

                <br />
                <br />

                <div>
                    <section className="footer">
                        <br />
                        <br />
                        <Row className="justify-content-md-center">
                            <Col md="3">
                                <a href="https://www.instagram.com/bananbananjosten/" >
                                    <Image width="60" height="60" fluid rounded alt="Responsive image" src="https://firebasestorage.googleapis.com/v0/b/bolsosreact.appspot.com/o/insta.png?alt=media&token=12eac79b-46ef-4df2-a6ac-fb75529591cb" />
                                </a>
                            </Col>
                            <Col md="3">
                                <a href="https://twitter.com/" >
                                    <Image width="50" height="50" fluid rounded alt="Responsive image" src="https://firebasestorage.googleapis.com/v0/b/bolsosreact.appspot.com/o/tw.png?alt=media&token=587753cc-221d-477e-a142-fba6b090dd31" />
                                </a>
                            </Col>
                            <Col md="3">
                                <a href="https://www.snapchat.com/l/es/" >
                                    <Image width="60" height="60" fluid rounded alt="Responsive image" src="https://firebasestorage.googleapis.com/v0/b/bolsosreact.appspot.com/o/snap.png?alt=media&token=ed0a2990-53cc-4d09-806e-745756508d05" />
                                </a>
                            </Col>
                        </Row>
                        <br />
                        <br />
                        <Row className="justify-content-md-center">
                            &copy; {new Date().getFullYear()} <p>Copyright:<a href="/" >  bananbanan.eus </a></p>
                        </Row>
                    </section>
                </div>

            </Container-fluid>
        );
    }
}

export default Tienda;