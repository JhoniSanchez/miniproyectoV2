import React from "react";
import "../styles/estilo.css";

export default function Task(props) {

     async function putCompleted(event) {
        const CompletedBox = event.target;
        let taskDescription = null;

        if (CompletedBox.classList.contains("0")) {
            CompletedBox.style = "color: blue";
            taskDescription = CompletedBox.parentElement.nextSibling;
        } 

        const options = {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
        }
        const taskId = taskDescription.getAttribute('id');
        const a = await fetch("http://localhost:4000/notas/marcarrealizada/" + taskId, options);
    }

    async function removeCompleted(event) {
        const taskDescription = event.target.previousSibling;


        const taskId = taskDescription.getAttribute('id');
        const options = {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
        }
        const a = await fetch("http://localhost:4000/notas/" + taskId, options);
        props.deleteTaskById(taskId);
    }

    return (
        <div className="task">

            <i className="bookmarkCompleted"
                onClick={putCompleted}

                style={!props.completed ? { color: "blue" }
                    : {}}
            >
                <div className="0">o</div>

            </i>

            <i className="individualTask" id={props.id}>
                {props.name}</i>
            <i className="deleteTodo" onClick={removeCompleted}>X</i>
            <i className="editToDo" onClick={(e) => props.editTask(e)}>Edit</i>


        </div>
    )
}


