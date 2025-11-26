import express from "express";
import enviroments from "./src/api/config/enviroments.js";
import connection from "./src/api/database/db.js";

import cors from "cors";   //middleware

//se importa desde middleware.js
import { loggerUrl, validateId } from "./src/api/middlewares/middlewares.js";
import { productRoutes, viewRoutes } from "./src/api/routes/index.js";

import { join, __dirname } from "./src/api/utils/index.js";

const app = express();
const PORT = enviroments.port; 

app.use(cors()); //midlewares

app.use(express.json()); 

app.use(loggerUrl);

app.use(express.static(join(__dirname, "src/public"))); //para servir archivos estaticos 


app.set("view engine", "ejs");  //EJS, motor de plantillas
app.set("views", join(__dirname, "src/views")); //vistas desde la carpeta views

app.use("/api/products", productRoutes);

app.use("/", viewRoutes);


app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});