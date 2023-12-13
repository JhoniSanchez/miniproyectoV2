import React from "react";
import {  Dialog,  DialogActions,  DialogContent,  Button} from "@mui/material";
import "../styles/estilo.css";

function Confirm(props) {
        return (
        <Dialog  className="sss" open={props.open} onClose={props.onClose}>
        <DialogContent className="ss">
        {props.menssage}
        </DialogContent>
        <DialogActions className="ss">
          <Button onClick={props.onClose} color="primary">
            Cancel
          </Button>
          <Button onClick={props.onConfirm} className="ss1" >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    )
}
export default Confirm

