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
                <div id="titleForm">Things to do</div>
             
                <div className="userandSession">
                    <p className="Username">Hola, {user.name}</p>
                    <p className="closeSession" 
                        onClick={() => logout()}>Sign off</p>
                </div>
              
                <form onSubmit={props.saveTask}>
                    <div id="buttonForm">
                        <input  type="text" 
                                placeholder="Create or edit the task..." 
                                name="newTaskToPerform" id="newTaskToPerform" 
                                value={props.edit}  
                                onChange={props.setEdit} />
                        <button type="submit">Save</button>
                    </div>
                </form>
            </div>

        </div>

<ThingsToDo
                //
                allTasks={props.allTasks}
                editTask={props.editTask}
                remove={props.remove}
                putCompleted={props.putCompleted}
                //                                      
                searchPendingTasks={props.searchPendingTasks}
                searchSavedTasks={props.searchSavedTasks}
                searchCompletedTasks={props.searchCompletedTasks}
                deleteCompletedTasks={props.deleteCompletedTasks}  

/>


      </>
      )
}