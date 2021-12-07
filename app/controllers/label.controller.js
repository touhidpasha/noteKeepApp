const labelService = require("../services/label.service.js");

class controller {
    //creates a note in the database
    createLabel = (req, res) => {
        const info = {
            labelName: req.body.labelName,
        }
        labelService.createLabel(info, (err, data) => {
            if (err) {
                return res.status(500).send({
                    message: err.message || "Some error occurred while creating the label.",
                });
            }
            return res.status(200).send(data);
        });
    };



    // Retrieve and return all notes from the database.
    findAll = (req, res) => {
        labelService.findAll((err, data) => {
            if (err) {
                return res.status(500).send({
                    message: err.message || "Some error occurred while creating the user.",
                });
            }
            return res.status(200).send(data);
        });
    };

    // Find a single note with a userId
    findOne = (req, res) => {
        labelService.findOne(req.body.id, (err, data) => {
            if (err) {
                return res.status(500).send({ 'message': "error while retrieving label" })
            }
            return res.status(200).send(data);
        });
    };

    // Find a single note with a userId
    findAll = (req, res) => {
        labelService.findAll( (err, data) => {
            if (err) {
                return res.status(500).send({ 'message': "error while retrieving label" })
            }
            return res.status(200).send(data);
        });
    };

    // Find a single note with a userId
    updateLabel = (req, res) => {
        labelService.updateLabel(req.body, (err, data) => {
            if (err) {
                return res.status(500).send({ 'message': "error while updating label" })
            }
            return res.status(200).send(data);
        });
    };

    // Delete a note with the specified userId in the request

    deleteOne = (req, res) => {
        labelService.deleteOne(req.body.labelName, (err, data) => {
            if (err) {
                return res.status(500).send({ 'message': "error while deleting label" })
            }
            return res.status(200).send(data);
        });
    };
}

module.exports = new controller();