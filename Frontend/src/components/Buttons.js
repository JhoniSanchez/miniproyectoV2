import React from 'react'
import "../styles/estilo.css";

function Buttons(props) {

    return (
        
    <div id="ButtonsBottomFilters">                
        <div className="TaskCount"> item(s) </div>                
        <div id='buttongroupbottomA' >
            <div className="filterButton" onClick={props.searchSavedTasks} >All</div>
            <div className="filterButton" onClick={props.searchPendingTasks} >Active</div>
            <div className="filterButton" onClick={props.searchCompletedTasks} >Completed</div>
        </div>
        <div className="deletecompleted" onClick={props.deleteCompletedTasks}>Clear Completed</div>
    </div>     

    )
}
export default Buttons
