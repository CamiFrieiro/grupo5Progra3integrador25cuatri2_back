import express from "express";
import enviroments from "./src/api/config/enviroments.js";
import connection from "./src/api/database/db.js";

import cors from "cors";   //middleware

//se importa desde middleware.js
import { loggerUrl, validateId } from "./src/api/middlewares/middlewares.js";
import { productRoutes, userRoutes, viewRoutes } from "./src/api/routes/index.js";

import { join, __dirname } from "./src/api/utils/index.js";

import session from "express-session";
import bcrypt from "bcrypt";

const app = express();
const PORT = enviroments.port; 
const session_key = enviroments.session_key;

app.use(cors()); //midlewares

app.use(express.json()); 

app.use(express.urlencoded({extended: true}));

app.use(loggerUrl);

app.use(express.static(join(__dirname, "src/public"))); //para servir archivos estaticos 


app.set("view engine", "ejs");  //EJS, motor de plantillas
app.set("views", join(__dirname, "src/views")); //vistas desde la carpeta views


app.use(session({
    secret: session_key,
    resave: false,
    saveUninitialized: true
}))

app.use("/api/products", productRoutes);

app.use("/", viewRoutes);

app.use("/api/users", userRoutes);

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if(!email || !password){
            return res.render("login", {
                title: "login",
                error: "Todos los campos son necesarios"
            });
        }

        //const sql = `SELECT * FROM users where email = ? AND password = ?`;
        //const [rows] = await connection.query(sql, [email, password]);

        const sql = `SELECT * FROM users where email = ?`;
        const [rows] = await connection.query(sql, [email]);

        if(rows.length === 0){
            return res.render("login", {
                title: "login",
                error: "Email o Password no valido"
            });
        }

        console.log(rows);
        const user = rows [0];
        console.table(user);

        //const match = await bcrypt.compare(password, user.password);
        const match = (password === user.password);
        console.log(match);

        if(match){
            req.session.user = {
            id: user.id,
            name: user.name,
            email: user.email
        } //guarda la sesion
            res.redirect("/");
        } else {
            return res.render("login", {
                title: "Login",
                error: "Contraseña Incorrecta"
            });
        }



    } catch (error){
        console.log("Error en el login: ", error);

        res.status(500).json({
            error: "Error del servidor"
        })
    }
} )


app.post("/logout", (req, res) =>{
    req.session.destroy((err)=>{
        if(err){
            console.log("Error al destruir sesion: ", err);

            return res.status(500).json({
                error: "Error al cerrar sesion"
            });
        }
        res.redirect("/login")
    })
})


app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});