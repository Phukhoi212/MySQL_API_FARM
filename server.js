const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const port = 4000;
const db = require("./models/images");


app.use(bodyParser.json());
//
//db.sequelize.sync();

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // * => allow all origins
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,OPTIONS,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, X-Auth-Token, Accept"
  ); // add remove headers according to your needs
  next();
});

require("./routes/adminRoutes")(app);
require("./routes/nongtraiRoutes")(app);
require("./routes/nhanvienRoutes")(app);
require("./routes/loaihangRoutes")(app);
require("./routes/productRoutes")(app);
require("./routes/customerRoutes")(app);
require("./routes/imageRoutes")(app);
require("./routes/loainhanvienRoutes")(app);

global.__basedir = __dirname;
app.listen(port, () => console.log(`App listening on port ${port}!`));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to api of Web Nong Trai!!!" });
});

app.use("/resources", express.static('resources'))