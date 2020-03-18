import React from 'react';




import { Container, Button, Alert, Row, Col } from 'react-bootstrap';
import './FinCompra.css';

import { NavLink } from 'react-router-dom';


class FinCompra extends React.Component {

    render() {
        return (

            <Container>
                <Row className="justify-content-md-center">
                    <Col xs lg="8">
                        <Alert variant="success">
                            <p class="text-center">Muchas Gracias por comprar en Banan-Banan, tu pedido se está procesando y te será notificad@
                                en el correo o telefono facilitado lo antes posible la disponibilida del mismo.</p>
                        </Alert>
                    </Col>
                </Row>

                <Row className="justify-content-md-center">
                    <Button variant="outline-dark" type="submit" >
                        <NavLink
                            to="/Inicio/"
                            exact
                            activeClassName="my-active"
                            activeStyle={{
                                color: 'red'
                            }}>Realizar un nuevo pedido</NavLink>
                    </Button>


                </Row>
            </Container>
        );
    }
}

export default FinCompra;