const loggerUrl = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.url}`);
    next();
}

const validateId = (req, res, next)=>{
    const { id } = req.params;

    if (!id || isNaN(Number(id))){
        return res.status(400).json({
            message: "El ID debe ser valido"
        })
    };
    req.id = parseInt(id, 10);
    console.log("ID validado: ", req.id);
    next();
}

export {
    loggerUrl,
    validateId
}