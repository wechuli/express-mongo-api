const customerModel = require("../models/Customer.model.js");
const express = require("express");

const router = express.Router();

///Create a new customer

router.post("/", (req, res) => {
  if (!req.body) {
    res
      .status(400)
      .json({ error: "Server did not receive a body in the request" });
  } else {
    let model = new customerModel(req.body);
    model
      .save()
      .then(doc => {
        if (!doc || doc.length === 0) {
          res
            .status(500)
            .json({ error: "There was a problem in saving your document" });
        } else {
          res.status(201).json({ success: "Dcument created" });
        }
      })
      .catch(err => {
        res.status(500).json(err);
      });
  }
});

module.exports = router;
