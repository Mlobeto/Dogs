const express = require('express');
const dogs = express.Router();
const { Temperament, Dog } = require('../db');

const { getAllDogs } = require('../controllers/dogControllers');
const { default: axios } = require('axios');

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
                    res.status(404).send("Cann't find the dog with the name you are looking for")
            } else { /* Si no hay query en la URL */
                res.status(200).json(dogsTotal)
            }
        } catch (error) {
            res.status(404).json("There is no dog's with this name")
        }

    });

dogs.post('/dogs', async (req, res) => {
    var { // takes these properties to build the new dog
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
    } if(name){
    let todos = await getAllDogs();
    let chocan = todos.find(perro => perro.name === name)
    if(chocan) {
      res.status(400).send('Crash Name')
    }
    }
    if (name && height_min && height_max && weight_min && weight_max && temperament && image) {
        // takes that data for the new dog  
        const createDog = await Dog.create({
            name: name.slice(0,1).toUpperCase()+name.slice(1, name.length).toLowerCase(),
            height_min: parseInt(height_min),
            height_max: parseInt(height_max),
            weight_min: parseInt(weight_min),
            weight_max: parseInt(weight_max),
            life_span: life_span,
            image: image || 'https://dog.ceo/api/breeds/image/random',
        });
        
            const findTemp = await Temperament.findAll({
                where: { name: temperament }
            });
            createDog.addTemperament(findTemp);
        
        res.status(200).send(createDog);
    } else {
        res.status(404).send('Data needed to proceed is missing');
    }
})

dogs.get("/dogs/:idRaza", async (req, res) => {
  /* http://localhost:3001/dogs/7 */
  try {
    const { idRaza } = req.params;
    const allDogs = await getAllDogs();
    if (!idRaza) {
      res.status(404).json("Couldn't find the name on DBase");
    } else {
      const dog = allDogs.find((perro) => perro.id.toString() === idRaza);
      res.status(200).json(dog);
    }
  } catch (error) {
    res.status(404).send(error);
  }
});

dogs.delete("/dogs/:id/delete", async (req, res) =>  {
  try {
  
   const idN =req.params.id;
   
   const dogById = await Dog.findByPk(idN);
   dogById.destroy()
  
   res.status(200).json(
    `${idN + " Was deletedes suscessfully"}`
   )
} catch (error) {
  res.status(404).send(error);
}

//   const id = req.params.id;
//   console.log(id);
//   const totalDogs = await getAllDogs();
//   if (id) {
//     let dogId = await totalDogs.filter(
//       (el) => el.createdInDB === true && el.id == id
//     );
//     console.log(`este es el dogId${id}`);
//     dogId.length
//       ? res.status(200).json(
//           await Dog.destroy({
//             where: { id: id },
//             truncate: { cascade: true },
//           })
//         )
//       : res.status(404).send("is not Deleted");
//   }
    });

module.exports = dogs;


