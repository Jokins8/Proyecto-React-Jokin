import React from 'react';
import axios from 'axios';

import PedidoFull from '../PedidoFull/PedidoFull';
import Pedido from '../Pedido/Pedido';

import { Container } from 'react-bootstrap';
import './Pedidos.css';




class Pedidos extends React.Component {

    state = {
        selectedPostId: null,
        pedidos: [],
        error: false

    }


    componentDidMount() {
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
                console.log(pedidos);
                this.setState({ pedidos: pedidos });
            })

    }

    postSelectedHandler = (id) => {
        this.setState({ selectedPostId: id });
    }

    render() {
        let pedidos = <p style={{ textAlign: 'center' }}>Something went wrong!</p>;
        if (!this.state.error) {
            pedidos = this.state.pedidos.map(pedido => {
                return <Pedido
                    key={pedido.idb}
                    Nombre={pedido.Nombre}
                    Apellidos={pedido.Apellidos}
                    Desembolso={pedido.Desembolso}

                    clicked={() => this.postSelectedHandler(pedido.idb)}

                />;
            });
        }

        return (

            <Container>
                <h1>Pedidos Realizados:</h1>
                <br/>
                <section className="Pedidos">
                    {pedidos}
                </section>
                <section>
                    <PedidoFull id={this.state.selectedPostId} />
                </section>


            </Container>
        );
    }
}

export default Pedidos;