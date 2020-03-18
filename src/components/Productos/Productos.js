import React from 'react';

import './Productos.css';
import { Button, Row, Col, Card } from 'react-bootstrap';

class Productos extends React.Component {

    props = {
        Nombre: '',
        Descripcion: '',
        Precio: '',
        Imagen: '',
        Cantidad: '0'

    }


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
                                <p class="font-italic">{this.props.Precio}€</p>
                            </Col>
                        </Row>
                        <Card.Text>
                            <p class="text-justify">{this.props.Descripcion}</p>
                        </Card.Text>
                        <Row className="justify-content-md-center">
                            <Button className="boton" type="button" variant="outline-dark" onClick={this.props.restar} >-</Button>
                            <span className="align-baseline" >
                                <p  >{this.props.Cantidad} Unidades</p>
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