import React from "react";
import "../styles/estilo.css";

export default function Tarea(props) {

    async function ponerComplada(event) {
        const casillaDeCompletado = event.target;
        let descripcionDeTarea = null;

        if (casillaDeCompletado.classList.contains("marcadorCompletado")) {
            descripcionDeTarea = casillaDeCompletado.nextSibling;
        } 

        const parametros = {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
        }
        const idDeTarea = descripcionDeTarea.getAttribute('id');
        const a = await fetch("http://localhost:4000/notas/marcarrealizada/" + idDeTarea, parametros);
    }

    async function eliminaCompletados(event) {
        const descripcionDeTarea = event.target.previousSibling;
        const idDeTarea = descripcionDeTarea.getAttribute('id');
        const parametros = {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
        }
        const a = await fetch("http://localhost:4000/notas/" + idDeTarea, parametros);
        props.borraTarea(idDeTarea);
    }

    return (
        <div className="tareas">
            <i 
            className="marcadorCompletado" 
            onClick={ponerComplada}>O<i className="marcaCompletado"> </i>

            </i>

            <span className="tareaIndividual" id={props.id}> 
            {props.name}</span>
            <i onClick={eliminaCompletados}>X</i>             
        </div>
    )
}
//asuarez@alaver.com.do
