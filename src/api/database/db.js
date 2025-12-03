import mysql from "mysql2/promise" //promises para poder usar async await

import enviroments from "../config/enviroments.js"

const { database } = enviroments //extrae solo database

const connection = mysql.createPool({  //se crea un pool de conexiones
    host : database.host,   //multiple conexiones
    database : database.name,
    user : database.user,
    password : database.password //datos del .enx
})

export default connection; //se exporta el pool para poder usarlo en la aplicacion 

