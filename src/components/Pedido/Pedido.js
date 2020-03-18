import React from 'react';

import './Pedido.css';

const Pedido = (props) => (
            
                <article className="Pedido" onClick={props.clicked}>
                    <h3>{props.Nombre} {props.Apellidos}</h3>
                    
                    <div className="Info">
                       
                        <div className="Price">{props.Desembolso}€</div>
                    </div>
                </article>

            
       
  
);
export default Pedido;