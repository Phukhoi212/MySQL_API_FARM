const KhuyenMai = require("../models/khuyenmaiModel");

// Create
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a KhuyenMai
  const km = new KhuyenMai({
    Ma_SanPham: req.body.id_product,
    NgayBatDau: req.body.start,
    NgayKetThuc: req.body.end,
    Ma_LoaiKM: req.body.id_km,
    PhanTramKM: req.body.phan_tram
  });

  // Save Farm in the database
  KhuyenMai.create(km, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating ....."
      });
    else res.send(data);
  });
};

// Retrieve all Faems from the database.
exports.findAll = (req, res) => {
  KhuyenMai.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving ...."
      });
    else res.send(data);
  });
};

// Find a single Farm with a FarmID
exports.findOne = (req, res) => {
  KhuyenMai.findById(req.params.product_id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Khuyen Mai with id ${req.params.product_id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Khuyen Mai with id " + req.params.famrId
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

exports.getList = (req, res) => {
  KhuyenMai.getListProduct((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving ...."
      });
    else res.send(data);
  });
};
