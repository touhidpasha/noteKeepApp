const mongoose = require("mongoose");
const NoteSchema = mongoose.Schema(
  {
    userId:String,
    title: String,
    content: String,
    user: [{ type: String, ref: 'user' }]
  },
  {
    timestamps: true,
  }
);

const myNote = mongoose.model("Note", NoteSchema);

class noteModel {
  //creates a note and saves it in database
  createNote = (info, callback) => {
    const note = new myNote({
      userId:info.userId,
      title: info.title || "Untitled Note",
      content: info.content,
    });
    // Save Note in the database
    return note.save((err, data) => {
      return err ? callback(err, null) : callback(null, data);
    });
  };

  // Retrieve and return all notes from the database.
  findAll = (callback) => {
    return myNote.find((err, data) => {
      return err ? callback(err, null) : callback(null, data);
    });
  };

  // Find a single note with a noteId
  findOne = (noteId, callback) => {
    myNote.findById(noteId, (err, data) => {
      return err ? callback(err, null) : callback(null, data);
    });
  };

  // Update a note identified by the noteId in the request
  updateNote = (noteId, title, content, callback) => {
    // Find note and update it with the request body
    myNote.findByIdAndUpdate(
      noteId,
      {
        title: title || "Untitled Note",
        content: content,
      },
      { new: true },
      (err, data) => {
        return err ? callback(err, null) : callback(null, data);
      }
    );
  };

  // Delete a note with the specified noteId in the request
  deleteOne = (noteId, callback) => {
    myNote.findByIdAndRemove(noteId, (err, data) => {
      return err ? callback(err, null) : callback(null, data);
    });
  };
}

module.exports = new noteModel();
