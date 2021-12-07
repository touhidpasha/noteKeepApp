const labelModel = require("../models/label.model.js");
class userService {
    createLabel = (info, callback) => {
        labelModel.createLabel(info, (err, data) => {
            return err ? callback(err, null) : callback(null, data);
        })

    };



    findAll = (callback) => {
        labelModel.findAll((err, data) => {
            return err ? callback(err, null) : callback(null, data);
        })
    };

    findOne = (findId, callback) => {
        labelModel.findOne(findId, (err, data) => {
            return err ? callback(err, null) : callback(null, data);
        });
    };

    updateLabel = (info, callback) => {
        labelModel.updateLabel(info, (err, data) => {
            return err ? callback(err, null) : callback(null, data);
        });
    };

    deleteOne = (labelName, callback) => {
        labelModel.deleteOne(labelName, (err, data) => {
            return err ? callback(err, null) : callback(null, data);
        });
    };


}

module.exports = new userService();
