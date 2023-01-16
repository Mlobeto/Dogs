const { Dog, Temperament } = require("../db");
const axios = require("axios");
const { MY_API_KEY } = process.env;

const cleanArray = (arr) =>
  arr.map((elem) => {
    return {
      id: elem.id,
      name: elem.name,
      height: elem.height,
      weight: elem.weight,
      life_span: elem.life_span,
      create: false,
    };
  });

const createDog = async (id, name, height, weight, life_span, image ) =>
  await Dog.create({ id, name, height, weight, life_span, image });

const getDogById = async (id, source) => {
  const dog =
    source === "api"
      ? (
          await axios.get(
            `https://api.thedogapi.com/v1/breeds?/${id}/api_key=${MY_API_KEY}`
          )
        ).data
      : await Dog.findByPk(id);

  return dog[id-1];
};
const getAllDogs = ()=> { // buscar en api y base de datos y unificar


}
searchDogByName= ()=> {
    
};


module.exports = { createDog, getDogById, getAllDogs, searchDogByName   };
