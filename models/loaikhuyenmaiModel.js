const sql = require("./db.js");

// constructor
const LoaiKM = function (loaikm) {
  this.TenLoaiKM = loainv.TenLoaiKM;
};

LoaiKM.create = (newLoaiKM, result) => {
  sql.query("INSERT INTO loaikhuyenmai SET ?", newLoaiKM, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created LoaiKM: ", { id: res.insertId, ...newLoaiKM });
    result(null, { id: res.insertId, ...newLoaiKM });
  });
};

LoaiKM.findById = (loaikm_Id, result) => {
  sql.query(`SELECT * FROM loaikhuyenmai WHERE Ma_LoaiKM = ${loaikm_Id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Loai KM: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found khuyen mai with the id
    result({ kind: "not_found" }, null);
  });
};

LoaiKM.getAll = result => {
  sql.query("SELECT * FROM loaikhuyenmai", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Loai KM: ", res);
    result(null, res);
  });
};

LoaiKM.updateById = (id, loaikm, result) => {
  sql.query(
    "UPDATE loaikhuyenmai SET TenLoaiKM = ?  WHERE Ma_LoaiKM = ?",
    [loaikm.TenLoaiKM, id],
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