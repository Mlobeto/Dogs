const { createDog, getDogById, getAllDogs, searchDogByName } = require("../controllers/DogsControllers");

const getDogsHandler = async (req, res) => {
  //este handler llama a la funcion que obtiene los datos de  bdd
  // necesito llamar a una funcion que obtenga los datos de la API
  //y cuando tenga los datos, se encarga de responder con los datos
  //res.send("esta ruta ttrae todos los perros");
  const { name } = req.query;
  const results = name ? await searchDogByName(name) :await getAllDogs()  ;
  //if (name) res.send(`llamar a la funcion que busca por name`);
  //res.send(`quiero buscar todos los que se llamen ${name}`);
  //else res.send("quiero enviar todos los perros");
    res.status(200).json(results)

};

const getDogHandler = async (req, res) => {
  const { id } = req.params;
  const source = isNaN(id) ? "bdd" : "api";
  try {
    const dog = await getDogById(id, source);
    res.status(200).json(dog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createDogHandler = async (req, res) => {
  const { id, name, height, weight, life_span } = req.body;
  try {
    const newDog = await createDog(id, name, height, weight, life_span);
    res.status(201).json(newDog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

                                                                                                           

module.exports = { getDogHandler, getDogsHandler, createDogHandler };
