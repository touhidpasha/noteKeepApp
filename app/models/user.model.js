const mongoose = require("mongoose");
const UserSchema = mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: {
      type: String,
      unique: true
    },
    password: String,
    token: String,
    OTP: Number
  },
  {
    timestamps: true,
  }
);
const user = mongoose.model("User", UserSchema);
class userModel {
  //creates a note and saves it in database
  createUser = (info, callback) => {
    const tempUser = new user({
      firstName: info.firstName,
      lastName: info.lastName,
      email: info.email,
      password: info.password,
      token: "",
      OTP: null
    });

    // Save Note in the database
    return tempUser.save((err, data) => {
      return err ? callback(err, null) : callback(null, data);
    });
  };

  //fetching data from DB
  fetchUserData = (data, callback) => {
    user.findOne({ email: data.email }, (err, data) => {
      return err ? callback(err, null) : callback(null, data)
    })
  }

  // Retrieve and return all notes from the database.
  findAll = (callback) => {
    return user.find((err, data) => {
      return err ? callback(err, null) : callback(null, data);
    });
  };

  // Find a single note with a userId
  findOne = (userId, callback) => {
    return user.findById(userId, (err, data) => {
      return err ? callback(err, null) : callback(null, data);
    });
  };

  // Update a note identified by the userId in the request
  updateUser = (data, callback) => {

    return user.updateOne(
      { email: data.email }, {
      password: data.password
    }
      , (err, data) => {
        return err ? callback(err, null) : callback(null, data);
      }
    )
  };


  // Delete a note with the specified userId in the request
  deleteUser = (userId, callback) => {
    return user.findByIdAndRemove(userId, (err, data) => {
      return err ? callback(err, null) : callback(null, data);
    });
  };

  saveOTP = (data, callback) => {
    return user.updateOne({
      email: data.email
    }, {
      OTP: data.OTP
    }, (err, data) => {
      return err ? callback(err, null) : callback(null, data);
    }
    )
  }

  updateToken = (data, callback) => {
    return user.updateOne({ email: data.email }, { token: data.token }, (err, data) => {
      return err ? callback(err, null) : callback(null, data)
    }
    )
  }
}
module.exports = new userModel();
