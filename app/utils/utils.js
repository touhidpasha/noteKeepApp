const jwt = require("jsonwebtoken")
const data = require("../utils/data")

class utilities {
    generateToken = (email) => {

        return (jwt.sign({ email: email },
            data.secret_key,
            {
                expiresIn: "365d",
            }))
    }

    verifyUser = (token) => {
        try {
           const res= (jwt.verify(token, data.secret_key))
            console.log("after verification "+JSON.stringify(res));
            console.log("after verification 2 "+res.email);

            return res.email;
        }
        catch {
            return false;
        }
    }
}

module.exports = new utilities();