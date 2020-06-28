module.exports = app => {
  const products = require("../controllers/productController");
  const uploads = require("../middleware/upload");

  // Create a new product
  //app.post("/products", products.create);

  // Retrieve all products
  app.get("/products", products.findAll);

  app.get("/products/search", products.findProduct);

  //upload image
  app.post("/products", uploads.single("file"), products.uploadFiles)

  // Retrieve a single product with productId
  app.get("/products/:productId", products.findOne);

  // Update a product with productId
  app.put("/products/:productId", uploads.single("file"), products.update);

  // Delete a product with productId
  app.delete("/products/:productId", products.delete);

  // Create a new product
  app.delete("/products", products.deleteAll);

  //
  app.get("/farm/products/:idFarm", products.findFarmProduct);
  
};