import express from "express";
import enviroments from "./src/api/config/enviroments.js";
import connection from "./src/api/database/db.js";

import cors from "cors";   //middleware

//se importa desde middleware.js
import { loggerUrl, validateId } from "./src/api/middlewares/middlewares.js";
import { productRoutes } from "./src/api/routes/index.js";

const app = express();
const PORT = enviroments.port; 

app.use(cors()); //midleware

app.use(express.json()); //otro middlware

app.use(loggerUrl);


app.use("/api/products", productRoutes);


app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});