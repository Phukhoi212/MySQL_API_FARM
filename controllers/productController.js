const Product = require("../models/productModel");

// Create and Save a new Product
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Product
  const product = new Product({
    TenSanPham: req.body.name,
    HinhAnh: req.body.imageUrl,
    GiaSanPham: req.body.price,
    SoLuong: req.body.amount,
    Mota: req.body.description,
    Ma_NongTrai: req.body.idFarm,
    Ma_LoaiHang: req.body.idCategory,
  });

  // Save Product in the database
  Product.create(product, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Product."
      });
    else res.send(data);
  });
};

// Retrieve all Product from the database.
exports.findAll = (req, res) => {
  Product.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Product."
      });
    else res.send(data);
  });
};

// Find a single Product with a ProductID
exports.findOne = (req, res) => {
  Product.findById(req.params.productId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Product with id ${req.params.productId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Product with id " + req.params.productId
        });
      }
    } else res.send(data);
  });
};

// Update a Product identified by the productId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Product.updateById(
    req.params.productId,
    new Product(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Product with id ${req.params.productId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Product with id " + req.params.productId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Product with the specified ProductID in the request
exports.delete = (req, res) => {
  Product.remove(req.params.productId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Product with id ${req.params.productId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Product with id " + req.params.productId
        });
      }
    } else res.send({ message: `Product was deleted successfully!` });
  });
};

// Delete all Product from the database.
exports.deleteAll = (req, res) => {
  Product.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Product."
      });
    else res.send({ message: `All Product were deleted successfully!` });
  });
};


exports.uploadFiles = async (req, res) => {
  try {
    console.log(req.file);
    const hostName = req.protocol + "://" + req.hostname + ":4000";
    if (req.file == undefined) {
      return res.send(`You must select a file.`);
    }
    return res.send({
      link: hostName + "/resources/assets/uploads/" + req.file.filename
    });
  } catch (error) {
    console.log(error);
    return res.send(`Error when trying upload images: ${error}`);
  }
};
