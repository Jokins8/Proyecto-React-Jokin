import React from 'react';

import Inicio from '../../components/Inicio/Inicio';
import Pedidos from '../../components/Pedidos/Pedidos';
import Formulario from '../../components/Formulario/Formulario';
import FinCompra from '../../components/FinCompra/FinCompra';



import { Navbar, Container } from 'react-bootstrap';
import './Tienda.css';

import { Route, Link, Switch, Redirect } from 'react-router-dom';

class Tienda extends React.Component {

    render() {
        return (

            <Container>

                <Navbar bg="light">
                    <Navbar.Brand href="/">
                        <img
                            src="https://firebasestorage.googleapis.com/v0/b/bolsosreact.appspot.com/o/logo.png?alt=media&token=6e1a187b-5139-413f-b869-b3447fbc09d5"
                            width="150"
                            height="40"
                            className="d-inline-block align-top"
                            alt="Bananbanan logo"
                        />
                    </Navbar.Brand>
                    <Navbar.Collapse className="justify-content-end" id="responsive-navbar-nav">

                        <Link
                            to="/Pedidos/"
                         
                            activeclassname="my-active"
                            activestyle={{
                                color: 'black',
                                textDecoration: 'underline'
                            }}>Pedidos</Link>



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


            </Container>
        );
    }
}

export default Tienda;