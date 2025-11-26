import { Router } from "express";
import { productsView } from "../controllers/view.controllers.js";

const router = Router(); 

router.get("/", productsView);

router.get("/consultar", (req, res) =>{
    res.render("consultar", {
        title: "Consultar",
        about: "Consultar producto por ID"
    });
} );

router.get("/crear", (req, res) =>{
    res.render("crear", {
        title: "Crear",
        about: "Consultar producto"
    });
} );

router.get("/modificar", (req, res) =>{
    res.render("modificar", {
        title: "Modificar",
        about: "Modificar producto"
    });
} );

router.get("/eliminar", (req, res) =>{
    res.render("eliminar", {
        title: "Eliminar",
        about: "Eliminar producto"
    });
} );

export default router;