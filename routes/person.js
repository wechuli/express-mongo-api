const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("You have requested a person");
});

//we can get the query string object through the req,query
router.get("/details", (req, res) => {
    console.log(req.query)
  res.send("You have reached the query route");
});

//we can use a route parameter to pass data
router.get("/:name", (req, res) => {
  console.log(req.params); //params object
  res.send(`You have requested a person with id ${req.params.name}`);
});




module.exports = router;
