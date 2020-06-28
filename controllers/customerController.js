const Customer = require("../models/customerModel");

const jwt = require("jsonwebtoken")

let bearer_token = jwt.sign({
  exp: Math.floor(Date.now() / 1000) + (60 * 60),
  data: 'foobar'
}, 'secret');

// Create and Save a new Customer
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Customer
  const customer = new Customer({
    TenKhachHang: req.body.name,
    NgaySinh: req.body.birthYear,
    TaiKhoan: req.body.tk,
    TenDangNhap: req.body.userName,
    MatKhau: req.body.password,
    SDT: req.body.phone,
    DiaChi: req.body.address,
  });

  // Save Admin in the database
  Customer.create(customer, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Customer."
      });
    else res.send(data);
  });
};

// Retrieve all Customer from the database.
exports.findAll = (req, res) => {
  Customer.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Customers."
      });
    else res.send(data);
  });
};

// Find a single Customer with a CustomerID
exports.findOne = (req, res) => {
  Customer.findById(req.params.customerId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.customerId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Customer with id " + req.params.customerId
        });
      }
    } else res.send(data);
  });
};

// Update a Customer identified by the CustomerID in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Customer.updateById(
    req.params.customerId,
    new Customer(req.body),
    (err, data) => {
      console.log(data);
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Customer with id ${req.params.customerId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Customer with id " + req.params.customerId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Customer with the specified CustomerID in the request
exports.delete = (req, res) => {
  Customer.remove(req.params.customerId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.customerId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Customer with id " + req.params.customerId
        });
      }
    } else res.send({ message: `Customer was deleted successfully!` });
  });
};

// Delete all Customers from the database.
exports.deleteAll = (req, res) => {
  Customer.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Customers."
      });
    else res.send({ message: `All Customers were deleted successfully!` });
  });
};

// handle login Customer
exports.login = (req, res) => {
  // Validate request
  const password = req.body.password;
  Customer.findByUserName(req.body.userName, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Customer with id ${req.body.userName}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Customer with id " + req.body.userName
        });
      }
    } else {
      if (password === data.MatKhau) {
        res.status(200).send({
          message: "Login success!!! " + req.body.userName,
          user: req.body.userName,
          userId: data.Ma_KhachHang,
          token: bearer_token,
        });
      }
    }
  });
};
