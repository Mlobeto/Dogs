const { Router } = require('express');
require('dotenv').config();

// Importar todos los routers;
const dogs = require('../routes/routesDog');
const temperaments = require('../routes/routesTemperament');
const breeds = require('../routes/routesBreeds');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/', dogs);
router.use('/', temperaments);
router.use('/', breeds);

module.exports = router;