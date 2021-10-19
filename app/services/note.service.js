const noteModel = require("../models/note.model.js");

class noteService {

  

  createNote = (info,callback) => {
    
    noteModel.createNote(info.title, info.content,(err,data)=>{
        return err ? callback(err, null) : callback(null, data);
    })
      
  };

  findAll = (callback) => {
    noteModel.findAll((err,data) => {
        return err ? callback(err, null) : callback(null, data);
    })    
  };

  findOne = (findId, callback) => {
    noteModel.findOne(findId, (err, data) => {
      return err ? callback(err, null) : callback(null, data);
    });
  };

  updateNote = (findId, title, content,callback) => {
    noteModel.updateNote(findId,title,content,(err,data) => {
        return err ? callback(err, null) : callback(null, data);
      }
    );
  };

  deleteOne = (findId,callback) => {
    noteModel.deleteOne(findId,(err,data) => {
        return err ? callback(err, null) : callback(null, data);
    });
  };
}

module.exports = new noteService();
