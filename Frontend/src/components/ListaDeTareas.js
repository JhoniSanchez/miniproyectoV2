import React from 'react'
import "../styles/estilo.css";
import Botones from './Botones';
import Tarea from './Tarea';

function ListaDeTareas() {
    return (
        <div id="tareas">
            <div id="listaDeTodasTareas">          
            <Tarea/>      
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
                 
            <Botones/>
            </div>
        </div>
    )
}
export default ListaDeTareas