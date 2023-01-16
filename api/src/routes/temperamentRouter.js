require('dotenv').config();
const {Router} = require ("express");
const temperamentRouter = Router();

temperamentRouter.get("/", (req,res)=> {
    res.send("Esta Ruta es para buscar por temperamente")
});


module.exports = temperamentRouter;