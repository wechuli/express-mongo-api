const express = require("express");
const router = express.Router();
const userController = require("../controllers/usersController");
const {
  validateParams,
  validateBody,
  schemas
} = require("../helpers/routeHelpers");
// const router = require('express-promise-router')(); //If we want to use the promise based router, we don't have to use try and catch syntax in contrllers

router.get("/", userController.index);

router.post("/", validateBody(schemas.userSchema), userController.newUser);

//Alternative syntax if serveral methods are going to the same route
router
  .route("/:userId")
  .get(validateParams(schemas.idSchema, "userId"), userController.getUser)
  .put(
    validateParams(schemas.idSchema, "userId"),
    validateBody(schemas.userSchema),
    userController.replaceUser
  )
  .patch(
    [
      validateParams(schemas.idSchema, "userId"),
      validateBody(schemas.userSchemaOptional)
    ], //we can also just have the the middleware functions in an array
    userController.editUser
  )
  .delete();

router
  .route("/:userId/cars")
  .get(validateParams(schemas.idSchema, "userId"), userController.getUserCars)
  .post(
    [
      validateParams(schemas.idSchema, "userId"),
      validateBody(schemas.usercarSchema)
    ],
    userController.newUserCar
  );

module.exports = router;
