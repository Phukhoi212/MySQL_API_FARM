const LoaiNV = require("../models/loainhanvienModel");

// Create and Save a new LoaiNV
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a LoaiNV
  const loainv = new LoaiNV({
    TenLoaiNV: req.body.name,
  });

  // Save LoaiNV in the database
  LoaiNV.create(loainv, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the LoaiNV."
      });
    else res.send(data);
  });
};

// Retrieve all LoaiNV from the database.
exports.findAll = (req, res) => {
  LoaiNV.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving LoaiNV."
      });
    else res.send(data);
  });
};

// Find a single LoaiNV with a ID
exports.findOne = (req, res) => {
  LoaiNV.findById(req.params.loainvId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Category with MaLoai_NV ${req.params.loainvId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Category with MaLoai_NV " + req.params.loainvId
        });
      }
    } else res.send(data);
  });
};

// Update a LoaiNV identified by the Id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  LoaiNV.updateById(
    req.params.loainvId,
    new LoaiNV(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found LoaiNV with MaLoai_NV ${req.params.loainvId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating LoaiNV with MaLoai_NV " + req.params.loainvId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a LoaiNV with the specified ID in the request
exports.delete = (req, res) => {
  LoaiNV.remove(req.params.loainvId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found LoaiNV with MaLoai_NV ${req.params.loainvId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete LoaiNV with MaLoai_NV " + req.params.loainvId
        });
      }
    } else res.send({ message: `LoaiNV was deleted successfully!` });
  });
};

// Delete all LoaiNV from the database.
exports.deleteAll = (req, res) => {
  LoaiNV.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all LoaiNV."
      });
    else res.send({ message: `All LoaiNV were deleted successfully!` });
  });
};
