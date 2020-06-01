const sql = require("./db.js");

// constructor
const Admin = function (admin) {
  this.Ten_AD = admin.Ten_AD;
  this.NgaySinh = admin.NgaySinh;
  this.Email = admin.Email;
  this.TenDangNhap = admin.TenDangNhap;
  this.MatKhau = admin.MatKhau;
  this.SDT = admin.SDT;
  this.DiaChi = admin.DiaChi;
};

Admin.create = (newAdmin, result) => {
  sql.query("INSERT INTO admin SET ?", newAdmin, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created admin: ", { id: res.insertId, ...newAdmin });
    result(null, { Ma_AD: res.insertId, ...newAdmin });
  });
};


Admin.findByUserName = (adminId, result) => {
  sql.query(`SELECT * FROM admin WHERE TenDangNhap = '${adminId}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found admin: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found admin with the id
    result({ kind: "not_found" }, null);
  });
};

Admin.findById = (adminId, result) => {
  sql.query(`SELECT * FROM admin WHERE Ma_AD = ${adminId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found admin: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found admin with the id
    result({ kind: "not_found" }, null);
  });
};

Admin.getAll = result => {
  sql.query("SELECT * FROM admin", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("admins: ", res);
    result(null, res);
  });
};

Admin.updateById = (id, admin, result) => {
  sql.query(
    "UPDATE admin SET Ten_AD = ?, NgaySinh = ?, Email = ?, SDT = ?, TenDangNhap = ?, MatKhau = ?, DiaChi = ?  WHERE Ma_AD = ?",
    [admin.Ten_AD, admin.NgaySinh, admin.Email, admin.SDT, admin.TenDangNhap, admin.MatKhau, admin.DiaChi, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found admin with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated admin: ", { id: id, ...admin });
      result(null, { id: id, ...admin });
    }
  );
};

Admin.remove = (id, result) => {
  sql.query("DELETE FROM admin WHERE Ma_AD = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found admin with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted admin with id: ", id);
    result(null, res);
  });
};

Admin.removeAll = result => {
  sql.query("DELETE FROM admin", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} admins`);
    result(null, res);
  });
};

module.exports = Admin;