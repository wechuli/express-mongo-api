const User = require("../models/Users.model");
const Car = require("../models/Car.model");
//Instead of having individual function exports, we can define all our methods in an object literal as below and export them as a single function-contrast this with how we did it for the userController file

module.exports = {
  index: async (req, res, next) => {
    const cars = await Car.find({});
    res.status(200).json(cars);
  },
  //body validated
  newCar: async (req, res, next) => {
    //1.Find the actual seller
    const seller = await User.findById(req.value.body.seller);
    //2.Create a new car
    const newCar = req.value.body;
    delete newCar.seller;
    const car = new Car(newCar);
    car.seller = seller;
    await car.save();
    //3.Add newly created car to the actual seller
    seller.cars.push(car);
    await seller.save();
    res.status(201).json(car);
  },
  getCar: async (req, res, next) => {
    const car = await Car.findById(req.value.params.carId);
    res.status(200).json(car);
  },
  replaceCar: async (req, res, next) => {
    const { carId } = req.value.params;
    const newCar = req.value.body;
    await Car.findByIdAndUpdate(carId, newCar); //don't use findOneAndUpdate
    res.status(200).json({ success: true });
  },
  updateCar: async (req, res, next) => {
    const { carId } = req.value.params;
    const newCar = req.value.body;
    await Car.findByIdAndUpdate(carId, newCar); //don't use findOneAndUpdate
    res.status(200).json({ success: true });
  },
  deleteCar: async (req, res, next) => {
    const { carId } = req.value.params;
    const car = await Car.findById(carId);
    if (!car) {
      return res.status(404).json({ message: "That resource does not exist" });
    }
    const sellerId = car.seller;
    const seller = await User.findById(sellerId);
    //remove the car
    await car.remove();
    //remove car from the User cars list
    seller.cars.pull(car);
    await seller.save();
    res.status(200).json({ success: true }); 
  }
};
