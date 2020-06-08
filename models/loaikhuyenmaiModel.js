const sql = require("./db.js");

// constructor
const LoaiKM = function (loaikm) {
  this.TenLoaiKM = loaikm.TenLoaiKM;
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

      console.log("updated loai NV: ", { id: id, ...loaikm });
      result(null, { id: id, ...loaikm });
    }
  );
};

LoaiKM.remove = (id, result) => {
  sql.query("DELETE FROM loaikhuyenmai WHERE Ma_LoaiKM = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found loai KM with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted loai KM with id: ", id);
    result(null, res);
  });
};

LoaiKM.removeAll = result => {
  sql.query("DELETE FROM loaikhuyenmai", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} loai khuyen mai`);
    result(null, res);
  });
};

module.exports = LoaiKM;