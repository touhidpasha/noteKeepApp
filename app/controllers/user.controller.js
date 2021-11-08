const userService = require("../services/user.service.js");
const middlewares = require("../middlewares/user.middleware.js")
const jwt = require("../utils/utils")
const nodeMailer = require("../utils/nodeMailer")
const crypto = require('crypto')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
class controller {

  uploadImage = (upload.single('image'), async (req, res) => {
    console.log("in upload image");
    console.log(req.file);
    
    // try {
    //   if (req.file) {
    //     console.log(req.file);
    //     console.log("image data " + req.body.file)
    //     return res.status(200).send({ "msg": "succusfully got image" })
    //   }
    //   else {
    //     return res.status(200).send({ "msg": "uploading unsuccessful" })
    //   }
    // } catch (err) {
    //   res.status(500).send(err)
    // }
  })

  //creates a note in the database
  createUser = (req, res) => {

    const info = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      age: req.body.age,
      email: req.body.email,
      password: crypto.createHash('md5').update(req.body.password).digest('hex') //this will create hash for payload password

    }
    userService.createUser(info, (err, data) => {
      if (err) {
        return res.status(500).send({
          message:
            err.message || "Some error occurred while creating the user.",
        });
      }
      // nodeMailer.triggerMail(data.email,"welcome..","keep your daily notes here")
      return res.status(200).send(data);
    });
  };


  //method for user-login
  login = (req, res) => {
    console.log("login user-controller");
    userService.login(req.body.email, (err, data) => {
      // console.log(data.password);
      // console.log(req.body.password);
      // console.log(crypto.createHash('md5').update(req.body.password).digest('hex'));
      if (err) {
        return res.status(401).send({ message: "unauthorized" })
      }

      else if ((crypto.createHash('md5').update(req.body.password).digest('hex')) === data.password) {//  token=jwt.generateToken(req.body.email)
        console.log("login succesfull");
        console.log(jwt.generateToken(req.body.email));
        return res.status(200).send(jwt.generateToken(req.body.email))
      }
      else
        return res.status(401).send({ message: "credentials are not correct" })
    })

  }


  //forgot psw impl

  forgotPassword = (req, res) => {
    console.log("forgot pasd called in user-contoller");
    userService.forgotPassword(req.body.email, (err, data) => {
      var OTP;
      if (err)
        return res.status(404).send("user not found")
      else {
        OTP = middlewares.sendOTP(data.email);
        console.log("OTP has sent succesfully");
        return res.status(200).send(" check your email")
        // const sendOTP=()=>{return OTP}
      }
    })
    // const sendOTP=()=>{return OTP};
  }


  //rest password
  verifyOTP = (req, res) => {
    // const info={
    //   email:req.body.email,
    //   OTP:req.body.OTP,
    //   originalOTP:OTP
    // }
    console.log("verify method called in user-controller");
    if (req.body.OTP === 2036)//here for testing i'am hardcoding
      return res.status(200).send("correct OTP")
    else
      return res.status(400).send("wrong OTP")
  }

  //rest password
  resetPassword = (req, res) => {
    // const info={
    //   email:req.body.email,
    //   OTP:req.body.OTP,
    //   originalOTP:OTP
    // }
    // if (req.body.OTP === 1748)//here for testing i'am hardcoding
    userService.resetPassword(req.body, (crypto.createHash('md5').update(req.body.password).digest('hex')), (err, data) => {
      if (err)
        return res.status(401).send("error occured")
      else
        res.status(400).send(data)
    })
    // else
    // return res.status(401).send("error occured")
  }

  // Retrieve and return all notes from the database.
  findAll = (req, res) => {
    userService.findAll((err, data) => {
      if (err) {
        return res.status(500).send({
          message:
            err.message || "Some error occurred while creating the user.",
        });
      }
      return res.status(200).send(data);
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
      return res.status(200).send({ user: data });
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
      return res.send({ message: "Update Succesfull", user: data });
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
      return res.send("Deleted user successfully");
    });
  };
}

module.exports = new controller();
