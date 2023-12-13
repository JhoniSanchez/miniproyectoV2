import React, { useState } from "react";
import "../styles/estilo.css";
import Confirm from "./Confirm";


function Buttons(props) {


  const [openDialog, setOpenDialog] = useState(false);
  const menssage = 'Are you sure you want to delete all completed tasks?'

  const handleDeleteClick = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleDeleteConfirmed = () => {
    props.deleteCompletedTasks()
    setOpenDialog(false);
  };


  return (

    <div id="ButtonsBottomFilters">
      <div className="TaskCount"> item(s) </div>
      <div id='buttongroupbottomA' >
        <div className="filterButton" onClick={props.searchSavedTasks} >All</div>
        <div className="filterButton" onClick={props.searchPendingTasks} >Active</div>
        <div className="filterButton" onClick={props.searchCompletedTasks} >Completed</div>
      </div>
      <div className="deletecompleted" onClick={handleDeleteClick}>Clear Completed</div>

      <Confirm
        open={openDialog}
        onClose={handleDialogClose}
        onConfirm={handleDeleteConfirmed}
        menssage={menssage}
      />
    </div>

  )
}
export default Buttons

