//Require functions
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");

//start the express application
const app = express();

//Middleware functions
app.use(bodyParser.json()); //Use the body parser
app.use(logger("dev")); //Use morgan to log requests

app.use(express.static("public"));

//Routes

app.get("/", (req, res) => {
  res.status(200).json({
    message: "You requested the index page"
  });
});

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
