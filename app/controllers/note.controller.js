const noteService = require("../services/note.service.js");
const utils = require("../utils/utils")
class controller {
    //creates a note in the database
    createNote = (req, res) => {
        var email = utils.verifyUser(req.body.token);

        if (!email)
            return res.status(401).send({ "message": "please login first" })
        let info = {
            "title": req.body.title,
            "content": req.body.content,
            "email": email
        }

        noteService.createNote(info, (err, data) => {
            if (err) {
                return res.status(500).send({
                    message: err.message || "Some error occurred while creating the Note.",
                });
            }
            return res.status(200).send(data);
        });
    };

    //updating note as trash 
    setTrash = (req, res, next) => {

        const email = utils.verifyUser(req.body.token);
        if (!email)
            return res.status(401).send({ "message": "unautorizesd" })
        else
            noteService.setTrash(req.body, (err, data) => {
                if (err) {
                    return res.status(500).send({
                        message: err.message || "Some error occurred while creating the Note.",
                    });
                }
                return res.status(200).send(data);

            })
    }

    // Retrieve and return all notes from the database.
    findAll = (req, res) => {
        console.log("req " + req.body);
        console.log("req " + req.headers);
        console.log("header tokenn auth " + req.body.headers.Authorization);
        console.log("in findall 2.1 " + JSON.stringify(req.headers));

        const email = utils.verifyUser(req.body.headers.Authorization);
        console.log("in findall 3" + email);
        if (email !== false) {
            noteService.findAll({ "email": email }, (err, data) => {
                if (err) {
                    return res.status(500).send({
                        message: err.message || "Some error occurred while fetching the Note.",
                    });
                }
                console.log("output from server " + data);
                return res.status(200).send(data);
            });
        }
        else {
            return res.status(401).send({ "message": "login first" })
        }
    };

    // Find a single note with a noteId
    findOne = (req, res) => {
        let id = req.params.noteId;
        noteService.findOne(id, (err, data) => {
            if (err) {
                if (err.kind === "ObjectId") {
                    return res.status(404).send({
                        message: "Note not found with id " + id,
                    });
                }
                return res.status(500).send({
                    message: "Error retrieving note with id " + id,
                });
            }
            if (!data) {
                return res.status(404).send({
                    message: "Note not found with id (in then) " + id,
                });
            }
            res.status(200).send({ Note: data });
        });
    };

    // Update a note identified by the noteId in the request
    updateNote = (req, res) => {
        let id = req.params.noteId;
        let title = req.body.title;
        let content = req.body.content;
        console.log("------ update note colled");
        noteService.updateNote(id, title, content, (err, data) => {
            if (err) {
                if (err.kind === "ObjectId") {
                    return res.status(404).send({
                        message: "Note not found with id " + id,
                    });
                }
                return res.status(500).send({
                    message: "Error updating note with id " + id,
                });
            }
            if (!data) {
                return res.status(404).send({
                    message: "Note not found with id " + id,
                });
            }
            res.send({ message: "Update Succesfull", Note: data });
        });
    };


    // Update a note identified by the noteId in the request
    //updating note color
    updateNoteColor = (req, res) => {
        console.log("__________in update color controleer");
        const email = utils.verifyUser(req.body.token);
        if (!email)
            return res.status(401).send({ "message": "unautorizesd" })
        else
            noteService.updateNoteColor(req.body, (err, data) => {
                if (err) {
                    return res.status(500).send({
                        message: err.message || "Some error occurred while creating the Note.",
                    });
                }
                return res.status(200).send(data);

            })
    }
    // Delete a note with the specified noteId in the request
    deleteOne = (req, res) => {
        console.log("deletion is called for " + req.body.id);
        const email = utils.verifyUser(req.body.token);
        if (!email)
            return res.status(401).send({ "message": "unautorizesd for deletion" })
        else
            noteService.deleteOne(req.body, (err, data) => {
                if (err) {
                    return res.status(500).send({
                        message: err.message || "Some error occurred while creating the Note.",
                    });
                }
                return res.status(200).send(data);

            })
    }

    updateNote = (req, res) => {
        const email = utils.verifyUser(req.body.token);
        // console.log("------ update note colled");

        if (!email)
            return res.status(401).send({ "message": "unautorizesd for deletion" })
        else
            noteService.updateNote(req.body, (err, data) => {
                if (err) {
                    return res.status(500).send({
                        message: err.message || "Some error occurred while creating the Note.",
                    });
                }
                return res.status(200).send(data);

            })

    }
}
module.exports = new controller();