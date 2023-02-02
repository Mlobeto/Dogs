const axios = require('axios')
const { API_KEY } = process.env;
const { Temperament, Dog } = require('../db');
//const dogs = require('../routes/routesDog');
const URL = `https://api.thedogapi.com/v1/breeds?${API_KEY}`;