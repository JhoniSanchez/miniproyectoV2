import React from "react";
import "../styles/estilo.css";

export default function Tarea() {
    return (
        <>

            <div className="tareas">
                <i className="marcadorCompletado" placeholder="casa">O<i className="marcaCompletado"></i>
                </i>
                <span className="tareaIndividual" > Este  es mi ejemplos de mi primera tarea pendiente</span>
                <i className="borrar">X</i>
            </div>

            <div className="tareas">
                <i className="marcadorCompletado" placeholder="casa">O<i className="marcaCompletado"></i>
                </i>
                <span className="tareaIndividual"> 000000000000000000000111111111111111111111</span>
                <i className="borrar">X</i>
            </div>


        </>

    )
}
