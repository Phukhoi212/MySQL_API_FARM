const sql = require("./db.js");

// constructor
const Customer = function (customer) {
  this.TenKhachHang = customer.TenKhachHang;
  this.NgaySinh = customer.NgaySinh;
  this.TaiKhoan = customer.TaiKhoan;
  this.TenDangNhap = customer.TenDangNhap;
  this.MatKhau = customer.MatKhau;
  this.SDT = customer.SDT;
  this.DiaChi = customer.DiaChi;
};

Customer.create = (newCustomer, result) => {
  sql.query("INSERT INTO khachhang SET ?", newCustomer, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created customer: ", { id: res.insertId, ...newCustomer });
    result(null, { id: res.insertId, ...newCustomer });
  });
};

Customer.findById = (customerId, result) => {
  sql.query(`SELECT * FROM khachhang WHERE Ma_KhachHang = ${customerId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found customer: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found customer with the id
    result({ kind: "not_found" }, null);
  });
};

Customer.getAll = result => {
  sql.query("SELECT * FROM khachhang", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("customers: ", res);
    result(null, res);
  });
};

Customer.updateById = (id, customer, result) => {
  sql.query(
    "UPDATE khachhang SET TenKhachHang = ?, NgaySinh = ?, TaiKhoan = ?, SDT = ?, TenDangNhap = ?, MatKhau = ?, DiaChi = ?  WHERE Ma_KhachHang = ?",
    [customer.TenKhacHang, customer.NgaySinh, customer.TaiKhoan, customer.SDT, customer.TenDangNhap, customer.MatKhau, customer.DiaChi, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found customer with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated customer: ", { id: id, ...customer });
      result(null, { id: id, ...customer });
    }
  );
};

Customer.remove = (id, result) => {
  sql.query("DELETE FROM khachhang WHERE Ma_KhachHang = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found customer with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted customer with Ma_KhachHang: ", id);
    result(null, res);
  });
};

Customer.removeAll = result => {
  sql.query("DELETE FROM customer", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} customers`);
    result(null, res);
  });
};

Customer.findByUserName = (userName, result) => {
  sql.query(`SELECT * FROM khachhang WHERE TenDangNhap = '${userName}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found customer: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found customer with the id
    result({ kind: "not_found" }, null);
  });
};

module.exports = Customer;