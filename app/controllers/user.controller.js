const userService = require("../services/user.service.js");
const middlewares = require("../middlewares/user.middleware.js")
const jwt = require("../utils/utils")
const triggerMail=require("../utils/nodeMailer")
// const mail=require("../nodeMailer/mail.js")
class controller {
  //creates a note in the database
  createUser = (req, res) => {
    // let name = req.body.name || "Untitled user";
    // let age = req.body.age;
    const info = {
      name: req.body.name,
      age: req.body.age,
      email: req.body.email,
      password: req.body.password

    }
    userService.createUser(info, (err, data) => {
      if (err) {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the user.",
        });
      }
      triggerMail(info.email)
      res.status(200).send(data);
    });
  };


  //method for user-login
  login = (req, res) => {
    userService.login(req.body.email, (err, data) => {
      // console.log(data);
      if (err) {
        res.status(401).send({ message: "unauthorized" })
      }

      else if (req.body.password === data.password) {//  token=jwt.generateToken(req.body.email)
        res.status(200).send(jwt.generateToken(req.body.email))
      }
      else
        res.status(401).send({ message: "credentials are not correct" })
    })

  }

  // Retrieve and return all notes from the database.
  findAll = (req, res) => {
    userService.findAll((err, data) => {
      if (err) {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the user.",
        });
      }
      res.status(200).send(data);
    });
  };

  // Find a single note with a userId
  findOne = (req, res) => {
    let id = req.params.userId;
    userService.findOne(id, (err, data) => {
      if (err) {
        if (err.kind === "ObjectId") {
          return res.status(404).send({
            message: "user not found with id " + id,
          });
        }
        return res.status(500).send({
          message: "Error retrieving user with id " + id,
        });
      }
      if (!data) {
        return res.status(404).send({
          message: "user not found with id (in then) " + id,
        });
      }
      res.status(200).send({ user: data });
    });
  };

  // Update a note identified by the userId in the request
  updateUser = (req, res) => {
    let id = req.params.userId;
    let name = req.body.name;
    let age = req.body.age;
    userServiUser(id, name, age, (err, data) => {
      if (err) {
        if (err.kind === "ObjectId") {
          return res.status(404).send({
            message: "user not found with id " + id,
          });
        }
        return res.status(500).send({
          message: "Error updating user with id " + id,
        });
      }
      if (!data) {
        return res.status(404).send({
          message: "user not found with id " + id,
        });
      }
      res.send({ message: "Update Succesfull", user: data });
    });
  };

  // Delete a note with the specified userId in the request
  deleteOne = (req, res) => {
    let id = req.params.userId;
    userService.deleteOne(id, (err, data) => {
      if (err) {
        if (err.kind === "ObjectId") {
          return res.status(404).send({
            message: "user not found with id " + id,
          });
        }
        return res.status(500).send({
          message: "Error deleting user with id " + id,
        });
      }
      if (!data) {
        return res.status(404).send({
          message: "user not found with id " + id,
        });
      }
      res.send("Deleted user successfully");
    });
  };
}



module.exports = new controller();
