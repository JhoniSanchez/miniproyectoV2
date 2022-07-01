import React from "react";
import "../styles/estilo.css";

export default function Tarea() {
    return (
        <>

            <div className="tareas">
                <i className="marcadorCompletado" placeholder="casa">O<i className="marcaCompletado"></i>
                </i>
                <span className="tareaIndividual" > Este  es mi ejemplo de mi primera tarea pendiente</span>
                <i className="borrar">X</i>
            </div>

            <div className="tareas">
                <i className="marcadorCompletado" placeholder="casa">O<i className="marcaCompletado"></i>
                </i>
                <span className="tareaIndividual"> Este  es mi ejemplo de mi segunda tarea pendiente</span>
                <i className="borrar">X</i>
            </div>


        </>

    )
}
