module.exports = app => {
    const employees = require("../controllers/nhanvienController");
  
    // Create a new Employee
    app.post("/employees", employees.create);
  
    // Retrieve all employees
    app.get("/employees", employees.findAll);
  
    // Retrieve a single Employee with EmployeeId
    app.get("/employees/:employId", employees.findOne);
  
    // Update a employee with employId
    app.put("/employees/:employId", employees.update);
  
    // Delete a employee with employId
    app.delete("/employees/:employId", employees.delete);
  
    // Create a new employee
    app.delete("/employees", employees.deleteAll);
  };