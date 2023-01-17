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
      image: elem.image.url,
      temperament: elem.temperament,
      created: false,
    };
  });

const createDog = async (
  name,
  height,
  weight,
  life_span,
  image,
  temperament,
  created
) =>
  await Dog.create({
    name,
    height,
    weight,
    life_span,
    image,
    temperament,
    created,
  });

const cleanArrayId = async (id) => {
  const apiDogsAll = (
    await axios.get(
      `https://api.thedogapi.com/v1/breeds/${id}?api_key=${MY_API_KEY}`
    )
  ).data;
  if (apiDogsAll) {
    let dogApi = apiDogsAll;
    return {
      id: dogApi.id,
      name: dogApi.name,
      height: dogApi.height.metric,
      weight: dogApi.weight.metric,
      life_span: dogApi.life_span,
      temperament: dogApi.temperament,
      image: `https://c2m2.thedogapi.com/images/${dogApi.reference_image_id}.jpg`,
      create: false,
    };
  }
};

const getDogById = async (id, source) => {
  const dog =
    source === "api"
      ? cleanArrayId(id)
      : await Dog.findByPk(id, {
          include: {
            model: Temperament,
            attributes: ["temperament"],
          },
        });

  return dog;
};

const getAllDogs = async () => {
  // buscar en api y base de datos y unificar
  const databaseDogs = await Dog.findAll();

  const apiDogsRaw = (
    await axios.get(
      `https://api.thedogapi.com/v1/breeds?/api_key=${MY_API_KEY}`
    )
  ).data;

  const apiDogs = cleanArray(apiDogsRaw);
  return [...databaseDogs, ...apiDogs];
};
const searchDogByName = async (name) => {
  const databaseDogs = await Dog.findAll({
    //mejorar busqueda inexacta
    where: { name },
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
