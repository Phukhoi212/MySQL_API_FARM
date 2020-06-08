module.exports = app => {
    const danhgia = require("../controllers/danhgiaController");
  
    // Create a new danhgia
    app.post("/danhgia", danhgia.create);
  
    // Retrieve all danhgia
    app.get("/danhgia", danhgia.findAll);
  
    // Retrieve a single danhgia with danhgiaId
    app.get("/danhgia/:danhgiaId", danhgia.findOne);
  
    // Update a danhgia with danhgiaId
    app.put("/danhgia/:danhgiaId", danhgia.update);
  
    // Delete a danhgia with danhgiaId
    app.delete("/danhgia/:danhgiaId", danhgia.delete);
  
    // Delete all danhgia
    app.delete("/danhgia", danhgia.deleteAll);
  };