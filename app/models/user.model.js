const mongoose = require("mongoose");
const UserSchema = mongoose.Schema(
  {
    firstName: String,
    lastName:String,
    // age: Number,
    email: {
      type: String,
      unique: true
    },
    password: String
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
      lastName:info.lastName,
      // age: info.age,
      email: info.email,
      password: info.password
    });

    // Save Note in the database
    return tempUser.save((err, data) => {
      return err ? callback(err, null) : callback(null, data);
    });
  };


  //fetching data from DB
  fetchUserData = (email, callback) => {
    user.findOne({ email: email }, (err, data) => {
      // console.log(data);
      return err ? callback(err, null) : callback(null, data)
    })
  }

  // Retrieve and return all notes from the database.
  findAll = (callback) => {
    return user.find((err, data) => {
      return err ? callback(err, null) : callback(null, data);
    });
  };

  //finding userdaetails with email
  // findUserByEmail = (email, callback) => {
  //   return user.findByIdAndUpdate({ email: email }, (err, data) => {
  //     return err ? callback(err, null) : callback(null, data);
  //   })
  // }

  // Find a single note with a userId
  findOne = (userId, callback) => {
    return user.findById(userId, (err, data) => {

      return err ? callback(err, null) : callback(null, data);
    });
  };

  // Update a note identified by the userId in the request
  updateUser = (info, newPassword, callback) => {
    // Find note and update it with the request body
    return user.findByIdAndUpdate(
      //   userId,
      //   {
      //     name: name || "Untitled Note",
      //     age: age,
      //   },
      //   { new: true },
      //   (err, data) => {
      //     return err ? callback(err, null) : callback(null, data);
      //   }
      // );

      user.updateOne({
        email: info.email,
        password: newPassword
      }, (err, data) => {
        return err ? callback(err, null) : callback(null, data);
      }
      )
    )
  };


  // Delete a note with the specified userId in the request
  deleteUser = (userId, callback) => {
    return user.findByIdAndRemove(userId, (err, data) => {
      return err ? callback(err, null) : callback(null, data);
    });
  };
}

module.exports = new userModel();
