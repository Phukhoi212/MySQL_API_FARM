const sql = require("./db.js");

// constructor
const Product = function (product) {
  this.TenSanPham = product.TenSanPham;
  this.HinhAnh = product.HinhAnh;
  this.GiaSanPham = product.GiaSanPham;
  this.SoLuong = product.SoLuong;
  this.Mota = product.Mota;
  this.Ma_NongTrai = product.Ma_NongTrai;
  this.Ma_LoaiHang = product.Ma_LoaiHang;
};

Product.create = (newProduct, result) => {
  sql.query("INSERT INTO sanpham SET ?", newProduct, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Product: ", { id: res.insertId, ...newProduct });
    result(null, { id: res.insertId, ...newProduct });
  });
};

Product.findById = (productId, result) => {
  sql.query(`SELECT * FROM sanpham WHERE Ma_SanPham = ${productId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found product: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found product with the id
    result({ kind: "not_found" }, null);
  });
};

Product.getAll = result => {
  sql.query("SELECT * FROM sanpham", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Products: ", res);
    result(null, res);
  });
};

Product.updateById = (id, product, result) => {
  sql.query(
    "UPDATE sanpham SET TenSanPham = ?, HinhAnh = ?, GiaSanPham = ?, SoLuong = ?, Mota = ?, Ma_LoaiHang = ?, Ma_NongTrai = ? WHERE Ma_SanPham = ?",
    [product.TenSanPham, product.HinhAnh, product.GiaSanPham, product.SoLuong, product.Mota, product.Ma_LoaiHang, product.Ma_NongTrai, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found product with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated product: ", { id: id, ...product });
      result(null, { id: id, ...product });
    }
  );
};

Product.remove = (id, result) => {
  sql.query("DELETE FROM sanpham WHERE Ma_SanPham = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found product with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted product with id: ", id);
    result(null, res);
  });
};

Product.removeAll = result => {
  sql.query("DELETE FROM sanpham", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} products`);
    result(null, res);
  });
};

module.exports = Product;