import bcrypt from "bcrypt";
import userModels from "../models/user.models.js";

export const insertUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Datos inválidos, ingrese datos correctos"
            });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        //const [rows] = await userModels.insertUser(name, email, password);
        const [rows] = await userModels.insertUser(name, email, hashedPassword);



        res.status(201).json({
            message: "Usuario creado con éxito",
            userId: rows.insertId
        });

    } catch (error) {
        console.error("Error del servidor:", error);

        res.status(500).json({
            message: "Error del servidor",
            error: error.message
        });
    }
}