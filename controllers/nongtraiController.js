const Farm = require("../models/nongtraiModel");

// Create and Save a new Farm
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Farm
  const farm = new Farm({
    TenNongTrai: req.body.name,
    DiaChi: req.body.address,
    SDT: req.body.phone,
    Ma_AD: req.body.idAdmin,
  });

  // Save Farm in the database
  Farm.create(farm, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Farm."
      });
    else res.send(data);
  });
};

// Retrieve all Faems from the database.
exports.findAll = (req, res) => {
  Farm.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Farms."
      });
    else res.send(data);
  });
};

// Find a single Farm with a FarmID
exports.findOne = (req, res) => {
  Farm.findById(req.params.farmId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Farm with id ${req.params.farmId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Farm with id " + req.params.farmId
        });
      }
    } else res.send(data);
  });
};

// Update a Farm identified by the FarmID in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Farm.updateById(
    req.params.farmId,
    new Farm(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Farm with id ${req.params.farmId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Farm with id " + req.params.farmId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Farm with the specified FarmID in the request
exports.delete = (req, res) => {
  Farm.remove(req.params.farmId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Farm with id ${req.params.farmId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Farm with id " + req.params.farmId
        });
      }
    } else res.send({ message: `Farm was deleted successfully!` });
  });
};

// Delete all Farms from the database.
exports.deleteAll = (req, res) => {
  Farm.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Farms."
      });
    else res.send({ message: `All Farms were deleted successfully!` });
  });
};
