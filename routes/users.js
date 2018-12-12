const express = require("express");
const router = express.Router();
const userController = require("../controllers/usersController");
const { validateParams, schemas } = require("../helpers/routeHelpers");
// const router = require('express-promise-router')(); //If we want to use the promise based router, we don't have to use try and catch syntax in contrllers

router.get("/", userController.index);

router.post("/", userController.newUser);

//Alternative syntax if serveral methods are going to the same route
router
  .route("/:userId")
  .get(validateParams(schemas.idSchema, "userId"), userController.getUser)
  .put(userController.replaceUser)
  .patch(userController.editUser)
  .delete();

router
  .route("/:userId/cars")
  .get(userController.getUserCars)
  .post(userController.newUserCar);

module.exports = router;
