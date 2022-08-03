import { Router } from "express";
import {nuevaNota} from "../controllers/controladorDeNotas.js";
import {obtenerTodasLasNotasPendiente} from "../controllers/controladorDeNotas.js";
import {obtenerTodasLasNotasRealizadas} from "../controllers/controladorDeNotas.js";
import {obtenerTodasLasNotas} from "../controllers/controladorDeNotas.js";
import {actualizarNota} from "../controllers/controladorDeNotas.js";
import {marcaNotaRealizada} from "../controllers/controladorDeNotas.js";
import {eliminarNota} from "../controllers/controladorDeNotas.js";
import {eliminarTodasLasNotasRealizadas} from "../controllers/controladorDeNotas.js";

const rutas = Router();


rutas.post("/",                       nuevaNota);
rutas.get("/pendientes",              obtenerTodasLasNotasPendiente);
rutas.get("/realizadas",              obtenerTodasLasNotasRealizadas);
rutas.get("/",                        obtenerTodasLasNotas);
rutas.put("/:Id",                     actualizarNota);
rutas.put("/marcarrealizada/:Id",     marcaNotaRealizada);
rutas.delete("/:Id",                  eliminarNota);
rutas.delete("/eliminar/realizadas",  eliminarTodasLasNotasRealizadas);


export default rutas;