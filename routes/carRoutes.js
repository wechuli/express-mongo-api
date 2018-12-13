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
  .post(validateBody(schemas.newCarSchema), CarsController.newCar);

module.exports = router;
