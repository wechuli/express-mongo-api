const router = require("express-promise-router")(); //will use this router to avoid having to write try and catch blocks in my controller functions

const CarsController = require("../controllers/carsController");
const {
  validateParams,
  validateBody,
  schemas
} = require("../helpers/routeHelpers");

router
  .route("/")
  .get(CarsController.index)
  .post(validateBody(schemas.carSchema), CarsController.newCar);

router
  .route("/:carId")
  .get(validateParams(schemas.idSchema, "carId"), CarsController.getCar)
  .put(
    [
      validateParams(schemas.idSchema, "carId"),
      validateBody(schemas.usercarSchema)
    ],
    CarsController.replaceCar
  )
  .patch(
    validateParams(schemas.idSchema, "carId"),
    validateBody(schemas.patchCarSchema),
    CarsController.updateCar
  )
  .delete(validateParams(schemas.idSchema, "carId"), CarsController.deleteCar);

module.exports = router;
