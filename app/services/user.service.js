const userModel = require("../models/user.model.js");

class userService {
  createUser = (info, callback) => {
    userModel.createUser(info, (err, data) => {
      return err ? callback(err, null) : callback(null, data);
    })

  };

  //lognin method
  login = (emailId, callback) => {
    userModel.fetchUserData(emailId, (err, data) => {
      // console.log(data);
      return err ? callback(err, null) : callback(null, data);
    })
  };

  //forgot password method
  forgotPassword = (email, callback) => {
    userModel.findOne(email, (err, data) => {
      return err ? callback(err, null) : callback(null, data)
    })
  };

  //reset pswd method
resetPasswod=(info,callback)=>{
  userModel.updateUser(info,(err,data)=>{
    return err ? callback(err, null) : callback(null, data)
  })
  
};

  findAll = (callback) => {
    userModel.findAll((err, data) => {
      return err ? callback(err, null) : callback(null, data);
    })
  };

  findOne = (findId, callback) => {
    userModel.findOne(findId, (err, data) => {
      return err ? callback(err, null) : callback(null, data);
    });
  };

  updateUser = (findId, name, age, callback) => {
    userModel.updateUser(findId, name, age, (err, data) => {
      return err ? callback(err, null) : callback(null, data);
    }
    );
  };

  deleteOne = (findId, callback) => {
    userModel.deleteOne(findId, (err, data) => {
      return err ? callback(err, null) : callback(null, data);
    });
  };
}

module.exports = new userService();
