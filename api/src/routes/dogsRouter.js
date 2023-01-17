const { Router } = require("express");
require("dotenv").config();
const {
  createDogHandler,
  getDogHandler,
  getDogsHandler,
  
} = require("../handlers/dogsHandlers");

const dogsRouter = Router();

dogsRouter.get("/", getDogsHandler);

dogsRouter.get("/:id", getDogHandler);

dogsRouter.post("/", createDogHandler);

// dogsRouter.delete("/:id", async (req, res, next) => {
//   const { id } = req.params;
//   try {
//     Dog.destroy({ where: { id: id } });
//     let dataApi = await getDogHandler();
//     let dataDb = await Dog.findAll({
//       include: Temperament,
//     });
//     // FORMATEO PARA Q DESDE API Y DESDE DB LLEGUEN AL FRONT IGUALES
//     dataDb = dataDb.map((el) => {
//       return {
//         id: el.id,
//         name: el.name,
//         height: el.height,
//         weight: el.weight,
//         life_span: el.life_span,
//         image: el.image,
//         Created: true,
//         temperaments: el.temperaments.map((i) => {
//           return i.name;
//         }).join(", "),
//       };
//     });
//     // resp de API y de DB juntas
//     let allData = dataDb.concat(dataApi);
//     console.log("Delete successfully!".bgRed);
//     res.send(allData);
//   } catch (err) {
//     next(err);
//   }
// });

module.exports = dogsRouter;
