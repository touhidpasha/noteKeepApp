const mongoose = require("mongoose");
const LabelSchema = mongoose.Schema(
    {
        labelName: String,
    },
    {
        timestamps: true,
    }
);
const label = mongoose.model("Label", LabelSchema);
class labelModel {
    //creates a note and saves it in database

    createLabel = async (info) => {
        const tempLabel = new label({
            labelName: info.labelName,

        });


        try {
            console.log("label model");
            const res=await tempLabel.save()
            return res; 
        } catch (e) {
            return e;
        }


    };



    // Retrieve and return all notes from the database.
    findAll = (callback) => {
        return label.find((err, data) => {
            return err ? callback(err, null) : callback(null, data);
        });
    };

    // Find a single note with a id
    findOne = (id, callback) => {
        label.findOne({ _id: id }, (err, data) => {
            return err ? callback(err, null) : callback(null, data)
        })
    };

    // Update a note identified by the id in the request
    updateLabel = (data, callback) => {

        return label.updateOne(
            { _id: data.id }, {
            labelName: data.labelName
        }
            , (err, data) => {
                return err ? callback(err, null) : callback(null, data);
            }
        )
    };


    // Delete a note with the specified id in the request
    deleteOne = (labelName, callback) => {
        return label.deleteOne({ labelName: labelName }, (err, data) => {
            return err ? callback(err, null) : callback(null, data);
        });
    };


}
module.exports = new labelModel();
