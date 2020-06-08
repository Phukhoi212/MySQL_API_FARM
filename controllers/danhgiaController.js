const DanhGia = require("../models/danhgiaModel");

// Create and Save a new Danh Gia
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Danh Gia
  const danhgia = new DanhGia({
    NoiDung: req.body.description,
    Rating: req.body.rating,
    Ma_SanPham: req.body.product_id,
    Ma_NV: req.body.employ_id,
    Ma_KhachHang: req.body.customer_id,
  });

  // Save Danh Gia in the database
  DanhGia.create(danhgia, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Danh Gia."
      });
    else res.send(data);
  });
};

// Retrieve all Danh gia from the database.
exports.findAll = (req, res) => {
  DanhGia.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Danh Gia."
      });
    else res.send(data);
  });
};

// Find a single Danh gia with a ID
exports.findOne = (req, res) => {
  DanhGia.findById(req.params.id_danhgia, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Danh gia with id ${req.params.id_danhgia}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Danh gia with id " + req.params.id_danhgia
        });
      }
    } else res.send(data);
  });
};

// Update a Danh Gia identified by the ID in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  DanhGia.updateById(
    req.params.id_danhgia,
    new DanhGia(req.body),
    (err, data) => {
      console.log(data);
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Danh Gia with id ${req.params.id_danhgia}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Danh Gia with id " + req.params.id_danhgia
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Danh gia with the specified ID in the request
exports.delete = (req, res) => {
  DanhGia.remove(req.params.id_danhgia, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Danh Gia with id ${req.params.id_danhgia}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Danh gia with id " + req.params.id_danhgia
        });
      }
    } else res.send({ message: `Danh gia was deleted successfully!` });
  });
};

// Delete all Danh Gia from the database.
exports.deleteAll = (req, res) => {
  DanhGia.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Danh Gia."
      });
    else res.send({ message: `All Danh Gia were deleted successfully!` });
  });
};
