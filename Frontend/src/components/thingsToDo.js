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
                        //
                            key={task.id}
                        //    
                            name={task.name}
                            id={task.id}
                            email={task.email}
                            completed={task.pending}
                        //
                            editTask = {props.editTask}
                            remove = {props.remove}
                            putCompleted = {props.putCompleted}
                        />
                    )
                }
            </div>

            <Buttons
            searchPendingTasks={props.searchPendingTasks}
            searchSavedTasks={props.searchSavedTasks}
            searchCompletedTasks={props.searchCompletedTasks}
            deleteCompletedTasks={props.deleteCompletedTasks}
            />

        </div>
    )
}
export default thingsToDo