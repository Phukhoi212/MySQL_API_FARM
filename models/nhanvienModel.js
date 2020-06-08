const sql = require("./db.js");

// constructor
const Employee = function (employ) {
  this.TEN_NV = employ.TEN_NV;
  this.NgaySinh = employ.NgaySinh;
  this.SDT = employ.SDT;
  this.GioiTinh = employ.GioiTinh;
  this.DiaChi = employ.DiaChi;
  this.TenDangNhap = employ.TenDangNhap;
  this.MatKhau = employ.MatKhau;
  this.MaLoai_NV = employ.MaLoai_NV;
  this.Ma_NongTrai = employ.Ma_NongTrai
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
    "UPDATE nhanvien SET TEN_NV = ?, NgaySinh = ?, SDT = ?, GioiTinh = ?, DiaChi = ?, TenDangNhap = ?, MatKhau = ?, MaLoai_NV = ?, Ma_NongTrai = ? WHERE MA_NV = ?",
    [employ.TEN_NV, employ.NgaySinh, employ.SDT, employ.GioiTinh, employ.DiaChi, employ.TenDangNhap, employ.MatKhau, employ.MaLoai_NV, employ.Ma_NongTrai, id],
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