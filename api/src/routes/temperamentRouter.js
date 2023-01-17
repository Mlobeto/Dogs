require('dotenv').config();
const {Router} = require ("express");
const axios = require("axios")
const temperamentRouter = Router();
const routerTemp = Router();
const { Temperament } = require("../db");

temperamentRouter.get  ("/", async (req,res, next)=> {
    res.send("Esta Ruta es para buscar por temperament0")
    try {
        
        const resultado =  axios.get(`https://api.thedogapi.com/v1/breeds`); //llama a todos los peerros de la API
    
       
        const listaTemperamentos = resultado.data.map((dog) => {//limpio y guardo los temperaments
          // Si no viene un temperamento agrego undefined
          if (!dog.temperament) return (dog.temperament = undefined);
          // A todos los demas los spliteo por ", " para añadirlos a un array en  aux
          const aux = dog.temperament.split(", ");
          return aux;
        });
    
        const limpiarUndefined = listaTemperamentos.flat().filter(Boolean); // limpio todo lo que sea null, undefine sin importar el nivel en el que este en el array
        const valoresUnicos = new Set(limpiarUndefined); // Quito todas las repeticiones y solo dejo un valor unico
        const resultadoFinal = [...valoresUnicos]; //  guardo en resultadoFinal
    
        // Encuentro o creo en el modelo de Temperamento, cada temperamento donde el nombre sea igual al dog 
        resultadoFinal.forEach((dog) =>
          Temperament.findOrCreate({
            where: {
              name: dog,
            },
          })
        );
    
        const resultado2 = await Temperament.findAll(); // Me traigo todos  de la base de datos
        res.send(resultado2);
      } catch (error) {
        next(error);
      }
    });

    routerTemp.post("/", async (req, res, next) => {
        const { name } = req.body;
        //console.log("1,: ", res);
        const newTemperament = Temperament.create({
          name,
        })
          .then((resp) => {
            return res.send(resp);
          })
          .catch((error) => console.log(error));
      });


module.exports = temperamentRouter 