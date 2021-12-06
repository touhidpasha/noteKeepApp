/* ************************************************************************
 * Purpose          : get the values from the controller and process them for the notes in fundo  notes                
 * 
 * @file            : note.contoller.js
 * @author          : Touhid pasha
 * @version         : 1.0
 * @since           : 9-8-2021
 * 
 **************************************************************************/
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
            const res = (jwt.verify(token, data.secret_key))
            return res.email;
        }
        catch {
            return false;
        }
    }
}

module.exports = new utilities();