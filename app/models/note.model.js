const mongoose = require("mongoose");
const NoteSchema = mongoose.Schema({
    title: String,
    content: String,
    trash: Boolean,
    email: String,
    // email: { type: mongoose.Schema.Types.String, ref: "User" },
}, {
    timestamps: true,
});

const myNote = mongoose.model("Note", NoteSchema);

class noteModel {
    //creates a note and saves it in database
    createNote = (info, callback) => {
        const note = new myNote({
            title: info.title,
            content: info.content,
            email: info.email,
            trash:false
        });
        // Save Note in the database
        return note.save((err, data) => {
            return err ? callback(err, null) : callback(null, data);
        });
    };

    // Retrieve and return all notes from the database.
    findAll = (req, callback) => {
        console.log(req.email);
        return myNote.find({email: req.email}, (err, data)=>{
            return err?callback(err, null): callback(null, data);
        })
        // return myNote.find({ email: req.body.email })
        //     .populate({
        //         path: "email",
        //         select: ["title", "content", "email"]
        //     })
        //     .exec((err, data) => {
        //         console.log(err);
        //         console.log(data);
        //         return err ? callback(err, null) : callback(null, data);
        //     });
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
            noteId, {
            title: title || "Untitled Note",
            content: content,
        }, { new: true },
            (err, data) => {
                return err ? callback(err, null) : callback(null, data);
            }
        );
    };

    // Delete a note with the specified noteId in the request
    deleteOne = (info, callback) => {
        myNote.deleteOne({_id:info.id},(err, data)=>{
            return err ? callback(err, null) : callback(null, data);
        }
            ) 
        // findByIdAndRemove(noteId, (err, data) => {
        //     return err ? callback(err, null) : callback(null, data);
        // });
    };
    setTrash=(info,callback) => {
        console.log("trashing is in progress "+info.id);
        myNote.findByIdAndUpdate({_id:info.id},{
            trash:true
        },(err, data) => {
            return err ? callback(err, null) : callback(null, data);
        })
    }
}

module.exports = new noteModel();