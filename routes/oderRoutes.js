module.exports = app => {
    const oder = require("../controllers/oderController");
  
    // Create a new Farm
    app.post("/oder", oder.create);
  
    // Retrieve all oder
    app.get("/oder", oder.findAll);
  
    // Retrieve a single farm with farmId
    app.get("/oder/:farmId", oder.findOne);
  
    // Update a farm with farmId
    app.put("/oder/:farmId", oder.update);
  
    // Delete a farm with farmId
    app.delete("/oder/:farmId", oder.delete);
  
    // Create a new farm
    app.delete("/oder", oder.deleteAll);
  };