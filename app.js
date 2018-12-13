//Require functions
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const userRoutes = require("./routes/usersRoutes");
const carRoutes = require("./routes/carRoutes");
const mongoose = require("mongoose");
const dBdetails = require("./passwords.json");

mongoose.Promise = global.Promise; //Tell mangoose to use the global promise object
//start the express application
const app = express();

//Middleware functions
app.use(bodyParser.json()); //Use the body parser
app.use(bodyParser.urlencoded({ extended: false }));

app.use(logger("dev")); //Use morgan to log requests

// app.use(express.static("public"));

//Connect to Mongo Database

const server = dBdetails.server;
const database = dBdetails.database;
const user = dBdetails.user;
const password = dBdetails.password;

//mongoose.connect(`mongodb://${user}:${password}@${server}:${dbport}/${database}`);
// mongoose.connect(`mongodb://localhost/express-api`,{useNewUrlParser: true});

const mongodbUri = `mongodb://@${server}/${database}`;
mongoose.connect(
  mongodbUri,
  {
    useNewUrlParser: true,
    auth: {
      user: user,
      password: password
    }
  }
);

const conn = mongoose.connection;
conn.on("error", console.error.bind(console, "connection error:"));

conn.once("open", () => {
  console.log("connected to database");
});

//Routes

app.use("/users", userRoutes);
app.use("/cars", carRoutes);

// // Catch 404 errors
// app.use((req, res) => {
//   res.status(404).json({ message: "Resouce Unaivailable" });
// });

//Catch 404 errors and forward them to the error handler
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

//Error handler function

app.use((err, req, res, next) => {
  const error = app.get("env") === "development" ? err : {};
  const status = err.status || 500;
  //Respond to client
  res.status(status).json({
    error: {
      message: error.message
    }
  });
});

//Start the server on a port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.info(`Server has started on port ${PORT}`));
