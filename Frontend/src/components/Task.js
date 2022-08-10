import React from "react";
import "../styles/estilo.css";

export default function Task(props) {

    return (
        <div className="task">

            <i className="bookmarkCompleted"
                onClick={props.putCompleted}

                style={!props.completed ? { color: "blue" }
                    : {}}
            >
                <div className="0">o</div>

            </i>

            <i className="individualTask" id={props.id}>
                {props.name}</i>
            <i className="deleteTodo" onClick={props.remove}>X</i>
            <i className="editToDo" onClick={(e) => props.editTask(e)}>Edit</i>


        </div>
    )
}


