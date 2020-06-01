module.exports = app => {
    const products = require("../controllers/productController");
    //const image = require("../controllers/uploads");
    const uploads = require("../middleware/upload");
  
    // Create a new product
    app.post("/products", products.create);
  
    // Retrieve all products
    app.get("/products", products.findAll);

    //upload image
    app.post("/products/upload", uploads.single("file"), products.uploadFiles)
  
    // Retrieve a single product with productId
    app.get("/products/:productId", products.findOne);
  
    // Update a product with productId
    app.put("/products/:productId", products.update);
  
    // Delete a product with productId
    app.delete("/products/:productId", products.delete);
  
    // Create a new product
    app.delete("/products", products.deleteAll);
  };