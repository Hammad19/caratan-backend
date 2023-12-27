const express = require('express');
const router = express.Router();
const carController = require('../controllers/carControllers.js');

router.post('/addCar', carController.addCar);

router.get("/getallCars", carController.getAllCars)

router.get("/getCarInfo/:usedCar_id", carController.getCar)

router.get("/getCarPhotos/:usedCar_id", carController.getCarPhotos)

router.get("/getCarByMake/:make_name", carController.getCarByMake)

router.get("/getMakeList", carController.getMakeList)

module.exports = router;
