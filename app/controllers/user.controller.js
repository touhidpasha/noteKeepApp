const userService = require("../services/user.service.js");
const middlewares = require("../middlewares/user.middleware.js")
const jwt = require("../utils/utils")
const nodeMailer = require("../utils/nodeMailer")
const crypto = require('crypto')
class controller {
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
                    message: err.message || "Some error occurred while creating the user.",
                });
            }
            nodeMailer.triggerMail(data.email, "welcome..", "keep your daily notes here")
            return res.status(200).send(data);
        });
    };

    //method for user-login
    login = (req, res) => {
        var token;
        userService.login({ "email": req.body.email }, (err, data) => {
            if (err) {
                return res.status(401).send({ message: "user not found" })
            } else if ((crypto.createHash('md5').update(req.body.password).digest('hex')) === data.password) { //  token=jwt.generateToken(req.body.email)
                token = jwt.generateToken(req.body.email);
                userService.updateToken({ "email": req.body.email, "token": token }, (err, data) => {
                    if (err)
                        return res.status(500).send({ "message": "error occured while updatting" })
                    else
                        return res.status(200).send({ "token": token })
                })
            } else
                return res.status(401).send({ message: "credentials are not correct" })
        })
    }
    //forgot psw impl

    forgotPassword = (req, res) => {
        userService.forgotPassword(req.body.email, (err, data) => {
            var OTP;
            if (err)
                return res.status(404).send({ "msg": "user not found" })
            else {
                OTP = middlewares.sendOTP(data.email);
                userService.saveOTP({ "email": data.email, "OTP": OTP }, (err, info) => {
                    if (err) {
                        return res.status(500).send({ "msg": "some issue in server,try again" })
                    }
                    else {
                        return res.status(200).send({ "msg": "otp has been delivered to " + data.email })

                    }
                })
            }
        })
    }

    //rest password
    verifyOTP = (req, res) => {
        userService.fetchUserData(req.body, (err, data) => {
            if (err)
                return (res.status(500).send({ "message": "error occured in server" }))
            else {
                if (req.body.OTP == data.OTP) //here for testing i'am hardcoding
                {
                    return res.status(200).send({ "message": "correct OTP" })
                }
                else {
                    return res.status(422).send({ "message": "wrong OTP" })
                }
            }
        })
    }

    //rest password
    resetPassword = (req, res) => {
        userService.fetchUserData(req.body, (err, data) => {
            if (err)
                return (res.status(500).send({ "message": "error occured in server" }))
            else {
                userService.resetPassword(req.body, (crypto.createHash('md5').update(req.body.password).digest('hex')), (err, data) => {
                    if (err)
                        return res.status(500).send({ "message": "error occured while updatting" })
                    else
                        return res.status(200).send({ "message": "password updated successfully" })
                })
            }
        })
    }

    // Retrieve and return all notes from the database.
    findAll = async (req,res) => {
        try {
            const data =await  userService.findAll()
            // console.log("in controller "+JSON.stringify(data));
            return res.status(200).send(data);
        } catch (err) {
            return res.status(500).send({
                message: err.message || "Some error occurred while creating the user.",
            });
        }


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