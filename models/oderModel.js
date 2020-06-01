const sql = require("./db.js");

// constructor
const Oder = function (oder) {
  this.TRANG_THAI = oder.TRANG_THAI;
  this.NGAYDAT = oder.NGAYDAT;
  this.NGAYGIAO = oder.NGAYGIAO;
  this.DIACHIGIAO = oder.DIACHIGIAO
  this.GHICHU = oder.GHICHU,
  this.MA_NV = oder.MA_NV,
  sql.query("INSERT INTO dondathang SET ?", newOder, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Oder: ", { id: res.insertId, ...newOder });
    result(null, { id: res.insertId, ...newOder });
  });
};

Oder.findById = (oderId, result) => {
  sql.query(`SELECT * FROM dondathang WHERE MA_DDH = ${oderId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found oder: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found oder with the id
    result({ kind: "not_found" }, null);
  });
};

Oder.getAll = result => {
  sql.query("SELECT * FROM dondathang", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Oders: ", res);
    result(null, res);
  });
};

Oder.updateById = (id, oder, result) => {
  sql.query(
    "UPDATE dondathang SET TRANG_THAI = ?, NGAYDAT = ?, NGAY_GIAO = ?, DIACHIGIAO = ?, GHICHU = ?, MA_NV = ? WHERE MA_DDH = ?",
    [oder.TRANG_THAI, oder.NGAYDAT, oder.NGAYGIAO, oder.DIACHIGIAO, oder.GHICHU, oder.MA_NV, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found oder with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated oder: ", { id: id, ...oder });
      result(null, { id: id, ...oder });
    }
  );
};

Oder.remove = (id, result) => {
  sql.query("DELETE FROM dondathang WHERE MA_DDH = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found oder with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted oder with id: ", id);
    result(null, res);
  });
};

Oder.removeAll = result => {
  sql.query("DELETE FROM dondathang", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} oders`);
    result(null, res);
  });
};

module.exports = Oder;