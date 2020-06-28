const sql = require("./db.js");

// constructor
const Comment = function (comment) {
  this.NoiDung = comment.NoiDung;
  this.NgayBinhLuan = comment.NgayBinhLuan;
  this.Ma_SanPham = comment.Ma_SanPham;
  this.Ma_NV = comment.Ma_NV;
  this.Ma_KhachHang = comment.Ma_KhachHang;
};

Comment.create = (newComment, result) => {
  sql.query("INSERT INTO binhluan SET ?", newComment, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created danh gia: ", { id: res.insertId, ...newComment });
    result(null, { id: res.insertId, ...newComment });
  });
};

Comment.findById = (commentId, result) => {
  sql.query(`SELECT * FROM binhluan WHERE Ma_SanPham = ${commentId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Comment: ", res);
      result(null, res);
      return;
    }

    // not found danh gia with the id
    result({ kind: "not_found" }, null);
  });
};

Comment.getAll = result => {
  sql.query("SELECT * FROM binhluan", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Comment: ", res);
    result(null, res);
  });
};

Comment.updateById = (id, comment, result) => {
  sql.query(
    "UPDATE danhgia SET NoiDung = ?, NgayBinhLuan = ?, Ma_SanPham = ?, Ma_NV = ?, Ma_KhachHang = ?  WHERE Ma_BinhLuan = ?",
    [comment.NoiDung, comment.NgayBinhLuan, comment.Ma_SanPham, comment.Ma_NV, comment.Ma_KhachHang, id],
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

      console.log("updated Comment: ", { id: id, ...comment });
      result(null, { id: id, ...comment });
    }
  );
};

Comment.remove = (id, result) => {
  sql.query("DELETE FROM binhluan WHERE Ma_BinhLuan = ?", id, (err, res) => {
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

    console.log("deleted Comment with Cooment ID: ", id);
    result(null, res);
  });
};

Comment.removeAll = result => {
  sql.query("DELETE FROM binhluan", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Commnet`);
    result(null, res);
  });
};

module.exports = Comment;