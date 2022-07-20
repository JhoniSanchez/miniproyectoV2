import React from 'react'
import "../styles/estilo.css";


function Botones(props) {

    function traerTodasLasNotas() {
        props.buscaTareasGuardadas();        
    }
    function traerNotasActivas() {
        props.buscaTareasPendientes();        
    }
    function traerNotasCompletadas() {
        props.buscaTareasCompletadas();
    }
    function borrarNotascompletadas() {
        props.eliminarTareasCompletadas();
    }
    
    return (
        
    <div id="botonesInferiorFiltros">                
        <div className="conteoDeTareas"> item(s) </div>                
        <div id='grupodebotoninferiorA' >
            <div className="botonFiltro" onClick={() => traerTodasLasNotas()} >All</div>
            <div className="botonFiltro" onClick={() => traerNotasActivas()} >Active</div>
            <div className="botonFiltro" onClick={() => traerNotasCompletadas()} >Completed</div>
        </div>
        <div className="borracompletadas" onClick={() => borrarNotascompletadas()}>Clear Completed</div>
    </div>     

    )
}
export default Botones
