const sql = require("./db.js");

// constructor
const Image = function (image) {
};

Image.getAll = result => {
  sql.query("SELECT * FROM images", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Categories: ", res);
    result(null, res);
  });
};

module.exports = Image;