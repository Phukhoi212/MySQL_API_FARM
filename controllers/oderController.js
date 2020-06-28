const Oder = require("../models/oderModel");

// Create and Save a new Employee
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Oder
  const oder = new Oder({
    DiaChiGiao: req.body.address,
    NgayDat: req.body.date_oder,
    NgayGiao: req.body.date_ship,
    Ma_KhachHang: req.body.id_cus,
    MA_NV: req.body.id_em,
    GhiChu: req.body.note,
    TrangThai: req.body.status
  });

  // Save Oder in the database
  Oder.create(oder, (err, data) => {
    console.log("data", data, data.id);
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Employee."
      });
    else res.send({
      data: data,
      idCreate: data.id,
    });
  });
};

// Retrieve all Oder from the database.
exports.findAll = (req, res) => {
  Oder.getAll((err, data) => {
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
  Oder.findById(req.params.id_oder, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Employee with id ${req.params.id_oder}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Employee with id " + req.params.id_oder
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

  Oder.updateById(
    req.params.id_oder,
    new Employee(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Employee with id ${req.params.id_oder}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Employee with id " + req.params.id_oder
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Employee with the specified EmployeeID in the request
exports.delete = (req, res) => {
  Oder.remove(req.params.id_oder, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Employee with id ${req.params.id_oder}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Employee with id " + req.params.id_oder
        });
      }
    } else res.send({ message: `Employee was deleted successfully!` });
  });
};

// Delete all Employees from the database.
exports.deleteAll = (req, res) => {
  Oder.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Employees."
      });
    else res.send({ message: `All Employees were deleted successfully!` });
  });
};
