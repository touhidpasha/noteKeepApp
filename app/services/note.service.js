const noteModel = require("../models/note.model.js");

class noteService {
    createNote = (info, callback) => {
        noteModel.createNote(info, (err, data) => {
            return err ? callback(err, null) : callback(null, data);
        })
    };

    findAll = (req, callback) => {
        noteModel.findAll(req, (err, data) => {
            return err ? callback(err, null) : callback(null, data);
        })
    };

    findOne = (findId, callback) => {
        noteModel.findOne(findId, (err, data) => {
            return err ? callback(err, null) : callback(null, data);
        });
    };

    updateNote = (findId, title, content, callback) => {
        noteModel.updateNote(findId, title, content, (err, data) => {
            return err ? callback(err, null) : callback(null, data);
        });
    };

    deleteOne = (info, callback) => {
        noteModel.deleteOne(info, (err, data) => {
            return err ? callback(err, null) : callback(null, data);
        });
    };

    setTrash = (info, callback) => {
        noteModel.setTrash(info, (err, data) => {
            return err ? callback(err, null) : callback(null, data);
        })
    }

    updateNote = (info, callback) => {
        noteModel.updateNote(info, (err, data) => {
            return err ? callback(err, null) : callback(null, data);
        })
    }
}

module.exports = new noteService();