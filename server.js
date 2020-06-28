const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const port = 4000;

var corsOptions = {
  origin: "*"
};

app.use(cors());

app.use(bodyParser.json());
app.use('/files', express.static('files'));

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
require("./routes/loainhanvienRoutes")(app);
require("./routes/loaikhuyenmaiRoutes")(app);
require("./routes/danhgiaRoutes")(app);
require("./routes/khuyenmaiRoutes")(app);
require("./routes/oderRoutes")(app);
require("./routes/oderdetailRoutes")(app);
require("./routes/commentRoutes")(app);

global.__basedir = __dirname;
app.listen(port, () => console.log(`App listening on port ${port}!`));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to api of Web Nong Trai!!!" });
});

app.use("/resources", express.static('resources'));