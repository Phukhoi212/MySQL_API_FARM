module.exports = app => {
    const customers = require("../controllers/customerController");
  
    // Create a new Customer
    app.post("/customers", customers.create);
  
    // Retrieve all customers
    app.get("/customers", customers.findAll);
  
    // Retrieve a single Customer with CustomerId
    app.get("/customers/:customerId", customers.findOne);
  
    // Update a Customer with customerId
    app.put("/customers/:customerId", customers.update);
  
    // Delete a Customer with customerId
    app.delete("/customers/:customerId", customers.delete);
  
    // Create a new Customer
    app.delete("/customers", customers.deleteAll);
  };