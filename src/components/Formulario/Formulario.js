import React from 'react';
import axios from 'axios';



import { Form, Container, Button, Col, Row, Jumbotron } from 'react-bootstrap';
import './Formulario.css';
import { NavLink } from 'react-router-dom';


class Formulario extends React.Component {

    state = {
        pedidos: [],
        pedido: [],
        Nombre: '',
        Apellidos: '',
        Email: '',
        Telefono: '',
        Direccion: '',
        Ciudad: '',
        Pais: '',
        CP: ''
    }

    //Cada vez que lllamo la funcion cojo el nombre que le he dau a ese form con mae y el value sera el input y como les he llamau igual a los this.state pues cada vez hace bien
    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({ [nam]: val });
    }

    //He puesto el Update en vez de el Mount xk sino no le daba tiempo a coger el nuevo elemento introducido en Pedidos que tiene las cantidades y desembolso
    //Mount-->ejecuta una sola vez y muy rapidamente
    //Update--> ejecuta al actualizarse el componente
    componentDidUpdate() {
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
                //console.log(pedidos);
                this.setState({ pedidos: pedidos });
                this.setState({ pedido: pedidos[pedidos.length - 1] });
            })
    }


    handleSavePedidoFinal = () => {
        if (this.state.Nombre !== '') {
            console.log(this.state.pedido);
            //Creamos data con todos los datos que meteremos del pedido 
            const data = {

                Cantidad1: this.state.pedido.Cantidad1,
                Cantidad2: this.state.pedido.Cantidad2,
                Cantidad3: this.state.pedido.Cantidad3,
                Desembolso: this.state.pedido.Desembolso,
                Nombre: this.state.Nombre,
                Apellidos: this.state.Apellidos,
                Email: this.state.Email,
                Telefono: this.state.Telefono,
                Direccion: this.state.Direccion,
                Ciudad: this.state.Ciudad,
                Pais: this.state.Pais,
                CP: this.state.CP

            };


            //Introducimos los primeros datos del pedido
            let indicepedido = this.state.pedidos.length;

            axios.put('https://bolsosreact.firebaseio.com/Pedidos/' + indicepedido + '.json', data)
        }


    }



    render() {





        return (

            <Container>
                <Row className="justify-content-md-center">
                    <Jumbotron >
                        <Form>
                            <Form.Row>
                                <Form.Group as={Col} controlId="name">
                                    <Form.Label>Nombre</Form.Label>
                                    <Form.Control type="name" name="Nombre" placeholder="Nombre" onChange={this.myChangeHandler} />
                                </Form.Group>

                                <Form.Group as={Col} controlId="surname">
                                    <Form.Label>Appellidos</Form.Label>
                                    <Form.Control type="surname" name="Apellidos" placeholder="Apellido1   Apellido2" onChange={this.myChangeHandler} />
                                </Form.Group>
                            </Form.Row>

                            <Form.Row>
                                <Form.Group as={Col} controlId="email">
                                    <Form.Label>e-mail</Form.Label>
                                    <Form.Control type="email" name="Email" placeholder="prueba@prueba.com" onChange={this.myChangeHandler} />
                                </Form.Group>

                                <Form.Group as={Col} controlId="telf">
                                    <Form.Label>Teléfono</Form.Label>
                                    <Form.Control type="telf" name="Telefono" placeholder="123456789" onChange={this.myChangeHandler} />
                                </Form.Group>
                            </Form.Row>

                            <Form.Group controlId="address">
                                <Form.Label>Dirección</Form.Label>
                                <Form.Control placeholder="1234 Main St" name="Direccion" onChange={this.myChangeHandler} />
                            </Form.Group>



                            <Form.Row>
                                <Form.Group as={Col} controlId="city">
                                    <Form.Label>Ciudad</Form.Label>
                                    <Form.Control name="Ciudad" onChange={this.myChangeHandler} />
                                </Form.Group>

                                <Form.Group as={Col} controlId="state">
                                    <Form.Label>País</Form.Label>
                                    <Form.Control name="Pais" onChange={this.myChangeHandler} as="select" value="Choose...">
                                        <option>Choose...</option>
                                        <option>Euskal Herria</option>
                                        <option>España</option>
                                        <option>Francia</option>
                                        <option>Portugal</option>


                                    </Form.Control>
                                </Form.Group>

                                <Form.Group as={Col} controlId="cp">
                                    <Form.Label>CP</Form.Label>
                                    <Form.Control name="CP" onChange={this.myChangeHandler} />
                                </Form.Group>
                            </Form.Row>
                            <Row >
                                <Col md={{ span: 4, offset: 8 }}>
                                    <Button variant="outline-dark" type="submit" onClick={this.handleSavePedidoFinal}>
                                        <NavLink
                                            to="/FinCompra/"
                                            exact
                                            activeClassName="my-active"
                                            activeStyle={{
                                                color: 'red'
                                            }}>Realizar Pedido</NavLink>
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </Jumbotron>
                </Row>
            </Container>
        );
    }
}

export default Formulario;