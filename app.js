const express = require("express");
const personRoute = require("./routes/person");
const customerRoute = require("./routes/customer");
const bodyParser = require("body-parser");

const app = express();

//Use the body parser
app.use(bodyParser.json());

app.use(express.static("public"));

//Routes
app.use("/person", personRoute);
app.use("/customer", customerRoute);

//404 route
app.use((req, res) => {
  res.status(404).json({ message: "Resouce Unaivailable" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.info(`Server has started on port ${PORT}`));
