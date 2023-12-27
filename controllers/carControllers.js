
const Car = require('../Models/Car.js');
const fs = require('fs');


const multer = require('multer');
const path = require('path');

// Set up multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Specify the directory where uploaded images will be saved
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    // Generate a unique filename for the uploaded image
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  },
});

// Create a multer instance with the specified storage configuration
const upload = multer({ storage: storage });

// Add a new car
module.exports.addCar = async (req, res) => {
  console.log("add a car");
  try {

    //first save the images
    const carImages = [];
    for (let i = 1; i <= 3; i++) {

        const image = req.body['model_photo' + i];
        const decodedImage = Buffer.from(image, 'base64');
        // Generate a unique filename for the uploaded image
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const filename = uniqueSuffix + '.jpg';
        // Save the decoded image to the uploads directory
        fs.writeFileSync('uploads/' + filename, decodedImage);  

        //dont save the filename save the path
        carImages.push(filename);

        
    
    }

  


    //then save the car
    const newCar = new Car({
      make_name: req.body.make_name,
      model_name: req.body.model_name,
      model_type: req.body.model_type,
      model_color: req.body.model_color,
      model_year: req.body.model_year,
      model_mileage: req.body.model_mileage,
      model_price: req.body.model_price,
      model_desc: req.body.model_desc,
      user_id: req.body.user_id,
      model_photo1: carImages[0],
      model_photo2: carImages[1],
      model_photo3: carImages[2],
      phone: req.body.phone,
      fullname: req.body.fullname,
      profile_pic: req.body.profile_pic,
      user_email: req.body.user_email,

    });


   
    const car = await newCar.save();
    res.status(200).json(car);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};



exports.getAllCars = async (req, res) => {

    console.log("get all cars");
    try {
      const cars = await Car.find(); // Fetch all cars
      res.status(200).json(cars);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  };


  exports.getCar = async (req, res) => {
    console.log("get a car");
    try {
      const car = await Car.findById(req.params.usedCar_id ); // Fetch a single car
      res.status(200).json(car);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  };


  exports.getCarPhotos = async (req, res) => {
   //return the photos of a car in single object
    console.log("get a car photos");

    console.log(req.params.usedCar_id);
    try {
      const car = await Car.findById(
        req.params.usedCar_id
      ); // Fetch a single car
      if (!car) {
        return res.status(404).json({ error: 'Car not found' });
      }
      res.status(200).json(
       //return object data with photos
        {
          model_photo1: car.model_photo1,
          model_photo2: car.model_photo2,
          model_photo3: car.model_photo3
        }
      );
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  }

exports.getCarByMake = async (req, res) => {
  console.log("get a car by make");
  try {
    const car = await Car.find({ make_name: req.params.make_name }); // Fetch a single car
    if (!car) {
      return res.status(404).json({ error: 'Car not found' });
    }
    res.status(200).json(
     {
      carlist: car
     }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}


exports.getMakeList = async (req, res) => {
  // https://caratan.000webhostapp.com/project/functions/getMakeList.php
  console.log("get make list");

  //get response from the api
  const axios = require('axios');
  const url = 'https://caratan.000webhostapp.com/project/functions/getCarMakeList.php';
  try {

    //now iterate through the array and get counts for each make from the database
    const response = await axios.get(url);


    let data = response.data.carmake;


   
   
    for (let i = 0; i < data.length; i++) {
      //console.log(response.data[i].make_name);
      //console.log(response.data[i].make_name);
      const make_name = data[i].make_name;
      const count = await Car.find({ make_name: make_name }).countDocuments();
      //console.log(count);
      data[i].counts = count;
    }

    console.log({
      carmake: data
    });
   
    res.status(200).json(
      {
        carmake: data
      }
    );
   
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }

} 









