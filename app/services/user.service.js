const userModel = require("../models/user.model.js");
const userRedis = require("../redis/user.redis")
const redis = require('redis');

// make a connection to the local instance of redis
const client = redis.createClient(6379);
client.on("error", (error) => {
  console.error(error);
});
class userService {
  createUser = (info, callback) => {
    userModel.createUser(info, (err, data) => {
      return err ? callback(err, null) : callback(null, data);
    })

  };

  findAll = async () => {
    try {
      const res = await userRedis.findAll({ "key": "users", "client": client })
      console.log("from redis "+res);
      if (res==null) {
        const data = await userModel.findAll();
        console.log("from DB " +JSON.stringify(data));
        // console.log(client);
        // save the record in the cache for subsequent request
        //  client.setex('users', 15, JSON.stringify(data))
        return data;
      }
      else return res;

    } catch (err) {
      return err;
    }
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
    userModel.fetchUserData({ "email": email }, (err, data) => {
      return err ? callback(err, null) : callback(null, data)
    })
  };

  //reset pswd method
  resetPassword = (info, password, callback) => {
    userModel.updateUser({ "email": info.email, "password": password }, (err, data) => {
      return err ? callback(err, null) : callback(null, data)
    })

  };



  findOne = (findId, callback) => {
    userModel.findOne(findId, (err, data) => {
      return err ? callback(err, null) : callback(null, data);
    });
  };

  deleteOne = (findId, callback) => {
    userModel.deleteOne(findId, (err, data) => {
      return err ? callback(err, null) : callback(null, data);
    });
  };

  saveOTP = (data, callback) => {
    userModel.saveOTP(data, (err, data) => {
      return err ? callback(err, null) : callback(null, data);
    })
  }

  fetchUserData = (data, callback) => {
    userModel.fetchUserData(data, (err, data) => {
      return err ? callback(err, null) : callback(null, data);
    })
  }

  updateToken = (data, callback) => {
    userModel.updateToken(data, (err, data) => {
      return err ? callback(err, null) : callback(null, data);
    })
  }
}

module.exports = new userService();
