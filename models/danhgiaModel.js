const sql = require("./db.js");

// constructor
const DanhGia = function (danhgia) {
  this.NoiDung = danhgia.NoiDung;
  this.Rating = danhgia.Rating;
  this.Ma_SanPham = danhgia.Ma_SanPham;
  this.Ma_NV = danhgia.Ma_NV;
  this.Ma_KhachHang = danhgia.Ma_KhachHang;
};

DanhGia.create = (newDanhGia, result) => {
  sql.query("INSERT INTO danhgia SET ?", newDanhGia, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created danh gia: ", { id: res.insertId, ...newDanhGia });
    result(null, { id: res.insertId, ...newDanhGia });
  });
};

DanhGia.findById = (id_danhgia, result) => {
  sql.query(`SELECT * FROM danhgia WHERE Ma_DanhGia = ${id_danhgia}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found danh gia: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found danh gia with the id
    result({ kind: "not_found" }, null);
  });
};

DanhGia.getAll = result => {
  sql.query("SELECT * FROM danhgia", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("danh gia: ", res);
    result(null, res);
  });
};

DanhGia.updateById = (id, danhgia, result) => {
  sql.query(
    "UPDATE danhgia SET NoiDung = ?, Rating = ?, Ma_SanPham = ?, Ma_NV = ?, Ma_KhachHang = ?  WHERE Ma_DanhGia = ?",
    [danhgia.NoiDung, danhgia.Rating, danhgia.Ma_SanPham, danhgia.Ma_NV, danhgia.Ma_KhachHang, id],
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

      console.log("updated danh gia: ", { id: id, ...danhgia });
      result(null, { id: id, ...danhgia });
    }
  );
};

DanhGia.remove = (id, result) => {
  sql.query("DELETE FROM danhgia WHERE Ma_DanhGia = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found danh gia with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted danh gia with Ma_DanhGia: ", id);
    result(null, res);
  });
};

DanhGia.removeAll = result => {
  sql.query("DELETE FROM danhgia", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} danh gia`);
    result(null, res);
  });
};

module.exports = DanhGia;