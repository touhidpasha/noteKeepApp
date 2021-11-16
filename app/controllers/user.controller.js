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
            // nodeMailer.triggerMail(data.email,"welcome..","keep your daily notes here")
            return res.status(200).send(data);
        });
    };


    //method for user-login
    login = (req, res) => {
        var token;
        console.log("login user-controller");
        console.log(req.body);
        userService.login({ "email": req.body.email }, (err, data) => {
            // console.log(data.password);
            // console.log(req.body.password);
            // console.log(crypto.createHash('md5').update(req.body.password).digest('hex'));
            if (err) {
                return res.status(401).send({ message: "user not found" })
            } else if ((crypto.createHash('md5').update(req.body.password).digest('hex')) === data.password) { //  token=jwt.generateToken(req.body.email)
                console.log("login succesfull");
                token = jwt.generateToken(req.body.email);
                console.log("token: " + token);

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
        console.log("forgot pasd called in user-contoller" + req.body.email);
        userService.forgotPassword(req.body.email, (err, data) => {
            var OTP;
            if (err)
                return res.status(404).send({ "msg": "user not found" })
            else {
                OTP = middlewares.sendOTP(data.email);
                console.log("OTP has generated");
                userService.saveOTP({ "email": data.email, "OTP": OTP }, (err, info) => {
                    if (err) {
                        return res.status(500).send({ "msg": "some issue in server,try again" })

                    }
                    else {
                        return res.status(200).send({ "msg": "otp has been delivered to " + data.email })

                    }
                })
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
        console.log("verify method called in user-controller" + req.body.email);

        userService.fetchUserData(req.body, (err, data) => {
            if (err)
                return (res.status(500).send({ "message": "error occured in server" }))
            else {

                console.log(req.body.OTP +" and "+data.OTP);
                if (req.body.OTP == data.OTP) //here for testing i'am hardcoding
                {
                    console.log("correct OTP");
                    return res.status(200).send({ "message":"correct OTP"})
                }
                else {
                    console.log("wrong OTP");
                    return res.status(422).send({ "message":"wrong OTP"})
                   
                }

            }
            // else {
            //     return res.status(400).send({ "message": "wrong OTP" })

            // }
            // }
        })



    }

    //rest password
    resetPassword = (req, res) => {
        // const info={
        //   email:req.body.email,
        //   OTP:req.body.OTP,
        //   originalOTP:OTP
        // }
        // if (req.body.OTP === 1748)//here for testing i'am hardcoding

        userService.fetchUserData(req.body, (err, data) => {
            if (err)
                return (res.status(500).send({ "message": "error occured in server" }))
            else {
                // if (data.OTP === req.body.OTP) {
                userService.resetPassword(req.body, (crypto.createHash('md5').update(req.body.password).digest('hex')), (err, data) => {
                    if (err)
                        return res.status(500).send({ "message": "error occured while updatting" })
                    else
                        return res.status(200).send({ "message": "password updated successfully" })
                })
            }
            // else {
            //     return res.status(400).send({ "message": "wrong OTP" })

            // }
            // }
        })

        // else
        // return res.status(401).send("error occured")
    }

    // Retrieve and return all notes from the database.
    findAll = (req, res) => {
        userService.findAll((err, data) => {
            if (err) {
                return res.status(500).send({
                    message: err.message || "Some error occurred while creating the user.",
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
    // updateUser = (req, res) => {
    //     let id = req.params.userId;
    //     let name = req.body.name;
    //     let age = req.body.age;
    //     userService.updateUser(id, name, age, (err, data) => {
    //         if (err) {
    //             if (err.kind === "ObjectId") {
    //                 return res.status(404).send({
    //                     message: "user not found with id " + id,
    //                 });
    //             }
    //             return res.status(500).send({
    //                 message: "Error updating user with id " + id,
    //             });
    //         }
    //         if (!data) {
    //             return res.status(404).send({
    //                 message: "user not found with id " + id,
    //             });
    //         }
    //         return res.send({ message: "Update Succesfull", user: data });
    //     });
    // };

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