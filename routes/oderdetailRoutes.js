module.exports = app => {
    const oder_detail = require("../controllers/oderdetailController");
  
    // Create a new oder_detail
    app.post("/oder_detail", oder_detail.create);
  
    // Retrieve all oder_detail
    app.get("/oder_detail", oder_detail.findAll);
  
    // // Retrieve a single oder_detail with oder_detailId
    // app.get("/oder_detail/:oder_detailId", oder_detail.findOne);
  
    // Update a oder_detail with oder_detailId
    // app.put("/oder_detail/:oder_detailId", oder_detail.update);
  
    // // Delete a oder_detail with oder_detailId
    // app.delete("/oder_detail/:oder_detailId", oder_detail.delete);
  
    // Delete all oder_detail
    //app.delete("/oder_detail", oder_detail.deleteAll);

    //get list
    app.get("/list_oder", oder_detail.getList);
  };