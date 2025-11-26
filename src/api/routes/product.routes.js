import { Router } from "express";
const router = Router(); 

import { validateId } from "../middlewares/middlewares.js";
import { createProduct, getAllProducts, getProductById, modifyProduct, removeProduct } from "../controllers/product.controllers.js";

router.get("/", getAllProducts);

//get product by id
//GET = CONSUMIR RECURSOS
router.get("/:id", validateId, getProductById)

//POST = CREAR RECURSOS
router.post("/", createProduct);



//DELETE = ELIMINAR RECURSOS
router.delete("/:id", validateId, removeProduct);



//PUT = ACTUALIZAR 
router.put("/", modifyProduct);


export default router;