import express from "express";
import morgan from "morgan";
import "./database.js"
import routesdenotes from "./src/routes/rutasDeNotas.js";
import cors from "cors";

const app = express();

app.use(cors())
app.use(express.json());
app.use(morgan("dev"));
app.use("/notas", routesdenotes);

app.listen(4000);
console.log("Server running 😎 in Port", 4000);