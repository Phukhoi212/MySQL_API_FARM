const Image = require("../models/imagesModel");


// Retrieve all Admins from the database.
exports.findAll = (req, res) => {
  Image.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Admins."
      });
    else res.send(data);
  });
};

