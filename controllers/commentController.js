const Comment = require("../models/commentModel");

// Create and Save a new Danh Gia
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Comment
  const comment = new Comment({
    NoiDung: req.body.description,
    NgayBinhLuan: req.body.date_comment,
    Ma_SanPham: req.body.product_id,
    Ma_NV: req.body.employ_id,
    Ma_KhachHang: req.body.customer_id,
  });

  // Save Comment in the database
  Comment.create(comment, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Comment."
      });
    else res.send(data);
  });
};

// Retrieve all Comment from the database.
exports.findAll = (req, res) => {
  Comment.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Comment."
      });
    else res.send(data);
  });
};

// Find a single Comment with a ID
exports.findOne = (req, res) => {
  Comment.findById(req.params.commentId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Comment with id ${req.params.commentId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Comment with id " + req.params.commentId
        });
      }
    } else res.send(data);
  });
};

// Update a Comment identified by the ID in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Comment.updateById(
    req.params.commentId,
    new DanhGia(req.body),
    (err, data) => {
      console.log(data);
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Comment with id ${req.params.commentId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Comment with id " + req.params.commentId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Comment with the specified ID in the request
exports.delete = (req, res) => {
  Comment.remove(req.params.commentId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Comment with id ${req.params.commentId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Comment with id " + req.params.commentId
        });
      }
    } else res.send({ message: `Comment was deleted successfully!` });
  });
};

// Delete all Comment from the database.
exports.deleteAll = (req, res) => {
  Comment.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Comment."
      });
    else res.send({ message: `All Comment were deleted successfully!` });
  });
};
