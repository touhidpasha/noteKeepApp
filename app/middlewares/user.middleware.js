// const logger = require("../controllers/logger");
module.exports = (req, res, next) => {
    //check if content is present
    if (!req.body.name) {

        return res.status(400).send({
            message: "user must have name ",
        });
    }
    //validate title name
    var pattern = new RegExp("^[A-Z]{1}[a-zA-Z]{2,}$");
    if (!pattern.test(req.body.name)) {

        return res.status(400).send({
            message: "enter valid name which starts with capital letter",
        });
    } else {
        next();
    }
};
