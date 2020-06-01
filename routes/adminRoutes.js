module.exports = app => {
    const admins = require("../controllers/adminController");
  
    // Create a new Admin
    app.post("/admins", admins.create);

    //login
    app.post("/admins/login", admins.login);
  
    // Retrieve all admins
    app.get("/admins", admins.findAll);
  
    // Retrieve a single Admin with AdminId
    app.get("/admins/:adminId", admins.findOne);
  
    // Update a Admin with adminId
    app.put("/admins/:adminId", admins.update);
  
    // Delete a Admin with adminId
    app.delete("/admins/:adminId", admins.delete);
  
    // Create a new Admin
    app.delete("/admins", admins.deleteAll);
  };