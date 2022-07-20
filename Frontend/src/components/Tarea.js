import React from "react";
import "../styles/estilo.css";

export default function Tarea(props) {

    const id = function IdModificaNota(idmodificar){
        let idparamodificar = "";
        idparamodificar = idmodificar;
        console.log(idparamodificar)

    }

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

        console.log(event);
        console.log(event.target);
        console.log(event.target.previousSibling);

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

    async function editar(e) {
        e.preventDefault();
        const descripcionDeTarea = e.target.previousSibling.previousSibling;
        const idDeTarea = descripcionDeTarea.getAttribute('id');
        console.log(idDeTarea); 
        const nuevaTarea = document.querySelector("#nuevaTareaARealizar").value;
        const parametros = {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ descripcion: nuevaTarea})
        }
        const respuestaServidor = await fetch("http://localhost:4000/notas/"+ idDeTarea, parametros);
        const datos = await respuestaServidor.json();

    }

    return (
        <div className="tarea">
          
            <i 
            className="marcadorCompletado" 
            onClick={ponerComplada}>o
            </i>

            <i className="tareaIndividual" id={props.id}> 
            {props.name}</i>
            <i className="deleteTodo" onClick={eliminaCompletados}>X</i>
            <i className="deleteTodo2" onClick={(e)=>editar(e)}>Editar</i>   
            
                       
        </div>
    )
}


//asuarez@alaver.com.do
