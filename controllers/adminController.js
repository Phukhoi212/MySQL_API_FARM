const Admin = require("../models/adminModel");
const jwt = require("jsonwebtoken")

let bearer_token = jwt.sign({
  exp: Math.floor(Date.now() / 1000) + (60 * 60),
  data: 'foobar'
}, 'secret');

// handle login Admin
exports.login = (req, res) => {
  // Validate request
  const password = req.body.password;
  Admin.findByUserName(req.body.userName, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Admin with id ${req.body.userName}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Admin with id " + req.body.userName
        });
      }
    } else {
      if (password === data.MatKhau) {
        res.status(200).send({
          message: "Login success!!! " + req.body.userName,
          token: bearer_token
        });
      }
    }
  });
};

// Create and Save a new Admin
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Admin
  const admin = new Admin({
    Ten_AD: req.body.name,
    NgaySinh: req.body.birthYear,
    Email: req.body.email,
    TenDangNhap: req.body.userName,
    MatKhau: req.body.password,
    SDT: req.body.phone,
    DiaChi: req.body.address,
  });

  // Save Admin in the database
  Admin.create(admin, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Admin."
      });
    else res.send(data);
  });
};

// Retrieve all Admins from the database.
exports.findAll = (req, res) => {
  Admin.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Admins."
      });
    else res.send(data);
  });
};

// Find a single Admin with a AdminID
exports.findOne = (req, res) => {
  Admin.findById(req.params.adminId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Admin with id ${req.params.adminId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Admin with id " + req.params.adminId
        });
      }
    } else res.send(data);
  });
};

// Update a Admin identified by the AdminID in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Admin.updateById(
    req.params.adminId,
    new Admin(req.body),
    (err, data) => {
      console.log(data);
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Admin with id ${req.params.adminId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Admin with id " + req.params.adminId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Admin with the specified AdminID in the request
exports.delete = (req, res) => {
  Admin.remove(req.params.adminId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Admin with id ${req.params.adminId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Admin with id " + req.params.adminId
        });
      }
    } else res.send({ message: `Admin was deleted successfully!` });
  });
};

// Delete all Admins from the database.
exports.deleteAll = (req, res) => {
  Admin.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Admins."
      });
    else res.send({ message: `All Admins were deleted successfully!` });
  });
};

// Handle login for admin
