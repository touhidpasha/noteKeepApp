const jwt = require("jsonwebtoken")
// const key=require("../utils/extra.txt")
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
            // console.log("before verify");
           const res= (jwt.verify(token, data.secret_key))
            console.log("after verification "+JSON.stringify(res));
            console.log("after verification 2 "+res.email);

            return res.email;
        }
        catch {
            //  console.log(err);
            return false;
        }
    }
}

module.exports = new utilities();