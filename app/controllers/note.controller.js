const noteService = require("../services/note.service.js");
const utils = require("../utils/utils")
const awsS3 = require("../aws-s3/awsS3")
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

        const email = utils.verifyUser(req.body.headers.Authorization);
        // console.log("in findall 3" + email);
        if (email !== false) {
            noteService.findAll({ "email": email }, (err, data) => {
                if (err) {
                    return res.status(500).send({
                        message: err.message || "Some error occurred while fetching the Note.",
                    });
                }
                // console.log("output from server " + data);
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
        // console.log("------ update note colled");
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
        // console.log("__________in update color controleer");
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
        // console.log("deletion is called for " + req.body.id);
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
    uploadImage = async (req, res) => {
        // console.log("contoller - image upload" + JSON.stringify(req.body));
        // console.log("contoller - image upload 2 " + req.body.token);

        const email = utils.verifyUser(req.body.token);
        // console.log("------ update note colled");

        if (!email)
            return res.status(401).send({ "message": "unauthorized" })
        else {
            let key;
            try {
                awsS3.uploadFile(req.body.fileName, (err, data) => {
                    if (err) {
                        return res.status(500).send({
                            message: err.message || "Some error occurred while uploaiding image.",
                        });
                    }
                    console.log("contoller - image upload key " + data);

                    noteService.uploadImage({ "id": req.body.id, "fileKey": data }, (err, data) => {
                        if (err) {
                            return res.status(500).send({
                                message: err.message || "Some error occurred while uploaiding image.",
                            });
                        }
                        return res.status(200).send(data);

                    })

                })
                //     console.log("contoller - image upload key " + key);
                //     noteService.uploadImage({ "id": req.body.id, "fileKey": key }, (err, data) => {
                //         if (err) {
                //             return res.status(500).send({
                //                 message: err.message || "Some error occurred while uploaiding image.",
                //             });
                //         }
                //         return res.status(200).send(data);

                //     })
            } catch (err) {
                return res.status(200).send({ "message": " aws s3 error" });

            }

        }

        // return res.status(200).send({"message":"image upload"})
    }

    // Retrieve and return all notes from the database.
    getImage = (req, res) => {

        const email = utils.verifyUser(req.body.token);
        // console.log("in findall 3" + email);
        if (email !== false) {
            return awsS3.downloadFile(req.body.key)
        }
        else {
            return res.status(401).send({ "message": "login first" })
        }
    };
}
module.exports = new controller();