import React from "react";
import "../styles/estilo.css";

export default function Task(props) {

    return (
        <div className="task">

            <div className="bookmarkCompleted"
                onClick={props.putCompleted}
                style={!props.completed ? { color: "blue" }
                    : {}}>
                <div className="0">■</div>

            </div>

            <i className="individualTask" id={props.id}>
              {props.name}</i>
            <i className="deleteTodo" onClick={props.remove}>X</i>
            <i className="editToDo" onClick={props.editTask}>Edit</i>


        </div>
    )
}


