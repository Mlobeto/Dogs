const { Router } = require('express');
// Importar todos los routers;
const dogsRouter = require("./dogsRouter.js")
//const dogsRouter = require ("./dogsRouter.js")
const temperamentRouter = require ("./temperamentRouter.js")
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

router.use("/dogs", dogsRouter)
//router.use("/post", dogsRouter)
router.use("/temperament", temperamentRouter)
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
