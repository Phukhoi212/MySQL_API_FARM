const LoaiKM = require("../models/loaikhuyenmaiModel");

// Create and Save a new LoaiNV
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a LoaiKM
  const loai_km = new LoaiKM({
    TenLoaiKM: req.body.name,
  });

  // Save LoaiNV in the database
  LoaiKM.create(loai_km, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the LoaiKM."
      });
    else res.send(data);
  });
};

// Retrieve all LoaiKM from the database.
exports.findAll = (req, res) => {
  LoaiKM.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving LoaiKM."
      });
    else res.send(data);
  });
};

// Find a single LoaiNV with a ID
exports.findOne = (req, res) => {
  LoaiKM.findById(req.params.loaikm_Id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Category with MaLoai_KM ${req.params.loaikm_Id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Category with MaLoai_KM " + req.params.loaikm_Id
        });
      }
    } else res.send(data);
  });
};

// Update a LoaiKM identified by the Id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  LoaiKM.updateById(
    req.params.loaikm_Id,
    new LoaiKM(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found LoaiNV with MaLoai_KM ${req.params.loaikm_Id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating LoaiNV with MaLoai_KM " + req.params.loaikm_Id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a LoaiKM with the specified ID in the request
exports.delete = (req, res) => {
  LoaiKM.remove(req.params.loaikm_Id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found LoaiKM with MaLoai_KM ${req.params.loaikm_Id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete LoaiKM with MaLoai_KM " + req.params.loaikm_Id
        });
      }
    } else res.send({ message: `LoaiKM was deleted successfully!` });
  });
};

// Delete all LoaiKM from the database.
exports.deleteAll = (req, res) => {
  LoaiKM.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all LoaiKM."
      });
    else res.send({ message: `All LoaiKM were deleted successfully!` });
  });
};
