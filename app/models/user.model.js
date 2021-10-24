const mongoose = require("mongoose");
const UserSchema = mongoose.Schema(
  {
    name: String,
    age: Number,
    email: { type: String, unique: true },
    password: String,
    notes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'myNote' }]
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
      name: info.name,
      age: info.age,
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

  // Find a single note with a userId
  findOne = (emailId, callback) => {
    console.log("coming inside user model");
    user.findOne({ email: emailId }, (err, data) => {
      console.log("coming inside 2");
      return err ? callback(err, null) : callback(null, data);
    }).populate('title'); ///populate method to join two collce
  };

  // Update a note identified by the {email:emailId} in the request
  updateUser = (emailId, name, age, callback) => {
    // Find note and update it with the request body
    user.updateOne(
      { email: emailId },
      {
        name: name || "Untitled Note",
        age: age,
      },
      { new: true },
      (err, data) => {
        return err ? callback(err, null) : callback(null, data);
      }
    );
  };

  // Delete a note with the specified userId in the request
  deleteUser = ({ email: emailId }, callback) => {
    user.deleteOne(emailId, (err, data) => {
      return err ? callback(err, null) : callback(null, data);
    });
  };
}

module.exports = new userModel();
