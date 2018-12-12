const User = require("../models/Users.model");
const Car = require("../models/Car.model");

//get all users
// exports.index = (req, res) => {
//   User.find({})
//     .then(users => {
//       res.status(200).json(users);
//     })
//     .catch(err => next(err));
//   //   res.status(200).json({
//   //     message: "You requested the users route"
//   //   });
// };

exports.index = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

//Create a new user
exports.newUser = async (req, res, next) => {
  try {
    const newUser = new User(req.body);
    const user = await newUser.save();
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

//Get a specific user
exports.getUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

//replace user-using put
exports.replaceUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const newUser = req.body;
    const result = await User.findOneAndUpdate(userId, newUser);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

//Edit a user
exports.editUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const newUser = req.body;
    const result = await User.findOneAndUpdate(userId, newUser);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

//Get user cars
exports.getUserCars = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).populate("cars");
    //console.log(`User cars: ${user.cars}`);
    res.status(200).json(user.cars);
  } catch (error) {
    next(error);
  }
};

//Add a new car
exports.newUserCar = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const newCar = new Car(req.body);
    // console.log(newCar);
    //Get user
    const user = await User.findById(userId);
    newCar.seller = user;
    //save the car
    await newCar.save();
    //Add car to the user's selling array car
    user.cars.push(newCar);
    //save the user
    await user.save();
    res.status(201).json(newCar);
  } catch (error) {
    next(error);
  }
};

/*
we can interact with mongoose in 3 different ways
1.Callbacks
2.Promises
3.Async/Await(Promises)


*/
