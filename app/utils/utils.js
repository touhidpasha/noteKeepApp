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

 verifyUser=(token)=>{
     try{
    temp=(jwt.verify(token,data.secret_key))
     return true
 }
 catch{
    //  console.log(err);
     return false;
 }
}
}

module.exports = new utilities();