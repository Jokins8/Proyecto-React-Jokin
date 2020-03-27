import React from 'react';
import axios from 'axios';

import PedidoFull from '../PedidoFull/PedidoFull';
import Pedido from '../Pedido/Pedido';

import { Container} from 'react-bootstrap';
import './Pedidos.css';




class Pedidos extends React.Component {

    state = {
        selectedPostId: null,
        pedidos: [],
        error: false,
        setShow: false
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

    handleClose = () => this.setState({ setShow: false });
    handleShow = () => this.setState({ setShow: true });

    deleteDataHandler = (key) => {

        axios.delete('https://bolsosreact.firebaseio.com/Pedidos/' + key + '.json')
            .then(response => {
               alert("Pedido eliminado, refresque la página para observar los cambios.");    
            });
        //if (key < this.state.pedidos.length) {
        //  console.log("Es menor cuidado");
        // let nextkey=this.state.pedidos.length;
        //console.log(nextkey);
        //console.log(key);

        //  axios.patch('https://bolsosreact.firebaseio.com/Pedidos/' + nextkey + '.json', {idb:key})

        //}
        this.setState({ setShow: false });
    }

    render() {
        //Actualizo el array de pedidos para no mostrar los que son solo idb (por eliminar entre medias)
        for (let i = 0; i < this.state.pedidos.length; i++) {
            if (this.state.pedidos[i].Nombre === undefined) {
                let ped = [];
                ped = this.state.pedidos;
                ped.splice(i, 1);
                this.setState({ pedidos: ped });
            }
        }


        let pedidos = <p style={{ textAlign: 'center' }}>Something went wrong!</p>;
        if (!this.state.error) {
            pedidos = this.state.pedidos.map(pedido => {
                return <Pedido
                    key={pedido.idb}
                    Nombre={pedido.Nombre}
                    Apellidos={pedido.Apellidos}
                    Desembolso={pedido.Desembolso}


                    clicked={() => this.postSelectedHandler(pedido.idb)}
                    modalclose={() => this.handleClose()}
                    modalopen={() => this.handleShow()}
                    eliminar={() => this.deleteDataHandler(pedido.idb)}
                    setShow={this.state.setShow}

                />;
            });
        }

        return (

            <Container>

                <br />
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