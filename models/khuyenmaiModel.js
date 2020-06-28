const sql = require("./db.js");

// constructor
const KhuyenMai = function (km) {
  this.Ma_SanPham = km.Ma_SanPham;
};

KhuyenMai.create = (newKM, result) => {
  sql.query("INSERT INTO ct_khuyenmai SET ?", newKM, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created LoaiKM: ", {...newKM });
    result(null, { ...newKM });
  });
};

KhuyenMai.findById = (km_Id, result) => {
  sql.query(`SELECT * FROM ct_khuyenmai WHERE Ma_SanPham = ${km_Id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found KM: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found khuyen mai with the id
    result({ kind: "not_found" }, null);
  });
};

KhuyenMai.getAll = result => {
  sql.query("SELECT * FROM ct_khuyenmai", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("KM: ", res);
    result(null, res);
  });
};

// KhuyenMai.updateById = (id, loaikm, result) => {
//   sql.query(
//     "UPDATE loaikhuyenmai SET TenLoaiKM = ?  WHERE Ma_LoaiKM = ?",
//     [loaikm.TenLoaiKM, id],
//     (err, res) => {
//       if (err) {
//         console.log("error: ", err);
//         result(null, err);
//         return;
//       }

//       if (res.affectedRows == 0) {
//         // not found loaiNV with the id
//         result({ kind: "not_found" }, null);
//         return;
//       }

//       console.log("updated loai NV: ", { id: id, ...loaikm });
//       result(null, { id: id, ...loaikm });
//     }
//   );
// };

// KhuyenMai.remove = (id, result) => {
//   sql.query("DELETE FROM ct_khuyenmai WHERE Ma_LoaiKM = ?", id, (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(null, err);
//       return;
//     }

//     if (res.affectedRows == 0) {
//       // not found loai KM with the id
//       result({ kind: "not_found" }, null);
//       return;
//     }

//     console.log("deleted loai KM with id: ", id);
//     result(null, res);
//   });
// };

KhuyenMai.removeAll = result => {
  sql.query("DELETE FROM ct_khuyenmai", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} khuyen mai`);
    result(null, res);
  });
};

KhuyenMai.getListProduct = result => {
  sql.query("SELECT * FROM sanpham, ct_khuyenmai WHERE sanpham.Ma_SanPham = ct_khuyenmai.Ma_SanPham", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("KM: ", res);
    result(null, res);
  });
};

module.exports = KhuyenMai;