import React from 'react';

import './Productos.css';
import { Button, Row, Col, Card } from 'react-bootstrap';

class Productos extends React.Component {


    render() {
        return (


            <article className="Productos" >
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={this.props.Imagen} />
                    <Card.Body>
                        <Row>
                            <Col>
                                <Card.Title>{this.props.Nombre}</Card.Title>
                            </Col>
                            <Col md={{ span: 3, offset: 4 }}>
                                <p className="font-italic">{this.props.Precio}€</p>
                            </Col>
                        </Row>
                        <Card.Text className="text-justify">
                            {this.props.Descripcion}
                        </Card.Text>
                        <Row className="justify-content-md-center">
                            <Button className="boton" type="button" variant="outline-dark" onClick={this.props.restar} >-</Button>
                            <span className="align-baseline" >
                                {this.props.Cantidad} Unidades
                            </span>
                            <Button className="boton" type="button" variant="outline-dark" onClick={this.props.sumar} >+</Button>

                        </Row>
                    </Card.Body>
                </Card>
            </article>

        );
    }

}

export default Productos;