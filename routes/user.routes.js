module.exports = app => {
  const users = require("../controllers/user.controller.js");

  var router = require("express").Router();

  // Create a new User
  router.post("/add", users.create);

  // Retrieve all Users
  router.get("/all", users.findAll);

  // Retrieve all student users
  router.get("/students", users.findAllStudents);

  // Retrieve all volunteer users
  router.get("/volunteers", users.findAllVolunteers);

  // Retrieve all staff users
  router.get("/staff", users.findAllStaff);

  // Retrieve all admin users
  router.get("/administrators", users.findAllAdmin);

  // Retrieve all active users
  router.get("/active", users.findAllActive);

  // Retrieve all inactive users
  router.get("/inactive", users.findAllInactive);

  // Retrieve a single User with id
  router.get("/:id", users.findOne);

  // Update a User with id
  router.put("/:id", users.update);

  // Delete all Users
  router.delete("/all", users.deleteAll);

  // Delete a User with id
  router.delete("/:id", users.delete);



  app.use('/admin/users', router);
};
