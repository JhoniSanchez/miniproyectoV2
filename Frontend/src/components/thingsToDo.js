import React from 'react'
import "../styles/estilo.css";
import Buttons from './Buttons';
import Task from './Task';

function thingsToDo(props) {

    return (
        <div id="tasks">
            <div id="listOfAllTasks">
                {
                    props.allTasks.map(task =>
                        <Task
                            key={task.id}
                            name={task.name}
                            id={task.id}
                            email={task.email}
                            deleteTaskById={id => props.deleteTaskById(id)} 
                            completed={task.pendiente} 
                            editTask = {props.editTask}
                            searchFoPendingTasks ={props.searchPendingTasks}
                           />
                    )
                }
            </div>

            <Buttons
            deleteTaskById={id => props.deleteById(id)}
            searchPendingTasks={() => props.searchPendingTasks()}
            searchSavedTasks={() => props.searchSavedTasks()}
            searchCompletedTasks={() => props.searchCompletedTasks()}
            deleteCompletedTasks={() => props.deleteCompletedTasks()}
            />

        </div>
    )
}
export default thingsToDo