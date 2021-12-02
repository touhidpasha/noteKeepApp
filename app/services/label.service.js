const labelModel = require("../models/label.model.js");
class userService {
    createLabel = async (info)=>{
        try {
            console.log("label service");

           const res = await labelModel.createLabel(info)
            return res;
        } catch (e) {
            return e
        }

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
