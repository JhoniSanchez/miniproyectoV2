import React from 'react'
import "../styles/estilo.css";

function Botones() {

    return (
        <div id="botonesInferiorFiltros">
            <div className="conteoDeTareas"> item(s) left</div>
            <div>
                <div className="botonFiltro">All</div>
                <div className="botonFiltro">Active</div>
                <div className="botonFiltro">Completed</div>
            </div>
            <div className="conteoDeTareas">Clear Completed</div>
        </div>

    )
}
export default Botones