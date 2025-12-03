const loggerUrl = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.url}`);
    next();  //imprime en consola la peticion que llega al servidor
}

const validateId = (req, res, next)=>{
    const { id } = req.params; //verifica que el id sea valido

    if (!id || isNaN(Number(id))){
        return res.status(400).json({ //si no es valido recibe un error 400
            message: "El ID debe ser valido"
        })
    };
    req.id = parseInt(id, 10); //si el id es valido puede continuar
    console.log("ID validado: ", req.id);
    next();
}

const requireLogin = (req, res, next)=>{ //para verrificar si el usuario esta loggeado
    if(!req.session.user){ 
        return res.redirect("/login"); // en caso de que no, se lo redirige al login
    }
    next(); //puede continuar si se logeo
}

export { 
    loggerUrl,
    validateId,
    requireLogin
}