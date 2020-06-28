module.exports = app => {
    const comment = require("../controllers/commentController");
  
    // Create a new comment
    app.post("/comment", comment.create);
  
    // Retrieve all comment
    app.get("/comment", comment.findAll);
  
    // Retrieve a single comment with commentId
    app.get("/comment/:commentId", comment.findOne);
  
    // Update a comment with commentId
    app.put("/comment/:commentId", comment.update);
  
    // Delete a comment with commentId
    app.delete("/comment/:commentId", comment.delete);
  
    // Delete all comment
    app.delete("/comment", comment.deleteAll);
  };