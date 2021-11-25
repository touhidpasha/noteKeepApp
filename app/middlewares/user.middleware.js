// const logger = require("../controllers/logger");
const nodeMailer = require("../utils/nodeMailer")

const joi = require('joi')
class middleware {
    validate = (req, res, next) => {
        //check if content is present
        const joiSchema = joi.object({
            name: joi.string()
                .min(3)
                .max(20)
                .required(),
            age: joi.number(),
            email: joi.string(),
            password: joi.string()
        });
        console.log("ref " + joiSchema.validate(req.body).error);
        if (joiSchema.validate(req.body).error != null)
            return res.status(400).send({
                message: "enter valid name",
            });
        else
            return next();
    }

    sendOTP(email) {

        var OTP=Math.floor(Math.random() * ( 9999- 1 + 1)) + 1;
        nodeMailer.triggerMail(email,"reply for,change password reques","your OTP for changing password is "+OTP);
        return OTP;
    }
}

module.exports = new middleware();
