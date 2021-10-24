const jwt = require("jsonwebtoken")
// const key=require("../utils/extra.txt")
const data = require("../utils/data")

class utilities {
    generateToken = (email) => {

        return (jwt.sign({ email: email },
            data.secret_key,
            {
                expiresIn: "2h",
            }))
    }

    verifyUser = (token) => {
        try {
            // console.log("before verify");
            (jwt.verify(token, data.secret_key))
            // console.log("after verify");
            return true
        }
        catch {
            //  console.log(err);
            return false;
        }
    }
}

module.exports = new utilities();