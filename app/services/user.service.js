const userModel = require("../models/user.model.js");

class userService {
  createUser = (info, callback) => {
    userModel.createUser(info, (err, data) => {
      return err ? callback(err, null) : callback(null, data);
    })

  };

  //lognin method
  login = (data, callback) => {
    userModel.fetchUserData(data, (err, data) => {
      // console.log(data);
      return err ? callback(err, null) : callback(null, data);
    })
  };

  //forgot password method
  forgotPassword = (email, callback) => {
    userModel.fetchUserData({"email":email}, (err, data) => {
      return err ? callback(err, null) : callback(null, data)
    })
  };

  //reset pswd method
resetPassword=(info,password,callback)=>{
  userModel.updateUser({"email":info.email, "password":password},(err,data)=>{
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

  // updateUser = (findId, name, age, callback) => {
  //   userModel.updateUser(findId, name, age, (err, data) => {
  //     return err ? callback(err, null) : callback(null, data);
  //   }
  //   );
  // };

  deleteOne = (findId, callback) => {
    userModel.deleteOne(findId, (err, data) => {
      return err ? callback(err, null) : callback(null, data);
    });
  };

  saveOTP = (data,callback) => {
    userModel.saveOTP(data,(err, data) => {
      return err ? callback(err, null) : callback(null, data);
    })
  }

  fetchUserData=(data,callback) => {
    userModel.fetchUserData(data,(err, data) => {
      return err ? callback(err, null) : callback(null, data);
    })
  }

  updateToken = (data,callback) => {
    userModel.updateToken(data,(err, data) => {
      return err ? callback(err, null) : callback(null, data);
    })
  }
}

module.exports = new userService();
