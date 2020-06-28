const sql = require("./db.js");

// constructor
const OderDetail = function (od_detail) {
  this.Ma_SanPham = od_detail.Ma_SanPham;
  this.Ma_DonHang = od_detail.Ma_DonHang;
  this.SoLuong = od_detail.SoLuong;
};

OderDetail.create = (newOderDetail, result) => {
  sql.query("INSERT INTO ct_dondathang SET ?", newOderDetail, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("Added data fro oderDetail: ", { ...newOderDetail });
    result(null, { ...newOderDetail });
  });
};

OderDetail.findById = (id_pro, result) => {
  sql.query(`SELECT * FROM ct_dondathang WHERE Ma_SanPham = ${id_pro}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found : ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found with the id
    result({ kind: "not_found" }, null);
  });
};

OderDetail.getAll = result => {
  sql.query("SELECT * FROM ct_dondathang", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Detail: ", res);
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

OderDetail.removeAll = result => {
  sql.query("DELETE FROM ct_dondathang", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} don hang`);
    result(null, res);
  });
};

OderDetail.getListProduct = result => {
  sql.query("SELECT * FROM sanpham, ct_dondathang WHERE sanpham.Ma_SanPham = ct_dondathang.Ma_SanPham", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("KM: ", res);
    result(null, res);
  });
};

module.exports = OderDetail;