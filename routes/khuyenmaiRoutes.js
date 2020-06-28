module.exports = app => {
    const ct_km = require("../controllers/khuyenmaiController");
  
    // Create a new ct_km
    app.post("/ct_km", ct_km.create);
  
    // Retrieve all ct_km
    app.get("/ct_km", ct_km.findAll);
  
    // // Retrieve a single ct_km with ct_kmId
    // app.get("/ct_km/:ct_kmId", ct_km.findOne);
  
    // Update a ct_km with ct_kmId
    // app.put("/ct_km/:ct_kmId", ct_km.update);
  
    // // Delete a ct_km with ct_kmId
    // app.delete("/ct_km/:ct_kmId", ct_km.delete);
  
    // Delete all ct_km
    app.delete("/ct_km", ct_km.deleteAll);

    //get list
    app.get("/list_ctkm", ct_km.getList)
  };