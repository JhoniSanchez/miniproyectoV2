import React from "react";
import "../styles/estilo.css";
export default function Formulario(props) {

    return (
        <header id="formulario">
            <div>
                <div id="tituloFormulario"><div>Lista de Tareas</div></div>

                <form onSubmit={event => props.guardarTarea(event)}>
                    <div id="botonFormulario">
                        <input type="text" placeholder="Crea una nueva lista de tarea..." name="nuevaTareaARealizar" id="nuevaTareaARealizar" />
                        <button type="submit">+</button>
                    </div>
                </form>
            </div>
        </header>
    )
}