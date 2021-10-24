const userModel = require("../models/user.model.js");

class userService {
  createUser = (info,callback) => {
    userModel.createUser(info,(err,data)=>{
        return err ? callback(err, null) : callback(null, data);
    })
      
  };

  //lognin method
  login=(emailId,callback)=>{
    userModel.fetchUserData(emailId,(err,data)=>{
      // console.log(data);
      return err?callback(err,null):callback(null,data);
    })
  };

  findAll = (callback) => {
    userModel.findAll((err,data) => {
        return err ? callback(err, null) : callback(null, data);
    })    
  };

  findOne = (emailId, callback) => {

    userModel.findOne(emailId, (err, data) => {
      return err ? callback(err, null) : callback(null, data);
    });
  };

  updateUser = (emailId, name, age,callback) => {
    userModel.updateUser(emailId,name,age,(err,data) => {
        return err ? callback(err, null) : callback(null, data);
      }
    );
  };

  deleteOne = (emailId,callback) => {
    userModel.deleteOne(emailId,(err,data) => {
        return err ? callback(err, null) : callback(null, data);
    });
  };
}

module.exports = new userService();
