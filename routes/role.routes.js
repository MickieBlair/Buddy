module.exports = app => {

  const roles = require("../controllers/role.controller.js");

  var router = require("express").Router();

  // Create a new Role
  router.post("/add", roles.create);

  // Retrieve all Roles
  router.get("/all", roles.findAll);

  // Retrieve a single Role with id
  router.get("/:id", roles.findOne);

  // Update a Role with id
  router.put("/:id", roles.update);

  // Delete all Roles
  router.delete("/all", roles.deleteAll);

  // Delete a Role with id
  router.delete("/:id", roles.delete);







  app.use('/admin/roles', router);
};
