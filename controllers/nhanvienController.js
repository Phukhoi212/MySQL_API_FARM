const Employee = require("../models/nhanvienModel");

// Create and Save a new Employee
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a EMployee
  const employ = new Employee({
    TEN_NV: req.body.name,
    NgaySinh: req.body.birthYear,
    SDT: req.body.phone,
    GioiTinh: req.body.gender,
    DiaChi: req.body.address,
    TenDangNhap: req.body.userName,
    MatKhau: req.body.password,
    MaLoai_NV: req.body.id_loai,
    Ma_NongTrai: req.body.idFarm,
  });

  // Save Employee in the database
  Employee.create(employ, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Employee."
      });
    else res.send(data);
  });
};

// Retrieve all Employee from the database.
exports.findAll = (req, res) => {
  Employee.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Employee."
      });
    else res.send(data);
  });
};

// Find a single Employee with a EmployeeID
exports.findOne = (req, res) => {
  Employee.findById(req.params.employId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Employee with id ${req.params.employId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Employee with id " + req.params.employId
        });
      }
    } else res.send(data);
  });
};

// Update a Employee identified by the EmployeeID in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Employee.updateById(
    req.params.employId,
    new Employee(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Employee with id ${req.params.employId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Employee with id " + req.params.employId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Employee with the specified EmployeeID in the request
exports.delete = (req, res) => {
  Employee.remove(req.params.employId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Employee with id ${req.params.employId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Employee with id " + req.params.employId
        });
      }
    } else res.send({ message: `Employee was deleted successfully!` });
  });
};

// Delete all Employees from the database.
exports.deleteAll = (req, res) => {
  Employee.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Employees."
      });
    else res.send({ message: `All Employees were deleted successfully!` });
  });
};
