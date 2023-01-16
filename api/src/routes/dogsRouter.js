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

module.exports = dogsRouter;
