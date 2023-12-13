import React, { useState } from "react";
import "../styles/estilo.css";
import Confirm from "./Confirm";

export default function Task(props) {
  const [openDialog, setOpenDialog] = useState(false);
  const [id, setId] = useState(null);
  const menssage = 'Are you sure you want to delete this tasks?'

  const handleDeleteClick = (event) => {
    const taskId = event.target.previousSibling.getAttribute('id');
    setId(taskId)
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleDeleteConfirmed = () => {
    props.remove(id);
    setOpenDialog(false);
  };

  return (
    <div className="task">

      <div
        className="bookmarkCompleted"
        onClick={props.putCompleted}
        style={!props.completed ? { color: "blue" } : {}}
      >
      <div className="0">■</div>
      </div>

      <i className="individualTask" id={props.id}> {props.name}</i>
      <i className="deleteTodo" onClick={handleDeleteClick}>X</i>
      <i className="editToDo" onClick={props.editTask}>Edit</i>

      <Confirm
        open={openDialog}
        onClose={handleDialogClose}
        onConfirm={handleDeleteConfirmed}
        menssage={menssage}
      />

    </div>
  );
}