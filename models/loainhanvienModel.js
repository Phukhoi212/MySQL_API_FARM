const sql = require("./db.js");

// constructor
const LoaiNV = function (loainv) {
  this.TenLoai_NV = loainv.TenLoai_NV;
};

LoaiNV.create = (newLoaiNV, result) => {
  sql.query("INSERT INTO loainhanvien SET ?", newLoaiNV, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created LoaiNV: ", { id: res.insertId, ...newLoaiNV });
    result(null, { id: res.insertId, ...newLoaiNV });
  });
};

LoaiNV.findById = (loainv_Id, result) => {
  sql.query(`SELECT * FROM loainhanvien WHERE MaLoai_NV = ${loainv_Id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Loai NV: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found category with the id
    result({ kind: "not_found" }, null);
  });
};

LoaiNV.getAll = result => {
  sql.query("SELECT * FROM loainhanvien", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Loai NV: ", res);
    result(null, res);
  });
};

LoaiNV.updateById = (id, loainv, result) => {
  sql.query(
    "UPDATE loainhanvien SET TenLoai_NV = ?  WHERE MaLoai_NV = ?",
    [loainv.LoaiNV, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found loaiNV with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated loai NV: ", { id: id, ...loainv });
      result(null, { id: id, ...loainv });
    }
  );
};

LoaiNV.remove = (id, result) => {
  sql.query("DELETE FROM loainhanvien WHERE MaLoai_NV = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found loai NV with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted loai NV with id: ", id);
    result(null, res);
  });
};

LoaiNV.removeAll = result => {
  sql.query("DELETE FROM loainhanvien", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} loai nhan vien`);
    result(null, res);
  });
};

module.exports = LoaiNV;