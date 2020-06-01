const sql = require("./db.js");

// constructor
const Employee = function (employ) {
  this.TEN_NV = employ.TEN_NV;
  this.NGAY_SINH = employ.NGAY_SINH;
  this.SDT = employ.SDT;
  this.GIOI_TINH = employ.GIOI_TINH;
  this.DIA_CHI = employ.DIA_CHI;
  this.TEN_DN = employ.TEN_DN;
  this.MATKHAU = employ.MATKHAU;
  this.MA_NT = employ.MA_NT;
};

Employee.create = (newEmploy, result) => {
  sql.query("INSERT INTO nhanvien SET ?", newEmploy, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Employee: ", { id: res.insertId, ...newEmploy });
    result(null, { id: res.insertId, ...newEmploy });
  });
};

Employee.findById = (employId, result) => {
  sql.query(`SELECT * FROM nhanvien WHERE MA_NV = ${employId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Employee: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found employ with the id
    result({ kind: "not_found" }, null);
  });
};

Employee.getAll = result => {
  sql.query("SELECT * FROM nhanvien", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Employee: ", res);
    result(null, res);
  });
};

Employee.updateById = (id, employ, result) => {
  sql.query(
    "UPDATE nhanvien SET TEN_NV = ?, NGAY_SINH = ?, SDT = ?, GIOI_TINH = ?, DIA_CHI = ?, TEN_DN = ?, MATKHAU = ?, MA_NT = ? WHERE MA_NV = ?",
    [employ.TEN_NV, employ.NGAY_SINH, employ.SDT, employ.GIOI_TINH, employ.DIA_CHI, employ.TEN_DN, employ.MATKHAU, employ.MA_NT, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found employ with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated employ: ", { id: id, ...employ });
      result(null, { id: id, ...employ });
    }
  );
};

Employee.remove = (id, result) => {
  sql.query("DELETE FROM nhanvien WHERE MA_NV = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found employ with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted employ with id: ", id);
    result(null, res);
  });
};

Employee.removeAll = result => {
  sql.query("DELETE FROM nhanvien", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} employees`);
    result(null, res);
  });
};

module.exports = Employee;