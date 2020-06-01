module.exports = app => {
    const images = require("../controllers/imageController");
  
  
    // Retrieve all admins
    app.get("/images", images.findAll);
  
  };