const { Dog, Temperament } = require("../db");
const axios = require("axios");
//const dogsRouter = require("../routes/dogsRouter");
const { MY_API_KEY } = process.env;

const cleanArray = (arr) =>
  arr.map((elem) => {
    return {
      id: elem.id,
      name: elem.name,
      height: elem.height,
      weight: elem.weight,
      life_span: elem.life_span,
      temperament: elem.temperament,
      created: false,
    };
  });

const createDog = async ( name, height, weight, life_span, image, temperament) =>
  await Dog.create({  name, height, weight, life_span, image, temperament });

const getDogById = async (id, source) => {
  const dog =
    source === "api"
      ? (
          await axios.get(
            `https://api.thedogapi.com/v1/breeds?/api_key=${MY_API_KEY}/${id}`
          )
        ).data
      : await Dog.findByPk(id, {
        include:{
          model: Temperament,
          attributes:["temperament"]
        }
      });

  return dog [id];
};

const getAllDogs = async () => {
  // buscar en api y base de datos y unificar
  const databaseDogs = await Dog.findAll();

  const apiDogsRaw = (
    await axios.get(
      `https://api.thedogapi.com/v1/breeds?/api_key=${MY_API_KEY}`
    )
  ).data
  

  const apiDogs = cleanArray(apiDogsRaw);
  return [...databaseDogs, ...apiDogs];
};
const searchDogByName = async (name) => {
  const databaseDogs = await Dog.findAll({
    //mejorar busqueda inexacta
    where: { name: name },
  });

  const apiDogsRaw = (
    await axios.get(
      `https://api.thedogapi.com/v1/breeds?/api_key=${MY_API_KEY}`
    )
  ).data;

  const apiDogs = cleanArray(apiDogsRaw);

  const filteredApi = apiDogs.filter((dog) => dog.name.includes(`${name}`));

  return [...filteredApi, ...databaseDogs];
};

module.exports = { createDog, getDogById, getAllDogs, searchDogByName };
