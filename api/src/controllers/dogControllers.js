const axios = require('axios')
const { API_KEY } = process.env;
const { Temperament, Dog } = require('../db');
//const dogs = require('../routes/routesDog');
const URL = `https://api.thedogapi.com/v1/breeds?${API_KEY}`;

const getApiInfoDog = async () => {
    const apiURL = await axios.get(URL);
    const apiInfo = await apiURL.data.map(e => {
        return { // requiere datos de la API 
            id: e.id,
            name: e.name, //si lo saco no lo ordena
            image: e.image.url,
            breed_group: e.breed_group,
            temperament: e.temperament,
            life_span: e.life_span,
            weight_min: parseInt(e.weight.metric.slice(0, 2).trim()), 
            weight_max: parseInt(e.weight.metric.slice(4).trim()),
            height_min: parseInt(e.height.metric.slice(0, 2).trim()),
            height_max: parseInt(e.height.metric.slice(4).trim()),
        };
    }); 
    return apiInfo;
};

const getDBInfoDog = async () => {
    const dogsDB = await Dog.findAll({
        include: {
            model: Temperament,
            attributes: ['name'],
            through: {
                attributes: [],
            },
        }
    });
    return dogsDB;
};

const getAllDogs = async () => {
    const apiInfo = await getApiInfoDog();
    const DBInfo = await getDBInfoDog();
    const infoTotal = apiInfo.concat(DBInfo);
    return infoTotal;
};




module.exports = {
    getAllDogs, getApiInfoDog, getDBInfoDog
};

// const { Dog, Temperament } = require("../db");
// const axios = require("axios");
// const dogsRouter = require("../routes/dogsRouter");
// const { API_KEY } = process.env;
// const URL = `https://api.thedogapi.com/v1/breeds?${MY_API_KEY}`

// const cleanArray = (arr) =>
//   arr.map((elem) => {
//     return {
//       id: elem.id,
//       name: elem.name,
//       height: elem.height,
//       weight: elem.weight,
//       life_span: elem.life_span,
//       image: elem.image.url,
//       temperament: elem.temperament,
//       created: false,
//     };
//   });

// const createDog = async (
//   name,
//   height,
//   weight,
//   life_span,
//   image,
//   temperament,
//   created
// ) =>
//   await Dog.create({
//     name,
//     height,
//     weight,
//     life_span,
//     image,
//     temperament,
//     created,
//   });

// const cleanArrayId = async (id) => {
//   const apiDogsAll = (
//     await axios.get(
//       `https://api.thedogapi.com/v1/breeds/${id}?api_key=${MY_API_KEY}`
//     )
//   ).data;
//   if (apiDogsAll) {
//     let dogApi = apiDogsAll;
//     return {
//       id: dogApi.id,
//       name: dogApi.name,
//       height: dogApi.height.metric,
//       weight: dogApi.weight.metric,
//       life_span: dogApi.life_span,
//       temperament: dogApi.temperament,
//       image: `https://c2m2.thedogapi.com/images/${dogApi.reference_image_id}.jpg`,
//       create: false,
//     };
//   }
// };

// const getDogById = async (id, source) => {
//   const dog =
//     source === "api"
//       ? cleanArrayId(id)
//       : await Dog.findByPk(id, {
//           include: {
//             model: Temperament,
//             attributes: ["temperament"],
//           },
//         });

//   return dog;
// };

// const getAllDogs = async () => {
//   // buscar en api y base de datos y unificar
//   const databaseDogs = await Dog.findAll();

//   const apiDogsRaw = (
//     await axios.get(
//       `https://api.thedogapi.com/v1/breeds?/api_key=${MY_API_KEY}`
//     )
//   ).data;

//   const apiDogs = cleanArray(apiDogsRaw);
//   return [...databaseDogs, ...apiDogs];
// };
// const searchDogByName = async (name) => {
//   const databaseDogs = await Dog.findAll({
//     //mejorar busqueda inexacta
//     where: { name },
//   });

//   const apiDogsRaw = (
//     await axios.get(
//       `https://api.thedogapi.com/v1/breeds?/api_key=${MY_API_KEY}`
//     )
//   ).data;

//   const apiDogs = cleanArray(apiDogsRaw);

//   const filteredApi = apiDogs.filter((dog) => dog.name.includes(`${name}`));

//   return [...filteredApi, ...databaseDogs];
// };

// module.exports = { createDog, getDogById, getAllDogs, searchDogByName };
//module.exports = {
//     getAllDogs, getApiInfoDog, getDBInfoDog
// };