module.exports = app => {
    const loaikm = require("../controllers/loaiKMController");
  
    // Create a new loaikm
    app.post("/loaikm", loaikm.create);
  
    // Retrieve all loaikm
    app.get("/loaikm", loaikm.findAll);
  
    // Retrieve a single loaikm with loaikmId
    app.get("/loaikm/:loaikmId", loaikm.findOne);
  
    // Update a loaikm with loaikmId
    app.put("/loaikm/:loaikmId", loaikm.update);
  
    // Delete a loaikm with loaikmId
    app.delete("/loaikm/:loaikmId", loaikm.delete);
  
    // Delete all loaikm
    app.delete("/loaikm", loaikm.deleteAll);
  };