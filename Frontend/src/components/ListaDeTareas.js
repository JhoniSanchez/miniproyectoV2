import React from 'react'
import "../styles/estilo.css";
import Botones from './Botones';
import Tarea from './Tarea';


function ListaDeTareas(props) {

    return (
        <div id="tareas">
            <div id="listaDeTodasTareas">

                {
                    props.todasTareas.map(tarea =>
                        <Tarea
                            name={tarea.name}
                            id={tarea.id}
                            email={tarea.email}
                            borraTarea={id => props.borraTarea(id)} completed={tarea.pendiente} 
                        />
                    )
                }
            </div>

            <Botones
            borraTarea={id => props.borrarPorId(id)}

            tareasPendientes={(subLink, method) => props.tareasPendientes(subLink, method)}

            buscaTareasPendientes={() => props.buscaTareasPendientes()}

            buscaTareasGuardadas={() => props.buscaTareasGuardadas()}

            buscaTareasCompletadas={() => props.buscaTareasCompletadas()}

            eliminarTareasCompletadas={() => props.eliminarTareasCompletadas()} 
/>

        </div>
    )
}
export default ListaDeTareas