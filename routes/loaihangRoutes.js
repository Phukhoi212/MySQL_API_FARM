module.exports = app => {
    const category = require("../controllers/loaihangController");
  
    // Create a new Category
    app.post("/category", category.create);
  
    // Retrieve all category
    app.get("/category", category.findAll);
  
    // Retrieve a single Category with CategoryId
    app.get("/category/:categoryId", category.findOne);
  
    // Update a Category with categoryId
    app.put("/category/:categoryId", category.update);
  
    // Delete a Category with categoryId
    app.delete("/category/:categoryId", category.delete);
  
    // Delete all Category
    app.delete("/category", category.deleteAll);
  };