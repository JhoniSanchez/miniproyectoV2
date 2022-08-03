import React from 'react'
import "../styles/estilo.css";


function Buttons(props) {

    function fetchallnotes() {
        props.searchSavedTasks();        
    }
    function fetchActiveNotes() {
        props.searchPendingTasks();        
    }
    function bringCompletedNotes() {
        props.searchCompletedTasks();
    }
    function deleteCompletedNotes() {
        props.deleteCompletedTasks();
    }
    
    return (
        
    <div id="ButtonsBottomFilters">                
        <div className="TaskCount"> item(s) </div>                
        <div id='buttongroupbottomA' >
            <div className="filterButton" onClick={() => fetchallnotes()} >All</div>
            <div className="filterButton" onClick={() => fetchActiveNotes()} >Active</div>
            <div className="filterButton" onClick={() => bringCompletedNotes()} >Completed</div>
        </div>
        <div className="deletecompleted" onClick={() => deleteCompletedNotes()}>Clear Completed</div>
    </div>     

    )
}
export default Buttons
