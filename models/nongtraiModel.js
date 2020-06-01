const sql = require("./db.js");

// constructor
const Farm = function (farm) {
  this.TenNongTrai = farm.TenNongTrai;
  this.DiaChi = farm.DiaChi;
  this.SDT = farm.SDT;
  this.Ma_AD = farm.Ma_AD;
};

Farm.create = (newFarm, result) => {
  sql.query("INSERT INTO nongtrai SET ?", newFarm, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created farm: ", { id: res.insertId, ...newFarm });
    result(null, { id: res.insertId, ...newFarm });
  });
};

Farm.findById = (farmId, result) => {
  sql.query(`SELECT * FROM nongtrai WHERE Ma_NongTrai = ${farmId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found admin: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found farm with the id
    result({ kind: "not_found" }, null);
  });
};

Farm.getAll = result => {
  sql.query("SELECT * FROM nongtrai", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("farms: ", res);
    result(null, res);
  });
};

Farm.updateById = (id, farm, result) => {
  sql.query(
    "UPDATE nongtrai SET TenNongTrai = ?, DiaChi = ?, SDT = ?, Ma_AD = ? WHERE Ma_NongTrai = ?",
    [farm.TenNongTrai, farm.DiaChi, farm.SDT, farm.Ma_AD, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found farm with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated farm: ", { id: id, ...farm });
      result(null, { id: id, ...farm });
    }
  );
};

Farm.remove = (id, result) => {
  sql.query("DELETE FROM nongtrai WHERE Ma_NongTrai = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found farm with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted farm with id: ", id);
    result(null, res);
  });
};

Farm.removeAll = result => {
  sql.query("DELETE FROM nongtrai", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} farms`);
    result(null, res);
  });
};

module.exports = Farm;