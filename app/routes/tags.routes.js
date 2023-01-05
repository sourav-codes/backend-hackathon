module.exports = (app) => {
  const tag = require("../controllers/tags.controllers");

  // Create a new tag
  app.post("/tag", tag.TagAddOne);

  // Retrieve all tags
  app.get("/tag", tag.findAll);

  // Update a tag with tagId
  app.put("/tag", tag.update);

  //   Retrieve a single tag with tagId
  app.get("/tag/:tagId", tag.findOne);

  // Delete a tag with tagId
  app.delete("/tag/:tagId", tag.delete);


  //Check if tag is in our records
  app.get("/tagname", tag.findTagFromList);
};
