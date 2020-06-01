module.exports = app => {
    const loainv = require("../controllers/loainhanvienController");
  
    // Create a new loainv
    app.post("/loainv", loainv.create);
  
    // Retrieve all loainv
    app.get("/loainv", loainv.findAll);
  
    // Retrieve a single loainv with loainvId
    app.get("/loainv/:loainvId", loainv.findOne);
  
    // Update a loainv with loainvId
    app.put("/loainv/:loainvId", loainv.update);
  
    // Delete a loainv with loainvId
    app.delete("/loainv/:loainvId", loainv.delete);
  
    // Delete all loainv
    app.delete("/loainv", loainv.deleteAll);
  };