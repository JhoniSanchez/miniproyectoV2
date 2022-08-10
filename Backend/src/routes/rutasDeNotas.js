import { Router } from "express";
import {newNote} from "../controllers/notecontroller.js";
import {getAllPendingNotes} from "../controllers/notecontroller.js";
import {getAllNotesDone} from "../controllers/notecontroller.js";
import {getAllNotes} from "../controllers/notecontroller.js";
import {updateNote} from "../controllers/notecontroller.js";
import {markNoteDone} from "../controllers/notecontroller.js";
import {removeNote} from "../controllers/notecontroller.js";
import {deleteAllNotesDone} from "../controllers/notecontroller.js";

const rutas = Router();

rutas.post("/", newNote);
rutas.get("/pending", getAllPendingNotes);
rutas.get("/made", getAllNotesDone);
rutas.get("/", getAllNotes);
rutas.put("/:Id", updateNote);
rutas.put("/markdone/:Id", markNoteDone);
rutas.delete("/:Id", removeNote);
rutas.delete("/remove/made", deleteAllNotesDone);


export default rutas;