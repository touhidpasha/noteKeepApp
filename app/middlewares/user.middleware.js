// const logger = require("../controllers/logger");
const nodeMailer = require("../utils/nodeMailer")

const joi = require('joi')
class middleware {
    validate = (req, res, next) => {
        //check if content is present
        // name=req.body.name;
        // console.log(req.body.name);
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

        OTP=Math.floor(Math.random() * (6 - 1 + 1)) + 1;
        nodeMailer.triggerMail(email,data.email,"reply for,change password reques","your OTP for changing password is"+OTP);
        return OTP;
    }
}

module.exports = new middleware();


// module.exports = (req, res, next) => {
//     //check if content is present
//     if (!req.body.name) {

//         return res.status(400).send({
//             message: "user must have name ",
//         });
//     }
//     //validate title name
//     var pattern = new RegExp("^[A-Z]{1}[a-zA-Z]{2,}$");
//     if (!pattern.test(req.body.name)) {

//         return res.status(400).send({
//             message: "enter valid name which starts with capital letter",
//         });
//     } else {
//         next();
//     }
// };
