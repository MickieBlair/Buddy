const db = require("../models");
const User = db.users;
const Role = db.roles;
const Op = db.Sequelize.Op;

// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (!req.body.username || !req.body.email
    || !req.body.password || !req.body.first_name
    || !req.body.last_name) {
    res.status(400).send({
      message: "All fields required!"
    });
    return;
  }

  // Create a User
  const user = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    is_active: req.body.is_active ? req.body.is_active : false,
    roleId: req.body.role
  };

  // Save User in the database
  User.create(user)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    });
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  console.log("FIND ALL USERS");
  User.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    });
};

// find all active Users
exports.findAllActive = (req, res) => {
  User.findAll({ where: { is_active: true }})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving all active users."
      });
    });
};

// find all student Users
exports.findAllStudents = (req, res) => {

  User.findAll({
    attributes: { exclude: ['password', 'roleId'] },
    include: [{
      model: Role, as: 'role',
      attributes: {exclude: ['createdAt', 'updatedAt'] },
      where : {
        name: "Student"
      }
    }]
   })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving all Students users."
      });
    });
};

// find all Volunteer Users
exports.findAllVolunteers = (req, res) => {

  User.findAll({
    attributes: { exclude: ['password', 'roleId'] },
    include: [{
      model: Role, as: 'role',
      attributes: {exclude: ['createdAt', 'updatedAt'] },
      where : {
        name: "Volunteer"
      }
    }]
   })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving all Volunteer users."
      });
    });
};

// find all Staff Users
exports.findAllStaff = (req, res) => {

  User.findAll({
    attributes: { exclude: ['password', 'roleId'] },
    include: [{
      model: Role, as: 'role',
      attributes: {exclude: ['createdAt', 'updatedAt'] },
      where : {
        name: "Staff"
      }
    }]
   })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving all Staff users."
      });
    });
};

// find all Admin Users
exports.findAllAdmin = (req, res) => {

  User.findAll({
    attributes: { exclude: ['password', 'roleId'] },
    include: [{
      model: Role, as: 'role',
      attributes: {exclude: ['createdAt', 'updatedAt'] },
      where : {
        name: "Admin"
      }
    }]
   })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving all Admin users."
      });
    });
};

// find all inactive Users
exports.findAllInactive = (req, res) => {
  User.findAll({ where: { is_active: false }})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving all inactive users."
      });
    });
};

// Find a single User with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findByPk(id)
    .then(data => {
      if(data){
        res.send(data);
      }else{
        res.status(500).send({
          message: "Error: No User with id=" + id
        });
      };
    })
    .catch(err => {
      res.status(500).send({
        message: "User with id = " + id + " could not be retrieved."
      });
    });
};

// Update a User by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  User.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating User with id=" + id
      });
    });
};

//Delete a User with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  User.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete User with id=" + id
      });
    });
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
  User.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Users were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all users."
      });
    });
};
