import { Router } from "express";
const router = Router(); 

import connection from "../database/db.js";
import { validateId } from "../middlewares/middlewares.js";

router.get("/", async(req, res) => {
    try {
        const sql= "SELECT * FROM products";
        const [rows]= await connection.query(sql);
        
        res.status(200).json({
            payload:rows,
            message:rows.length === 0 ? "No se encontraron productos" : "Productos encontrados"
        });

    } catch (error) {
        console.error("Error al obtener productos:", error);
        res.status(500).json({
            message: "Error interno al obtener productos"
        });
    }
});

//get product by id
//GET = CONSUMIR RECURSOS
router.get("/:id", validateId, async(req, res) =>{

    try{
        let{id}= req.params;

        if (!id || isNaN(Number(id))){
            return res.status(400).json({
                message: "El id deber ser un numero valido"
            });
        }

        let sql= "SELECT * FROM products where id = ?";
        const [rows] = await connection.query(sql, [id]);

        if(rows.length === 0){
            console.log("No existe producto con ese ID");

            return res.status(404).json({
                message: `No se encontro producto con ID: ${id}`
            });
        }


        res.status(200).json({
            payload: rows
        })

    } catch(error){
        console.error("Error obteniendo producto", error.message);
        res.status(500).json({
            message: "Error interno al obtener productos"
        })
    }
})

//POST = CREAR RECURSOS
router.post("/", async(req, res) => {
    try {
        const { name, image, category, price } = req.body;
        console.log(req.body); 

        if(!name || !image || !category || !price){

            return res.status(400).json({
                message: "Datos invalidos, enviar todos los campos del formulario"
            });
        }

        let sql ="INSERT INTO products (name, image, category, price) VALUES (?, ?, ?, ?)";
        let [rows] = await connection.query(sql, [name, image, category, price]);

        res.status(201).json({
            message:"Producto creado con exito",
            productId: rows.insertId
        });
    } catch (error) {
        console.error("Error interno del servidor");
        res.status(500).json({
            message:"Error interno del servidor",
            error: error.message
        });
    }
});



//DELETE = ELIMINAR RECURSOS
router.delete("/:id", validateId, async(req, res) => {
    try {
        let { id } = req.params;
        let sql = "DELETE FROM products WHERE id = ?";

        let [result] = await connection.query(sql, [id]);
        console.log(result);

        if(result.affectedRows === 0){
            return res.status(404).json({
                message: `No se encontro un producto con ID ${id}`
            });
        }

        return res.status(200).json({
            message:`Producto con id ${id} eliminado correctamente`
        });

    } catch (error) {
        console.log(`Error al eliminar un producto con id ${id}:`, error);
        res.status(500).json({
            message:`Error al eliminar un producto con id ${id}`,
            error:error.message
        })
    }
});



//PUT = ACTUALIZAR 
router.put("/", async (req, res) => {
    
    try {
        let { id, name, image, category, price, active } = req.body;
        
        if(!id || !name || !category || !price ||!active){
            return res.status(400).json({
                message: "Faltan campos requeridos"
            });
        }

        let sql = `
            UPDATE products
            SET name = ?, image = ?, price = ?, category = ?
            WHERE id = ?
        `;
        let [result] = await connection.query(sql, [name, image, price, category, id]);
        console.log(result);

        if(result.affectedRows === 0){
            return res.status(400).json({
                message: "No se actualizo el producto"
            });
        }

        res.status(200).json({
            message: "Producto actualizado correctamente"
        });
    } catch (error) {
        console.error("Error al actualizar el producto: ", error);
        res.status(500).json({
            message: "Error interno del servidor",
            error: error.message
        })
    }
});

export default router;