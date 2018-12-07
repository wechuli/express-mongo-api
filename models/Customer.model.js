const mongoose = require("mongoose");
const dBdetails = require("../passwords.json");

const server = dBdetails.server;
const database = dBdetails.database;
const user = dBdetails.user;
const password = dBdetails.password;

mongoose.connect(`mongodb://${user}:${password}@${server}/${database}`);

const CustomerSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: false,
    unique: true
  }
});

module.exports = mongoose.model("Customer", CustomerSchema);

