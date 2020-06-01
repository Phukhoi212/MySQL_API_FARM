module.exports = app => {
    const farms = require("../controllers/nongtraiController");
  
    // Create a new Farm
    app.post("/farms", farms.create);
  
    // Retrieve all farms
    app.get("/farms", farms.findAll);
  
    // Retrieve a single farm with farmId
    app.get("/farms/:farmId", farms.findOne);
  
    // Update a farm with farmId
    app.put("/farms/:farmId", farms.update);
  
    // Delete a farm with farmId
    app.delete("/farms/:farmId", farms.delete);
  
    // Create a new farm
    app.delete("/farms", farms.deleteAll);
  };