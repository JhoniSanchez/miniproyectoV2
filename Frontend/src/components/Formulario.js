import React from "react";
import "../styles/estilo.css";
import { useAuth0 } from "@auth0/auth0-react";

export default function Formulario(props) {


    const { user } = useAuth0();
    const { logout } = useAuth0();
    console.log(logout);


    return (
            
           <header id="formulario">

            <div>
                <div id="tituloFormulario"><div>Lista de Tareas</div></div>
        
                <div className="usuarioySession">
                    <div className="usuario">Hola, {user.name}</div>
                    <div className="cerrrarSession" onClick={() => logout()}>Cerrar Sessión</div>

                </div>

                <form onSubmit={event => props.guardarTarea(event)}>
                    <div id="botonFormulario">
                        <input type="text" placeholder="Crea o edite la tarea..." name="nuevaTareaARealizar" id="nuevaTareaARealizar" />
                        <button type="submit">Guardar</button>
                    </div>
                </form>
            </div>

        </header>
        
   
    )
}