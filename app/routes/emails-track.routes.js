module.exports = (app) => {
  const email = require("../controllers/email.controllers");

  // Create a new email track
  app.post("/emails-track", email.create);

  // // Retrieve all emails track
  app.get("/emails-track", email.getEmail);

  // // Update a emails track 
  app.put("/emails-track", email.modifyEmail);

  // //   Retrieve a single email with tagId
  // app.get("/email/:emailId", email.findOne);

  // // Delete a email with tagId
  app.delete("/emails-track/:emailId", email.deleteEmail);
};
