import React from "react";
import "../styles/estilo.css";
import { useAuth0 } from "@auth0/auth0-react";
import ThingsToDo from "./thingsToDo";


export default function MainForm(props) {


    const { user } = useAuth0();
    const { logout } = useAuth0();
    // console.log(logout);

      
    return (
        <>
        
      
        <div id="MainForm">

            <div>
                <div id="titleForm"><div>Lista de Tareas</div></div>
             
                <div className="userandSession">
                    <div className="Username">Hola, {user.name}</div>
                    <div className="closeSession" onClick={() => logout()}>Sign off</div>

                </div>
              
                <form onSubmit={event => props.saveTask(event)}>
                    <div id="buttonForm">
                        <input type="text" placeholder="Create or edit the task..." name="newTaskToPerform" id="newTaskToPerform" value={props.edit}  onChange={(e)=>props.setEdit(e.target.value)} />
                        <button type="submit">Save</button>
                    </div>
                </form>
            </div>

        </div>

<ThingsToDo
                    editTask={event => props.editTask(event)}
                    allTasks={props.allTasks}
                    deleteTaskById={id => props.deleteTaskById(id)}            
                    searchPendingTasks={() => props.searchPendingTasks()}            
                    searchSavedTasks={() =>props.searchSavedTasks ()}            
                    searchCompletedTasks={() => props.searchCompletedTasks()}            
                    deleteCompletedTasks={() =>props.deleteCompletedTasks ()}  
/>


      </>
      )
}