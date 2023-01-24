const express = require('express');
const dogs = express.Router();
const { Temperament, Dog } = require('../db');

const { getAllDogs /*, getApiInfoDog, getDBInfoDog */ } = require('../controllers/dogControllers');
const { axios } = require('axios');

dogs.use(express.json());

dogs.get('/dogs', async (req, res) => {
    /* http://localhost:3001/dogs && http://localhost:3001/dogs/?name=Affenpinscher */
        const name = req.query.name;
        try {
            let dogsTotal = await getAllDogs();
            if (name) { /* Si entra un query */
                let dogName = await dogsTotal.filter(
                    dog => dog.name.toLowerCase().includes(name.toLowerCase())
                );
                dogName.length ?
                    res.status(200).send(dogName) :
                    res.status(404).send("you have to type the name of a dog")
            } else { /* Si no hay query en la URL */
                res.status(200).json(dogsTotal)
            }
        } catch (error) {
            res.status(404).json("There is no dog's with this name")
        }

    });

dogs.post('/dogs', async (req, res) => {
    var { // las mismas propiedades para crear el nuevo perro
        name,
        height_min,
        height_max,
        weight_min,
        weight_max,
        life_span,
        temperament,
        image,
    } = req.body;
    
    if(!image){
        try {
            image = await (await axios.get('https://dog.ceo/api/breeds/image/random')).data.message;
        } catch (error) {
            console.log(error)
        }
    }

    if (name && height_min && height_max && weight_min && weight_max && temperament && image) {
        // los datos para crear el perro
        const createDog = await Dog.create({
            name: name,
            height_min: parseInt(height_min),
            height_max: parseInt(height_max),
            weight_min: parseInt(weight_min),
            weight_max: parseInt(weight_max),
            life_span: life_span,
            image: image || 'https://dog.ceo/api/breeds/image/random',
        });
        temperament.map(async el => {
            const findTemp = await Temperament.findAll({
                where: { name: el }
            });
            createDog.addTemperament(findTemp);
        })
        res.status(200).send(createDog);
    } else {
        res.status(404).send('Fill in all the boxes');
    }
})

dogs.get('/dogs/:idRaza', async (req, res) => {
     /* http://localhost:3001/dogs/7 */
    try {
        const { idRaza } = req.params;
        const allDogs = await getAllDogs();
        if (!idRaza) {
            res.status(404).json("this dog id does not exist")
        } else {
            const dog = allDogs.find(dogui => dogui.id.toString() === idRaza);
            res.status(200).json(dog)
        }
    } catch (error) {
        res.status(404).send(error)
    }
})




dogs.delete("/:idRaza", async (req, res, next) => {//getAllDogs, getApiInfoDog, getDBInfoDog
    const { idRaza } = req.params;
    try {
      Dog.destroy({ where: { id: id } });
      let dataApi = await utils.getApiInfoDog();
      let dataDb = await Dog.findAll({
        include: Temperament,
      });
      // FORMATEO PARA Q DESDE API Y DESDE DB LLEGUEN AL FRONT IGUALES
      dataDb = dataDb.map((el) => {
        return {
          id: el.id,
          name: el.name,
          height_min: el.height_min,
          height_max: el.height_max,
          weight_min: el.weight_min,
          weight_max: el.weight_max,
          life_span: el.life_span,
          image: el.image,
          createdInDB: true,
          temperaments: el.Temperaments.map((i) => {
            return i.name;
          }).join(", "),
        };
      });
      // resp de API y de DB juntas
      let allData = dataDb.concat(dataApi);
      console.log("Delete successfully!".bgRed);
      res.send(allData);
    } catch (err) {
      next(err);
    }
  });

module.exports = dogs;

// const { Router } = require("express");
// require("dotenv").config();
// const {
//   createDogHandler,
//   getDogHandler,
//   getDogsHandler,
  


  // } = require("../handlers/dogsHandlers");

// const dogsRouter = Router();

// dogsRouter.get("/", getDogsHandler);

// dogsRouter.get("/:id", getDogHandler);

// dogsRouter.post("/", createDogHandler);



//module.exports = dogs;